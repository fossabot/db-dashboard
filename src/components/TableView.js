import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KwilDB from "kwildb";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { AES, enc } from "crypto-js";
import Helmet from "react-helmet";

export default function TableView({ schemaName, tableName }) {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const privKey = AES.decrypt(
    useSelector((state) => state.privKey),
    "kwil"
  ).toString(enc.Utf8);
  const secret = AES.decrypt(
    useSelector((state) => state.secret),
    "kwil"
  ).toString(enc.Utf8);
  const moatName = useSelector((state) => state.moat.name);

  useEffect(() => {
    setLoading(true);
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: JSON.parse(privKey),
        },
        secret
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
  }, [tableName, schemaName]);

  return (
    <div
      id="table-view-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "calc(100vw - 240px)",
        height: "100vh",
      }}
    >
      {tableName !== "" ? (
        <Helmet>
          <title>
            {tableName} | {moatName} | KwilDB
          </title>
          <meta
            name="description"
            content="KwilDB is the first decentralized SQL database, enabling complex, highly-scalable, decentralized applications. Manage your KwilDB tables in our DB Visualizer."
          />
        </Helmet>
      ) : (
        <></>
      )}

      <p
        style={{ fontSize: "32px", color: "#fff", margin: "40px 0px 0px 40px" }}
      >
        {tableName}
      </p>
      <CircularProgress
        sx={{
          display: loading ? "flex" : "none",
          margin: "300px auto",
          color: "#ff4f99",
        }}
      />

      <TableContainer
        sx={{
          display: loading ? "none" : "flex",
          borderRadius: "5px",
          maxWidth: "calc(100vw - 320px)",
          height: "100%",
          backgroundColor: "transparent",
          margin: "30px 40px 40px",
        }}
        component={Paper}
      >
        <Scrollbars
          renderThumbHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                height: "12px",
                backgroundColor: "#ffffff80",
                borderRadius: "6px",
              }}
            />
          )}
          renderTrackHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                height: "12px",
                width: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
              }}
            />
          )}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: "12px",
                backgroundColor: "#ffffff80",
                borderRadius: "6px",
              }}
            />
          )}
          renderTrackVeritcal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: "12px",
                height: "100%",
                backgroundColor: "transparent",
              }}
            />
          )}
          renderView={({ style, ...props }) => (
            <div
              {...props}
              style={{ ...style, backgroundColor: "transparent" }}
            />
          )}
          style={{ width: "100%", height: "100%" }}
        >
          <Table>
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                background:
                  "linear-gradient(30deg, transparent -50%, #717aff 200%)",
                backgroundColor: "#000",
              }}
            >
              <TableRow>
                {cols.map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{ color: "#fff", borderBottom: "none" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "transparent" }}>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      borderRadius: "0 0 5px 5px",
                    },
                    backgroundColor: index % 2 === 0 ? "#212121" : "#151515",
                  }}
                >
                  {cols.map((column, index) => (
                    <TableCell
                      key={index}
                      size="small"
                      sx={{
                        color: "#fff",
                        borderBottom: "none",
                      }}
                    >
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbars>
      </TableContainer>
    </div>
  );
}
