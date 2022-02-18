import React from 'react';
import {useLocation} from "react-router-dom";
import KwilDB from "kwildbweb";
import Column from "../components/Column";

function TableView() {

    const navigate = useLocation();

    const [moat,setMoat] = React.useState(navigate.state.moatName)
    const [owner,setOwner] = React.useState(navigate.state.owner)
    const [privKey,setPrivKey] = React.useState(navigate.state.privKey)
    const [secret,setSecret] = React.useState(navigate.state.secret)
    const [schema,setSchema] = React.useState(navigate.state.schemaName)
    const [table,setTable] = React.useState(navigate.state.tableName)

    const [cols,setCols] = React.useState([])
    const [rows,setRows] = React.useState([])

    React.useEffect(() => {
        console.log(navigate);
        console.log(moat);
        console.log(owner);
        console.log(privKey);
        console.log(secret);
        console.log(schema);
        console.log(table);

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
            const result = await kwilDB.query(`SELECT * FROM ${table};`);
            console.log(result);
            setCols(result.fields)
            setRows(result.rows)
        });
    }, []);

    return (
        <div>
            <h1 style = {{textAlign:'center'}}>{table} table</h1>
            <div style={{minWidth:'30vw',border:'1px solid black',marginLeft:'auto',marginRight:'auto',display:'flex'}}>
                {cols.map((column, index) => (
                    <Column header = {column.name} arr={rows}/>

                ))}
            </div>
        </div>
    )
}

export default TableView;