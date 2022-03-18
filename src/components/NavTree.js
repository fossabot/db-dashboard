import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
  Drawer,
} from "@mui/material";
import KwilDBIcon from "../assets/logos/KwilDB.svg";
import FundingPoolList from "./nav/FundingPoolList";
import SchemaList from "./nav/SchemaList";
import MoatList from "./nav/MoatList";

export default function NavTree({
  moats,
  setMoats,
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
  selectedPools,
  setSelectedPools,
  update,
  setUpdate,
}) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          maxHeight: "100vh",
          maxWidth: "240px",
          borderRight: "2px solid #323232",
          background:
            "linear-gradient(260deg, rgba(113, 122, 255, .5) 0%, rgba(113, 122, 255, 0) 100%)",
          backgroundColor: "#000",
        },
      }}
    >
      <img
        src={KwilDBIcon}
        alt=""
        style={{ margin: "40px auto", width: "120px" }}
      />
      <MoatList
        moats={moats}
        setMoats={setMoats}
        setMoatName={setMoatName}
        privKeyResult={privKeyResult}
        setPrivKeyResult={setPrivKeyResult}
        secretResult={secretResult}
        setSecretResult={setSecretResult}
        setTableName={setTableName}
        setSelectedPools={setSelectedPools}
      />
      <Scrollbars
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: "8px",
              backgroundColor: "#212121bf",
              borderRadius: "4px",
              marginRight: "4px",
            }}
          />
        )}
        renderView={({ style, ...props }) => (
          <div {...props} style={{ ...style, overflowX: "hidden" }} />
        )}
        style={{ width: 240, height: "100%" }}
      >
        <SchemaList
          moatName={moatName}
          privKeyResult={privKeyResult}
          secretResult={secretResult}
          tableName={tableName}
          setTableName={setTableName}
          setSchemaName={setSchemaName}
          setSelectedPools={setSelectedPools}
          update={update}
          setUpdate={setUpdate}
        />
        <FundingPoolList
          moatName={moatName}
          privKeyResult={privKeyResult}
          selectedPools={selectedPools}
          setSelectedPools={setSelectedPools}
          setTableName={setTableName}
        />
      </Scrollbars>
    </Drawer>
  );
}
