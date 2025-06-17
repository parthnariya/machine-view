import Highcharts from 'highcharts';
import 'highcharts/modules/boost';
import HighchartsReact from 'highcharts-react-official';

import type { ScatteredPoint } from '@/types';

type ScatteredChartPropType = {
  points: ScatteredPoint[];
  threshold?: number;
  handleDotClick: (point: ScatteredPoint) => void;
};

const ScatteredChart = ({
  points,
  threshold,
  handleDotClick,
}: ScatteredChartPropType) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      margin: [20, 30, 50, 20],
      height: 500,
    },
    boost: {
      useGPUTranslations: true,
      seriesThreshold: 1000,
    },
    series: [
      {
        type: 'scatter',
        turboThreshold: 0,
        data: points.map((point) => ({
          x: point.epoch,
          y: point.distance,
          tool_sequence: point.tool_sequence,
          distance: point.distance,
          epoch: point.epoch,
          anomaly: point.anomaly,
          machine_id: point.machine_id,
          cycle_log_id: point.cycle_log_id,
          start_time: point.start_time,
          end_time: point.end_time,
          color:
            point.anomaly === true
              ? '#c62828e1'
              : point.anomaly === false
                ? '#4caf4fcb'
                : '#3333339f',
        })),
      },
    ],
    title: { text: undefined },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
        offset: 30,
      },
      labels: {
        formatter: function ({ value }) {
          return new Date(Number(value) * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      type: 'linear',
      title: {
        text: 'Distance',
        offset: 30,
        rotation: -90,
        margin: 10,
      },
      gridLineWidth: 1,
      plotLines: [
        {
          value: threshold,
          color: '#EF9A9A',
          dashStyle: 'Dash',
          width: 2,
          label: {
            text: `Threshold ${threshold}`,
            style: { color: '#c62828' },
            align: 'center',
          },
        },
      ],
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        const detailPoint = this.options as unknown as ScatteredPoint;

        return `
          <div style="background: white; padding: 8px; border: 1px solid #ccc;">
            <div><strong>Epoch:</strong> ${detailPoint.epoch}</div>
            <div><strong>Start Time:</strong> ${new Date(detailPoint.start_time).toLocaleString('en-US')}</div>
            <div><strong>End Time:</strong> ${new Date(detailPoint.end_time).toLocaleString('en-US')}</div>
            <div><strong>Value:</strong> ${detailPoint.distance}</div>
          </div>
        `;
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          symbol: 'circle',
        },
        point: {
          events: {
            click: function (this, event) {
              event.preventDefault();
              const newPoint = this.options as unknown as ScatteredPoint;
              handleDotClick(newPoint);
            },
          },
        },
      },
    },

    credits: { enabled: false },
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ScatteredChart;
