import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const Chart = ({ labels, colors, totals }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: totals,
        backgroundColor: colors,
        cutout: '70%',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default Chart;
