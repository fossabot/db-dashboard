import React from 'react';
import {ethers} from "ethers";
import KwilDB from "kwildbweb";
import {useNavigate} from "react-router-dom";

function SchemaEntry({name,moatName,privKey,owner,secret}) {

    const navigate = useNavigate();

    const navigateToTables = (e) => {
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
            /*console.log(phrase);
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
            console.log(secretResult);*/

            /*history.push({
                pathname: '/moat',
                state: {
                    moatName: moatName,
                    privKey: privKeyResult,
                    owner: owner,
                    secret: secretResult,
                },
            });*/
            navigate('/schema',{state:{moatName: moatName, privKey: privKey, owner: owner, secret: secret, schemaName:name}});




            //console.log(await kwilDB.current.query('CREATE TABLE if NOT EXISTS tab(bundle_id varchar(20) PRIMARY KEY, height integer NOT NULL)'));
            //console.log(await kwilDB.current.query('INSERT INTO tab (bundle_id,height) VALUES '));

        }, 0);
    };

    return (
        <div onClick={navigateToTables}>
            <p>{name}</p>
        </div>
    )
}

export default SchemaEntry;