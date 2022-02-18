import React from 'react';
import { useNavigate } from 'react-router-dom';
import KwilDB from 'kwildbweb';
import { Button, Modal, TextField } from '@mui/material';
import { ethers } from 'ethers';

function Moat({ moatName, privateKey, owner, secret }) {
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);

	const [phrase, setPhrase] = React.useState('');

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
		<div
			onClick={() => setOpen(true)}
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
			<Modal open={open}>
				<div>
					<TextField value={phrase} placeholder={'Signing Phrase'} onChange={(e) => setPhrase(e.target.value)} />
					<Button onClick={navigateToMoat}>Submit</Button>
				</div>
			</Modal>
		</div>
	);
}

export default Moat;
