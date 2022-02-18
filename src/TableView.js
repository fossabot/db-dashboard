import React from 'react';
import {useLocation} from "react-router-dom";
import KwilDB from "kwildbweb";
import {Button} from "@mui/material";
import SchemaEntry from "./SchemaEntry";
import Table from "./Table";

function TableView() {

    const navigate  = useLocation();

    const [moat,setMoat] = React.useState(navigate.state.moatName)
    const [owner,setOwner] = React.useState(navigate.state.owner)
    const [privKey,setPrivKey] = React.useState(navigate.state.privKey)
    const [secret,setSecret] = React.useState(navigate.state.secret)
    const [schema,setSchema] = React.useState(navigate.state.schemaName)

    const [tables,setTables] = React.useState([])

    const createTable = (e) => {
        e.preventDefault();
        //debug, DELETE
        setTimeout(async function () {
            const kwilDB = (KwilDB.createConnector({
                host: '34.138.54.12:80',
                protocol: 'http',
                port: null,
                moat: moat,
                privateKey: privKey,
            }, secret))
            console.log(await kwilDB.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
        });

    }

    const insertTable = (e) => {
        e.preventDefault();
        //debug, DELETE
        setTimeout(async function () {
            const kwilDB = (KwilDB.createConnector({
                host: '34.138.54.12:80',
                protocol: 'http',
                port: null,
                moat: moat,
                privateKey: privKey,
            }, secret))
            console.log((await kwilDB.query(`INSERT INTO tab (bundle_id,height) VALUES ('hide',5)`)));
        });

    }

    React.useEffect(() => {
        console.log(navigate);
        console.log(moat);
        console.log(owner);
        console.log(privKey);
        console.log(secret);
        console.log(schema);

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
            setTables((await kwilDB.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${schema}';`)).rows)
        });
    }, []);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Tables in {schema} Schema</h1>
            <Button onClick={insertTable}>create table</Button>
            {tables.map((table, index) => (
                <Table name={table.table_name} privKey={privKey} moatName={moat} owner={owner} secret={secret} schemaName={schema} />
            ))}
        </div>
    )
}

export default TableView;