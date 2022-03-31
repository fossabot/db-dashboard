import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Drawer } from "@mui/material";

import KwilDBIcon from "../../assets/logos/KwilDB.svg";
import FundingPoolList from "./FundingPoolList";
import SchemaList from "./SchemaList";
import MoatList from "./MoatList";

export default function NavTree({
  initialSchema,
  initialTable,
  moats,
  setMoats,
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
          initialSchema={initialSchema}
          initialTable={initialTable}
          setSelectedPools={setSelectedPools}
          update={update}
          setUpdate={setUpdate}
        />
        <FundingPoolList
          selectedPools={selectedPools}
          setSelectedPools={setSelectedPools}
        />
      </Scrollbars>
    </Drawer>
  );
}
