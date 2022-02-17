import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import Moats from "./Moats";
import MoatManager from "./MoatManager";

function Main() {

    return (
        <Routes>
            {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/moats' element={<Moats/>}/>
            <Route exact path='/moat' element={<MoatManager/>}/>


            {/*<Route element={<Home/>} />*/}
        </Routes>
    )
}

export default Main;