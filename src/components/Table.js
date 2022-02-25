import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

function Table({
  name,
  schemaName,
  moatName,
  privKey,
  owner,
  secret,
  expanded,
}) {
  const navigate = useNavigate();

  const navigateToTableData = (e) => {
    e.preventDefault();
    setTimeout(async function () {
      navigate("/" + moatName + "/" + schemaName + "/" + name, {
        state: {
          privKey: privKey,
          owner: owner,
          secret: secret,
          expanded: expanded,
        },
      });
    }, 0);
  };

  return (
    <div
      style={{
        maxWidth: "90vw",
        minWidth: "90vw",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5px",
      }}
    >
      <Button
        fullWidth
        onClick={navigateToTableData}
        sx={{ textTransform: "none", color: "#fff", justifyContent: "start" }}
      >
        {name}
      </Button>
    </div>
  );
}

export default Table;
