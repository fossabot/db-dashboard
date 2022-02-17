import React from 'react';
import {useNavigate} from "react-router-dom";
import KwilDB from "kwildbweb";
import {Button, Modal, TextField} from "@mui/material";
import {ethers} from "ethers";

function Moat({moatName,privateKey,owner,secret}) {

    const navigate = useNavigate();

    const [open,setOpen] = React.useState(false);

    const [phrase,setPhrase] = React.useState('');

    const navigateToMoat = (e) => {
        e.preventDefault();
        //debug, DELETE

        /*history.push({
            pathname: '/moat',
            state: {
                moatName: moatName,
                privKey:privateKey,
                owner: owner,
                secret:secret,
            },
        });*/
        setTimeout(async function () {
            console.log(phrase);
            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const signature = await signer.signMessage(phrase);
            const address = await signer.getAddress();
            const privKeyResult = JSON.parse(await KwilDB.decryptKey(signature,address,privateKey));
            const secretResult = await KwilDB.decryptKey(signature,address,secret);
            console.log(privKeyResult);
            console.log(secretResult);

            /*history.push({
                pathname: '/moat',
                state: {
                    moatName: moatName,
                    privKey: privKeyResult,
                    owner: owner,
                    secret: secretResult,
                },
            });*/
            navigate('/moat',{state:{moatName: moatName, privKey: privKeyResult, owner: owner, secret: secretResult}});




            //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
            //console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));

        }, 0);
    };

    return (
        <div onClick={()=>setOpen(true)} style={{maxWidth:'90vw',overflow:'hidden',border:"1px solid black",marginLeft:'auto',marginRight:'auto',padding:'5px'}}>
            <p>Moat: {moatName}</p>
            <p>Encrypted Private Key: {privateKey}</p>
            <p>Owner Address: {owner}</p>
            <p>Encrypted Secret: {secret}</p>
            <Modal
                open = {open}
            >
                <div>
                    <TextField value = {phrase} placeholder={'Signing Phrase'} onChange={(e) => setPhrase(e.target.value)} />
                    <Button onClick={navigateToMoat}>Submit</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Moat;