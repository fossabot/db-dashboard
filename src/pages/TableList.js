import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import KwilDB from 'kwildbweb';
import { Button } from '@mui/material';

import Navbar from '../components/Navbar';
import Table from '../components/Table';

function TableList() {
	const navigate = useLocation();

	const [moat, setMoat] = useState(navigate.state.moatName);
	const [owner, setOwner] = useState(navigate.state.owner);
	const [privKey, setPrivKey] = useState(navigate.state.privKey);
	const [secret, setSecret] = useState(navigate.state.secret);
	const [schema, setSchema] = useState(navigate.state.schemaName);

	const [tables, setTables] = useState([]);
	const [showing, setShowing] = useState(false);

	const createTable = (e) => {
		e.preventDefault();
		//debug, DELETE
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
			console.log(
				await kwilDB.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)')
			);
		});
	};

	const insertTable = (e) => {
		e.preventDefault();
		//debug, DELETE
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
			console.log(await kwilDB.query(`INSERT INTO tab (bundle_id,height) VALUES ('hide',5)`));
		});
	};

	useEffect(() => {
		console.log(navigate);
		console.log(moat);
		console.log(owner);
		console.log(privKey);
		console.log(secret);
		console.log(schema);

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
			setTables(
				(await kwilDB.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${schema}';`)).rows
			);
			setShowing(true);
		});
	}, []);

	return (
		<div style={{ background: 'linear-gradient(30deg, #212121, #000)', width: '100vw', minHeight: '100vh' }}>
			{/* <Button onClick={insertTable} sx={{ position: 'abolute', top: 100, left: 100 }}>
				insert
			</Button> */}
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar page='schema' />
				<h1 style={{ margin: '20px auto 10px auto', color: '#fff' }}>Database Manager</h1>
				<h3 style={{ margin: '0px auto 10px auto', color: '#808080' }}>Tables</h3>
				<h3 style={{ margin: '0px auto 20px auto', color: '#808080' }}>
					{moat} / {schema} /
				</h3>
			</div>
			<div
				style={{
					backgroundColor: '#434343',
					margin: '40px',
					borderRadius: '12px',
					paddingBottom: showing ? '20px' : 'none',
				}}
			>
				{tables.map((table, index) => (
					<Table
						name={table.table_name}
						privKey={privKey}
						moatName={moat}
						owner={owner}
						secret={secret}
						schemaName={schema}
					/>
				))}
			</div>
		</div>
	);
}

export default TableList;
