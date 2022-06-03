import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Snackbar } from "@mui/material";

import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import KwilDB from "../assets/logos/KwilDB.svg";
import { ethers } from "ethers";
import { logout } from "../actions";
import { useDispatch } from "react-redux";
import Helmet from "react-helmet";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(logout());
  }, []);

  const signIn = async (type) => {
    sessionStorage.clear();
    if (type === "meta") {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          localStorage.setItem("wallet", "metamask");
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          localStorage.setItem("address", address);
          navigate("/home");
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
          } else {
            setError(error.message);
          }
        }
      } else {
        setError(
          "MetaMask not detected. Please install MetaMask on your browser."
        );
      }
    } else if (type === "arconn") {
      localStorage.setItem("wallet", "arconnect");
      if (window.arweaveWallet) {
        try {
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
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError(
          "Arconnect not detected. Please install Arconnect on your browser."
        );
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at -10% 30%, rgba(255,79,153,.6) 0%, rgba(113,122,255,0.5) 30%, rgba(0,0,0,1) 60%), " +
          "radial-gradient(ellipse at 10% 80%, rgba(0,255,255,1) 0%, rgba(0,0,0,1) 30%)",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <Helmet>
        <title>Sign In | KwilDB</title>
        <meta
          name="description"
          content="KwilDB is the first decentralized SQL database, enabling complex, highly-scalable, decentralized applications."
        />
      </Helmet>
      <>
        <svg
          style={{
            position: "absolute",
            left: "40vw",
            top: "0",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="2" />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: "70vw",
            top: "40vh",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="4" />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: "10vw",
            top: "70vh",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="4" />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: "30vw",
            top: "20vh",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="3" />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: "60vw",
            top: "75vh",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#808080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="3" />
        </svg>
        <svg
          style={{
            position: "absolute",
            left: "20vw",
            top: "13vh",
            width: "100px",
            height: "100px",
          }}
          viewBox="0 0 100 100"
          fill="#808080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50%" cy="50%" r="4" />
        </svg>
      </>

      <img
        src={KwilDB}
        alt="kwil-db-logo"
        width="300px"
        style={{ margin: "15vh auto 40px auto" }}
      />
      <p style={{ margin: "20px auto", fontSize: "28px", color: "#fff" }}>
        Connect your wallet
      </p>
      <div style={{ margin: "40px auto", display: "flex" }}>
        <Button
          onClick={() => signIn("meta")}
          sx={{
            backgroundColor: "#fff !important",
            height: "64px",
            borderRadius: "12px",
            display: "flex",
            boxShadow: "none",
            color: "#000",
            textTransform: "none",
            padding: "0 16px",
            fontSize: "20px",
          }}
        >
          MetaMask
          <Metamask style={{ height: "52px", margin: "auto 0 auto 5px" }} />
        </Button>
        {/*<Button
          onClick={() => signIn("meta")}
          sx={{
            backgroundColor: "#fff !important",
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            display: "flex",
            marginRight: "20px",
            boxShadow: "none",
          }}
        >
          <Metamask style={{ height: "52px", margin: "auto" }} />
        </Button>
        <Button
          onClick={() => signIn("arconn")}
          sx={{
            backgroundColor: "#fff !important",
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            display: "flex",
            marginLeft: "20px",
            boxShadow: "none",
          }}
        >
          <img
            src={Arconnect}
            alt=""
            style={{ height: "50px", margin: "auto" }}
          />
        </Button>*/}
      </div>

      <div style={{ display: "flex", margin: "auto 10px 10px auto" }}>
        <a style={{ color: "#808080", marginRight: "20px" }} href="/privacy">
          Privacy Policy
        </a>
        <a style={{ color: "#808080" }} href="/terms">
          Terms & Conditions
        </a>
      </div>

      <Snackbar
        sx={{ margin: "0px auto" }}
        open={error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          variant="filled"
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
