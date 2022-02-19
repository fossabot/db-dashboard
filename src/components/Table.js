import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

function Table({ name, schemaName, moatName, privKey, owner, secret }) {
	const navigate = useNavigate();

	const navigateToTableData = (e) => {
		e.preventDefault();
		setTimeout(async function () {
			navigate('/data', {
				state: {
					tableName: name,
					moatName: moatName,
					privKey: privKey,
					owner: owner,
					secret: secret,
					schemaName: schemaName,
				},
			});
		}, 0);
	};

	return (
		<div
			style={{
				maxWidth: '90vw',
				overflow: 'hidden',
				borderBottom: '1px solid black',
				marginLeft: 'auto',
				marginRight: 'auto',
				padding: '5px',
			}}
		>
			<Button
				fullWidth
				onClick={navigateToTableData}
				sx={{ textTransform: 'none', color: '#fff', justifyContent: 'start' }}
			>
				{name}
			</Button>
		</div>
	);
}

export default Table;
