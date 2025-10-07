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
  const [projectionYears, setProjectionYears] = useState<number>(2);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const years = projectionYears;
    const months = years * 12;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const labels = Array.from({ length: months }, (_, i) => {
      const monthIndex = (currentMonth + i) % 12;
      const yearOffset = Math.floor((currentMonth + i) / 12);
      const year = currentYear + yearOffset;
      return `${new Date(year, monthIndex, 1).toLocaleString('default', {
        month: 'short'
      })} ${year}`;
    });

    const data = [];
    let cumulativeBusinesses = 0;

    for (let i = 0; i < months; i++) {
      const businessesOnboardedThisMonth = salesmen * salesPerMonth;
      cumulativeBusinesses += businessesOnboardedThisMonth;
      const monthlyIncome = cumulativeBusinesses * incomePerBusiness;
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
          tension: 0.1
        }
      ]
    });
  }, [salesmen, salesPerMonth, incomePerBusiness, projectionYears]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white', font: { size: 10 } }
      },
      title: {
        display: true,
        text: `${projectionYears}-Year Sales Projection`,
        color: 'white',
        font: { size: 12 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Sales ($)',
          color: 'white',
          font: { size: 10 }
        },
        ticks: {
          color: 'white',
          font: { size: 9 },
          callback: function (value: number | string) {
            return '$' + Number(value).toLocaleString();
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          color: 'white',
          font: { size: 10 }
        },
        ticks: { color: 'white', font: { size: 9 } }
      }
    }
  };

  return (
    <div className="p-3 max-w-5xl mx-auto bg-transparent text-white">
      {/* Dynamic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        {/* Salesmen */}
        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-[11px] font-medium mb-1">Salesmen</label>
          <input
            type="number"
            value={salesmen}
            onChange={(e) => setSalesmen(Number(e.target.value))}
            className="w-full mb-1 p-1 text-white bg-transparent border border-gray-500 rounded text-sm"
            min="0"
            max="5"
            step="1"
          />
          <input
            type="range"
            value={salesmen}
            onChange={(e) => setSalesmen(Number(e.target.value))}
            className="w-full slider-white-outline"
            min="0"
            max="5"
            step="1"
          />
        </div>

        {/* Sales per Month */}
        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-[11px] font-medium mb-1">
            Sales/Month per Salesman
          </label>
          <input
            type="number"
            value={salesPerMonth}
            onChange={(e) => setSalesPerMonth(Number(e.target.value))}
            className="w-full mb-1 p-1 text-white bg-transparent border border-gray-500 rounded text-sm"
            min="0"
            max="10"
            step="1"
          />
          <input
            type="range"
            value={salesPerMonth}
            onChange={(e) => setSalesPerMonth(Number(e.target.value))}
            className="w-full slider-white-outline"
            min="0"
            max="10"
            step="1"
          />
        </div>

        {/* Income per Business */}
        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-[11px] font-medium mb-1">
            Income per Business/Month
          </label>
          <input
            type="number"
            value={incomePerBusiness}
            onChange={(e) => setIncomePerBusiness(Number(e.target.value))}
            className="w-full mb-1 p-1 text-white bg-transparent border border-gray-500 rounded text-sm"
            min="10000"
            max="9999000000"
            step="1000"
          />
          <input
            type="range"
            value={incomePerBusiness}
            onChange={(e) => setIncomePerBusiness(Number(e.target.value))}
            className="w-full slider-white-outline"
            min="10000"
            max="9999000000"
            step="1000"
          />
        </div>

        {/* Years Projection */}
        <div className="bg-transparent p-2 rounded-lg border border-gray-300">
          <label className="block text-[11px] font-medium mb-1">
            Years Projection
          </label>
          <input
            type="number"
            value={projectionYears}
            onChange={(e) => setProjectionYears(Number(e.target.value))}
            className="w-full mb-1 p-1 text-white bg-transparent border border-gray-500 rounded text-sm"
            min="1"
            max="10"
            step="1"
          />
          <input
            type="range"
            value={projectionYears}
            onChange={(e) => setProjectionYears(Number(e.target.value))}
            className="w-full slider-white-outline"
            min="1"
            max="10"
            step="1"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="bg-transparent p-2 rounded-lg shadow border border-gray-300 h-[350px]">
        <Line options={options} data={chartData} />
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider-white-outline {
          appearance: none;
          width: 100%;
          height: 5px;
          background: white;
          border-radius: 5px;
          outline: none;
        }
        .slider-white-outline::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 2px solid black;
          cursor: pointer;
        }
        .slider-white-outline::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 2px solid black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Slide3Content;