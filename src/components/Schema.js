import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

function Schema({ name, moatName, privKey, owner, secret }) {
  const navigate = useNavigate();

  const navigateToTables = (e) => {
    e.preventDefault();
    setTimeout(async function () {
      navigate("/" + moatName + "/" + name, {
        state: { privKey: privKey, owner: owner, secret: secret },
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
        onClick={navigateToTables}
        sx={{ textTransform: "none", color: "#fff", justifyContent: "start" }}
      >
        {name}
      </Button>
    </div>
  );
}

export default Schema;
