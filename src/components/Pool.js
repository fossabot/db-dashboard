import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import {
  Button,
  Popover,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// import KwilLoader from "../assets/kwil_loader.svg";
// import LoadAnim from "../assets/Kwil_feather_icon_animation_loop.svg";

export default function Moat({ poolName, creator, validator, balance,token }) {
    const multiplier = useRef(token === "USDC"?1000000:1000000000000000000)
    const decimalCheck = useRef(token === "USDC"?.000001:.000000000000000001)
  const [anchorEl, setAnchorEl] = useState(null);
  const [amount, setAmount] = useState(0);

  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const addFunds = () => {
    if (amount > decimalCheck.current) {
      setAdding(true);
      setTimeout(async function () {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const address = await signer.getAddress();

        console.log(poolName);
        console.log(address);
        console.log(amount);

        const result = await KwilDB.pools.fundPool(
          poolName,
          address,
          "goerli",
          "token",
          amount * multiplier.current
        );
        console.log(result);
        setAdding(false);
        if (typeof result === "string") {
          setStatus("fail");
          setErrMsg(result);
          window.location.reload();
        } else {
          setStatus("success");
          window.location.reload();
        }
      }, 0);
    }
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
          padding: "5px 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Backdrop
          sx={{ display: "flex", flexDirection: "column" }}
          open={adding}
        >
          <CircularProgress sx={{ color: "#FF4F99" }} />
          <p style={{ margin: "20px auto", color: "#fff" }}>
            Please wait, this may take several minutes...
          </p>
        </Backdrop>
        <p style={{ color: "#fff" }}>Name: {poolName}</p>
        <p style={{ color: "#fff" }}>Creator: {creator}</p>
        <p style={{ color: "#fff" }}>Validator: {validator}</p>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <p style={{ color: "#fff", margin: "auto 0px" }}>
            Balance: {balance / multiplier.current} {token}
          </p>
          <Button
            onClick={handleClick}
            sx={{
              textTransform: "none",
              color: "#000",
              backgroundColor: "#fff !important",
              borderRadius: "9px",
              margin: "0px auto 0px 40px",
              minHeight: "40px",
              maxHeight: "40px",
            }}
            startIcon={<AddIcon />}
          >
            Add Funds
          </Button>
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
              style={{
                display: "flex",
                backgroundColor: "#151515",
                margin: "4px",
              }}
            >
              <TextField
                sx={{
                  flex: 1,
                  backgroundColor: "#212121",
                  color: "#fff",
                  borderRadius: "9px",
                  // pl: "10px",
                  minHeight: "45px",
                  border: "none !important",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                    borderRadius: "9px",
                  },
                  "& .MuiInputBase-root": {
                    borderRadius: "9px",
                    color: "#fff",
                  },
                }}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                value={amount === 0 ? "" : amount}
                inputProps={{
                  autoCorrect: "off",
                }}
                error={amount < decimalCheck.current}
                helperText={
                  amount < decimalCheck.current
                    ? `Enter an amount greater than ${decimalCheck.current} USDC`
                    : ""
                }
              />

              <Button
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  margin: "0px 10px",
                  borderRadius: "9px",
                }}
                onClick={addFunds}
              >
                Submit
              </Button>
            </div>
          </Popover>
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
            Funding Pool created successfully. Go to the Database Manager to add
            funds!
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
            Funding Pool creation failed. Reason: {errMsg};
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
