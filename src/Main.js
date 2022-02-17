import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'

function Main() {

    return (
        <Routes>
            {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' element={<Home/>}/>


            {/*<Route element={<Home/>} />*/}
        </Routes>
    )
}

export default Main;