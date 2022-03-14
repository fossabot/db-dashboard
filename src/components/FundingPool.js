import React, { useEffect, useState } from "react";
import KwilDB from "kwildb";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

export default function FundingPool({ pool }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setTimeout(async function () {
      const result = await KwilDB.pools.getPool(
        pool.pool_name,
        pool.blockchain,
        pool.token
      );
      console.log(result);
      setBalance(result.pool);
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#151515",
        padding: "5px 20px",
        borderRadius: "12px",
      }}
    >
      <p style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>
        {pool.pool_name}
      </p>
      <p style={{ color: "#fff", margin: "6px auto 6px 0px" }}>
        <span style={{ color: "#717aff" }}>Chain: </span>
        {pool.blockchain}
      </p>
      <div style={{ display: "flex" }}>
        <p style={{ color: "#fff", margin: "6px 0px" }}>
          <span style={{ color: "#717aff" }}>Token: </span>
          {pool.token}
        </p>
        <p style={{ color: "#fff", margin: "auto" }}>
          <span style={{ color: "#717aff" }}>Balance: </span>
          {balance}
        </p>
      </div>

      <p style={{ color: "#fff", margin: "6px auto 6px 0px" }}>
        <span style={{ color: "#717aff" }}>Validator: </span>
        {pool.validator}
      </p>
      <Button
        //onClick={() => setAddingSchema(true)}
        sx={{
          display: "flex",
          color: "#ff4f99",
          textTransform: "none",
          justifyContent: "left",
          fontWeight: "bold",
          backgroundColor: "transparent !important",
          paddingLeft: 0,
        }}
        endIcon={<AddIcon />}
      >
        Add Funds
      </Button>
    </div>
  );
}
