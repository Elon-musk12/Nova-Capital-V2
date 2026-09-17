'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type Snapshot = { snapshot_date: string; total_value: number };

export default function PortfolioChart({ snapshots }: { snapshots: Snapshot[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: snapshots.map(s => new Date(s.snapshot_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
        datasets: [{
          data: snapshots.map(s => s.total_value),
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212,175,55,.10)',
          fill: true,
          tension: .35,
          pointRadius: 2,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8D9AAF' } },
          y: { grid: { color: 'rgba(141,154,175,.12)' }, ticks: { color: '#8D9AAF' } }
        }
      }
    });
    return () => chart.destroy();
  }, [snapshots]);

  return <div className="chartWrap"><canvas ref={canvasRef} /></div>;
}
