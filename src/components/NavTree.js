import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KwilDB from "kwildb";

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
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import KwilDBIcon from "../assets/logos/KwilDB.svg";
import { ethers } from "ethers";

export default function NavTree({
  moats,
  moatName,
  setMoatName,
  schemaName,
  setSchemaName,
  tableName,
  setTableName,
  privKeyResult,
  setPrivKeyResult,
  secretResult,
  setSecretResult,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [moat, setMoat] = useState("");
  const [previous, setPrevious] = useState({});

  const [phrase, setPhrase] = useState("");
  const [owner, setOwner] = useState("");
  const [apiKey, setAPIKey] = useState("");
  const [secret, setSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [openSignSnackbar, setOpenSignSnackbar] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  const [loadingTree, setLoadingTree] = useState(false);

  const handleChange = (e) => {
    setOpen(true);
    setPrevious(moat);
    setMoat(e.target.value);
    setMoatName(moats[e.target.value].moat);
    setOwner(moats[e.target.value].owner);
    setSecret(moats[e.target.value].secret);
    setAPIKey(moats[e.target.value].api_key);
  };

  const signMoat = () => {
    setLoading(true);
    setTimeout(async function () {
      console.log(phrase);
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      const signature = await signer.signMessage(phrase);
      const address = await signer.getAddress();
      let privKeyResult;
      let secretResult;
      try {
        privKeyResult = JSON.parse(
          await KwilDB.decryptKey(signature, address, apiKey)
        );
        secretResult = await KwilDB.decryptKey(signature, address, secret);
        setPrivKeyResult(privKeyResult);
        setSecretResult(secretResult);
        setLoading(false);
        setOpen(false);
      } catch (e) {
        setOpenSignSnackbar(true);
        setMoat(previous);
        setLoading(false);
        setOpen(false);
        return;
      }
    }, 0);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: "#333333",
      },
    },
  };

  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    setLoadingTree(true);
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
      let temp = (
        await kwilDB.query(
          `SELECT schema_name FROM information_schema.schemata EXCEPT SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'pg_toast%' OR schema_name LIKE 'pg_temp%' OR schema_name = 'pg_catalog' OR schema_name = 'information_schema';`
        )
      ).rows;

      let schemas = [];
      let i = 0;
      temp.forEach((schema) => {
        setTimeout(async function () {
          console.log(schema.schema_name);
          schemas.push({
            name: schema.schema_name,
            tables: [],
          });
          let temp2 = (
            await kwilDB.query(`SELECT table_name
                                                FROM information_schema.tables
                                                WHERE table_schema = '${schema.schema_name}';`)
          ).rows;

          let tables = [];

          temp2.forEach((table) => {
            tables.push(table.table_name);
          });
          schemas[i].tables = tables;
          i++;
          if (i === temp.length) {
            console.log(schemas);
            setSchemas(schemas);
            setLoadingTree(false);
          }
        });
      });
    });
  }, [privKeyResult]);

  const paste = (type) => {
    if (type === "key") {
      navigator.clipboard.writeText(JSON.stringify(privKeyResult)).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    } else {
      navigator.clipboard.writeText(secretResult).then(
        () => {
          setCopyStatus("success");
        },
        () => {
          setCopyStatus("fail");
        }
      );
    }
  };

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
          onClose={() => {
            setOpen(false);
            setMoat(previous);
          }}
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
            <Backdrop open={loading} sx={{ display: "flex" }}>
              <CircularProgress sx={{ margin: "auto", color: "#ff4f99" }} />
            </Backdrop>
          </div>
        </Modal>
        <Snackbar
          sx={{ margin: "0px auto" }}
          open={openSignSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSignSnackbar(false)}
        >
          <Alert
            variant="filled"
            onClose={() => setOpenSignSnackbar(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            An error occurred trying to decrypt moat data!
          </Alert>
        </Snackbar>

        <div
          style={{
            display: privKeyResult === "" ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          <Button
            onClick={() => paste("key")}
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
            onClick={() => paste("secret")}
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
          <Snackbar
            sx={{ margin: "0px auto" }}
            open={copyStatus === "success"}
            autoHideDuration={4000}
            onClose={() => setCopyStatus(null)}
          >
            <Alert
              variant="filled"
              onClose={() => setCopyStatus(null)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Successfully pasted to your clipboard!
            </Alert>
          </Snackbar>
          <Snackbar
            sx={{ margin: "0px auto" }}
            open={copyStatus === "fail"}
            autoHideDuration={4000}
            onClose={() => setCopyStatus(null)}
          >
            <Alert
              variant="filled"
              onClose={() => setCopyStatus(null)}
              severity="error"
              sx={{ width: "100%" }}
            >
              An error occurred while pasting to your clipboard!
            </Alert>
          </Snackbar>

          <div
            style={{
              margin: "10px 8px 20px 8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CircularProgress
              sx={{
                display: loadingTree ? "flex" : "none",
                margin: "auto",
                color: "#ff4f99",
              }}
            />
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
                      display: "flex",
                      flexDirection: "column",
                      "&.MuiAccordionDetails-root": {
                        padding: "0px 16px 8px 16px",
                      },
                    }}
                  >
                    {schema.tables.map((table) => (
                      <Button
                        startIcon={
                          tableName === table ? (
                            <RadioButtonCheckedIcon sx={{ color: "#ff4f99" }} />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )
                        }
                        onClick={() => {
                          setSchemaName(schema.name);
                          setTableName(table);
                        }}
                        sx={{
                          color: "#fff",
                          backgroundColor: "transparent !important",
                          textTransform: "none",
                          maxHeight: "32px",
                          minHeight: "32px",
                          justifyContent: "left",
                        }}
                      >
                        {table}
                      </Button>
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
