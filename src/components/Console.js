import React, { useState } from "react";
import { Button, InputBase } from "@mui/material";
import KwilDB from "kwildb";

export default function Console({ moatName, privKeyResult, secretResult }) {
  const [customQuery, setCustomQuery] = useState("");

  const runQuery = () => {
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: privKeyResult,
        },
        secretResult
      );
      let result = await kwilDB.query(customQuery);
      console.log(result);
    }, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: 0,
        width: "calc(100vw - 240px)",
      }}
    >
      <Button
        onClick={runQuery}
        sx={{
          color: "#fff",
          backgroundColor: "#212121",
          textTransform: "none",
          margin: "auto 20px 0px auto",
        }}
      >
        Run Query
      </Button>
      <div
        style={{
          background:
            "radial-gradient(100% 100% at 0% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
          width: "100%",
          height: "100px",
          margin: "10px 0 0 0",
          display: "flex",
        }}
      >
        <p style={{ margin: "8px 4px", color: "#fff" }}>></p>
        <InputBase
          sx={{
            backgroundColor: "transparent",
            color: "#fff",
            borderRadius: "9px",
            pl: "4px",
            width: "100%",
            margin: "4px auto auto 0px",
            // border: "1px solid #fcfcfc",
          }}
          multiline
          onChange={(e) => setCustomQuery(e.target.value)}
          placeholder="Start typing query..."
          value={customQuery}
          inputProps={{
            autoCorrect: "off",
          }}
        />
      </div>
    </div>
  );
}
