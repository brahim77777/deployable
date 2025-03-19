import React from 'react';
import LineChart from '../../charts/LineChart02';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard08() {

    const ordersData = {
        labels: [
          '01-2023', '02-2023', '03-2023', '04-2023', '05-2023', '06-2023', '07-2023', '08-2023', '09-2023', '10-2023', '11-2023', '12-2023'
        ],
        datasets: [
          {
            label: 'Orders',
            data: [50, 45, 60, 80, 70, 75, 65, 85, 90, 100, 95, 105],
            borderColor: tailwindConfig().theme.colors.indigo[500],
            fill: false,
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
            pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
            clip: 20,
          }
        ],
      };


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Orders Over Time</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={ordersData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard08;
