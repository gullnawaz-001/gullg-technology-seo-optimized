import React, { useState } from 'react';

// Sample Financial & SaaS Performance Data
const METRICS_SUMMARY = {
  mrr: '$48,250',
  mrrGrowth: '+12.4%',
  arr: '$579,000',
  arrGrowth: '+14.1%',
  activeSubscriptions: '1,248',
  subGrowth: '+8.2%',
  netRevenueRetention: '108%',
  arpu: '$38.66',
  cac: '$142.00',
  ltv: '$1,850.00',
  ltvCacRatio: '13.0x',
  userChurnRate: '1.8%',
  mrrChurnRate: '0.9%'
};

const REVENUE_BREAKDOWN = [
  { month: 'Jan', newMrr: 4200, expansionMrr: 1800, churnMrr: -600, netMrr: 5400 },
  { month: 'Feb', newMrr: 4800, expansionMrr: 2100, churnMrr: -450, netMrr: 6450 },
  { month: 'Mar', newMrr: 5100, expansionMrr: 2400, churnMrr: -800, netMrr: 6700 },
  { month: 'Apr', newMrr: 5900, expansionMrr: 2800, churnMrr: -500, netMrr: 8200 },
  { month: 'May', newMrr: 6400, expansionMrr: 3100, churnMrr: -700, netMrr: 8800 },
  { month: 'Jun', newMrr: 7200, expansionMrr: 3500, churnMrr: -400, netMrr: 10300 }
];

const RECENT_TRANSACTIONS = [
  { id: 'TX-9021', client: 'Enterprise Corp', plan: 'Enterprise Annual', amount: '$12,000.00', status: 'Paid', date: 'Today, 14:32' },
  { id: 'TX-9020', client: 'Apex Digital Agency', plan: 'Pro Monthly', amount: '$299.00', status: 'Paid', date: 'Today, 11:15' },
  { id: 'TX-9019', client: 'Nexus Technologies', plan: 'Pro Annual', amount: '$2,990.00', status: 'Paid', date: 'Yesterday' },
  { id: 'TX-9018', client: 'Starlight Studio', plan: 'Starter Monthly', amount: '$49.00', status: 'Failed', date: 'Yesterday' },
  { id: 'TX-9017', client: 'CloudScale Inc', plan: 'Enterprise Monthly', amount: '$1,200.00', status: 'Paid', date: 'Aug 08, 2026' }
];

export function SaaSAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('30d');

  // Launch Dashboard in a Dedicated New Browser Window
  const handleOpenNewWindow = () => {
    const dashboardHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>SaaS Financial Analytics - Dedicated Window</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-50 text-slate-900 p-8 font-sans">
        <div class="max-w-6xl mx-auto">
          <header class="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
            <div>
              <h1 class="text-2xl font-black text-blue-400">📊 SaaS Financial Intelligence Center</h1>
              <p class="text-xs text-gray-400">Live External Monitoring Window • Auto-Refreshing Stream</p>
            </div>
            <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
              ● Live Stream Active
            </span>
          </header>

          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-white border border-slate-200 p-4 rounded-xl">
              <span class="text-xs text-gray-400">MRR Run Rate</span>
              <p class="text-2xl font-bold text-slate-900 mt-1">${METRICS_SUMMARY.mrr}</p>
              <span class="text-xs text-emerald-400 font-semibold">${METRICS_SUMMARY.mrrGrowth} MoM</span>
            </div>
            <div class="bg-white border border-slate-200 p-4 rounded-xl">
              <span class="text-xs text-gray-400">ARR</span>
              <p class="text-2xl font-bold text-slate-900 mt-1">${METRICS_SUMMARY.arr}</p>
              <span class="text-xs text-emerald-400 font-semibold">${METRICS_SUMMARY.arrGrowth} YoY</span>
            </div>
            <div class="bg-white border border-slate-200 p-4 rounded-xl">
              <span class="text-xs text-gray-400">LTV / CAC Ratio</span>
              <p class="text-2xl font-bold text-amber-400 mt-1">${METRICS_SUMMARY.ltvCacRatio}</p>
              <span class="text-xs text-gray-400">Healthy Benchmark > 3.0x</span>
            </div>
            <div class="bg-white border border-slate-200 p-4 rounded-xl">
              <span class="text-xs text-gray-400">Net Revenue Retention</span>
              <p class="text-2xl font-bold text-blue-400 mt-1">${METRICS_SUMMARY.netRevenueRetention}</p>
              <span class="text-xs text-gray-400">Target > 100%</span>
            </div>
          </div>

          <div class="bg-white border border-slate-200 p-6 rounded-xl">
            <h3 class="text-sm font-bold text-gray-200 mb-4">Monthly Net MRR Movement</h3>
            <table class="w-full text-left text-xs">
              <thead class="text-gray-400 border-b border-slate-200">
                <tr>
                  <th class="py-2">Month</th>
                  <th class="py-2">New MRR</th>
                  <th class="py-2">Expansion MRR</th>
                  <th class="py-2">Churned MRR</th>
                  <th class="py-2 text-right">Net Growth</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800">
                ${REVENUE_BREAKDOWN.map(row => `
                  <tr>
                    <td class="py-2.5 font-bold text-slate-900">${row.month}</td>
                    <td class="py-2.5 text-emerald-400">+$${row.newMrr}</td>
                    <td class="py-2.5 text-blue-400">+$${row.expansionMrr}</td>
                    <td class="py-2.5 text-rose-400">-$${Math.abs(row.churnMrr)}</td>
                    <td class="py-2.5 text-right font-bold text-slate-900">+$${row.netMrr}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open('', 'SaaS_Financial_Analytics_Window', 'width=1100,height=750,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.document.write(dashboardHtml);
      newWindow.document.close();
    } else {
      alert('Pop-up blocked! Please allow pop-ups for this domain to open the separate analytics window.');
    }
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 font-sans p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
              <h1 className="text-xl md:text-2xl font-black text-slate-900">SaaS Analytics & Financial Dashboard</h1>
            </div>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Real-time subscription revenue metrics, churn tracking, unit economics, and cash flow performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Filter */}
            <div className="bg-white border border-slate-200 rounded-lg p-1 flex gap-1 text-xs">
              {['7d', '30d', '90d', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
                    timeframe === tf ? 'bg-blue-600 text-slate-900' : 'text-gray-400 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Launch Dedicated Window Button */}
            <button
              onClick={handleOpenNewWindow}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-900 font-bold text-xs rounded-lg shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>↗ Open Analytics in New Window</span>
            </button>
          </div>
        </div>

        {/* Core Financial KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Monthly Recurring (MRR)</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900">{METRICS_SUMMARY.mrr}</span>
              <span className="text-xs font-bold text-emerald-400">{METRICS_SUMMARY.mrrGrowth}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Annualized Run Rate: <strong className="text-gray-300">{METRICS_SUMMARY.arr}</strong></p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Customers</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900">{METRICS_SUMMARY.activeSubscriptions}</span>
              <span className="text-xs font-bold text-emerald-400">{METRICS_SUMMARY.subGrowth}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">ARPU: <strong className="text-gray-300">{METRICS_SUMMARY.arpu}/mo</strong></p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">LTV to CAC Ratio</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-amber-400">{METRICS_SUMMARY.ltvCacRatio}</span>
              <span className="text-xs font-bold text-gray-400">Optimal (3.0x+)</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">CAC: <strong className="text-gray-300">{METRICS_SUMMARY.cac}</strong> | LTV: <strong className="text-gray-300">{METRICS_SUMMARY.ltv}</strong></p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Churn & Retention</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-blue-400">{METRICS_SUMMARY.netRevenueRetention}</span>
              <span className="text-xs font-bold text-gray-400">NRR</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">User Churn: <strong className="text-rose-400">{METRICS_SUMMARY.userChurnRate}</strong> | Revenue Churn: <strong className="text-rose-400">{METRICS_SUMMARY.mrrChurnRate}</strong></p>
          </div>
        </div>

        {/* Interactive Revenue Growth Waterfall & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Monthly MRR Growth Movement</h3>
                <p className="text-xs text-gray-400">New MRR vs. Expansion vs. Churn Loss</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/40">
                +12.4% Net Velocity
              </span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="space-y-3 pt-4">
              {REVENUE_BREAKDOWN.map((data, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-300 font-bold">{data.month}</span>
                    <span className="text-slate-900 font-bold">Net: +${data.netMrr}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full flex overflow-hidden">
                    <div style={{ width: `${(data.newMrr / 12000) * 100}%` }} className="bg-emerald-500" title={`New: +$${data.newMrr}`} />
                    <div style={{ width: `${(data.expansionMrr / 12000) * 100}%` }} className="bg-blue-500" title={`Expansion: +$${data.expansionMrr}`} />
                    <div style={{ width: `${(Math.abs(data.churnMrr) / 12000) * 100}%` }} className="bg-rose-500" title={`Churn: -$${Math.abs(data.churnMrr)}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6 text-xs text-gray-400 pt-4 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> New MRR</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Expansion MRR</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Churned MRR</span>
            </div>
          </div>

          {/* Unit Economics Summary Box */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Unit Economics Snapshot</h3>
              <p className="text-xs text-gray-400 mb-6">Efficiency indicators per account</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50/60 rounded-xl border border-slate-200">
                  <span className="text-xs text-gray-400">Customer Acquisition Cost (CAC)</span>
                  <span className="font-mono text-sm font-bold text-slate-900">$142.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50/60 rounded-xl border border-slate-200">
                  <span className="text-xs text-gray-400">Average Lifetime Value (LTV)</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">$1,850.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50/60 rounded-xl border border-slate-200">
                  <span className="text-xs text-gray-400">CAC Payback Period</span>
                  <span className="font-mono text-sm font-bold text-blue-400">3.6 Months</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50/60 rounded-xl border border-slate-200">
                  <span className="text-xs text-gray-400">Average Revenue Per User</span>
                  <span className="font-mono text-sm font-bold text-slate-900">$38.66 / mo</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-950/40 rounded-xl border border-blue-800/40 text-xs text-blue-300">
              💡 <strong>Insight:</strong> LTV/CAC ratio is at 13.0x, indicating exceptional marketing efficiency and headroom for scaling paid acquisitions.
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Recent Financial Transactions</h3>
            <span className="text-xs text-gray-400">Real-Time Stripe Inflows</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Transaction ID</th>
                  <th className="pb-3">Client Account</th>
                  <th className="pb-3">Subscription Tier</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {RECENT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-mono font-bold text-blue-400">{tx.id}</td>
                    <td className="py-3 font-bold text-slate-900">{tx.client}</td>
                    <td className="py-3 text-gray-300">{tx.plan}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">{tx.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === 'Paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-400">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
