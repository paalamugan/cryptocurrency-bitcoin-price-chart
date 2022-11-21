import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { currencyFormatter } from '@/utils/formatter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: ChartOptions<'line'> = {
  responsive: true,
  interaction: {
    mode: 'index',
  },
  elements: {
    line: {
      borderWidth: 1,
      borderJoinStyle: 'round',
    },
    point: {
      hoverBackgroundColor: 'white',
      radius: 0,
      hoverRadius: 5,
      hoverBorderWidth: 3,
      hitRadius: 10,
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: '#fff',
      padding: 10,
      bodyColor: '#000',
      borderColor: '#8947e6',
      borderWidth: 1,
      titleColor: '#000',
      titleAlign: 'center',
      titleFont: {
        size: 12,
      },
      yAlign: 'bottom',
      callbacks: {
        label: (context) => {
          const label = context.dataset?.label || '';
          const value = context.parsed.y;

          return `${label}: ${currencyFormatter(value)}`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
  // Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: false,
      },
      // to remove the y-axis grid
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const defaultDataSetValue = {
  fill: true,
  borderColor: '#8947e6',
  backgroundColor: '#cdb4f0',
};

const getChartData = (
  labels: IAreaChartProps['labels'],
  datasets: IAreaChartProps['datasets']
): ChartData<'line'> => {
  return {
    labels,
    datasets: datasets.map((dataset) => ({
      ...defaultDataSetValue,
      ...dataset,
    })),
  };
};

interface IAreaChartProps {
  labels: string[];
  datasets: ChartData<'line'>['datasets'];
  redraw?: boolean;
}

export const AreaChart: FC<IAreaChartProps> = ({
  labels,
  datasets,
  redraw,
}) => {
  return (
    <div>
      <Line
        options={options}
        data={getChartData(labels, datasets)}
        redraw={redraw}
      />
    </div>
  );
};
