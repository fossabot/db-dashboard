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
import AddIcon from "@mui/icons-material/Add";
import KwilDBIcon from "../assets/logos/KwilDB.svg";
import { ethers } from "ethers";
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
}) {
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

        <SchemaList
          moatName={moatName}
          privKeyResult={privKeyResult}
          secretResult={secretResult}
          tableName={tableName}
          setTableName={setTableName}
          setSchemaName={setSchemaName}
          setSelectedPools={setSelectedPools}
        />

        <FundingPoolList
          moatName={moatName}
          privKeyResult={privKeyResult}
          selectedPools={selectedPools}
          setSelectedPools={setSelectedPools}
          setTableName={setTableName}
        />
      </Drawer>
    </>
  );
}
