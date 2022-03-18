import React from 'react';
import './App.css';
//import { ethers } from 'ethers';
import {providers} from "ethers";
import KwilDB from 'kwildb';
import Main from './Main';

function App() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const closePopper = (event) => {
		setAnchorEl(null);
	};

	/*const kwilDB = React.useRef(KwilDB.createConnector({
        host: '34.1',
        protocol: 'http',
        port: null,
        moat: 'testermoat4',
        privateKey: devkey,
    }, '<,c(n6,P[7oEHB4%pbb.I>$@V4XNRDW}'))*/

	/*const kwilDB2 = React.useRef(KwilDB2.createConnectorRegistry({
        host: 'localhost',
        protocol: 'http',
        port: 1984,
        moat: 'test7',
        apiKey: '9ydoed[GGu,KJ<m6Wm<FhrdHY;fl5bpX',
    }, 'o~>halS(K>UJ]ET1[Gh?Uo-#rr3Dp[=>'))*/

	const [moatName, setMoatName] = React.useState('');
	const [moats, setMoats] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [signingPhrase, setSigningPhrase] = React.useState('');

	const createMoat = (e) => {
		e.preventDefault();
		//debug, DELETE
		console.log(moatName);
		setLoading(!loading);

		setTimeout(async function () {
			await window.ethereum.send('eth_requestAccounts');
			const provider = new providers.Web3Provider(window.ethereum);
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
			const result = await KwilDB.createMoat("https://test-db.kwil.xyz", moatName, signature, address);
			setLoading(false);
			if (result.creation === false) {
				window.alert('Moat creation was not Successful. Reason: ' + result.reason);
			} else {
				window.alert('Moat creation was Successful! Start querying and/or head over to the DB Manager!');
			}
		}, 0);
		/*setTimeout(async function () {

            //console.log(await KwilDB.getMoats("http://34.138.54.12:80",'0xFeE8197af2aAd0d506357d39EF42b3183dcDbc54'));
            //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
            const kwilDB = (KwilDB.createConnector({
                host: '34.138.54.12:80',
                protocol: 'http',
                port: null,
                moat: 'testermoat4',
                privateKey: devkey,
            }, '<,c(n6,P[7oEHB4%pbb.I>$@V4XNRDW}'))
            console.log(await kwilDB.query('INSERT INTO tab (bundle_id,height) VALUES (hello,5);'));

        }, 0);*/
	};

	const getMoats = (e) => {
		e.preventDefault();
		//debug, DELETE
		setTimeout(async function () {
			setMoats(await KwilDB.getMoats("https://test-db.kwil.xyz", '0xFeE8197af2aAd0d506357d39EF42b3183dcDbc54'));
			//console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
			//console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));
		}, 0);
	};

	return <Main />;
}

export default App;
