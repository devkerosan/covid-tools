import { Button, Slider } from "antd";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import ArrayToCSV from "../modules/ArrayToCSV";
import CsvChartsInterface from "../modules/CsvChartsInterface";
import FormatJHUData from "../modules/FormatJHUData";
import 'chartjs-adapter-moment';
Chart.register(...registerables)
type Props = {
    data: string[][],
}

const LineChartField: React.FC<Props> = (props) => {
    const [chartData, setChartData] = useState<any>({ labels: [""], datasets: [{ label: "", data: [""] }] });
    const [chartWidth, setChartWidth] = useState<any>([0, 0]);
    const handleChartClick = () => {
        const csv = ArrayToCSV(props.data);
        const chartData = CsvChartsInterface(csv);
        setChartData(chartData);
        setChartWidth([0, chartData.datasets[0].data.length])
    }
    const handleSliderChange = (value: [number, number]) => {
        setChartWidth(value);
    };

    const formatter = (value: number | undefined) => {
        if (value === undefined) {
            return;
        }
        return chartData.labels[value];
    }
    return (
        <>
            <Line
                data={{ ...chartData, pointRadius: 0 }}
                options={{
                    scales: {
                        x: {
                            type: 'timeseries',
                            time: {
                                parser: 'y-M-D',
                                unit: 'day',
                                displayFormats: {
                                    day: 'YYYY-MM-DD'
                                }
                            },
                            min: chartData.labels[chartWidth[0]],
                            max: chartData.labels[chartWidth[1]],
                            ticks: {
                                source: 'labels'
                            }
                        }
                    }
                }}

            />
            <Slider range max={chartData.datasets[0].data.length - 1} onChange={handleSliderChange} value={chartWidth} tipFormatter={formatter} />
            <Button type="primary" className="fetchButton" onClick={handleChartClick}>グラフ更新</Button>
        </>

    )
};

export default LineChartField;