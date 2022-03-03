import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KwilDB from "kwildb";

import { TreeView, TreeItem } from "@mui/lab";
import { Drawer } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ethers } from "ethers";

export default function NavTree({ expanded, setExpanded }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { moatName } = useParams();
  const owner = useRef(location.state.owner);
  const privKey = useRef(location.state.privKey);
  const secret = useRef(location.state.secret);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    console.log(location);
    console.log(moatName);
    console.log(owner.current);
    console.log(privKey.current);
    console.log(secret.current);

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

      let tempData = {
        id: "root",
        name: moatName,
        level: 0,
        children: [],
      };
      let temp = (
        await kwilDB.query(
          `SELECT schema_name FROM information_schema.schemata EXCEPT SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'pg_toast%' OR schema_name LIKE 'pg_temp%' OR schema_name = 'pg_catalog' OR schema_name = 'information_schema';`
        )
      ).rows;

      let schemas = [];
      let i = 0;
      let treeItems = 0;

      temp.forEach((schema) => {
        setTimeout(async function () {
          console.log(schema.schema_name);
          schemas.push({
            id: "schema " + treeItems,
            name: schema.schema_name,
            level: 1,
            children: [],
          });
          treeItems++;
          let temp2 = (
            await kwilDB.query(`SELECT table_name
                                                FROM information_schema.tables
                                                WHERE table_schema = '${schema.schema_name}';`)
          ).rows;

          let tables = [];

          temp2.forEach((table) => {
            tables.push({
              id: "table " + treeItems,
              name: table.table_name,
              level: 2,
              schema: schema.schema_name,
            });
            treeItems++;
          });
          schemas[i].children = tables;
          i++;
          if (i === temp.length) {
            tempData.children = schemas;
            console.log(tempData);
            setData(tempData);
            setLoading(false);
          }
          console.log(i);
        });
      });
    });
  }, [location]);

  const navigateToPage = (e, id) => {
    e.preventDefault();
    // console.log(id)
    if (e.detail > 1) {
      if (id === "root") {
        console.log("moat");

        navigate("/" + moatName, {
          state: {
            privKey: privKey.current,
            owner: owner.current,
            secret: secret.current,
            expanded: expanded,
          },
        });
      } else if (id.split(" ")[0] === "schema") {
        console.log("schema");
        let index = id.split(" ")[1];
        console.log(data.children[index]);
        //window.location.reload();
        navigate("/" + moatName + "/" + data.children[index].name, {
          state: {
            privKey: privKey.current,
            owner: owner.current,
            secret: secret.current,
            expanded: expanded,
          },
        });
      } else if (id.split(" ")[0] === "table") {
        data.children.forEach((schema) => {
          console.log(id);
          console.log(schema.children);
          schema.children.forEach((table) => {
            if (table.id === id) {
              console.log(table);
              //window.location.reload();
              navigate("/" + moatName + "/" + schema.name + "/" + table.name, {
                state: {
                  privKey: privKey.current,
                  owner: owner.current,
                  secret: secret.current,
                  expanded: expanded,
                },
              });
            }
          });
        });
      }
    }
  };

  const renderTree = (nodes) => (
    <TreeItem
      sx={{
        color: "#fff",
        borderLeft:
          nodes.level === 0
            ? "2px solid #FF4F99"
            : nodes.level === 1
            ? "2px solid #717AFF"
            : "2px solid #438ea0",
      }}
      nodeId={nodes.id}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) =>
            // console.log(node.id.split(" ")[0])
            renderTree(node)
          )
        : null}
    </TreeItem>
  );

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={!expanded}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            height: "fit-content",
            border: "2px solid #323232",
            borderLeft: "none",
            borderRadius: "0px 12px 12px 0px",
            backgroundColor: "#000",
            overflowX: "hidden",
            marginTop: "80px",
          },
        }}
      >
        <MenuIcon
          onClick={() => setExpanded(true)}
          sx={{
            margin: "5px",
            color: "#808080",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={expanded}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            height: "calc(100vh - 200px)",
            border: "2px solid #323232",
            borderLeft: "none",
            borderRadius: "0px 12px 12px 0px",
            backgroundColor: "#000",
            overflowX: "hidden",
            marginTop: "80px",
          },
        }}
      >
        <CloseIcon
          onClick={() => setExpanded(false)}
          sx={{
            margin: "5px 5px 5px auto",
            color: "#808080",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
        <TreeView
          onNodeSelect={(e, value) => navigateToPage(e, value)}
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            height: "calc(100vh - 200px)",
            flexGrow: 1,
            minWidth: 200,
            maxWidth: 200,
            backgroundColor: "#000",
            // padding: "15px 16px 15px 0px",
            borderRadius: "0px 12px 12px 0px",
          }}
        >
          {renderTree(data)}
        </TreeView>
      </Drawer>
    </>
  );
}
