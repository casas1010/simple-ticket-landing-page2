import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Slide3Content: React.FC = () => {
  const [salesmen, setSalesmen] = useState<number>(3);
  const [salesPerMonth, setSalesPerMonth] = useState<number>(3);
  const [incomePerBusiness, setIncomePerBusiness] = useState<number>(16500000);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });



  
  useEffect(() => {
    const years = 5;
    const months = years * 12;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const labels = Array.from({ length: months }, (_, i) => {
      const monthIndex = (currentMonth + i) % 12;
      const yearOffset = Math.floor((currentMonth + i) / 12);
      const year = currentYear + yearOffset;
      return `${new Date(year, monthIndex, 1).toLocaleString('default', { month: 'short' })} ${year}`;
    });

    const data = [];
    let cumulativeBusinesses = 0;

    for (let i = 0; i < months; i++) {
      const businessesOnboardedThisMonth = salesmen * salesPerMonth;
      cumulativeBusinesses += businessesOnboardedThisMonth;

      // Monthly income = all existing businesses * income per business
      const monthlyIncome = cumulativeBusinesses * incomePerBusiness;

      // ❗️Push only this month's income (not cumulative)
      data.push(monthlyIncome);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Monthly Income ($)',
          data,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
        },
      ],
    });
  }, [salesmen, salesPerMonth, incomePerBusiness]);







  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white', font: { size: 10 } },
      },
      title: {
        display: true,
        text: '5-Year Sales Projection',
        color: 'white',
        font: { size: 12 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Sales ($)',
          color: 'white',
          font: { size: 10 },
        },
        ticks: {
          color: 'white',
          font: { size: 9 },
          callback: function (value: number | string) {
            return '$' + Number(value).toLocaleString();
          }
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          color: 'white',
          font: { size: 10 },
        },
        ticks: { color: 'white', font: { size: 9 } },
      },
    }
  };

  // Calculate current month stats for display
  const currentMonthBusinesses = salesmen * salesPerMonth;
  const totalBusinessesAfter12Months = currentMonthBusinesses * 12;
  const monthlyIncomeAfter12Months = totalBusinessesAfter12Months * incomePerBusiness;

  return (
    <div className="p-3 max-w-5xl mx-auto bg-transparent text-white">

      {/* Dynamic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-xs font-medium mb-1">
            Salesmen: {salesmen}
          </label>
          <input
            type="range"
            value={salesmen}
            onChange={(e) => setSalesmen(Number(e.target.value))}
            className="w-full accent-white"
            min="0"
            max="5"
            step="1"
          />
        </div>

        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-xs font-medium mb-1">
            Sales/Month per Salesman: {salesPerMonth}
          </label>
          <input
            type="range"
            value={salesPerMonth}
            onChange={(e) => setSalesPerMonth(Number(e.target.value))}
            className="w-full accent-white"
            min="0"
            max="10"
            step="1"
          />
        </div>

        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-xs font-medium mb-1">
            Income per Business/Month: ${incomePerBusiness.toLocaleString()}
          </label>
          <input
            type="range"
            value={incomePerBusiness}
            onChange={(e) => setIncomePerBusiness(Number(e.target.value))}
            className="w-full accent-white"
            min="0"
            max={25000000} // 25M in dollars
            step="100000" // 100k increments
          />
        </div>
      </div>


      {/* Chart */}
      <div className="bg-transparent p-2 rounded-lg shadow border border-gray-300 h-[400px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Slide3Content;