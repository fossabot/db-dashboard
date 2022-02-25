import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateMoat from "./pages/CreateMoat";
import CreatePool from "./pages/CreatePool";
import MoatList from "./pages/MoatList";
import PoolList from "./pages/PoolList";
import SchemaList from "./pages/SchemaList";
import TableList from "./pages/TableList";
import TableView from "./pages/TableView";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/createmoat" element={<CreateMoat />} />
      <Route exact path="/createpool" element={<CreatePool />} />
      <Route exact path="/moats" element={<MoatList />} />
      <Route exact path="/pools" element={<PoolList />} />
      <Route exact path="/:moatName" element={<SchemaList />} />
      <Route exact path="/:moatName/:schemaName" element={<TableList />} />
      <Route
        exact
        path="/:moatName/:schemaName/:tableName"
        element={<TableView />}
      />

      {/*<Route element={<Home/>} />*/}
    </Routes>
  );
}

export default Main;
