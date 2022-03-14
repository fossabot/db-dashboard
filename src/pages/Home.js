import React, { useEffect, useState, useRef } from "react";
import KwilDB from "kwildb";
import { ethers } from "ethers";

import LoadingButton from "@mui/lab/LoadingButton";

import Moat from "../components/Moat";
import { ReactComponent as Metamask } from "../assets/logos/MetaMask_Fox.svg";
import Arconnect from "../assets/logos/arconnect.png";
import Navbar from "../components/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FundingPool from "../components/FundingPool";
import NavTree from "../components/NavTree";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  InputBase,
  CircularProgress,
  Grid,
} from "@mui/material";

export default function Home() {
  const wallet = localStorage.getItem("wallet");
  const address = localStorage.getItem("address");

  const [moats, setMoats] = useState([]);

  const [moatName, setMoatName] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [tableName, setTableName] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedPools, setSelectedPools] = useState([]);
  const [balances, setBalances] = useState(new Map());

  const [privKeyResult, setPrivKeyResult] = useState("");
  const [secretResult, setSecretResult] = useState("");

  const [customQuery, setCustomQuery] = useState("");

  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (wallet === "metamask") {
      setTimeout(async function () {
        const temp = await KwilDB.getMoats("https://test-db.kwil.xyz", address);
        console.log(temp);
        setMoats(temp);
      }, 0);
    } else if (wallet === "arconnect") {
      setTimeout(async function () {
        setMoats(await KwilDB.getMoats("https://test-db.kwil.xyz", address));
      }, 0);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
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
      const result = await kwilDB.query(`SELECT *
                                               FROM ${schemaName}.${tableName};`);
      console.log(result);
      console.log(result.fields.length);
      let columns = [];
      for (let i = 0; i < result.fields.length; i++) {
        console.log(result.fields[i].name);
        columns.push(result.fields[i].name);
      }
      console.log(columns);
      setCols(columns);
      setRows(result.rows);
      setLoading(false);
    });
  }, [tableName]);

  return (
    <div
      style={{
        background: "linear-gradient(30deg, #101010, #000)",
        width: "100vw",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        paddingBottom: 40,
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
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100vw - 240px)",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          marginLeft: "240px",
        }}
      >
        {/* <p
          style={{
            display: moatName === "" ? "flex" : "none",
            color: "#fff",
            marginTop: "148px",
            marginLeft: "20px",
            position: "fixed",
            fontSize: "20px",
          }}
        >
          <ArrowBackIcon /> Please select a moat
        </p>
        <p
          style={{
            display: tableName === "" && privKeyResult !== "" ? "flex" : "none",
            color: "#fff",
            position: "fixed",
            marginTop: "290px",
            marginLeft: "20px",
            fontSize: "20px",
          }}
        >
          <ArrowBackIcon /> Please select a table
        </p>*/}
        <div
          style={{
            display: tableName !== "" ? "flex" : "none",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <p
            style={{ fontSize: "32px", color: "#fff", margin: "40px 40px 0px" }}
          >
            {tableName}
          </p>
          <CircularProgress
            sx={{
              display: loading && tableName !== "" ? "flex" : "none",
              margin: "auto",
              color: "#ff4f99",
            }}
          />
          <TableContainer
            sx={{
              display: tableName === "" || loading ? "none" : "flex",
              backgroundColor: "#212121",
              borderRadius: "12px",
              height: "fit-content",
              width: "calc(100vw - 320px)",
              margin: "30px 40px auto",
            }}
            component={Paper}
          >
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {cols.map((column, index) => (
                    <TableCell
                      key={index}
                      sx={{ backgroundColor: "#151515", color: "#fff" }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {cols.map((column, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid #808080",
                        }}
                      >
                        {row[column]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div
          style={{
            display: selectedPools.length > 0 ? "flex" : "none",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <p
            style={{ fontSize: "32px", color: "#fff", margin: "40px 40px 0px" }}
          >
            Funding Pools
          </p>
          <Grid container spacing={2} sx={{ margin: "0px" }}>
            {selectedPools.map((pool) => {
              return (
                <Grid item xs={6}>
                  <FundingPool pool={pool} />;
                </Grid>
              );
            })}
          </Grid>
        </div>

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
      </div>
    </div>
  );
}
