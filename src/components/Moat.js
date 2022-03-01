import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import { Button, Popover, InputBase, Snackbar, Alert } from "@mui/material";

export default function Moat({ moatName, privateKey, owner, secret,arweave }) {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [copying, setCopying] = useState(false);
  const [toCopy, setToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState(null);
    const [openSignSnackbar, setOpenSignSnackbar] = useState(false);

    function str2ab(str) {
        let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        let bufView = new Uint16Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCopy = (e, value) => {
    setAnchorEl(e.currentTarget);
    setCopying(true);
    setToCopy(value);
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
      if (toCopy === "key") {
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

      handleClose();
    }, 0);
  };

    const pasteCopyAR = (e) => {
        e.preventDefault();
        setTimeout(async function () {
            console.log(phrase);
            const address = await window.arweaveWallet.getActiveAddress();
            console.log(address);

            const enc = new TextEncoder(); // always utf-8
            const buff = (enc.encode(phrase));
            console.log(buff)
            const sig = await window.arweaveWallet.signature(buff, {
                name: "RSA-PSS",
                saltLength: 0,
            });
            const signature = JSON.stringify(sig);
            console.log(signature);

            const privKeyResult = JSON.parse(
                await KwilDB.decryptKey(signature, address, privateKey)
            );
            const secretResult = await KwilDB.decryptKey(signature, address, secret);
            console.log(privKeyResult);
            console.log(secretResult);
            if (toCopy === "key") {
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
        let privKeyResult;
        let secretResult;
        try {
            privKeyResult = JSON.parse(
                await KwilDB.decryptKey(signature, address, privateKey)
            );
            console.log(privKeyResult);
            secretResult = await KwilDB.decryptKey(signature, address, secret);
        }catch(e){
            setOpenSignSnackbar(true);
            handleClose();
            return;
        }
      console.log(privKeyResult);
      console.log(secretResult);
      handleClose();
      navigate("/" + moatName, {
        state: {
          privKey: privKeyResult,
          owner: owner,
          secret: secretResult,
          expanded: true,
        },
      });
    }, 0);
  };

    const navigateToMoatAR = (e) => {
        e.preventDefault();
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
                const buff = (enc.encode(phrase));
                console.log(buff)
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
                        await KwilDB.decryptKey(signature, address, privateKey)
                    );
                    console.log(privKeyResult);
                    secretResult = await KwilDB.decryptKey(signature, address, secret);
                }catch(e){
                    setOpenSignSnackbar(true);
                    handleClose();
                    return;
                }

                handleClose();
                navigate("/" + moatName, {
                    state: {
                        privKey: privKeyResult,
                        owner: owner,
                        secret: secretResult,
                        expanded: true,
                    },
                });
            } else {
                window.alert("Arconnect not detected");
            }
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
            onClick={handleClick}
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#438ea0 !important",
              borderRadius: "9px",
              margin: "0px  auto 10px 20px",
            }}
          >
            Open Data Moat
          </Button>
          <Button
            onClick={(e) => handleCopy(e, "key")}
            sx={{
              textTransform: "none",
              color: "#000",
              backgroundColor: "#fff !important",
              borderRadius: "9px",
              margin: "0px  auto 10px 20px",
            }}
          >
            Copy Private Key
          </Button>
          <Button
            onClick={(e) => handleCopy(e, "secret")}
            sx={{
              textTransform: "none",
              color: "#000",
              backgroundColor: "#fff !important",
              borderRadius: "9px",
              margin: "0px  auto 10px 20px",
            }}
          >
            Copy Secret
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
            onClick={copying ?arweave?pasteCopyAR: pasteCopy : arweave ? navigateToMoatAR : navigateToMoat}
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
                An error occured trying to decrypt moat data
            </Alert>
        </Snackbar>
    </>
  );
}
