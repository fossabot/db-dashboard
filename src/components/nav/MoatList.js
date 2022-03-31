import React, { useState } from "react";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputBase,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ethers } from "ethers";
import KwilDB from "kwildb";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrivKey,
  setSecret,
  setMoatName,
  setMoat,
  setData,
} from "../../actions";
import { AES, enc } from "crypto-js";

export default function MoatList({ moats, setMoats, setSelectedPools }) {
  const wallet = localStorage.getItem("wallet");
  const [open, setOpen] = useState(false);
  const [previous, setPrevious] = useState({});

  const [phrase, setPhrase] = useState("");
  const [owner, setOwner] = useState("");
  const [apiKey, setAPIKey] = useState("");
  const [encryptedSecret, setEncryptedSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [openSignSnackbar, setOpenSignSnackbar] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  const [loadAddingMoat, setLoadAddingMoat] = useState(false);

  const [addingMoat, setAddingMoat] = useState(false);
  const [newMoatName, setNewMoatName] = useState("");
  const [newPhrase, setNewPhrase] = useState("");
  const [emptyPhrase, setEmptyPhrase] = useState("");

  const dispatch = useDispatch();
  const moat = useSelector((state) => state.moat.index);
  const privKey = AES.decrypt(
    useSelector((state) => state.privKey),
    "kwil"
  ).toString(enc.Utf8);
  const secret = AES.decrypt(
    useSelector((state) => state.secret),
    "kwil"
  ).toString(enc.Utf8);

  const handleChange = (e) => {
    if (e.target.value !== undefined) {
      setOpen(true);
      setPrevious(moat);
      dispatch(setMoat(e.target.value));
      dispatch(setMoatName(moats[e.target.value].moat));
      dispatch(setData("", ""));
      setOwner(moats[e.target.value].owner);
      setEncryptedSecret(moats[e.target.value].secret);
      setAPIKey(moats[e.target.value].api_key);
      setSelectedPools([]);
    }
  };

  const signMoat = () => {
    setLoading(true);
    if (wallet === "metamask") {
      setTimeout(async function () {
        console.log(phrase);
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const signature = await signer.signMessage(phrase);
        const address = await signer.getAddress();
        let privKeyResult;
        let secretResult;
        try {
          privKeyResult = JSON.parse(
            await KwilDB.decryptKey(signature, address, apiKey)
          );
          secretResult = await KwilDB.decryptKey(
            signature,
            address,
            encryptedSecret
          );
          let encryptedKey = AES.encrypt(
            JSON.stringify(privKeyResult),
            "kwil"
          ).toString();
          dispatch(setPrivKey(encryptedKey));
          let encryptedSecret1 = AES.encrypt(secretResult, "kwil").toString();
          dispatch(setSecret(encryptedSecret1));
          setLoading(false);
          setOpen(false);
        } catch (e) {
          setOpenSignSnackbar(true);
          dispatch(setMoat(previous));
          setLoading(false);
          setOpen(false);
          return;
        }
      }, 0);
    } else if (wallet === "arconnect") {
      setTimeout(async function () {
        const info = {
          name: "KwilDB", // optional application name
          //logo:KwilLogo
        };

        console.log(
          await window.arweaveWallet.connect(
            ["ACCESS_ADDRESS", "SIGNATURE"],
            info
          )
        );
        const address = await window.arweaveWallet.getActiveAddress();
        console.log(address);

        const enc = new TextEncoder(); // always utf-8
        const buff = enc.encode(phrase);
        console.log(buff);
        const sig = await window.arweaveWallet.signature(buff, {
          name: "RSA-PSS",
          saltLength: 0,
        });
        const signature = JSON.stringify(sig);
        console.log(signature);

        let privKeyResult;
        let secretResult;
        try {
          privKeyResult = JSON.parse(
            await KwilDB.decryptKey(signature, address, apiKey)
          );
          secretResult = await KwilDB.decryptKey(
            signature,
            address,
            encryptedSecret
          );
          let encryptedKey = AES.encrypt(
            JSON.stringify(privKeyResult),
            "kwil"
          ).toString();
          dispatch(setPrivKey(encryptedKey));
          let encryptedSecret1 = AES.encrypt(secretResult, "kwil").toString();
          dispatch(setSecret(encryptedSecret1));
          setLoading(false);
          setOpen(false);
        } catch (e) {
          setOpenSignSnackbar(true);
          dispatch(setMoat(previous));
          setLoading(false);
          setOpen(false);
          return;
        }
      }, 0);
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: "#333333",
      },
    },
  };

  const paste = (type) => {
    if (type === "key") {
      navigator.clipboard.writeText(privKey).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    } else {
      navigator.clipboard.writeText(secret).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    }
  };

  const createMoat = () => {
    //debug, DELETE
    if (newPhrase === "") {
      setEmptyPhrase(true);
    } else {
      setLoadAddingMoat(true);
      if (wallet === "metamask") {
        setTimeout(async function () {
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log(provider);
          const signer = provider.getSigner();
          console.log(signer);
          const signature = await signer.signMessage(newPhrase);
          const address = await signer.getAddress();
          const result = await KwilDB.createMoat(
            "https://test-db.kwil.xyz",
            newMoatName,
            signature,
            address
          );
          console.log(result);

          if (result.creation === false) {
          } else {
            const temp = await KwilDB.getMoats(
              "https://test-db.kwil.xyz",
              address
            );
            console.log(temp);
            setMoats(temp);
            dispatch(setMoat(temp.length - 1));
            dispatch(setMoatName(newMoatName));
            setLoadAddingMoat(false);
            setAddingMoat(false);
            let encryptedKey = AES.encrypt(
              JSON.stringify(result.privateKey),
              "kwil"
            ).toString();
            dispatch(setPrivKey(encryptedKey));
            let encryptedSecret1 = AES.encrypt(
              result.secret,
              "kwil"
            ).toString();
            dispatch(setSecret(encryptedSecret1));
          }
        }, 0);
      } else if (wallet === "arconnect") {
        setTimeout(async function () {
          const info = {
            name: "KwilDB", // optional application name
            //logo:KwilLogo
          };

          console.log(
            await window.arweaveWallet.connect(
              ["ACCESS_ADDRESS", "SIGNATURE"],
              info
            )
          );

          const address = await window.arweaveWallet.getActiveAddress();
          console.log(address);

          const enc = new TextEncoder(); // always utf-8
          const buff = enc.encode(newPhrase);
          console.log(buff);

          //const buff = str2ab(signingPhrase);

          const sig = await window.arweaveWallet.signature(buff, {
            name: "RSA-PSS",
            saltLength: 0,
          });
          const signature = JSON.stringify(sig);
          console.log(signature);

          const result = await KwilDB.createMoat(
            "https://test-db.kwil.xyz",
            newMoatName,
            signature,
            address
          );
          setLoadAddingMoat(false);
          if (result.creation === false) {
          } else {
            const temp = await KwilDB.getMoats(
              "https://test-db.kwil.xyz",
              address
            );
            console.log(temp);
            setMoats(temp);
            dispatch(setMoat(temp.length - 1));
            dispatch(setMoatName(newMoatName));
            setLoadAddingMoat(false);
            setAddingMoat(false);
            let encryptedKey = AES.encrypt(
              JSON.stringify(result.privateKey),
              "kwil"
            ).toString();
            dispatch(setPrivKey(encryptedKey));
            let encryptedSecret1 = AES.encrypt(
              result.secret,
              "kwil"
            ).toString();
            dispatch(setSecret(encryptedSecret1));
          }
        }, 0);
      }
    }
  };

  return (
    <>
      <FormControl
        sx={{
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "0px 8px 0px 8px",
          //width: "200px",
          height: "30px",
          backgroundColor: "#333333",
          borderRadius: "5px",
          border: "1px solid #fcfcfc",
          "& .MuiFilledInput-underline": {
            borderBottom: "0px solid black !important",
          },
          "& .MuiSelect-icon": { color: "#ff4f99" },
        }}
      >
        <Select
          displayEmpty
          value={moat}
          onChange={handleChange}
          input={<InputBase />}
          MenuProps={MenuProps}
          IconComponent={ExpandMoreIcon}
          sx={{ color: "#fff" }}
        >
          <MenuItem disabled value="" sx={{ color: "#fff" }}>
            <em>Select Data Set</em>
          </MenuItem>
          {moats.map((item, index) => {
            return (
              <MenuItem key={index} value={index} sx={{ color: "#fff" }}>
                {item.moat}
              </MenuItem>
            );
          })}
          <MenuItem
            onClick={() => setAddingMoat(true)}
            sx={{ color: "#ff4f99" }}
          >
            Create New Data Set{" "}
            <AddIcon sx={{ height: "20px", marginLeft: "auto" }} />
          </MenuItem>
        </Select>
      </FormControl>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          dispatch(setMoat(previous));
        }}
        sx={{ display: "flex" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#151515",
            margin: "auto",
            height: "auto",
            width: "40vw",
            border: "2px solid #ff4f99",
            borderRadius: "14px",
          }}
        >
          <p
            style={{
              color: "#fff",
              background:
                "linear-gradient(241.4deg, #717AFF 29.4%, #FF4F99 89.99%)",
              margin: "0px",
              borderRadius: "12px 12px 0px 0px",
              padding: "15px",
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Signing Phrase
          </p>
          <InputBase
            sx={{
              backgroundColor: "#212121",
              color: "#fff",
              borderRadius: "9px",
              pl: "10px",
              minHeight: "45px",
              margin: "80px 20px 20px 20px",
              border: "1px solid #fcfcfc",
            }}
            multiline
            onChange={(e) => setPhrase(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                signMoat();
              }
            }}
            placeholder="Signing phrase"
            value={phrase}
            inputProps={{
              autoCorrect: "off",
            }}
          />
          <Button
            type="submit"
            sx={{
              color: "#fff",
              backgroundColor: "#ff4f99 !important",
              textTransform: "none",
              margin: "40px auto",
              borderRadius: "9px",
              width: "50%",
            }}
            onClick={signMoat}
          >
            Submit
          </Button>
          <Backdrop open={loading} sx={{ display: "flex" }}>
            <CircularProgress sx={{ margin: "auto", color: "#ff4f99" }} />
          </Backdrop>
        </div>
      </Modal>
      <Snackbar
        sx={{ margin: "0px auto" }}
        open={openSignSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSignSnackbar(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setOpenSignSnackbar(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          An error occurred trying to decrypt data!
        </Alert>
      </Snackbar>
      <Modal
        open={addingMoat}
        onClose={() => {
          setAddingMoat(false);
        }}
        sx={{ display: "flex" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#151515",
            margin: "auto",
            height: "auto",
            width: "40vw",
            border: "2px solid #ff4f99",
            borderRadius: "14px",
          }}
        >
          <p
            style={{
              color: "#fff",
              background:
                "linear-gradient(241.4deg, #717AFF 29.4%, #FF4F99 89.99%)",
              margin: "0px",
              borderRadius: "12px 12px 0px 0px",
              padding: "15px",
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Create New Data Set
          </p>
          <Typography sx={{ margin: "40px 20px 0px", color: "#fff" }}>
            Data Set Name
          </Typography>
          <InputBase
            sx={{
              backgroundColor: "#212121",
              color: "#fff",
              borderRadius: "9px",
              pl: "10px",
              minHeight: "45px",
              margin: "10px 20px",
              border: "1px solid #fcfcfc",
            }}
            onChange={(e) => setNewMoatName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createMoat();
              }
            }}
            placeholder="Type here..."
            value={newMoatName}
            inputProps={{
              autoCorrect: "off",
            }}
          />
          <Typography
            sx={{ margin: "20px 20px 0px", color: "#fff", display: "flex" }}
          >
            Signing Phrase{" "}
            <span
              style={{
                display: emptyPhrase ? "flex" : "none",
                color: "#ff0000",
              }}
            >
              *
            </span>
          </Typography>
          <InputBase
            sx={{
              backgroundColor: "#212121",
              color: "#fff",
              borderRadius: "9px",
              pl: "10px",
              minHeight: "45px",
              margin: "10px 20px",
              border: "1px solid #fcfcfc",
            }}
            multiline
            onChange={(e) => setNewPhrase(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createMoat();
              }
            }}
            placeholder="Type here..."
            value={newPhrase}
            inputProps={{
              autoCorrect: "off",
            }}
          />
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#ff4f99 !important",
              textTransform: "none",
              margin: "40px auto",
              borderRadius: "9px",
              width: "50%",
            }}
            onClick={createMoat}
          >
            Create Data Set
          </Button>
          <Backdrop open={loadAddingMoat} sx={{ display: "flex" }}>
            <CircularProgress sx={{ margin: "auto", color: "#ff4f99" }} />
          </Backdrop>
        </div>
      </Modal>

      <div
        style={{
          display: privKey === "" ? "none" : "flex",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => paste("key")}
          sx={{
            color: "#fff",
            backgroundColor: "transparent !important",
            textTransform: "none",
            margin: "10px 8px 0px",
            justifyContent: "left",
            "& .MuiButton-endIcon": {
              marginLeft: "auto",
            },
          }}
          endIcon={<ContentCopyIcon />}
        >
          Private Key
        </Button>
        <Button
          onClick={() => paste("secret")}
          sx={{
            color: "#fff",
            backgroundColor: "transparent !important",
            textTransform: "none",
            margin: "0px 8px 10px",
            justifyContent: "left",
            "& .MuiButton-endIcon": {
              marginLeft: "auto",
            },
          }}
          endIcon={<ContentCopyIcon />}
        >
          Secret
        </Button>
        <Snackbar
          sx={{ margin: "0px auto" }}
          open={copyStatus === "success"}
          autoHideDuration={4000}
          onClose={() => setCopyStatus(null)}
        >
          <Alert
            variant="filled"
            onClose={() => setCopyStatus(null)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully pasted to your clipboard!
          </Alert>
        </Snackbar>
        <Snackbar
          sx={{ margin: "0px auto" }}
          open={copyStatus === "fail"}
          autoHideDuration={4000}
          onClose={() => setCopyStatus(null)}
        >
          <Alert
            variant="filled"
            onClose={() => setCopyStatus(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            An error occurred while pasting to your clipboard!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
