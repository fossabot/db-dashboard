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

export default function TableView({
  moatName,
  schemaName,
  tableName,
  privKeyResult,
  secretResult,
}) {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

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
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <p style={{ fontSize: "32px", color: "#fff", margin: "40px 40px 0px" }}>
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
  );
}
