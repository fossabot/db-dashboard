import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import CreatePool from "./pages/CreatePool";
import Home from "./pages/Home";
import PoolList from "./pages/PoolList";
import SchemaList from "./pages/SchemaList";
import TableList from "./pages/TableList";
import TableView from "./pages/TableView";

function Main() {
  return (
    <Routes>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="/createpool" element={<CreatePool />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/pools" element={<PoolList />} />
      <Route exact path="/:moatName" element={<SchemaList />} />
      <Route exact path="/:moatName/:schemaName" element={<TableList />} />
      <Route
        exact
        path="/:moatName/:schemaName/:tableName"
        element={<TableView />}
      />

      {/*<Route element={<SignIn/>} />*/}
    </Routes>
  );
}

export default Main;
