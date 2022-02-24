import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import { Button, Popover, InputBase, Snackbar, Alert } from "@mui/material";

export default function Moat({ moatName, privateKey, owner, secret }) {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [copying, setCopying] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCopy = (e) => {
    setAnchorEl(e.currentTarget);
    setCopying(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCopying(false);
  };
  const open = Boolean(anchorEl);

  const pasteCopy = (e) => {
    e.preventDefault();
    setTimeout(async function () {
      console.log(phrase);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const signature = await signer.signMessage(phrase);
      const address = await signer.getAddress();
      const privKeyResult = JSON.parse(
        await KwilDB.decryptKey(signature, address, privateKey)
      );
      const secretResult = await KwilDB.decryptKey(signature, address, secret);
      console.log(privKeyResult);
      console.log(secretResult);
      navigator.clipboard
        .writeText(
          "Secret: " +
            secretResult +
            "\r\n\r\nPrivate key: " +
            JSON.stringify(privKeyResult)
        )
        .then(
          () => {
            setCopyStatus("success");
          },
          () => {
            setCopyStatus("fail");
          }
        );
      handleClose();
    }, 0);
  };

  const navigateToMoat = (e) => {
    e.preventDefault();
    setTimeout(async function () {
      console.log(phrase);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const signature = await signer.signMessage(phrase);
      const address = await signer.getAddress();
      const privKeyResult = JSON.parse(
        await KwilDB.decryptKey(signature, address, privateKey)
      );
      const secretResult = await KwilDB.decryptKey(signature, address, secret);
      console.log(privKeyResult);
      console.log(secretResult);
      handleClose();
      navigate("/schemas", {
        state: {
          moatName: moatName,
          privKey: privKeyResult,
          owner: owner,
          secret: secretResult,
        },
      });
    }, 0);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "calc(90vw - 15px)",
          minWidth: "calc(90vw - 15px)",
          overflow: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          onClick={handleClick}
          style={{ marginLeft: "20px", cursor: "pointer" }}
        >
          <p style={{ color: "#fff" }}>Name: {moatName}</p>
          <p style={{ color: "#fff" }}>Encrypted Private Key: {privateKey}</p>
          <p style={{ color: "#fff" }}>Owner Address: {owner}</p>
          <p style={{ color: "#fff" }}>Encrypted Secret: {secret}</p>
        </div>
        <div>
          <Button
            onClick={handleCopy}
            sx={{
              textTransform: "none",
              color: "#000",
              backgroundColor: "#fff !important",
              borderRadius: "9px",
              margin: "0px  auto 10px 20px",
            }}
          >
            Copy Credentials
          </Button>
          <Button
            onClick={() =>
              navigate("/pools", {
                state: {
                  moatName: moatName,
                },
              })
            }
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#438ea0 !important",
              borderRadius: "9px",
              margin: "0px  auto 10px 20px",
            }}
          >
            View Funding Pools
          </Button>
        </div>
      </div>
      <Popover
        sx={{
          borderRadius: "9px",
          "& .MuiPopover-paper": {
            backgroundColor: "#151515",
          },
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{ display: "flex", backgroundColor: "#151515", margin: "4px" }}
        >
          <InputBase
            sx={{
              flex: 1,
              backgroundColor: "#212121",
              color: "#fff",
              borderRadius: "9px",
              pl: "10px",
              minHeight: "45px",
            }}
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
              textTransform: "none",
              margin: "0px 10px",
              borderRadius: "9px",
            }}
            onClick={copying ? pasteCopy : navigateToMoat}
          >
            Submit
          </Button>
        </div>
      </Popover>
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
          Private key and secret pasted to your clipboard!
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
    </>
  );
}
