
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
interface DataPoint {
    x: Date;
    y: number;
}

export default function ScatterPlotView() {

    const scatterData: DataPoint[] = [
        {
            x: new Date('2023-07-28T01:25:00'),
            y: 1,
        },
        {
            x: new Date('2023-07-29T02:15:00'),
            y: 2,
        },
        {
            x: new Date('2023-07-30T23:30:00'),
            y: 23,
        },
        // Add more data points as needed
    ];

    const series = [
        {
            name: "Time",
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
                text: 'Time (24-hour format)',
            },
        },
        markers: {
            size: 10,
        },
        dataLabels: {
            enabled: false,
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
    <div className="flex flex-col h-full items-start justify-start p-l text-center box-border">
        <h2 className="text-l m-0" style={{ textAlign: 'center', margin: '10px'}}>Survey Submissions Scatter Plot</h2>
        <ReactApexChart options={options} series={series} type="scatter" height={350}/>
    </div>
  );
}
