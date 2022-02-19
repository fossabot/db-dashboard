import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KwilDB from 'kwildbweb';
import { Button, Popover, InputBase } from '@mui/material';
import { ethers } from 'ethers';

function Moat({ moatName, privateKey, owner, secret }) {
	const navigate = useNavigate();

	const [phrase, setPhrase] = useState('');

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		console.log('what the fuck');
		setAnchorEl(null);
		console.log(open);
	};
	const open = Boolean(anchorEl);

	const navigateToMoat = (e) => {
		e.preventDefault();
		setTimeout(async function () {
			console.log(phrase);
			await window.ethereum.send('eth_requestAccounts');
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log(provider);
			const signer = provider.getSigner();
			console.log(signer);
			const signature = await signer.signMessage(phrase);
			const address = await signer.getAddress();
			const privKeyResult = JSON.parse(await KwilDB.decryptKey(signature, address, privateKey));
			const secretResult = await KwilDB.decryptKey(signature, address, secret);
			console.log(privKeyResult);
			console.log(secretResult);

			navigate('/schemas', {
				state: { moatName: moatName, privKey: privKeyResult, owner: owner, secret: secretResult },
			});
		}, 0);
	};

	return (
		<>
			<div
				onClick={handleClick}
				style={{
					maxWidth: '90vw',
					overflow: 'hidden',
					borderBottom: '1px solid black',
					marginLeft: 'auto',
					marginRight: 'auto',
					padding: '5px',
				}}
			>
				<p style={{ color: '#fff' }}>Moat: {moatName}</p>
				<p style={{ color: '#fff' }}>Encrypted Private Key: {privateKey}</p>
				<p style={{ color: '#fff' }}>Owner Address: {owner}</p>
				<p style={{ color: '#fff' }}>Encrypted Secret: {secret}</p>
			</div>
			<Popover
				sx={{
					borderRadius: '9px',
					'& .MuiPopover-paper': {
						backgroundColor: '#151515',
					},
				}}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div style={{ display: 'flex', backgroundColor: '#151515', margin: '4px' }}>
					<InputBase
						sx={{
							flex: 1,
							bgcolor: '#212121',
							color: '#fff',
							borderRadius: '9px',
							pl: '10px',
							minHeight: '45px',
						}}
						onChange={(e) => setPhrase(e.target.value)}
						placeholder='Signing phrase'
						value={phrase}
						inputProps={{
							autoCorrect: 'off',
						}}
					/>

					<Button
						sx={{ color: '#fff', textTransform: 'none', margin: '0px 10px', borderRadius: '9px' }}
						onClick={navigateToMoat}
					>
						Submit
					</Button>
				</div>
			</Popover>
		</>
	);
}

export default Moat;
