import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import KwilDB from "kwildb";

import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, Select, InputBase, MenuItem } from "@mui/material";

import Navbar from "../components/Navbar";

export default function CreatePool() {
  const location = useLocation();

  const moat = useRef(location.state.moatName);
  const [poolName, setPoolName] = useState("");
  const [chain, setChain] = useState("");

  const handleChange = (e) => {
    setChain(e.target.value);
  };

  const createPool = (e) => {
    e.preventDefault();

    setTimeout(async function () {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const address = await signer.getAddress();

      console.log(poolName);
      console.log(address);
      console.log(chain);

      const result = await KwilDB.pools.createFundingPool(
        poolName,
        address,
        chain,
        "USDC"
      );
      setLoading(false);
      if (result.blockHash === null) {
        window.alert("Pool creation failed");
      } else {
        window.alert(
          "Pool creation was Successful! Go to the Database Manager to add funds!"
        );
      }
    }, 0);
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
        Create a Funding Pool for {moat.current}
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
          <MenuItem value="ethereum">Ethereum</MenuItem>
          <MenuItem value="polygon">Polygon</MenuItem>
          <MenuItem value="goerli">Goerli Ethereum Testnet</MenuItem>
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
          onClick={createPool}
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
