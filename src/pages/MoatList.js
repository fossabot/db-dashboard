import React, { useState } from "react";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import LoadingButton from "@mui/lab/LoadingButton";

import Moat from "../components/Moat";
import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import Navbar from "../components/Navbar";

export default function MoatList() {
  const [moats, setMoats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingAr, setLoadingAr] = useState(false);
  const [loadingMeta, setLoadingMeta] = useState(false);

  const getMoatsMeta = (e) => {
    setLoadingMeta(true);
    e.preventDefault();
    //debug, DELETE
    setTimeout(async function () {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setMoats(await KwilDB.getMoats("http://34.138.54.12:80", address));
      setLoaded(true);
      setLoadingMeta(false);
      //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
      //console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));
    }, 0);
  };

  const getMoatsAR = (e) => {
    setLoadingAr(true);
    e.preventDefault();
    //debug, DELETE
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

        setMoats(await KwilDB.getMoats("http://34.138.54.12:80", address));
        setLoaded(true);
        setLoadingAr(false);
      } else {
        window.alert("arconnect not detected");
        setLoadingAr(false);
      }
    }, 0);
  };

  return (
    <div
      style={{
        background: "linear-gradient(30deg, #101010, #000)",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar page="moats" />
        <h1 style={{ margin: "20px auto 10px auto", color: "#fff" }}>
          Database Manager
        </h1>
        <h3 style={{ margin: "0px auto 20px auto", color: "#808080" }}>
          Moats
        </h3>
        {/*<CircularProgress sx={{display: loading ? 'flex' : 'none'}}/>*/}
        <div style={{ display: loaded ? "none" : "flex" }}>
          <LoadingButton
            loading={loadingAr}
            loadingPosition="end"
            onClick={getMoatsAR}
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
            endIcon={
              <img
                src={Arconnect}
                alt=""
                style={{ height: "24px", marginTop: "-4px" }}
              />
            }
          >
            Load
          </LoadingButton>
          <LoadingButton
            loading={loadingMeta}
            loadingPosition="end"
            onClick={getMoatsMeta}
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
            endIcon={<Metamask style={{ height: "24px" }} />}
          >
            Load
          </LoadingButton>
        </div>
      </div>

      <div
        id="table"
        style={{
          maxWidth: "90vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: loaded ? "flex" : "none",
          flexDirection: "column",
          backgroundColor: "#212121",
          borderRadius: "12px",
        }}
      >
        <p
          style={{
            backgroundColor: "#151515",
            borderRadius: "12px 12px 0px 0px",
            color: "#fff",
            padding: "20px 0px 20px 20px",
            borderBottom: "1px solid #fff",
            margin: "0px",
          }}
        >
          Moats
        </p>
        {moats.map((moat, index) => (
          <div
            style={{
              borderBottom:
                index + 1 < moats.length ? "1px solid #808080" : "none",
            }}
          >
            <Moat
              key={index}
              owner={moat.owner}
              secret={moat.secret}
              privateKey={moat.api_key}
              moatName={moat.moat}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
