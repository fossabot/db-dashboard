import React, { useState } from 'react';
import KwilDB from 'kwildbweb';
import { ethers } from 'ethers';

import { Button, Modal } from '@mui/material';

import Moat from '../components/Moat';
import { ReactComponent as Metamask } from '../assets/logos/MetaMask_Fox.svg';
import Arconnect from '../assets/logos/arconnect.png';
import Navbar from '../components/Navbar';

function MoatList() {
	const [moats, setMoats] = useState([]);
	const [showing, setShowing] = useState(false);

	const getMoatsMeta = (e) => {
		e.preventDefault();
		//debug, DELETE
		setTimeout(async function () {
			await window.ethereum.send('eth_requestAccounts');
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const address = await signer.getAddress();

			setMoats(await KwilDB.getMoats('http://34.138.54.12:80', address));
			setShowing(true);
			//console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
			//console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));
		}, 0);
	};

	const getMoatsAR = (e) => {
		e.preventDefault();
		//debug, DELETE
		setTimeout(async function () {
			if (window.arweaveWallet) {
				const info = {
					name: 'KwilDB', // optional application name
					//logo:KwilLogo
				};

				console.log(await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGNATURE'], info));

				const address = await window.arweaveWallet.getActiveAddress();
				console.log(address);

				setMoats(await KwilDB.getMoats('http://34.138.54.12:80', address));
				setShowing(true);
			} else {
				window.alert('arconnect not detected');
			}
		}, 0);
	};

	return (
		<div style={{ background: 'linear-gradient(30deg, #212121, #000)', width: '100vw', minHeight: '100vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Navbar page='moats' />
				<h1 style={{ margin: '20px auto 10px auto', color: '#fff' }}>Database Manager</h1>
				<h3 style={{ margin: '0px auto 20px auto', color: '#808080' }}>Moats</h3>
				<div style={{ display: showing ? 'none' : 'flex' }}>
					<Button
						onClick={getMoatsAR}
						sx={{
							color: '#717AFF',
							textTransform: 'none',
							fontSize: 16,
							border: 'none',
							borderRadius: '9px',
							padding: '6px 20px',
							//width: '300px',
							color: '#000',
							boxShadow: 'none !important',
							backgroundColor: '#fff !important',
							margin: 'auto 10px auto auto',
							'& .MuiLoadingButton-loadingIndicator': { color: '#717AFF' },
						}}
						endIcon={<img src={Arconnect} alt='' style={{ height: '24px', marginTop: '-4px' }} />}
					>
						Load
					</Button>
					<Button
						onClick={getMoatsMeta}
						sx={{
							color: '#717AFF',
							textTransform: 'none',
							fontSize: 16,
							border: 'none',
							borderRadius: '9px',
							padding: '6px 20px',
							//width: '300px',
							color: '#000',
							boxShadow: 'none !important',
							backgroundColor: '#fff !important',
							margin: 'auto auto auto 10px',
							'& .MuiLoadingButton-loadingIndicator': { color: '#717AFF' },
						}}
						endIcon={<Metamask style={{ height: '24px' }} />}
					>
						Load
					</Button>
				</div>
			</div>
			<div
				style={{
					backgroundColor: '#434343',
					margin: '40px',
					borderRadius: '12px',
					paddingBottom: showing ? '20px' : 'none',
				}}
			>
				{moats.map((moat, index) => (
					<Moat key={index} owner={moat.owner} secret={moat.secret} privateKey={moat.api_key} moatName={moat.moat} />
				))}
			</div>
		</div>
	);
}

export default MoatList;
