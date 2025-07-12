import React, { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const StockCard = ({ title, symbol, price, risk, targets, stopLoss, tech, fund, chart }) => (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-[320px] rounded-2xl shadow-md hover:shadow-xl transition-all p-5 cursor-pointer relative overflow-hidden">
      <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-semibold ${
        risk === "high"
          ? "bg-red-100 text-red-700"
          : risk === "moderate"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
      }`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>

      <h2 className="text-xl font-semibold mb-1">{title} <span className="text-sm text-gray-400">({symbol})</span></h2>
      <p>💰 Price: ₹{price}</p>
      <p>🎯 Targets: {targets.join(" / ")}</p>
      <p>🛑 Stop Loss: ₹{stopLoss}</p>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-indigo-500 hover:underline">Show More</summary>
        <div className="mt-2">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Technical:</strong> {tech}</li>
            <li><strong>Fundamental:</strong> {fund}</li>
          </ul>
          <div className="mt-4">
            <iframe
              src={chart}
              width="100%"
              height="280"
              allowTransparency={true}
              frameBorder="0"
              className="rounded-md shadow-sm"
            ></iframe>
          </div>
        </div>
      </details>
    </div>
  );

  const dummyStocks = {
    high: [
      {
        title: "Sambhaav Media",
        symbol: "SAMBHAAV",
        price: 6.85,
        risk: "high",
        targets: [7.4, 7.9],
        stopLoss: 6.5,
        tech: "Breakout with RSI 62",
        fund: "Media sector surge; 80% delivery volume",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:SAMBHAAV&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "RattanIndia Power",
        symbol: "RATNPOWER",
        price: 16.3,
        risk: "high",
        targets: [17.4, 17.9],
        stopLoss: 15.8,
        tech: "MACD Crossover, Volume Surge",
        fund: "Debt reduction news, Sectoral bullishness",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:RATNPOWER&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "Brightcom Group",
        symbol: "BCG",
        price: 20.5,
        risk: "high",
        targets: [21.8, 22.5],
        stopLoss: 19.8,
        tech: "Bollinger Band breakout",
        fund: "Recent board meeting outcome positive",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:BCG&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
    ],
    moderate: [
      {
        title: "Coal India",
        symbol: "COALINDIA",
        price: 425.2,
        risk: "moderate",
        targets: [435, 445],
        stopLoss: 418,
        tech: "RSI above 55, Strong candle close",
        fund: "Dividend declared; Strong PSU demand",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:COALINDIA&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "IOC",
        symbol: "IOC",
        price: 167.8,
        risk: "moderate",
        targets: [172, 176],
        stopLoss: 165,
        tech: "Support Reversal",
        fund: "Q-o-Q profits up 18%",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:IOC&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "BHEL",
        symbol: "BHEL",
        price: 131.45,
        risk: "moderate",
        targets: [135, 139],
        stopLoss: 128,
        tech: "Stochastic oversold, RSI rising",
        fund: "New order win; Sector strength",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:BHEL&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
    ],
    low: [
      {
        title: "HDFC Bank",
        symbol: "HDFCBANK",
        price: 1620.5,
        risk: "low",
        targets: [1645, 1675],
        stopLoss: 1600,
        tech: "EMA crossover",
        fund: "High institutional holding",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:HDFCBANK&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "Infosys",
        symbol: "INFY",
        price: 1450.2,
        risk: "low",
        targets: [1470, 1495],
        stopLoss: 1430,
        tech: "Golden Cross confirmed",
        fund: "Strong quarterly earnings",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:INFY&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
      {
        title: "Power Grid",
        symbol: "POWERGRID",
        price: 290.3,
        risk: "low",
        targets: [295, 300],
        stopLoss: 285,
        tech: "Strong base formation",
        fund: "Defensive sector entry",
        chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:POWERGRID&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
      },
    ],
    special: {
      title: "Adani Power",
      symbol: "ADANIPOWER",
      price: 105.2,
      risk: "moderate",
      targets: [110, 113],
      stopLoss: 102.5,
      tech: "MACD Bullish Crossover, Strong volume",
      fund: "YoY profit up 30%, High promoter holding",
      chart: "https://s.tradingview.com/widgetembed/?symbol=NSE:ADANIPOWER&interval=15&theme=light&style=1&timezone=Asia%2FKolkata",
    },
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">📈 Intraday Stock Picker</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-10">
          Get AI-curated stock picks daily, grouped by risk type with entry/target/SL + TradingView charts.
        </p>

        {/* Risk Sections */}
        {[
          ["💥 High Risk – High Return", dummyStocks.high],
          ["⚖️ Moderate Risk", dummyStocks.moderate],
          ["🛡 Low Risk", dummyStocks.low],
        ].map(([title, stocks], index) => (
          <section key={index} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {stocks.map((stock, idx) => (
                <StockCard key={idx} {...stock} />
              ))}
            </div>
          </section>
        ))}

        {/* Special Recommendation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">🏅 Our Special Recommendation</h2>
          <div className="flex justify-center">
            <StockCard {...dummyStocks.special} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-400 dark:text-gray-500 py-6">
        © 2025 IntradayStockPicker.in — Smart tools for smart traders 🧠
      </footer>
    </div>
  );
}
