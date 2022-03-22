import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Grid } from "@mui/material";
import FundingPool from "./FundingPool";
import KwilDB from "kwildb";

export default function FundingView({
  moatName,
  privKeyResult,
  secretResult,
  selectedPools,
  update,
}) {
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [usedFunds, setUsedFunds] = useState(0);
  const [usedData, setUsedData] = useState(0);

  useEffect(() => {
    setTimeout(async function () {
      const kwilDB = KwilDB.createConnector(
        {
          host: "test-db.kwil.xyz",
          protocol: "https",
          port: null,
          moat: moatName,
          privateKey: privKeyResult,
        },
        secretResult
      );
      const total = await kwilDB.getMoatFunding();
      setTotalFunds(total.funding);
      setTotalData(Math.round((total.funding / (8.5 * 1.3)) * 1000000000));

      const used = await kwilDB.getMoatDebit();
      setUsedFunds((used.debit / 1000000000) * 8.5 * 1.3);
      setUsedData(used.debit);
    });
  }, [privKeyResult, update]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <p style={{ fontSize: "32px", color: "#fff", margin: "40px 40px 0px" }}>
        Funding Pools
      </p>
      <div
        style={{
          margin: "20px 40px",
          display: totalFunds !== 0 ? "flex" : "none",
        }}
      >
        <div style={{ width: "100px", height: "100px" }}>
          <PieChart
            data={[{ title: "Used", value: usedFunds, color: "#ff4f99" }]}
            totalValue={totalFunds}
            background="#212121"
            viewBoxSize={[100, 100]}
            lineWidth={15}
            rounded
            label={({ dataEntry }) =>
              Math.round((dataEntry.value * 1000) / totalFunds) / 10 + "%"
            }
            labelStyle={{
              fontSize: "20px",
              fontFamily: "sans-serif",
              fill: "#E38627",
            }}
            labelPosition={0}
          />
        </div>

        <div style={{ margin: "auto 20px" }}>
          <p style={{ color: "#fff" }}>
            {usedFunds < 0.01
              ? "Funding Used: < 0.01 USD"
              : `Funding Used: ${usedFunds} USD`}
          </p>
          <p style={{ color: "#fff" }}>
            {totalFunds < 0.01
              ? "Total Funds Available: < 0.01 USD"
              : `Total Funds Available: ${
                  //totalFunds
                  Math.round(totalFunds * 100) / 100
                } USD`}
          </p>
        </div>
        <div style={{ margin: "auto 20px" }}>
          <p style={{ color: "#fff" }}>
            {usedData > 1000
              ? usedData > 1000000
                ? usedData > 1000000000
                  ? `Data Used: ${usedData / 1000000000} GB`
                  : `Data Used: ${usedData / 1000000} MB`
                : `Data Used: ${usedData / 1000} KB`
              : `Data Used: ${usedData} Bytes`}
          </p>
          <p style={{ color: "#fff" }}>
            {totalData > 1000
              ? totalData > 1000000
                ? totalData > 1000000000
                  ? `Total Data Available: ${totalData / 1000000000} GB`
                  : `Total Data Available: ${totalData / 1000000} MB`
                : `Total Data Available: ${totalData / 1000} KB`
              : `Total Data Available: ${totalData} Bytes`}
          </p>
        </div>
      </div>

      <Grid
        container
        spacing={2}
        sx={{
          margin: "0 20px 20px",
          width: "calc(100% - 280px)",
        }}
      >
        {selectedPools.map((pool) => {
          return (
            <Grid item xs={6}>
              <FundingPool
                key={pool.pool_name}
                pool={pool}
                totalFunds={totalFunds}
                setTotalFunds={setTotalFunds}
                setTotalData={setTotalData}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
