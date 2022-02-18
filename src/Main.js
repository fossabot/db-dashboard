import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Moats from "./pages/Moats";
import MoatManager from "./pages/MoatManager";
import TableView from "./pages/TableView";
import DataView from "./pages/DataView";

function Main() {

    return (
        <Routes>
            {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/moats' element={<Moats/>}/>
            <Route exact path='/moat' element={<MoatManager/>}/>
            <Route exact path='/schema' element={<TableView/>}/>
            <Route exact path='/data' element={<DataView/>}/>


            {/*<Route element={<Home/>} />*/}
        </Routes>
    )
}

export default Main;