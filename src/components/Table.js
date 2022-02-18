import React from 'react';
import {useNavigate} from "react-router-dom";

function Table({name,schemaName,moatName,privKey,owner,secret}) {

    const navigate = useNavigate();

    const navigateToTableData = (e) => {
        e.preventDefault();
        setTimeout(async function () {
            navigate('/data',{state:{tableName:name,moatName: moatName, privKey: privKey, owner: owner, secret: secret, schemaName:schemaName}});

        }, 0);
    };

    return (
        <div onClick={navigateToTableData}>
            <p>{name}</p>
        </div>
    )
}

export default Table;