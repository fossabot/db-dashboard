import React, { useEffect, useState, useRef } from "react";
import KwilDB from "kwildb";

import NavTree from "../components/nav/NavTree";

import FundingView from "../components/FundingView";
import TableView from "../components/TableView";
import Console from "../components/Console";
import { useSelector } from "react-redux";

export default function Home() {
  const wallet = localStorage.getItem("wallet");
  const address = localStorage.getItem("address");

  const [moats, setMoats] = useState([]);

  const schemaName = useSelector((state) => state.data.schema);
  const tableName = useSelector((state) => state.data.table);
  const initialTable = useRef(tableName);
  const initialSchema = useRef(schemaName);

  const selectedPools = useSelector((state) => state.data.pools);
  const initialPools = useRef(selectedPools);

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
        overflow: "hidden",
        display: "flex",
      }}
    >
      <NavTree
        initialSchema={initialSchema}
        initialTable={initialTable}
        initialPools={initialPools}
        moats={moats}
        setMoats={setMoats}
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
          marginLeft: "240px",
        }}
      >
        <div style={{ display: tableName ? "flex" : "none" }}>
          <TableView schemaName={schemaName} tableName={tableName} />
        </div>

        <div style={{ display: selectedPools.length > 0 ? "flex" : "none" }}>
          <FundingView selectedPools={selectedPools} update={update} />
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
