import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KwilDB from "kwildb";

import {
  Breadcrumbs,
  Button,
  InputBase,
  Link,
  Modal,
  Skeleton,
} from "@mui/material";

import Navbar from "../components/Navbar";
import Table from "../components/Table";
import NavTree from "../components/NavTree";


function TableList() {
  const location = useLocation();
  const navigate = useNavigate();

  const { moatName } = useParams();
  const { schemaName } = useParams();
  const owner = useRef(location.state.owner);
  const privKey = useRef(location.state.privKey);
  const secret = useRef(location.state.secret);

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(location.state.expanded);

  const [newTable, setNewTable] = useState({});
  const [adding, setAdding] = useState(false);

  const createTable = (e) => {
    e.preventDefault();
    //debug, DELETE
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: privKey.current,
        },
        secret.current
      );
      console.log(
        await kwilDB.query(
          "CREATE TABLE if NOT EXISTS tab2(id varchar(20) PRIMARY KEY, height integer NOT NULL, weight integer NOT NULL, price integer NOT NULL)"
        )
      );
    });
  };

  const insertTable = (e) => {
    e.preventDefault();
    //debug, DELETE
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: privKey.current,
        },
        secret
      );
      console.log(
        await kwilDB.query(`INSERT INTO tab2 (id, height, weight, price)
                                            VALUES ('d', 3, 14, 31)`)
      );
    });
  };

  useEffect(() => {
    console.log(location);
    console.log(moatName);
    console.log(owner.current);
    console.log(privKey.current);
    console.log(secret.current);
    console.log(schemaName);

    /*SELECT schema_name
        FROM information_schema.schemata;*/
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: privKey.current,
        },
        secret.current
      );
      setTables(
        (
          await kwilDB.query(`SELECT table_name
                                     FROM information_schema.tables
                                     WHERE table_schema = '${schemaName}';`)
        ).rows
      );
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
        <Navbar page="tables" />
        <h1 style={{ margin: "20px auto 10px auto", color: "#fff" }}>
          Database Manager
        </h1>
        <h3 style={{ margin: "0px auto 20px auto", color: "#808080" }}>
          Tables
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
          <div style={{ display: "flex", margin: "0px 0px 10px 0px" }}>
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
              <p style={{ color: "#808080" }}>{schemaName}</p>
            </Breadcrumbs>
            {/* <Button onClick={() => setAdding(true)}
                            sx={{textTransform: 'none', color: '#fff', borderRadius: '9px', margin: '0px 0px 0px auto'}}
                            startIcon={<AddIcon/>}>Add Table</Button>*/}
          </div>

          <div
            id="table"
            style={{
              maxWidth: expanded ? "calc(90vw - 200px)" : "90vw",
              minWidth: expanded ? "calc(90vw - 200px)" : "90vw",
              transitionProperty: "min-width, max-width",
              transitionDuration: ".15s",
              transitionTimingFunction: expanded ? "ease-out" : "ease-in",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#212121",
              borderRadius: "12px",
            }}
          >
            <p
              style={{
                backgroundColor: "#151515",
                borderRadius: "12px 12px 0px 0px",
                color: "#fff",
                padding: "20px 0px 20px 20px",
                borderBottom: "1px solid #fff",
                margin: "0px",
              }}
            >
              Table Name
            </p>

            {tables.map((table, index) => (
              <div
                key={index}
                style={{
                  borderBottom:
                    index + 1 < tables.length ? "1px solid #808080" : "none",
                }}
              >
                <Table
                  name={table.table_name}
                  privKey={privKey.current}
                  moatName={moatName}
                  owner={owner.current}
                  secret={secret.current}
                  schemaName={schemaName}
                  expanded={expanded}
                />
              </div>
            ))}

            <div
              style={{
                display: loading ? "flex" : "none",
                flexDirection: "column",
              }}
            >
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
                  width="50%"
                  sx={{ backgroundColor: "#808080" }}
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
                  width="50%"
                  sx={{ backgroundColor: "#808080" }}
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
                  width="50%"
                  sx={{ backgroundColor: "#808080" }}
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
                  width="50%"
                  sx={{ backgroundColor: "#808080" }}
                />
              </div>
            </div>
          </div>

          <Modal
            sx={{ display: "flex" }}
            open={adding}
            onClose={() => setAdding(false)}
          >
            <div
              style={{
                backgroundColor: "#151515",
                margin: "auto",
                padding: "10px",
                borderRadius: "12px",
                display: "flex",
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                  backgroundColor: "#212121",
                  color: "#fff",
                  borderRadius: "9px",
                  pl: "10px",
                  minHeight: "45px",
                }}
                onChange={(e) => setNewTable(e.target.value)}
                placeholder="New table name..."
                value={newTable.name}
                inputProps={{
                  autoCorrect: "off",
                }}
              />
              <Button
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  margin: "0px 10px",
                  borderRadius: "9px",
                }}
                onClick={createTable}
              >
                Create Table
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default TableList;
