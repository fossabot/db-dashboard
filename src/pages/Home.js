import React, { useEffect, useState } from "react";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import LoadingButton from "@mui/lab/LoadingButton";

import Moat from "../components/Moat";
import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import Navbar from "../components/Navbar";
import NavTree from "../components/NavTree";

export default function Home() {
  const wallet = localStorage.getItem("wallet");
  const address = localStorage.getItem("address");

  const [moats, setMoats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const arConnect = React.useRef(false);

  useEffect(() => {
    if (wallet === "metamask") {
      setTimeout(async function () {
        const temp = await KwilDB.getMoats("https://test-db.kwil.xyz", address);
        console.log(temp);
        setMoats(temp);
        setLoaded(true);
      }, 0);
    } else if (wallet === "arconnect") {
      setTimeout(async function () {
        setMoats(await KwilDB.getMoats("https://test-db.kwil.xyz", address));
        setLoaded(true);
      }, 0);
    }
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(30deg, #101010, #000)",
        width: "100vw",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      <NavTree moats={moats} />
    </div>
  );
}
