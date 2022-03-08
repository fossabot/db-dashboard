import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import Kwil from "../assets/logos/kwil.svg";
import grad1 from "../assets/gradients/grad1.svg";
import Navbar from "../components/Navbar";

import tri from "../assets/shapes/tri.svg";
import loop from "../assets/shapes/loop.svg";
import bulb from "../assets/shapes/bulb.svg";
import star from "../assets/shapes/star.svg";
import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import KwilDB from "../assets/logos/KwilDB.svg";
import { ethers } from "ethers";

export default function SignIn() {
  const navigate = useNavigate();

  const [meta, setMeta] = useState(false);
  const [arconn, setArconn] = useState(false);
  const [unselected, setUnselected] = useState(false);

  const select = (type) => {
    if (type === "meta") {
      setArconn(false);
      setUnselected(false);
      setMeta(true);
    } else {
      setMeta(false);
      setUnselected(false);
      setArconn(true);
    }
  };

  const signIn = async () => {
    if (meta) {
      localStorage.setItem("wallet", "metamask");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      localStorage.setItem("address", address);
      navigate("/home");
    } else if (arconn) {
      localStorage.setItem("wallet", "arconnect");
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
        localStorage.setItem("address", address);
        navigate("/home");
      } else {
        window.alert("arconnect not detected");
      }
    } else {
      setUnselected(true);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(210deg, #212121, #000)",
        overflow: "hidden",
      }}
    >
      <img src={tri} alt="bg-shape" style={{ position: "absolute" }} />
      <img
        src={loop}
        alt="bg-shape"
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      <img
        src={star}
        alt="bg-shape"
        style={{ position: "absolute", bottom: 0, right: 0 }}
      />
      <img
        src={bulb}
        alt="bg-shape"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      />
      <img
        src={KwilDB}
        alt="kwil-db-logo"
        width="300px"
        style={{ margin: "15vh auto auto auto" }}
      />
      <p style={{ margin: "auto", fontSize: "28px", color: "#fff" }}>
        Select a Wallet
      </p>
      <div style={{ margin: "auto", display: "flex" }}>
        <Button
          onClick={() => select("meta")}
          sx={{
            backgroundColor: "#fff !important",
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            display: "flex",
            marginRight: "20px",
            boxShadow: meta ? "3px 3px 6px #438ea0" : "none",
          }}
        >
          <Metamask style={{ height: "52px", margin: "auto" }} />
        </Button>
        <Button
          onClick={() => select("arconn")}
          sx={{
            backgroundColor: "#fff !important",
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            display: "flex",
            marginLeft: "20px",
            boxShadow: arconn ? "3px 3px 6px #438ea0" : "none",
          }}
        >
          <img
            src={Arconnect}
            alt=""
            style={{ height: "50px", margin: "auto" }}
          />
        </Button>
      </div>
      <p
        style={{
          margin: "0 auto",
          color: "#ff0000",
          display: unselected ? "flex" : "none",
        }}
      >
        Please select your preferred wallet.
      </p>
      <p style={{ margin: "auto", color: "#fff" }}>then</p>
      <Button
        onClick={signIn}
        sx={{
          textTransform: "none",
          background: "linear-gradient(30deg, #FF4F99 30%, #717AFF 90%)",
          color: "#fff",
          width: "200px",
          borderRadius: "12px",
          fontSize: "18px",
          margin: "auto auto 30vh auto",
        }}
      >
        Sign In
      </Button>
    </div>
  );
}
