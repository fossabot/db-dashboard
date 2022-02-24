import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KwilDB from "kwildbweb";

import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function NavTree() {
    const location = useLocation();

    const moat = useRef(location.state.moatName);
    const owner = useRef(location.state.owner);
    const privKey = useRef(location.state.privKey);
    const secret = useRef(location.state.secret);

    const [schemas, setSchemas] = useState([]);
    const [loading, setLoading] = useState(true);

    const dataEx = {
        id: "root",
        name: "Parent",
        children: [
            {
                id: "1",
                name: "Child - 1",
            },
            {
                id: "0",
                name: "Child - 3",
                children: [
                    {
                        id: "4",
                        name: "Child - 4",
                    },
                ],
            },
        ],
    };

    const [data, setData] = useState({});

    useEffect(() => {
        console.log(location);
        console.log(moat.current);
        console.log(owner.current);
        console.log(privKey.current);
        console.log(secret.current);

        setTimeout(async function () {
            const kwilDB = KwilDB.createConnector(
                {
                    host: "34.138.54.12:80",
                    protocol: "http",
                    port: null,
                    moat: moat.current,
                    privateKey: privKey.current,
                },
                secret.current
            );

            let tempData = {
                id: "root",
                name: moat.current,
                children: [],
            };
            let temp = (
                await kwilDB.query(`SELECT schema_name
                                    FROM information_schema.schemata;`)
            ).rows;

            let schemas = [];
            let i = 0;
            let treeItems = 0;

            temp.forEach((schema) => {
                if (
                    schema.schema_name !== "pg_catalog" &&
                    schema.schema_name !== "information_schema"
                ) {
                    setTimeout(async function () {
                        schemas.push({
                            id: "schema " + treeItems,
                            name: schema.schema_name,
                            children: [],
                        });
                        treeItems++;
                        let temp2 = (
                            await kwilDB.query(`SELECT table_name
                                                FROM information_schema.tables
                                                WHERE table_schema = '${schema.schema_name}';`)
                        ).rows;

                        let tables = [];

                        temp2.forEach((table) => {
                            tables.push({id: "table " + treeItems, name: table.table_name});
                            treeItems++;
                        });
                        schemas[i].children = tables;
                        i++;
                        if (i === temp.length - 2) {
                            tempData.children = schemas;
                            console.log(tempData);
                            setData(tempData);
                            setLoading(false);
                        }
                        console.log(i);
                    });
                }
            });
        });
    }, [location]);

    const renderTree = (nodes) => (
        <TreeItem
            sx={{
                color: "#fff",
                borderLeft: nodes.id === "root" ? "1px solid #ff0000" : "none",
            }}
            nodeId={nodes.id}
            label={nodes.name}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{
                height: "calc(100vh - 200px)",
                flexGrow: 1,
                maxWidth: 200,
                backgroundColor: "#000",
                padding: "15px 16px 15px 0px",
                borderRadius: "0px 12px 12px 0px",
                border: "2px solid #323232",
                borderLeft: "none",
            }}
        >
            {renderTree(data)}
        </TreeView>
    );
}