import Link from 'next/link';
import PortfolioChart from './PortfolioChart';

const snapshots = [
  { snapshot_date: '2026-09-11', total_value: 23210 },
  { snapshot_date: '2026-09-12', total_value: 23440 },
  { snapshot_date: '2026-09-13', total_value: 23890 },
  { snapshot_date: '2026-09-14', total_value: 23780 },
  { snapshot_date: '2026-09-15', total_value: 24120 },
  { snapshot_date: '2026-09-16', total_value: 24460 },
  { snapshot_date: '2026-09-17', total_value: 24850 }
];

export default function Dashboard() {
  return <main className="appShell">
    <nav className="sideNav">
      <div className="brand compact"><span className="brandMark">N</span><b>NOVA CAPITAL</b></div>
      <a className="active">⌂ Dashboard</a><a>▣ Portfolio</a><a>↗ Investments</a><a>◌ Markets</a><a>▤ Transactions</a><a>▥ Reports</a><a>⚙ Settings</a>
      <Link href="/">← Website</Link>
    </nav>
    <section className="workspace">
      <header><span>Portfolio Overview</span><button>Account</button></header>
      <div className="welcome"><p className="eyebrow">PRIVATE CLIENT DASHBOARD</p><h1>Welcome back</h1><p>Your portfolio is calculated from recorded account activity and historical valuation snapshots.</p></div>
      <div className="statGrid">
        <div><span>Total Portfolio Value</span><strong>$24,850.00</strong><small className="positive">↑ +5.25% today</small></div>
        <div><span>Available to Invest</span><strong>$1,480.00</strong></div>
        <div><span>Pending Transactions</span><strong>0</strong></div>
      </div>
      <div className="panel"><div className="panelHead"><div><p className="eyebrow">PERFORMANCE</p><h2>Daily Portfolio Value</h2></div><span className="period">7D</span></div><PortfolioChart snapshots={snapshots}/></div>
      <div className="panel"><h2>Transaction Center</h2><p>Deposits and withdrawals are submitted as requests. Authorized administrators review each request before the account ledger changes.</p><div className="actions"><button className="goldBtn">Request Deposit</button><button className="outlineBtn">Request Withdrawal</button></div></div>
    </section>
  </main>;
}
