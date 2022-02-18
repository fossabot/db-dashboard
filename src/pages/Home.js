import React from 'react';

import { Button } from '@mui/material';

import Kwil from '../assets/logos/kwil.svg';
import grad1 from '../assets/gradients/grad1.svg';
import Navbar from '../components/Navbar';

export default function Home() {
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
			<Navbar page='home' />
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
