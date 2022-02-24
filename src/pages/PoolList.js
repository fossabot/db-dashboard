import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import { Button, Skeleton } from "@mui/material";

import Navbar from "../components/Navbar";
import Pool from "../components/Pool";

export default function PoolList() {
  const location = useLocation();
  const navigate = useNavigate();

  const moat = useRef(location.state.moatName);
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async function () {
      const result = await KwilDB.pools.getPool("test", "goerli", "USDC");
      console.log(result);
      for (let i = 0; i < 3; i++) {
        setPools((old) => [
          ...old,
          {
            name: "test",
            creator: result.creator,
            validator: result.validator,
            balance: result.pool / 1000000,
          },
        ]);
      }
      setLoading(false);
    }, 0);
  }, [location]);

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
          Funding Pools for {moat.current}
        </h3>
      </div>

      <div
        id="table"
        style={{
          maxWidth: "90vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: loading ? "none" : "flex",
          flexDirection: "column",
          backgroundColor: "#212121",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#151515",
            borderRadius: "12px 12px 0px 0px",
            borderBottom: "1px solid #fff",
          }}
        >
          <p
            style={{
              backgroundColor: "#151515",
              borderRadius: "12px 12px 0px 0px",
              color: "#fff",
              padding: "20px 0px 20px 20px",
              margin: "0px",
            }}
          >
            Pools
          </p>
          <Button
            onClick={() =>
              navigate("/createpool", {
                state: {
                  moatName: moat.current,
                },
              })
            }
            sx={{
              textTransform: "none",
              fontSize: 16,
              border: "none",
              borderRadius: "9px",
              padding: "6px 20px",
              width: "300px",
              color: "#fff",
              boxShadow: "none !important",
              background: "#438ea0 !important",
              margin: "10px 20px 10px auto",
            }}
          >
            Create New Funding Pool
          </Button>
        </div>

        {pools.map((pool, index) => (
          <div
            style={{
              borderBottom:
                index + 1 < pools.length ? "1px solid #808080" : "none",
            }}
          >
            <Pool
              poolName={pool.name}
              creator={pool.creator}
              validator={pool.validator}
              balance={pool.balance}
            />
          </div>
        ))}
      </div>

      <div
        id="loading"
        style={{
          maxWidth: "90vw",
          marginLeft: "auto",
          marginRight: "auto",
          display: loading ? "flex" : "none",
          flexDirection: "column",
          backgroundColor: "#212121",
          borderRadius: "12px",
        }}
      >
        <p
          style={{
            backgroundColor: "#151515",
            borderRadius: "12px 12px 0px 0px",
            borderBottom: "1px solid #fff",
            color: "#fff",
            padding: "20px 0px 20px 20px",
            margin: "0px",
          }}
        >
          Pools
        </p>
        <Skeleton
          variant="text"
          width="50%"
          sx={{ backgroundColor: "#808080", margin: "15px auto 15px 20px" }}
        />
        <Skeleton
          variant="text"
          width="50%"
          sx={{ backgroundColor: "#808080", margin: "15px auto 15px 20px" }}
        />
        <Skeleton
          variant="text"
          width="50%"
          sx={{ backgroundColor: "#808080", margin: "15px auto 15px 20px" }}
        />
        <Skeleton
          variant="text"
          width="50%"
          sx={{ backgroundColor: "#808080", margin: "15px auto 15px 20px" }}
        />
      </div>
    </div>
  );
}
