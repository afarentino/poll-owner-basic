
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
interface DataPoint {
    x: Date;
    y: number;
}

export default function ScatterPlotView() {

    const scatterData: DataPoint[] = [
        {
            x: new Date('2023-07-28T01:25:00'),
            y: 20,
        },
        {
            x: new Date('2023-07-29T02:15:00'),
            y: 35,
        },
        {
            x: new Date('2023-07-30T00:00:00'),
            y: 40,
        },
        // Add more data points as needed
    ];

    const series = [
        {
            name: "Scatter Plot",
            data: scatterData
        }
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            id: 'scatter-plot',
            zoom: {
                type: 'xy', // Enable xy zoom
            },
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Date',
            },
        },
        yaxis: {
            title: {
                text: 'Hour',
            },
        },
        markers: {
            size: 8,
        },
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
    };

    return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <Chart options={options} series={series} type="scatter" height={350}/>
    </div>
  );
}
