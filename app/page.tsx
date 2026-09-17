import Link from "next/link";

const investments = [
  { name: "Apple Inc.", ticker: "AAPL", price: "$184.32", change: "+1.45%", risk: "Low Risk" },
  { name: "Tesla Inc.", ticker: "TSLA", price: "$248.17", change: "+2.76%", risk: "High Risk" },
  { name: "Vanguard S&P 500 ETF", ticker: "VOO", price: "$512.36", change: "+1.32%", risk: "Moderate Risk" },
  { name: "Microsoft Corp.", ticker: "MSFT", price: "$415.20", change: "+1.18%", risk: "Low Risk" }
];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="brandMark">N</span><div><b>NOVA CAPITAL</b><small>INVEST WITH CLARITY. BUILD WITH PURPOSE.</small></div></div>
        <div className="links"><a href="#home">Home</a><a href="#investments">Investments</a><a href="#markets">Markets</a><a href="#about">About</a><a href="#pricing">Pricing</a><a href="#resources">Resources</a></div>
        <div className="navActions"><a className="login" href="/login">Login</a><a className="goldBtn" href="/register">Open Account</a></div>
      </nav>

      <section id="home" className="hero">
        <div className="heroText">
          <p className="eyebrow">SMARTER INVESTING FOR A BRIGHTER TOMORROW</p>
          <h1>Build Your Financial<br/>Future With <em>Confidence.</em></h1>
          <p className="lead">NOVA CAPITAL provides powerful investment tools, real-time market insights, and personalized strategies to help you grow and protect your wealth.</p>
          <div className="heroButtons"><Link className="goldBtn large" href="/register">Start Investing →</Link><a className="outlineBtn large" href="#investments">Explore Our Platform</a></div>
        </div>
        <div className="mockup">
          <div className="screenTop">NOVA CAPITAL <span>● John Carter</span></div>
          <div className="screenBody"><aside>⌂ Dashboard<br/>▣ Portfolio<br/>↗ Investments<br/>◌ Markets<br/>▤ Transactions<br/>▥ Reports<br/>⚙ Settings</aside>
            <div className="screenMain"><p>Total Portfolio Value</p><strong>$24,850.00</strong><small className="positive">↑ +$1,240.00 (5.25%) Today</small>
              <div className="chart"></div><div className="cards"><div><b>Portfolio Allocation</b><div className="donut"></div></div><div><b>Market Overview</b><p>S&P 500　5,643.21　<span className="positive">+1.24%</span></p><p>NASDAQ　17,726.94　<span className="positive">+1.56%</span></p><p>Bitcoin　67,432.18　<span className="positive">+2.36%</span></p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="trustbar"><div>🛡<b>Bank-Level Security</b><span>Your assets are protected with industry-leading security.</span></div><div>▥<b>Expert Guidance</b><span>Make informed decisions with our financial experts.</span></div><div>◎<b>Global Markets</b><span>Access to worldwide investment opportunities.</span></div><div>♧<b>24/7 Support</b><span>We're here whenever you need us.</span></div></section>

      <section id="investments" className="investments"><div className="intro"><p className="eyebrow">FEATURED INVESTMENTS</p><h2>Explore Top Investment Opportunities</h2><p>Diversify your portfolio with carefully selected investment products designed for long-term growth.</p><a className="outlineBtn" href="/dashboard">View All Investments →</a></div>
        {investments.map(x => <div className="investmentCard" key={x.ticker}><div className="companyIcon">{x.name[0]}</div><h3>{x.name}</h3><small>{x.ticker}</small><strong>{x.price}</strong><span className="positive">↑ {x.change}</span><div className="miniChart"></div><label>Stocks</label><label className="risk">{x.risk}</label><Link href="/dashboard" className="darkBtn">Invest Now</Link></div>)}
      </section>

      <section className="numbers"><div><p className="eyebrow">OUR NUMBERS</p><h2>Trusted by Investors Worldwide</h2><p>Build your financial goals with a transparent, secure investment platform.</p></div><div><strong>—</strong><span>Active Investors</span></div><div><strong>—</strong><span>Assets Under Management</span></div><div><strong>—</strong><span>Years of Excellence</span></div></section>
      <footer>© 2026 Nova Capital · Investment services involve risk. Returns are not guaranteed.</footer>
    </main>
  );
}
