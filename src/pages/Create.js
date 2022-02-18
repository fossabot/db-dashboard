import React from 'react';
import { ethers } from 'ethers';
import KwilDB from 'kwildbweb';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Fade, IconButton, InputAdornment, InputBase, Popper, SvgIcon } from '@mui/material';
import kwilPattern from '../kwil_pattern_dark_2.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import grad2 from '../assets/gradients/grad2.svg';
import grad3 from '../assets/gradients/grad3.svg';

import SendIcon from '@mui/icons-material/Send';
import { ReactComponent as Metamask } from '../assets/logos/MetaMask_Fox.svg';

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
				background: 'linear-gradient(30deg, #212121, #000)',
			}}
		>
			{/* <img
				style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, objectFit: 'cover', zIndex: -1 }}
				src={kwilPattern}
				alt={''}
			/> */}
			<Button
				variant='text'
				href='/'
				sx={{ position: 'absolute', color: '#fff', textTransform: 'none', top: '20px', left: '20px' }}
			>
				Back
			</Button>

			{/* <img src={grad3} alt='bg-gradient' style={{ position: 'absolute', height: '100vh' }} />
			<img src={grad2} alt='bg-gradient' style={{ position: 'absolute', height: '100vh', right: 0 }} /> */}
			<h1
				style={{
					textAlign: 'center',
					fontSize: 50,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '20vh',
					background: '-webkit-linear-gradient(45deg, #FF4F99 30%, #717AFF 90%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				Create your Moat on KwilDB
			</h1>
			<InputBase
				value={moatName}
				placeholder={'Name'}
				sx={{
					paddingLeft: '15px',
					paddingRight: '10px',
					margin: '50px auto 0px auto',
					width: '350px',
					height: '40px',
					backgroundColor: 'white',
					borderRadius: '9px',
					border: 'none !important',
					'& .MuiFilledInput-underline': { borderBottom: '0px solid black !important' },
				}}
				hiddenLabel={true}
				id='outlined-basic'
				variant='filled'
				label=''
				onChange={(e) => setMoatName(e.target.value)}
			/>
			<InputBase
				sx={{
					paddingLeft: '15px',
					paddingRight: '10px',
					margin: '30px auto 70px auto',
					width: '350px',
					height: '40px',
					backgroundColor: 'white',
					borderRadius: '9px',
					border: 'none !important',
					'& .MuiFilledInput-underline': { borderBottom: '0px solid black !important' },
				}}
				hiddenLabel={true}
				id='outlined-basic'
				variant='filled'
				placeholder={'Signing phrase'}
				value={signingPhrase}
				onChange={(e) => setSigningPhrase(e.target.value)}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							sx={{ marginRight: '2px', marginLeft: '-5px' }}
							onClick={handleClick}
							//onMouseDown={handleMouseDownPassword}
							edge='end'
						>
							<HelpOutlineIcon />
						</IconButton>
					</InputAdornment>
				}
			/>

			<Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-start'} transition>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Box sx={{ border: 1, p: 1, bgcolor: ' rgb(33, 33, 33)', width: '325px' }}>
							<IconButton onClick={closePopper} sx={{ marginLeft: 0, padding: 0, width: '15px' }}>
								<CloseIcon style={{ fill: 'white', height: '15px' }} />
							</IconButton>
							<p style={{ color: 'white', marginTop: '5px', fontSize: '10px' }}>
								The Signing Phrase is a phrase or word, chosen by you, that will be signed to encrypt/decrypt your keys
								and secrets. Please make sure it is uncommon so as to avoid ever signing this phrase on accident.
							</p>
						</Box>
					</Fade>
				)}
			</Popper>
			<div
				style={{
					marginBottom: 'auto',
					width: '350px',
					marginLeft: 'auto',
					marginRight: 'auto',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<LoadingButton
					sx={{
						color: '#717AFF',
						textTransform: 'none',
						fontSize: 16,
						border: 'none',
						borderRadius: '9px',
						padding: '6px 20px',
						width: '300px',
						color: '#000',
						boxShadow: 'none !important',
						backgroundColor: '#fff !important',
						margin: '20px 20px auto auto',
						'& .MuiLoadingButton-loadingIndicator': { color: '#717AFF' },
					}}
					loading={loading}
				>
					Create Moat on ArConnect
				</LoadingButton>
				<Button
					onClick={createMoat}
					sx={{
						color: '#717AFF',
						textTransform: 'none',
						fontSize: 16,
						border: 'none',
						borderRadius: '9px',
						padding: '6px 20px',
						width: '300px',
						color: '#000',
						boxShadow: 'none !important',
						backgroundColor: '#fff !important',
						margin: '20px 20px auto auto',
						'& .MuiLoadingButton-loadingIndicator': { color: '#717AFF' },
					}}
					endIcon={<SvgIcon style={{ height: '24px' }} component={Metamask} />}
				>
					Create Moat
				</Button>
			</div>
		</div>
	);
}
