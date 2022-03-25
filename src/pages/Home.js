import React, { useEffect, useState } from "react";
import KwilDB from "kwildb";

import NavTree from "../components/nav/NavTree";

import FundingView from "../components/FundingView";
import TableView from "../components/TableView";
import Console from "../components/Console";

export default function Home() {
  const wallet = localStorage.getItem("wallet");
  const address = localStorage.getItem("address");

  const [moats, setMoats] = useState([]);

  const [moatName, setMoatName] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [tableName, setTableName] = useState("");

  const [selectedPools, setSelectedPools] = useState([]);

  const [privKeyResult, setPrivKeyResult] = useState("");
  const [secretResult, setSecretResult] = useState("");

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    setTimeout(async function () {
      const temp = await KwilDB.getMoats("https://test-db.kwil.xyz", address);
      console.log(temp);
      setMoats(temp);
    }, 0);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(30deg, #101010, #000)",
        minWidth: "100vw",
        width: "100vw",
        minHeight: "100vh",
        // maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <NavTree
        moats={moats}
        setMoats={setMoats}
        moatName={moatName}
        setMoatName={setMoatName}
        schemaName={schemaName}
        setSchemaName={setSchemaName}
        tableName={tableName}
        setTableName={setTableName}
        privKeyResult={privKeyResult}
        setPrivKeyResult={setPrivKeyResult}
        secretResult={secretResult}
        setSecretResult={setSecretResult}
        selectedPools={selectedPools}
        setSelectedPools={setSelectedPools}
        update={update}
        setUpdate={setUpdate}
      />

      <div
        id="home-right"
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "100vw",
          width: "calc(100vw - 240px)",
          minHeight: "100vh",
          //maxHeight: selectedPools.length > 0 ? "auto" : "100vh",
          //overflow: "hidden",
          marginLeft: "240px",
        }}
      >
        <div style={{ display: tableName ? "flex" : "none" }}>
          <TableView
            moatName={moatName}
            schemaName={schemaName}
            tableName={tableName}
            privKeyResult={privKeyResult}
            secretResult={secretResult}
          />
        </div>

        <div style={{ display: selectedPools.length > 0 ? "flex" : "none" }}>
          <FundingView
            moatName={moatName}
            privKeyResult={privKeyResult}
            secretResult={secretResult}
            selectedPools={selectedPools}
            update={update}
          />
        </div>

        {/*<Console
          moatName={moatName}
          privKeyResult={privKeyResult}
          secretResult={secretResult}
        />*/}
      </div>
    </div>
  );
}
