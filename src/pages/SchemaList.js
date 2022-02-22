import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import KwilDB from 'kwildbweb';

import {Button, InputBase, Modal, Breadcrumbs} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'

import NavTree from '../components/NavTree';
import Schema from '../components/Schema';
import Navbar from '../components/Navbar';
// import dark from '../assets/backgrounds/kwil_pattern_dark_2.svg'
import {Skeleton} from "@mui/material";

function SchemaList() {
    const location = useLocation();

    const moat = useRef(location.state.moatName);
    const owner = useRef(location.state.owner);
    const privKey = useRef(location.state.privKey);
    const secret = useRef(location.state.secret);

    const [schemas, setSchemas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newSchema, setNewSchema] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        console.log(location);
        console.log(moat.current);
        console.log(owner.current);
        console.log(privKey.current);
        console.log(secret.current);

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
            setSchemas((await kwilDB.query(`SELECT schema_name
                                           FROM information_schema.schemata;`)).rows);
            setLoading(false)
        });
    }, [location]);

    const createSchema = (e) => {
        e.preventDefault();
        //debug, DELETE
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
            console.log(
                await kwilDB.query(`CREATE SCHEMA if NOT EXISTS ${newSchema}`)
            );
            setAdding(false)
        });
    };

    return (
        <div style={{background: 'linear-gradient(30deg, #101010, #000)', width: '100vw', minHeight: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Navbar page='schemas'/>
                <h1 style={{margin: '20px auto 10px auto', color: '#fff'}}>Database Manager</h1>
                <h3 style={{margin: '0px auto 20px auto', color: '#808080'}}>Schemas</h3>
            </div>
            <div style={{display: 'flex'}}>
                <NavTree />
                <div
                    style={{
                        maxWidth: 'calc(90vw - 200px)',
                        marginLeft: '40px',
                        marginRight: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{display: 'flex', margin: '0px 0px 10px 0px'}}>
                        <Breadcrumbs sx={{color: '#808080'}} aria-label="breadcrumb">
                            <p style={{color: '#808080'}} >
                                {moat.current}
                            </p>
                        </Breadcrumbs>
                        <Button onClick={() => setAdding(true)}
                                sx={{textTransform: 'none', color: '#000', backgroundColor: '#fff !important', borderRadius: '9px', margin: '0px 0px 0px auto', maxHeight: '40px'}}
                                startIcon={<AddIcon/>}>Add Schema</Button>

                    </div>

                    <div id='table' style={{
                        maxWidth:  'calc(90vw - 200px)',
                        minWidth:  'calc(90vw - 200px)',
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

                        {schemas.map((schema, index) =>
                            schema.schema_name !== 'pg_catalog' && schema.schema_name !== 'information_schema' ? (
                                <div style={{borderBottom: index + 1 < schemas.length ? '1px solid #808080' : 'none'}}>
                                    <Schema name={schema.schema_name} moatName={moat.current} secret={secret.current}
                                            owner={owner.current}
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

                    <Modal sx={{display: 'flex'}} open={adding} onClose={() => setAdding(false)}>
                        <div style={{
                            backgroundColor: '#151515',
                            margin: 'auto',
                            padding: '10px',
                            borderRadius: '12px',
                            display: 'flex'
                        }}>
                            <InputBase
                                sx={{
                                    flex: 1,
                                    backgroundColor: '#212121',
                                    color: '#fff',
                                    borderRadius: '9px',
                                    pl: '10px',
                                    minHeight: '45px',
                                }}
                                onChange={(e) => setNewSchema(e.target.value)}
                                placeholder='New schema name...'
                                value={newSchema}
                                inputProps={{
                                    autoCorrect: 'off',
                                }}
                            />
                            <Button
                                sx={{color: '#fff', textTransform: 'none', margin: '0px 10px', borderRadius: '9px'}}
                                onClick={createSchema}
                            >
                                Create Schema
                            </Button>
                        </div>
                    </Modal>
                </div>
            </div>

        </div>
    );
}

export default SchemaList;
