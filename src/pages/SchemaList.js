import React from 'react';
import {useLocation} from "react-router-dom";
import KwilDB from "kwildbweb";
import Moat from "../components/Moat";
import Schema from "../components/Schema";

function SchemaList() {

    const navigate  = useLocation();

    const [moat,setMoat] = React.useState(navigate.state.moatName)
    const [owner,setOwner] = React.useState(navigate.state.owner)
    const [privKey,setPrivKey] = React.useState(navigate.state.privKey)
    const [secret,setSecret] = React.useState(navigate.state.secret)

    const [schema,setSchema] = React.useState([])

    React.useEffect(() => {
        console.log(navigate);
        console.log(moat);
        console.log(owner);
        console.log(privKey);
        console.log(secret);

        /*SELECT schema_name
        FROM information_schema.schemata;*/
        setTimeout(async function () {

            const kwilDB = (KwilDB.createConnector({
                host: '34.138.54.12:80',
                protocol: 'http',
                port: null,
                moat: moat,
                privateKey: privKey,
            }, secret))
            setSchema((await kwilDB.query(`SELECT schema_name FROM information_schema.schemata;`)).rows)
        });
    }, []);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Schema</h1>
            {schema.map((schema, index) => (
                (schema.schema_name !== 'pg_catalog'&&schema.schema_name !=='information_schema'?
                    (<Schema name ={schema.schema_name} moatName={moat} secret={secret} owner={owner} privKey={privKey}/>)
                    : (<div/>)
                )
            ))}
        </div>
    )
}

export default SchemaList;