import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableList from "./TableList";
import { useSelector } from "react-redux";

export default function Schema({ name, setSelectedPools }) {
  const schemaName = useSelector((state) => state.selected.schema);
  const [expanded, setExpanded] = useState(schemaName === name ? true : false);

  return (
    <Accordion
      defaultExpanded={schemaName === name ? true : false}
      onChange={(e, expanded) => setExpanded(expanded)}
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
            padding: "0px 8px",
          },
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: "#ff4f99" }} />}
      >
        <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          "&.MuiAccordionDetails-root": {
            padding: "0px 8px 8px",
          },
        }}
      >
        {expanded ? (
          <TableList schema={name} setSelectedPools={setSelectedPools} />
        ) : (
          <></>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
