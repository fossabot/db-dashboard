import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import KwilDB from 'kwildbweb';

import Moat from '../components/Moat';
import Schema from '../components/Schema';
import Navbar from '../components/Navbar';

function SchemaList() {
	const navigate = useLocation();

	const [moat, setMoat] = useState(navigate.state.moatName);
	const [owner, setOwner] = useState(navigate.state.owner);
	const [privKey, setPrivKey] = useState(navigate.state.privKey);
	const [secret, setSecret] = useState(navigate.state.secret);

	const [schema, setSchema] = useState([]);
	const [showing, setShowing] = useState(false);

	useEffect(() => {
		console.log(navigate);
		console.log(moat);
		console.log(owner);
		console.log(privKey);
		console.log(secret);

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
			setSchema((await kwilDB.query(`SELECT schema_name FROM information_schema.schemata;`)).rows);
			setShowing(true);
		});
	}, []);

	return (
		<div style={{ background: 'linear-gradient(30deg, #212121, #000)', width: '100vw', minHeight: '100vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar page='schema' />
				<h1 style={{ margin: '20px auto 10px auto', color: '#fff' }}>Database Manager</h1>
				<h3 style={{ margin: '0px auto 10px auto', color: '#808080' }}>Schemas</h3>
				<h3 style={{ margin: '0px auto 20px auto', color: '#808080' }}>{moat} /</h3>
			</div>
			<div
				style={{
					backgroundColor: '#434343',
					margin: '40px',
					borderRadius: '12px',
					paddingBottom: showing ? '20px' : 'none',
				}}
			>
				{schema.map((schema, index) =>
					schema.schema_name !== 'pg_catalog' && schema.schema_name !== 'information_schema' ? (
						<Schema name={schema.schema_name} moatName={moat} secret={secret} owner={owner} privKey={privKey} />
					) : (
						<div />
					)
				)}
			</div>
		</div>
	);
}

export default SchemaList;
