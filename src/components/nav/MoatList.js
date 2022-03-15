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

export default function MoatList({
  moats,
  setMoats,
  setMoatName,
  privKeyResult,
  setPrivKeyResult,
  secretResult,
  setSecretResult,
  setTableName,
  setSelectedPools,
}) {
  const [open, setOpen] = useState(false);
  const [moat, setMoat] = useState("");
  const [previous, setPrevious] = useState({});

  const [phrase, setPhrase] = useState("");
  const [owner, setOwner] = useState("");
  const [apiKey, setAPIKey] = useState("");
  const [secret, setSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [openSignSnackbar, setOpenSignSnackbar] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  const [loadAddingMoat, setLoadAddingMoat] = useState(false);

  const [addingMoat, setAddingMoat] = useState(false);
  const [newMoatName, setNewMoatName] = useState("");
  const [newPhrase, setNewPhrase] = useState("");

  const handleChange = (e) => {
    if (e.target.value !== undefined) {
      setOpen(true);
      setPrevious(moat);
      setMoat(e.target.value);
      setMoatName(moats[e.target.value].moat);
      setOwner(moats[e.target.value].owner);
      setSecret(moats[e.target.value].secret);
      setAPIKey(moats[e.target.value].api_key);
      setTableName("");
      setSelectedPools([]);
    }
  };

  const signMoat = () => {
    setLoading(true);
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
        secretResult = await KwilDB.decryptKey(signature, address, secret);
        setPrivKeyResult(privKeyResult);
        setSecretResult(secretResult);
        setLoading(false);
        setOpen(false);
      } catch (e) {
        setOpenSignSnackbar(true);
        setMoat(previous);
        setLoading(false);
        setOpen(false);
        return;
      }
    }, 0);
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
      navigator.clipboard.writeText(JSON.stringify(privKeyResult)).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    } else {
      navigator.clipboard.writeText(secretResult).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    }
  };

  const createMoat = (e) => {
    e.preventDefault();
    //debug, DELETE
    setLoadAddingMoat(true);
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
        const temp = await KwilDB.getMoats("https://test-db.kwil.xyz", address);
        console.log(temp);
        setMoats(temp);
        setMoat(temp.length - 1);
        setMoatName(newMoatName);
        setLoadAddingMoat(false);
        setAddingMoat(false);
        setPrivKeyResult(result.privateKey);
        setSecretResult(result.secret);
      }
    }, 0);
  };

  return (
    <>
      <FormControl
        sx={{
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "0px 8px 0px 8px",
          width: "200px",
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
          <MenuItem disabled value="" sx={{ color: "#fff", width: "200px" }}>
            <em>Select Moat</em>
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
            Create New Moat{" "}
            <AddIcon sx={{ height: "20px", marginLeft: "auto" }} />
          </MenuItem>
        </Select>
      </FormControl>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setMoat(previous);
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
            placeholder="Signing phrase"
            value={phrase}
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
          An error occurred trying to decrypt moat data!
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
            Create New Moat
          </p>
          <Typography sx={{ margin: "40px 20px 0px", color: "#fff" }}>
            Moat Name
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
            placeholder="Type here..."
            value={newMoatName}
            inputProps={{
              autoCorrect: "off",
            }}
          />
          <Typography sx={{ margin: "20px 20px 0px", color: "#fff" }}>
            Signing Phrase
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
            Create Data Moat
          </Button>
          <Backdrop open={loadAddingMoat} sx={{ display: "flex" }}>
            <CircularProgress sx={{ margin: "auto", color: "#ff4f99" }} />
          </Backdrop>
        </div>
      </Modal>

      <div
        style={{
          display: privKeyResult === "" ? "none" : "flex",
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