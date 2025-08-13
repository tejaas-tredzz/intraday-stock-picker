// App.js
import React, { useState, useEffect } from "react";
import { NseIndia } from "stock-nse-india";

const nse = new NseIndia();

function StockCard({ title, symbol, price, risk, targets, stopLoss, tech, fund, chart }) {
  return (
    <div className="stock-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{title} ({symbol})</h3>
      <p>💰 Price: ₹{price}</p>
      <p>⚠ Risk: {risk}</p>
      <p>🎯 Targets: {targets.join(", ")}</p>
      <p>⛔ Stop Loss: ₹{stopLoss}</p>
      <p>📊 Technical: {tech}</p>
      <p>🏦 Fundamentals: {fund}</p>
      <iframe
        src={chart}
        width="100%"
        height="200"
        frameBorder="0"
        title={symbol}
      ></iframe>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stocks, setStocks] = useState({ high: [], moderate: [], low: [], special: null });

  useEffect(() => {
    async function loadStocks() {
      const symbols = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ADANIPOWER", "COALINDIA"];
      const results = await Promise.all(
        symbols.map(async (sym) => {
          const data = await nse.getEquityDetails(sym);
          const lastPrice = data.priceInfo.lastPrice;
          const changePercent = data.priceInfo.pChange;

          // Risk categorization logic
          let riskLevel = "low";
          if (changePercent > 7) riskLevel = "high";
          else if (changePercent >= 2.5) riskLevel = "moderate";

          return {
            title: data.info.companyName,
            symbol: sym,
            price: lastPrice,
            risk: riskLevel,
            targets: [
              Number((lastPrice * 1.02).toFixed(2)),
              Number((lastPrice * 1.04).toFixed(2))
            ],
            stopLoss: Number((lastPrice * 0.98).toFixed(2)),
            tech: "Auto-generated from NSE data",
            fund: `Market Cap: ₹${data.securityInfo.issuedSize}`,
            chart: `https://s.tradingview.com/widgetembed/?symbol=NSE:${sym}&interval=15&theme=light&style=1&timezone=Asia%2FKolkata`
          };
        })
      );

      // Categorize
      const high = results.filter(s => s.risk === "high");
      const moderate = results.filter(s => s.risk === "moderate");
      const low = results.filter(s => s.risk === "low");

      setStocks({
        high,
        moderate,
        low,
        special: high[0] || moderate[0] || low[0] || null
      });
    }
    loadStocks();
  }, []);

  return (
    <div style={{ background: darkMode ? "#222" : "#fff", color: darkMode ? "#fff" : "#000", minHeight: "100vh" }}>
      <header style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
        <h1>📈 Live Indian Stock Tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main style={{ padding: "10px" }}>
        <section>
          <h2>🔥 Special Pick</h2>
          {stocks.special && <StockCard {...stocks.special} />}
        </section>

        <section>
          <h2>🚀 High Risk</h2>
          {stocks.high.map((stock, i) => <StockCard key={i} {...stock} />)}
        </section>

        <section>
          <h2>⚖ Moderate Risk</h2>
          {stocks.moderate.map((stock, i) => <StockCard key={i} {...stock} />)}
        </section>

        <section>
          <h2>🛡 Low Risk</h2>
          {stocks.low.map((stock, i) => <StockCard key={i} {...stock} />)}
        </section>
      </main>
    </div>
  );
}

