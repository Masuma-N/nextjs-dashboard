'use client';

import dynamic from 'next/dynamic';

const RevenueChart = dynamic(() => import('./revenue-chart'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});

export default function RevenueChartWrapper() {
  return <RevenueChart />;
} 
