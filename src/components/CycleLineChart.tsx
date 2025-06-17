import Highcharts from 'highcharts';
import 'highcharts/modules/boost';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';

type CycleLineChartPropsType = {
  actual: Record<string, number>;
  ideal: number[];
};

const CycleLineChart = ({ actual, ideal }: CycleLineChartPropsType) => {
  const options: Highcharts.Options = useMemo(() => {
    const length = Math.min(Object.keys(actual).length, ideal.length);

    const idealData = ideal
      .slice(0, length)
      .map((value, index) => [index * 1000, parseFloat(value.toFixed(3))]);

    const actualData = Object.entries(actual)
      .slice(0, length)
      .map(([time, value]) => [parseFloat(time) * 1000, value])
      .sort((a, b) => a[0] - b[0]);

    const allTimes = [
      ...idealData.map(([time]) => time),
      ...actualData.map(([time]) => time),
    ];
    const minTime = Math.min(...allTimes);
    const maxTime = Math.max(...allTimes);

    return {
      chart: {
        type: 'line',
        margin: [30, 30, 60, 70],
      },
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 1000,
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time (seconds)',
        },
        labels: {
          enabled: true,
          formatter: function () {
            const seconds = Number(this.value) / 1000;
            return Number.isFinite(seconds) ? seconds.toString() : '';
          },
        },
        tickInterval: 1000,
        min: minTime,
        max: maxTime,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
        gridLineDashStyle: 'Dash',
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          const seconds = this.x / 1000;
          let tooltip = `<div style="background: white; padding: 8px; border: 1px solid #ccc;">${seconds.toFixed(3)}<br>`;
          if (this.points) {
            this.points.forEach((point) => {
              tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: ${point.y}<br>`;
            });
          }

          tooltip += '</div>';
          return tooltip;
        },
      },
      legend: {
        enabled: false,
      },
      title: { text: undefined },
      series: [
        {
          type: 'line',
          name: 'Ideal Signal',
          data: idealData,
          color: '#90caf9',
        },
        {
          type: 'line',
          name: 'Actual Signal',
          data: actualData,
          color: '#1e88e5',
        },
      ],
      credits: { enabled: false },
      responsive: {
        rules: [
          {
            condition: {
              minHeight: 500,
            },
          },
        ],
      },
    };
  }, [actual, ideal]);

  return (
    <div style={{ width: '100%', minHeight: '500px', marginTop: '20px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CycleLineChart;
