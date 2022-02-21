import React, {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import KwilDB from 'kwildbweb';

import Schema from '../components/Schema';
import Navbar from '../components/Navbar';
import dark from '../assets/backgrounds/kwil_pattern_dark_2.svg'
import {Skeleton} from "@mui/material";

function SchemaList() {
    const navigate = useLocation();

    const moat = useRef(navigate.state.moatName);
    const owner = useRef(navigate.state.owner);
    const privKey = useRef(navigate.state.privKey);
    const secret = useRef(navigate.state.secret);

    const [schema, setSchema] = useState([]);
const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(navigate);
        console.log(moat.current);
        console.log(owner.current);
        console.log(privKey.current);
        console.log(secret.current);

        /*SELECT schema_name
        FROM information_schema.schemata;*/
        setTimeout(async function () {
            const kwilDB = KwilDB.createConnector(
                {
                    host: '34.138.54.12:80',
                    protocol: 'http',
                    port: null,
                    moat: moat.current,
                    privateKey: privKey.current,
                },
                secret.current
            );
            setSchema((await kwilDB.query(`SELECT schema_name
                                           FROM information_schema.schemata;`)).rows);
           setLoading(false)
        });
    }, [navigate]);

    return (
        <div style={{background: 'linear-gradient(30deg, #101010, #000)', width: '100vw', minHeight: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Navbar page='schema'/>
                <h1 style={{margin: '20px auto 10px auto', color: '#fff'}}>Database Manager</h1>
                <h3 style={{margin: '0px auto 10px auto', color: '#808080'}}>Schemas</h3>
            </div>
            <div
                style={{
                    maxWidth: '90vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <h3 style={{margin: '0px auto 20px 0px', color: '#808080'}}>
                    {moat.current}
                </h3>
                <div id='table' style={{
                    maxWidth: '90vw',
                    minWidth: '90vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#212121',
                    borderRadius: '12px'
                }}>
                    <p style={{
                        backgroundColor: '#151515',
                        borderRadius: '12px 12px 0px 0px',
                        color: '#fff',
                        padding: '20px 0px 20px 20px',
                        borderBottom: '1px solid #fff',
                        margin: '0px'
                    }}>Schema Name</p>

                    {schema.map((schema, index) =>
                        schema.schema_name !== 'pg_catalog' && schema.schema_name !== 'information_schema' ? (
                            <div style={{borderBottom: index + 1 < schema.length ? '1px solid #808080' : 'none'}}>
                                <Schema name={schema.schema_name} moatName={moat.current} secret={secret.current} owner={owner.current}
                                        privKey={privKey.current}/>
                            </div>
                        ) : (
                            <div/>
                        )
                    )}

                    <div style={{display: loading ? 'flex' : 'none', flexDirection: 'column'}}>
                        <div style={{
                            display: 'flex',
                            width: 'calc(100% - 10px )',
                            padding: '14px 0px 14px 10px',
                            borderBottom: '1px solid #808080'
                        }}>
                            <Skeleton variant='text' width='50%' sx={{backgroundColor: '#808080'}}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: 'calc(100% - 10px )',
                            padding: '14px 0px 14px 10px',
                            borderBottom: '1px solid #808080'
                        }}>
                            <Skeleton variant='text' width='50%' sx={{backgroundColor: '#808080'}}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: 'calc(100% - 10px )',
                            padding: '14px 0px 14px 10px',
                            borderBottom: '1px solid #808080'
                        }}>
                            <Skeleton variant='text' width='50%' sx={{backgroundColor: '#808080'}}/>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: 'calc(100% - 10px )',
                            padding: '14px 0px 14px 10px',
                        }}>
                            <Skeleton variant='text' width='50%' sx={{backgroundColor: '#808080'}}/>
                        </div>
                    </div>
                </div>


                {/*{schema.map((schema, index) =>
					schema.schema_name !== 'pg_catalog' && schema.schema_name !== 'information_schema' ? (
						<Schema name={schema.schema_name} moatName={moat.current} secret={secret.current} owner={owner.current} privKey={privKey.current} />
					) : (
						<div />
					)
				)}*/}
            </div>
        </div>
    );
}

export default SchemaList;
