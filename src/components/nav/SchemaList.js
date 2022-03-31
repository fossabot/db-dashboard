import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  InputBase,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import KwilDB from "kwildb";
import { useSelector } from "react-redux";
import { AES, enc } from "crypto-js";
import TableList from "./TableList";
import Schema from "./Schema";
// import KwilLoader from "../../assets/Kwil_feather_icon_animation_loop.svg";

export default function SchemaList({
  initialSchema,
  initialTable,
  update,
  setUpdate,
}) {
  const [noFunds, setNoFunds] = useState(false);

  const [schemas, setSchemas] = useState([]);
  const [addingSchema, setAddingSchema] = useState(false);
  const [newSchema, setNewSchema] = useState("");
  const [loadAddingSchema, setLoadAddingSchema] = useState(false);

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
  //const tableName = useSelector((state) => state.data.table);

  const createSchema = (e) => {
    e.preventDefault();
    setLoadAddingSchema(true);
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
      await kwilDB.query(`CREATE SCHEMA if NOT EXISTS ${newSchema}`, true);
      // setSchemas((old) => [...old, { name: newSchema, tables: [] }]);
      setAddingSchema(false);
      setLoadAddingSchema(false);
      setUpdate(update + 1);
    });
  };

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
      let temp = (
        await kwilDB.query(
          `SELECT schema_name FROM information_schema.schemata EXCEPT SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'pg_toast%' OR schema_name LIKE 'pg_temp%' OR schema_name = 'pg_catalog' OR schema_name = 'information_schema';`
        )
      ).rows;

      console.log(temp);

      if (temp) {
        setNoFunds(false);
        setSchemas(temp);
        setLoading(false);
      } else {
        setLoading(false);
        setSchemas([]);
        setNoFunds(true);
      }
    });
  }, [privKey, update]);

  return (
    <div
      style={{
        margin: "10px 8px 20px 8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CircularProgress
        sx={{
          display: loading && privKey !== "" ? "flex" : "none",
          margin: "auto",
          color: "#ff4f99",
        }}
      />
      <div
        style={{
          display: loading ? "none" : "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            display: noFunds ? "flex" : "none",
            color: "#fff",
            margin: "20px 8px 40px",
          }}
        >
          Please add funds to a funding pool to get started.
        </p>

        <Accordion
          defaultExpanded={initialTable.current}
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
              Schemas
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              "&.MuiAccordionDetails-root": {
                padding: "0px 8px",
              },
            }}
          >
            {schemas.map((schema, index) => {
              return (
                <Schema
                  initialSchema={initialSchema}
                  key={index}
                  name={schema.schema_name}
                />
              );
            })}
            <Button
              onClick={() => setAddingSchema(true)}
              sx={{
                display: loading || noFunds ? "none" : "flex",
                color: "#ff4f99",
                textTransform: "none",
                justifyContent: "left",
                fontWeight: "bold",
                backgroundColor: "transparent !important",
              }}
              endIcon={<AddIcon />}
            >
              Create Schema
            </Button>
          </AccordionDetails>
        </Accordion>

        <CircularProgress
          sx={{
            display: loadAddingSchema ? "flex" : "none",
            margin: "auto",
            color: "#ff4f99",
          }}
        />
        <div
          style={{
            display:
              addingSchema && !loading && !loadAddingSchema ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <InputBase
            sx={{
              backgroundColor: "#333333",
              color: "#fff",
              borderRadius: "9px",
              pl: "10px",
              width: "100%",
              margin: "4px auto auto 0px",
              border: "1px solid #fcfcfc",
            }}
            onChange={(e) => setNewSchema(e.target.value)}
            placeholder="New schema..."
            value={newSchema}
            inputProps={{
              autoCorrect: "off",
            }}
          />
          <div style={{ display: "flex" }}>
            <Button
              fullWidth
              onClick={() => setAddingSchema(false)}
              sx={{
                color: "#fff",
                textTransform: "none",
                backgroundColor: "#434343 !important",
                margin: "10px 5px 0px 0px",
                borderRadius: "12px",
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={createSchema}
              sx={{
                color: "#fff",
                textTransform: "none",
                backgroundColor: "#ff4f99 !important",
                margin: "10px 0px 0px 5px",
                borderRadius: "12px",
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
