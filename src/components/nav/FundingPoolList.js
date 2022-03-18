import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import ChainMap from "../../ChainMap";
import { providers } from "ethers";
import KwilDB from "kwildbtester";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FundingPoolList({
  moatName,
  privKeyResult,
  selectedPools,
  setSelectedPools,
  setTableName,
}) {
  const [pools, setPools] = useState([]);

  const [loading, setLoading] = useState(false);
  const [addingPool, setAddingPool] = useState(false);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const [poolName, setPoolName] = useState("");
  const [chain, setChain] = useState("polygon");
  const [token, setToken] = useState("USDC");

  const [loadAddingPool, setLoadAddingPool] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(async function () {
      console.log("set timeout");
      const result = await KwilDB.getPoolsByMoat(
        "https://registry.kwil.xyz",
        moatName
      );
      console.log(result);
      setPools(result);
      setLoading(false);
    }, 0);
  }, [privKeyResult]);

  const handleChangeChain = (e) => {
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
    console.log(window.ethereum.networkVersion);
    const chainID = ChainMap().get(chain);
    console.log(chainID);
    setTimeout(async function () {
      if (window.ethereum.networkVersion !== chainID.int) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainID.hex }],
          });
        } catch (err) {
          if (err.message === "User rejected the request.") {
            //window.alert("user rejected the thing")
            return;
          }
          window.alert(
            "you do not have the specified chain added to your wallet!"
          );
          return;
        }
      }
      setLoadAddingPool(true);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new providers.Web3Provider(window.ethereum);
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
        moatName
      );
      console.log(result);
      console.log(typeof result);
      setLoadAddingPool(false);
      setPools((old) => [
        ...old,
        {
          pool_name: poolName,
          validator: address,
          blockchain: chain,
          token: token,
        },
      ]);
      setAddingPool(false);
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
        display: loading || privKeyResult === "" ? "none" : "flex",
        flexDirection: "column",
      }}
    >
      {/*<Typography sx={{ color: "#fff", marginLeft: "8px", fontWeight: "bold" }}>
        Funding Pools
      </Typography>*/}
      <Accordion
        disableGutters
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          sx={{
            "& .MuiAccordionSummary-content": { margin: 0 },
            "&.MuiAccordionSummary-root": {
              maxHeight: "38px",
              minHeight: "38px",
              padding: "0 16px",
            },
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#ff4f99" }} />}
        >
          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Funding Pools
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            "&.MuiAccordionDetails-root": {
              padding: "0px 16px 8px 16px",
            },
          }}
        >
          {pools.map((pool, index) => {
            return (
              <Button
                key={index}
                startIcon={
                  selectedPools.includes(pool) ? (
                    <RadioButtonCheckedIcon sx={{ color: "#ff4f99" }} />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )
                }
                sx={{
                  color: "#fff",
                  backgroundColor: "transparent !important",
                  textTransform: "none",
                  maxHeight: "32px",
                  minHeight: "32px",
                  justifyContent: "left",
                }}
                onClick={() => {
                  setTableName("");
                  if (selectedPools.includes(pool)) {
                    setSelectedPools(
                      selectedPools.filter(
                        (item) => item.pool_name !== pool.pool_name
                      )
                    );
                  } else {
                    setSelectedPools((old) => [...old, pool]);
                  }
                }}
              >
                {pool.pool_name}
              </Button>
            );
          })}
          <Button
            onClick={() => setAddingPool(true)}
            sx={{
              display: loading ? "none" : "flex",
              color: "#ff4f99",
              textTransform: "none",
              justifyContent: "left",
              fontWeight: "bold",
              backgroundColor: "transparent !important",
            }}
            endIcon={<AddIcon />}
          >
            Create Pool
          </Button>
        </AccordionDetails>
      </Accordion>

      <Modal
        open={addingPool}
        onClose={() => {
          setAddingPool(false);
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
            Create New Funding Pool
          </p>
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
              onChange={handleChangeChain}
              input={<InputBase />}
            >
              <MenuItem disabled value="">
                <em>Blockchain</em>
              </MenuItem>
              {/*<MenuItem value="ethereum">Ethereum</MenuItem>*/}
              <MenuItem value="polygon">Polygon</MenuItem>
              {/*<MenuItem value="goerli">
                        Goerli Ethereum Testnet
                      </MenuItem>*/}
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
              {chain === "polygon" && <MenuItem value="KRED">KRED</MenuItem>}
            </Select>
          </FormControl>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#ff4f99 !important",
              textTransform: "none",
              margin: "40px auto",
              borderRadius: "9px",
              width: "50%",
            }}
            onClick={createPool}
          >
            Create Funding Pool
          </Button>
          <Backdrop open={loadAddingPool} sx={{ display: "flex" }}>
            <CircularProgress sx={{ margin: "auto", color: "#ff4f99" }} />
          </Backdrop>
        </div>
      </Modal>
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
