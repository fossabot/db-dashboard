import React, { useState } from "react";
import { ethers } from "ethers";
import KwilDB from "kwildb";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Fade,
  IconButton,
  InputAdornment,
  InputBase,
  Popper,
  Snackbar,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";

import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import Navbar from "../components/Navbar";

export default function Create() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  //const [status, setStatus] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePopper = () => {
    setAnchorEl(null);
  };

  const [moatName, setMoatName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingPhrase, setSigningPhrase] = useState("");
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const createMoat = (e) => {
    e.preventDefault();
    //debug, DELETE
    console.log(moatName);
    setLoading(!loading);
    setTimeout(async function () {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const signature = await signer.signMessage(signingPhrase);
      const address = await signer.getAddress();
      console.log("Moat Name:");
      console.log(moatName);
      console.log(" ");
      console.log("Signature:");
      console.log(signature);
      console.log(" ");
      console.log("Address:");
      console.log(address);
      console.log(" ");
      //kwilDB2.current.addMoat('tester',address,'superencrypted','supahsecret');
      //kwilDB2.current.updateSecret('tester','newseccc')
      //console.log(await KwilDB.createMoat("http://34.138.54.12:80",moatName,signature,address));
      const result = await KwilDB.createMoat(
          "https://test-db.kwil.xyz",
        moatName,
        signature,
        address
      );
      console.log(result);

      setLoading(false);
      if (result.creation === false) {
        setStatus("fail");
        setErrMsg(result.reason);
      } else {
        setStatus("success");
      }
    }, 0);
  };

  const createMoatAR = (e) => {
    e.preventDefault();
    //debug, DELETE
    setLoading(!loading);

    setTimeout(async function () {
      if (window.arweaveWallet) {
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
          const buff = (enc.encode(signingPhrase));
          console.log(buff)

        //const buff = str2ab(signingPhrase);

        const sig = await window.arweaveWallet.signature(buff, {
          name: "RSA-PSS",
          saltLength: 0,
        });
        const signature = JSON.stringify(sig);
        console.log(signature);

        const result = await KwilDB.createMoat(
            "https://test-db.kwil.xyz",
          moatName,
          signature,
          address
        );
        setLoading(false);
        if (result.creation === false) {
          setStatus("fail");
          setErrMsg(result.reason);
        } else {
          setStatus("success");
        }
      } else {
        window.alert("Arconnect not detected");
      }
    }, 0);
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(30deg, #212121, #000)",
      }}
    >
      <Navbar />
      {/*<Backdrop
        sx={{ display: "flex", flexDirection: "column" }}
        open={loading}
      >
        <CircularProgress sx={{ color: "#FF4F99" }} />
      </Backdrop>*/}
      <h1
        style={{
          textAlign: "center",
          fontSize: 50,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20vh",
          background:
            "-webkit-linear-gradient(45deg, #FF4F99 30%, #717AFF 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Create your Moat on KwilDB
      </h1>
      <InputBase
        value={moatName}
        placeholder={"Name"}
        sx={{
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "50px auto 0px auto",
          width: "350px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "9px",
          border: "none !important",
          "& .MuiFilledInput-underline": {
            borderBottom: "0px solid black !important",
          },
        }}
        hiddenLabel={true}
        id="outlined-basic"
        variant="filled"
        label=""
        onChange={(e) => setMoatName(e.target.value)}
      />
      <InputBase
        sx={{
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "30px auto 50px auto",
          width: "350px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "9px",
          border: "none !important",
          "& .MuiFilledInput-underline": {
            borderBottom: "0px solid black !important",
          },
        }}
        hiddenLabel={true}
        id="outlined-basic"
        variant="filled"
        placeholder={"Signing phrase"}
        value={signingPhrase}
        onChange={(e) => setSigningPhrase(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              sx={{ marginRight: "2px", marginLeft: "-5px" }}
              onClick={handleClick}
              //onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <HelpOutlineIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-start"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: " rgb(33, 33, 33)",
                width: "325px",
              }}
            >
              <IconButton
                onClick={closePopper}
                sx={{ marginLeft: 0, padding: 0, width: "15px" }}
              >
                <CloseIcon style={{ fill: "white", height: "15px" }} />
              </IconButton>
              <p style={{ color: "white", marginTop: "5px", fontSize: "10px" }}>
                The Signing Phrase is a phrase or word, chosen by you, that will
                be signed to encrypt/decrypt your keys and secrets. Please make
                sure it is uncommon so as to avoid ever signing this phrase on
                accident.
              </p>
            </Box>
          </Fade>
        )}
      </Popper>
      <div
        style={{
          marginBottom: "auto",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          //justifyContent: 'space-between',
        }}
      >
        <LoadingButton
          fullWidth
          onClick={createMoatAR}
          sx={{
            textTransform: "none",
            fontSize: 16,
            border: "none",
            borderRadius: "9px",
            padding: "6px 20px",
            //width: '300px',
            color: "#000",
            boxShadow: "none !important",
            backgroundColor: "#fff !important",
            margin: "auto 10px auto auto",
            "& .MuiLoadingButton-loadingIndicator": { color: "#717AFF" },
          }}
          loading={loading}
          loadingPosition="end"
          endIcon={
            <img
              src={Arconnect}
              alt=""
              style={{ height: "24px", marginTop: "-4px" }}
            />
          }
        >
          Create Moat
        </LoadingButton>
        <p style={{ color: "#fff", margin: "auto 0px" }}>or</p>
        <LoadingButton
          onClick={createMoat}
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: 16,
            border: "none",
            borderRadius: "9px",
            padding: "6px 20px",
            //width: '300px',
            color: "#000",
            boxShadow: "none !important",
            backgroundColor: "#fff !important",
            margin: "auto auto auto 10px",
            "& .MuiLoadingButton-loadingIndicator": { color: "#717AFF" },
          }}
          loading={loading}
          loadingPosition="end"
          endIcon={<Metamask style={{ height: "24px" }} />}
        >
          Create Moat
        </LoadingButton>
      </div>
      <Snackbar
        sx={{ margin: "0px auto" }}
        open={status === "success"}
        autoHideDuration={4000}
        onClose={() => setStatus(null)}
      >
        <Alert
          variant="filled"
          onClose={() => setStatus(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Moat created successfully. Go to the Database Manager or start
          querying!
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{ margin: "0px auto" }}
        open={status === "fail"}
        autoHideDuration={6000}
        onClose={() => setStatus(null)}
      >
        <Alert
          variant="filled"
          onClose={() => setStatus(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Moat creation failed. Reason: {errMsg};
        </Alert>
      </Snackbar>
    </div>
  );
}
