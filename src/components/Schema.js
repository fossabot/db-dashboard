import React from 'react';
import {ethers} from "ethers";
import KwilDB from "kwildbweb";
import {useNavigate} from "react-router-dom";

function Schema({name,moatName,privKey,owner,secret}) {

    const navigate = useNavigate();

    const navigateToTables = (e) => {
        e.preventDefault();
        setTimeout(async function () {

            navigate('/tables',{state:{moatName: moatName, privKey: privKey, owner: owner, secret: secret, schemaName:name}});




            //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
            //console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));

        }, 0);
    };

    return (
        <div onClick={navigateToTables}>
            <p>{name}</p>
        </div>
    )
}

export default Schema;