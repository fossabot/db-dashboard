import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KwilDB from "kwildb";

import {
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Skeleton,
  Breadcrumbs,
  Link,
} from "@mui/material";

import Navbar from "../components/Navbar";
import NavTree from "../components/NavTree";
// import dark from '../assets/backgrounds/kwil_pattern_dark_2.svg'

function TableView() {
  const location = useLocation();
  const navigate = useNavigate();

  const { moatName } = useParams();
  const { schemaName } = useParams();
  const { tableName } = useParams();
  const owner = useRef(location.state.owner);
  const privKey = useRef(location.state.privKey);
  const secret = useRef(location.state.secret);

  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(location.state.expanded);

  useEffect(() => {
    console.log(location);
    console.log(moatName);
    console.log(owner.current);
    console.log(privKey.current);
    console.log(secret.current);
    console.log(schemaName);
    console.log(tableName);

    /*SELECT schema_name
        FROM information_schema.schemata;*/
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "34.138.54.12:80",
          protocol: "http",
          port: null,
          moat: moatName,
          privateKey: privKey.current,
        },
        secret.current
      );
      const result = await kwilDB.query(`SELECT *
                                               FROM ${tableName};`);
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
        <Navbar page="table" />
        <h1 style={{ margin: "20px auto 10px auto", color: "#fff" }}>
          Database Manager
        </h1>
        <h3 style={{ margin: "0px auto 20px auto", color: "#808080" }}>
          Table View
        </h3>
      </div>
      <div style={{ display: "flex" }}>
        <NavTree expanded={expanded} setExpanded={setExpanded} />
        <div
          style={{
            maxWidth: expanded ? "calc(90vw - 200px)" : "90vw",
            marginLeft: expanded ? "240px" : "60px",
            transitionProperty: "margin-left, max-width",
            transitionDuration: ".15s",
            transitionTimingFunction: expanded ? "ease-out" : "ease-in",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Breadcrumbs sx={{ color: "#808080" }} aria-label="breadcrumb">
            <Link
              sx={{ color: "#808080" }}
              underline="hover"
              onClick={() =>
                navigate("/" + moatName, {
                  state: {
                    privKey: privKey.current,
                    owner: owner.current,
                    secret: secret.current,
                    expanded: expanded,
                  },
                })
              }
            >
              {moatName}
            </Link>
            <Link
              sx={{ color: "#808080" }}
              underline="hover"
              onClick={() =>
                navigate("/" + moatName + "/" + schemaName, {
                  state: {
                    privKey: privKey.current,
                    owner: owner.current,
                    secret: secret.current,
                    expanded: expanded,
                  },
                })
              }
            >
              {schemaName}
            </Link>
            <p style={{ color: "#808080" }}>{tableName}</p>
          </Breadcrumbs>
          <TableContainer
            sx={{ backgroundColor: "#212121", borderRadius: "12px" }}
            component={Paper}
          >
            <Table
              sx={{
                maxWidth: expanded ? "calc(90vw - 200px)" : "90vw",
                minWidth: expanded ? "calc(90vw - 200px)" : "90vw",
                transitionProperty: "min-width, max-width",
                transitionDuration: ".15s",
                transitionTimingFunction: expanded ? "ease-out" : "ease-in",
              }}
              aria-label="simple table"
            >
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

          <div
            id="loading-table"
            style={{
              maxWidth: expanded ? "calc(90vw - 200px)" : "90vw",
              minWidth: expanded ? "calc(90vw - 200px)" : "90vw",
              transitionProperty: "min-width, max-width",
              transitionDuration: ".15s",
              transitionTimingFunction: expanded ? "ease-out" : "ease-in",
              marginLeft: "auto",
              marginRight: "auto",
              display: loading ? "flex" : "none",
              flexDirection: "column",
              backgroundColor: "#212121",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: "#151515",
                borderRadius: "12px 12px 0px 0px",
                padding: "20px 0px 20px 10px",
                borderBottom: "1px solid #fff",
                margin: "0px",
                display: "flex",
              }}
            >
              <Skeleton
                variant="text"
                width="20%"
                sx={{ backgroundColor: "#808080", marginRight: "auto" }}
              />
              <Skeleton
                variant="text"
                width="20%"
                sx={{ backgroundColor: "#808080", margin: "auto" }}
              />
              <Skeleton
                variant="text"
                width="20%"
                sx={{ backgroundColor: "#808080", margin: "auto" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  width: "calc(100% - 10px )",
                  padding: "14px 0px 14px 10px",
                  borderBottom: "1px solid #808080",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", marginRight: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "calc(100% - 10px )",
                  padding: "14px 0px 14px 10px",
                  borderBottom: "1px solid #808080",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", marginRight: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "calc(100% - 10px )",
                  padding: "14px 0px 14px 10px",
                  borderBottom: "1px solid #808080",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", marginRight: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "calc(100% - 10px )",
                  padding: "14px 0px 14px 10px",
                }}
              >
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", marginRight: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="20%"
                  sx={{ backgroundColor: "#808080", margin: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableView;
