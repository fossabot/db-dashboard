import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import KwilDB from "kwildb";
import ChainMap from "../ChainMap";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  Select,
  InputBase,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";

export default function CreatePool() {
  const location = useLocation();
console.log(ChainMap())
  const moat = useRef(location.state.moatName);
  const [poolName, setPoolName] = useState("");
  const [chain, setChain] = useState("polygon");
  //const chainID = React.useRef({hex:"0x89",int:137})
    const [token, setToken] = useState("USDC");
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setChain(e.target.value);
   /*chainID.current = {hex:"0x89",int:137};
    if (e.target.value === "goerli"){
        setToken("USDC");
        chainID.current = {hex:"0x5",int:5};
    }*/
  };

    const handleChangeToken = (e) => {
        setToken(e.target.value);
    };

  const createPool = (e) => {
    e.preventDefault();

      //console.log(ethers.utils.hexlify(chainID.current.hex))
      console.log(window.ethereum.networkVersion)
      //console.log(ethers.utils.hexlify(chainID.current.int))
      //console.log(chainID.current)
      const chainID = ChainMap().get(chain);
      console.log(chainID);

    setTimeout(async function () {
        if (window.ethereum.networkVersion !== chainID.int) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainID.hex },],
                });
            } catch (err) {

                /*await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Polygon Mainnet',
                            chainId: ethers.utils.hexlify(chainID.current),
                            nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                            rpcUrls: ['https://polygon-rpc.com/'],
                        },
                    ],
                });*/
                //console.log(err.message)
                if (err.message === "User rejected the request."){
                    //window.alert("user rejected the thing")
                    return;
                }
                window.alert("you do not have the specified chain added to your wallet!")
                return;

            }
        }
      setLoading(true);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const address = await signer.getAddress();

      console.log(poolName);
      console.log(address);
      console.log(chain);
      console.log(token);

      const result = await KwilDB.pools.createFundingPool(
        poolName,
        address,
        address,
        chain,
        token,
        moat.current
      );
      console.log(result);
      console.log(typeof result);
      setLoading(false);
      if (typeof result === "string") {
        setStatus("fail");
        setErrMsg(result);
      } else {
        setStatus("success");
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
          margin: "30px auto 30px auto",
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
          {/*<MenuItem value="ethereum">Ethereum</MenuItem>*/}
            <MenuItem value="polygon">Polygon</MenuItem>
          <MenuItem value="goerli">Goerli Ethereum Testnet</MenuItem>
        </Select>
      </FormControl>
        <FormControl
            required
            sx={{
                paddingTop: "8px",
                paddingLeft: "15px",
                paddingRight: "10px",
                margin: "0px auto 50px auto",
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
                value={token}
                onChange={handleChangeToken}
                input={<InputBase />}
            >
                <MenuItem disabled value="">
                    <em>Token</em>
                </MenuItem>
                {/*<MenuItem value="ethereum">Ethereum</MenuItem>*/}
                <MenuItem value="USDC">USDC</MenuItem>
                {chain === "polygon"&&<MenuItem value="KRED">KRED</MenuItem>}
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
  );
}
