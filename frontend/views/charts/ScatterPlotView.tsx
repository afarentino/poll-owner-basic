
import React, { useState, useEffect } from 'react';
// Type info is automatically generated by Hilla based on Java endpoint defs
import Entry from 'Frontend/generated/github/afarentino/poll/Entry';
import EntryModel from 'Frontend/generated/github/afarentino/poll/EntryModel';
import { ResultsEndpoint } from 'Frontend/generated/endpoints';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

interface DataPoint {
    x: Date;
    y: number;
}

export default function ScatterPlotView() {
    const [scatterData, setScatterData] = useState<DataPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = () => {
            async function getResults() {
                const entries: Entry[] = await ResultsEndpoint.findAll();
                const data: DataPoint[] = [];
                entries.forEach((entry) => {
                    // Split the date and time parts of the entries timestamp
                    const [datePart, timePart] = entry.timeStamp.split(' ');
                    // Split the date into month, day, and year
                    const [month, day, year] = datePart.split('/');

                    // Split the time into hours, minutes, seconds, and AM/PM
                    const time = timePart.slice(0, 8);
                    const ampm = timePart.slice(-2); // always last 2 characters
                    const [hours, minutes, seconds] = time.split(':');

                    // Convert hours to 24-hour format (based on AM/PM)
                    let parsedHours = parseInt(hours);
                    if (ampm.toUpperCase() === 'PM' && parsedHours !== 12) {
                        parsedHours += 12;
                    } else if (ampm.toUpperCase() === 'AM' && parsedHours === 12) {
                        parsedHours = 0;
                    }

                    // Create the Date object
                    const dateObject = new Date(year, month -1 , day, parsedHours, minutes, seconds);
                    const dataPoint: DataPoint = new Object() as DataPoint;
                    dataPoint.x = dateObject;
                    dataPoint.y = minutes > 30 ? parsedHours + 1 : parsedHours; // round up time is closer to next hour
                    data.push(dataPoint);
                });
                return data;
            }
            getResults().then(
                function(surveyData) {
                    setScatterData(surveyData);
                    setLoading(false);
                },
                function(error) {
                    setError(true);
                    setLoading(false);
                }
            );
        };
        fetchData();
    }, []);

    const series = [
        {
            name: "Hour",
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
                text: 'Hour (24-hour format)',
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

    // Conditional rendering based on loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: Unable to fetch data from the server.</div>;
    }

    return (
        <div className="flex flex-col h-full items-start justify-start p-l text-center box-border">
            <h2 className="text-l m-0" style={{ textAlign: 'center', margin: '10px'}}>Survey Submissions Scatter Plot</h2>
            <ReactApexChart options={options} series={series} type="scatter" height={350}/>
        </div>
    );
}
