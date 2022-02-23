import React, { useState } from "react";
import { ethers } from "ethers";
import KwilDB from "kwildb";

import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, Select, InputBase, MenuItem } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";

import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import Navbar from "../components/Navbar";

export default function Create() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePopper = () => {
    setAnchorEl(null);
  };

  const [poolName, setPoolName] = useState("");
  const [chain, setChain] = useState("");
  const blockchains = ["Ethereum", "Matic", "Goerli"];

  const handleChange = (e) => {
    setChain(e.target.value);
  };

  const [loading, setLoading] = useState(false);

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
        Create your Funding Pool
      </h1>
      <InputBase
        value={poolName}
        placeholder={"Funding Pool Name"}
        sx={{
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "50px auto 0px auto",
          width: "350px",
          height: "48px",
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
        onChange={(e) => setPoolName(e.target.value)}
      />
      <FormControl
        required
        sx={{
          paddingTop: "8px",
          paddingLeft: "15px",
          paddingRight: "10px",
          margin: "30px auto 50px auto",
          width: "325px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "9px",
          border: "none !important",
          "& .MuiFilledInput-underline": {
            borderBottom: "0px solid black !important",
          },
        }}
      >
        <Select
          displayEmpty
          value={chain}
          onChange={handleChange}
          input={<InputBase />}
        >
          <MenuItem disabled value="">
            <em>Blockchain</em>
          </MenuItem>
          <MenuItem value="eth">Ethereum</MenuItem>
          <MenuItem value="matic">Matic</MenuItem>
          <MenuItem value="goerli">Goerli</MenuItem>
        </Select>
      </FormControl>
      <div
        style={{
          marginBottom: "auto",
          width: "350px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          //justifyContent: 'space-between',
        }}
      >
        <LoadingButton
          //onClick={createMoat}
          //fullWidth
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
            margin: "auto 0px auto auto",
            "& .MuiLoadingButton-loadingIndicator": { color: "#717AFF" },
          }}
          loading={loading}
        >
          Create Pool
        </LoadingButton>
      </div>
    </div>
  );
}
