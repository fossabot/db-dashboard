import React from 'react';
import KwilDB from "kwildbweb";
import {Button, Modal} from "@mui/material";
import {ethers} from "ethers";
import Moat from "./Moat"

function Moats() {

    const [moats,setMoats] = React.useState([]);
    const [open,setOpen] = React.useState(false);

    const getMoatsMeta = (e) => {
        e.preventDefault();
        //debug, DELETE
        setTimeout(async function () {

            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            setMoats(await KwilDB.getMoats("http://34.138.54.12:80",address))
            //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
            //console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));

        }, 0);
    };

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Button onClick={getMoatsMeta}>Get Moats w/ Metamask</Button>
                <h1>Database Manager</h1>
                <Button >Get Moats w/ Arweave</Button>
            </div>
            {moats.reverse().map((moat, index) => (
                <Moat key = {index} owner={moat.owner} secret={moat.secret} privateKey={moat.api_key} moatName={moat.moat}/>
            ))}

        </div>
    )
}

export default Moats;