import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KwilDB from "kwildbweb";

import { TreeView, TreeItem } from "@mui/lab";
import {
  Drawer,
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Modal,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KwilDBIcon from "../assets/logos/KwilDB.svg";
import { ethers } from "ethers";

export default function NavTree({ moats }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [moat, setMoat] = useState("");

  const [moatName, setMoatName] = useState("");
  const [phrase, setPhrase] = useState("");
  const [owner, setOwner] = useState("");
  const [apiKey, setAPIKey] = useState("");
  const [secret, setSecret] = useState("");

  const [privKeyResult, setPrivKeyResult] = useState("");
  const [secretResult, setSecretResult] = useState("");

  const handleChange = (e) => {
    setOpen(true);
    setMoat(e.target.value);
    setMoatName(moats[e.target.value].moat);
    setOwner(moats[e.target.value].owner);
    setSecret(moats[e.target.value].secret);
    setAPIKey(moats[e.target.value].api_key);
  };

  const signMoat = () => {
    setTimeout(async function () {
      console.log(phrase);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const signature = await signer.signMessage(phrase);
      const address = await signer.getAddress();
      const privKeyResult = JSON.parse(
        await KwilDB.decryptKey(signature, address, apiKey)
      );
      const secretResult = await KwilDB.decryptKey(signature, address, secret);
      console.log(privKeyResult);
      console.log(secretResult);
      setPrivKeyResult(privKeyResult);
      setSecretResult(secretResult);
      setOpen(false);
    }, 0);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: "#333333",
      },
    },
  };

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});
  const schemas = [
    { name: "sch1", tables: ["tab1", "tab2", "tab3"] },
    { name: "sch2", tables: ["tab4", "tab5"] },
    { name: "sch3", tables: [] },
  ];

  /*useEffect(() => {
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
  }, [privKeyResult]);*/

  /*  const navigateToPage = (e, id) => {
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
  };*/

  /* const renderTree = (nodes) => (
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
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );*/

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiDrawer-paper": {
            height: "100vh",
            maxWidth: "240px",
            borderRight: "2px solid #323232",
            background:
              "linear-gradient(260deg, rgba(113, 122, 255, .5) -50%, rgba(113, 122, 255, 0) 100%)",
          },
        }}
      >
        <img
          src={KwilDBIcon}
          alt=""
          style={{ margin: "40px auto", width: "120px" }}
        />
        <FormControl
          sx={{
            paddingLeft: "15px",
            paddingRight: "10px",
            margin: "0px 8px 0px 8px",
            width: "200px",
            height: "30px",
            backgroundColor: "#333333",
            borderRadius: "5px",
            border: "1px solid #fcfcfc",
            "& .MuiFilledInput-underline": {
              borderBottom: "0px solid black !important",
            },
            "& .MuiSelect-icon": { color: "#ff4f99" },
          }}
        >
          <Select
            displayEmpty
            value={moat}
            onChange={handleChange}
            input={<InputBase />}
            MenuProps={MenuProps}
            IconComponent={ExpandMoreIcon}
            sx={{ color: "#fff" }}
          >
            <MenuItem disabled value="" sx={{ color: "#fff", width: "200px" }}>
              <em>Select Moat</em>
            </MenuItem>
            {moats.map((item, index) => {
              return (
                <MenuItem key={index} value={index} sx={{ color: "#fff" }}>
                  {item.moat}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: "flex" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#151515",
              margin: "auto",
              height: "auto",
              width: "40vw",
              border: "2px solid #ff4f99",
              borderRadius: "14px",
            }}
          >
            <p
              style={{
                color: "#fff",
                background:
                  "linear-gradient(241.4deg, #717AFF 29.4%, #FF4F99 89.99%)",
                margin: "0px",
                borderRadius: "12px 12px 0px 0px",
                padding: "15px",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Signing Phrase
            </p>
            <InputBase
              sx={{
                backgroundColor: "#212121",
                color: "#fff",
                borderRadius: "9px",
                pl: "10px",
                minHeight: "45px",
                margin: "80px 20px 20px 20px",
                border: "1px solid #fcfcfc",
              }}
              multiline
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="Signing phrase"
              value={phrase}
              inputProps={{
                autoCorrect: "off",
              }}
            />

            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#ff4f99 !important",
                textTransform: "none",
                margin: "40px auto",
                borderRadius: "9px",
                width: "50%",
              }}
              onClick={signMoat}
            >
              Submit
            </Button>
          </div>
        </Modal>

        <div
          style={{
            display: privKeyResult === "" ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "transparent !important",
              textTransform: "none",
              margin: "10px 8px 0px",
              justifyContent: "left",
              "& .MuiButton-endIcon": {
                marginLeft: "auto",
              },
            }}
            endIcon={<ContentCopyIcon />}
          >
            Private Key
          </Button>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "transparent !important",
              textTransform: "none",
              margin: "0px 8px 10px",
              justifyContent: "left",
              "& .MuiButton-endIcon": {
                marginLeft: "auto",
              },
            }}
            endIcon={<ContentCopyIcon />}
          >
            Secret
          </Button>

          <div style={{ margin: "10px 8px 20px 8px" }}>
            {schemas.map((schema, index) => {
              return (
                <Accordion
                  key={index}
                  disableGutters
                  sx={{
                    width: "100%",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    sx={{
                      "& .MuiAccordionSummary-content": { margin: 0 },
                      "&.MuiAccordionSummary-root": {
                        maxHeight: "38px",
                        minHeight: "38px",
                        padding: "0 8px",
                      },
                    }}
                    expandIcon={<ExpandMoreIcon sx={{ color: "#ff4f99" }} />}
                  >
                    <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                      {schema.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      "&.MuiAccordionDetails-root": {
                        padding: "0px 16px 8px 16px",
                      },
                    }}
                  >
                    {schema.tables.map((table) => (
                      <Typography sx={{ color: "#fff" }}>{table}</Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>

        {/* <TreeView
          // onNodeSelect={(e, value) => navigateToPage(e, value)}
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
            borderRadius: "0px 12px 12px 0px",
          }}
        >
          {renderTree(data)}
        </TreeView>*/}
      </Drawer>
    </>
  );
}
