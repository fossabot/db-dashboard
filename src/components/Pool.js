import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import {
  Button,
  Popover,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Moat({ poolName, creator, validator, balance }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [amount, setAmount] = useState(0);

  const [adding, setAdding] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const addFunds = () => {
    if (amount > 0.000001) {
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
          "USDC",
          amount * 1000000
        );
        setAdding(false);
        if (result.blockHash === null) {
          window.alert("Funds failed to transfer");
        } else {
          window.alert("Funds added successfully!");
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
            Balance: {balance} USDC
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
                error={amount < 0.000001}
                helperText={
                  amount < 0.000001
                    ? "Enter an amount greater than 0.000001 USDC"
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
      </div>
    </>
  );
}
