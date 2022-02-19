import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import KwilDB from 'kwildbweb';

import Navbar from '../components/Navbar';
import Column from '../components/Column';

function TableView() {
	const navigate = useLocation();

	const [moat, setMoat] = useState(navigate.state.moatName);
	const [owner, setOwner] = useState(navigate.state.owner);
	const [privKey, setPrivKey] = useState(navigate.state.privKey);
	const [secret, setSecret] = useState(navigate.state.secret);
	const [schema, setSchema] = useState(navigate.state.schemaName);
	const [table, setTable] = useState(navigate.state.tableName);

	const [cols, setCols] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
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
			const kwilDB = KwilDB.createConnector(
				{
					host: '34.138.54.12:80',
					protocol: 'http',
					port: null,
					moat: moat,
					privateKey: privKey,
				},
				secret
			);
			const result = await kwilDB.query(`SELECT * FROM ${table};`);
			console.log(result);
			setCols(result.fields);
			setRows(result.rows);
		});
	}, []);

	return (
		<div style={{ background: 'linear-gradient(30deg, #212121, #000)', width: '100vw', minHeight: '100vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar page='schema' />
				<h1 style={{ margin: '20px auto 10px auto', color: '#fff' }}>Database Manager</h1>
				<h3 style={{ margin: '0px auto 10px auto', color: '#808080' }}>Tables</h3>
				<h3 style={{ margin: '0px auto 20px auto', color: '#808080' }}>
					{moat} / {schema} / {table}
				</h3>
			</div>
			<div
				style={{
					maxWidth: '90vw',
					minWidth: '10vw',
					border: '1px solid #434343',
					marginLeft: 'auto',
					marginRight: 'auto',
					display: 'flex',
				}}
			>
				{cols.map((column, index) => (
					<Column header={column.name} arr={rows} />
				))}
			</div>
		</div>
	);
}

export default TableView;
