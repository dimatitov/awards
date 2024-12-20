import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Voteses } from '../services/interfaces';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VotesChartProps {
  data: Voteses
}

const VotesChart: FC<VotesChartProps> = ({ data }) => {
  const labels = data.map((item) => item.choiceName);
  const votes = data.map((item) => item.votes);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Голоса',
        data: votes,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Общие голоса',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 1, 
            precision: 0,
          },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default VotesChart;