import React from 'react';
import { ethers } from 'ethers';
import KwilDB from 'kwildbweb';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Fade, IconButton, InputAdornment, InputBase, Popper } from '@mui/material';
import kwilPattern from '../kwil_pattern_dark_2.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

import Kwil from '../assets/logos/kwil.svg';
import grad1 from '../assets/gradients/grad1.svg';
import grad2 from '../assets/gradients/grad2.svg';

export default function Create() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const closePopper = (event) => {
		setAnchorEl(null);
	};

	const [moatName, setMoatName] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [signingPhrase, setSigningPhrase] = React.useState('');

	const createMoat = (e) => {
		e.preventDefault();
		//debug, DELETE
		console.log(moatName);
		setLoading(!loading);

		setTimeout(async function () {
			await window.ethereum.send('eth_requestAccounts');
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log(provider);
			const signer = provider.getSigner();
			console.log(signer);
			const signature = await signer.signMessage(signingPhrase);
			const address = await signer.getAddress();
			console.log('Moat Name:');
			console.log(moatName);
			console.log(' ');
			console.log('Signature:');
			console.log(signature);
			console.log(' ');
			console.log('Address:');
			console.log(address);
			console.log(' ');
			//kwilDB2.current.addMoat('tester',address,'superencrypted','supahsecret');
			//kwilDB2.current.updateSecret('tester','newseccc')
			//console.log(await KwilDB.createMoat("http://34.138.54.12:80",moatName,signature,address));
			const result = await KwilDB.createMoat('http://34.138.54.12:80', moatName, signature, address);
			setLoading(false);
			if (result.creation === false) {
				window.alert('Moat creation was not Successful. Reason: ' + result.reason);
			} else {
				window.alert('Moat creation was Successful! Start querying and/or head over to the DB Manager!');
			}
		}, 0);
	};

	return (
		<div
			style={{
				width: '100vw',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				background: 'linear-gradient(210deg, #212121, #000)',
				overflow: 'hidden',
			}}
		>
			{/* <img
				style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, objectFit: 'cover', zIndex: -2 }}
				src={kwilPattern}
				alt={''}
			/> */}
			<img src={grad1} alt='bg-gradient' style={{ position: 'absolute', top: 200 }} />
			<img src={Kwil} style={{ height: '90px', marginTop: '20vh' }} />
			<h1
				style={{
					textAlign: 'center',
					fontSize: 50,
					marginLeft: 'auto',
					marginRight: 'auto',

					background: '-webkit-linear-gradient(45deg, #FF4F99 30%, #717AFF 90%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				Welcome to Kwil DB
			</h1>
			<div style={{ display: 'flex' }}>
				<Button
					href='/moats'
					sx={{
						textTransform: 'none',
						fontSize: 16,
						border: 'none',
						borderRadius: '9px',
						padding: '6px 20px',
						width: 'fit-content',
						color: '#000',
						boxShadow: 'none !important',
						backgroundColor: '#fff !important',
						margin: '20px 20px auto auto',
					}}
				>
					Database Manager
				</Button>
				<Button
					href='/create'
					sx={{
						textTransform: 'none',
						fontSize: 16,
						border: 'none',
						borderRadius: '9px',
						padding: '6px 20px',
						width: 'fit-content',
						color: '#000',
						boxShadow: 'none !important',
						background: '#fff !important',
						margin: '20px auto auto 20px',
					}}
				>
					Create New Moat
				</Button>
			</div>
		</div>
	);
}
