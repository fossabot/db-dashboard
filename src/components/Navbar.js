import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function NavBar({ page }) {
	const navigate = useNavigate();

	const openHome = () => {
		window.open('https://kwil.com', '_blank');
	};

	const openDocs = () => {
		window.open('https://docs.kwil.com', '_blank');
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div id='nav-wrapper' style={{ position: 'fixed', zIndex: 10 }}>
			<div
				id='nav-top-bar'
				style={{
					zIndex: 5,
					backgroundColor: 'transparent',
					width: '100vw',
					height: '64px',
					display: 'flex',
					marginTop: '10px',
				}}
			>
				<Button
					startIcon={<ArrowBackIosIcon />}
					variant='text'
					onClick={goBack}
					sx={{
						color: '#fff',
						textTransform: 'none',
						margin: 'auto 20px auto 40px',
						display: page === 'home' ? 'none' : 'flex',
					}}
				>
					Back
				</Button>
				<Button
					onClick={openHome}
					sx={{
						textTransform: 'none',
						margin: 'auto 0px auto auto',
						color: '#fff',
					}}
					variant='text'
				>
					Home Page
				</Button>
				<Button
					onClick={openDocs}
					sx={{ textTransform: 'none', margin: 'auto 40px auto 20px', color: '#fff' }}
					variant='text'
				>
					API Documentation
				</Button>
			</div>
		</div>
	);
}
