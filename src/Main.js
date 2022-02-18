import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import Moats from "./Moats";
import MoatManager from "./MoatManager";
import TableView from "./TableView";
import DataView from "./DataView";

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