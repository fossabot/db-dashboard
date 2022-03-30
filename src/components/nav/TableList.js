import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KwilDB from "kwildb";
import { AES, enc } from "crypto-js";
import { useSelector, useDispatch } from "react-redux";
import { setTable, setSchema } from "../../actions";

export default function TableList({ schema, setSelectedPools }) {
  const [tables, setTables] = useState([]);

  const dispatch = useDispatch();
  const privKey = AES.decrypt(
    useSelector((state) => state.privKey),
    "kwil"
  ).toString(enc.Utf8);
  const secret = AES.decrypt(
    useSelector((state) => state.secret),
    "kwil"
  ).toString(enc.Utf8);
  const moatName = useSelector((state) => state.moat.name);
  const tableName = useSelector((state) => state.selected.table);

  useEffect(() => {
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
        await kwilDB.query(`SELECT table_name
                                                    FROM information_schema.tables
                                                    WHERE table_schema = '${schema}';`)
      ).rows;
      console.log(temp);
      setTables(temp);
    });
  }, []);

  return (
    <>
      {tables.map((table, index) => {
        return (
          <Button
            key={index}
            startIcon={
              tableName === table.table_name ? (
                <RadioButtonCheckedIcon sx={{ color: "#ff4f99" }} />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
            onClick={() => {
              if (tableName !== table.table_name) {
                dispatch(setSchema(schema));
                dispatch(setTable(table.table_name));
                setSelectedPools([]);
              } else {
                dispatch(setSchema(""));
                dispatch(setTable(""));
              }
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
            {table.table_name}
          </Button>
        );
      })}
    </>
  );
}
