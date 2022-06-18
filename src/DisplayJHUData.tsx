import { Select, Button, Typography, Space, Slider, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import CsvChartsInterface from './modules/CsvChartsInterface';
import ExportData from './modules/ExportData';
import FetchJHUData from './modules/FetchJHUData';
import FormatJHUData from './modules/FormatJHUData';
import 'chartjs-adapter-moment';
import ExportFile from './modules/ExportFile';
import { json } from 'stream/consumers';
const { Option } = Select;
const { Text } = Typography;

Chart.register(...registerables)

const DisplayJHUData: React.FC<{ display: string }> = (props) => {
    if (localStorage.getItem("country2") === null) {
        localStorage.setItem("country2", JSON.stringify([]));
    }
    const [RawData, setRawData] = useState<string[]>([]);
    const [country, setCountry] = useState<string[]>(JSON.parse(localStorage.getItem("country2") || ""));
    const [allCountryList, setAllCountryList] = useState<string[][]>([[]]);
    const [countryList, setCountryList] = useState<string[]>([]);
    const [indicator, setIndicator] = useState<string>("");
    const [chartData, setChartData] = useState<any>({ labels: [""], datasets: [{ label: "", data: [""] }] });
    const [chartWidth, setChartWidth] = useState<any>([0, 0]);
    const handleClick = async () => {
        const UpdatedData = FormatJHUData(RawData, country, indicator);
        ExportData(UpdatedData);
    };
    const handleCountryChange = (value: string[]) => {
        setCountry(value);
    };

    const handleIndicatorChange = (value: string) => {
        setIndicator(value);
        if (value === "new_cases") {
            setCountryList(allCountryList[0]);
        } else if (value === "ICU") {
            setCountryList(allCountryList[1]);
        }

    };

    const handleKeepClick = () => {
        localStorage.setItem("country2", JSON.stringify(country));
    }

    const handleChartClick = () => {
        const ArrayToCSV = (arr: string[][]) => {
            let csvData = 'data:text/csv;charset=utf-8,'; /// 最初にcsvDataに出力方法を追加しておく
            arr.forEach((a: string[]) => {
                const row = a.join(',');
                csvData += row + '\r\n';
            });
            return csvData;
        };
        const csv = ArrayToCSV(FormatJHUData(RawData, country, indicator));
        console.log(csv)
        const chartData = CsvChartsInterface(csv);
        console.log(chartData);
        setChartData(chartData);
        setChartWidth([0, chartData.datasets[0].data.length])
    }

    const handleSliderChange = (value: [number, number]) => {
        setChartWidth(value);
    }

    const handleExportSettingsClick = (countryList: string[]) => {
        const jsonData = JSON.stringify(
            {
                list1: countryList,
            }
        );
        console.log(jsonData)
        ExportFile(jsonData, "settings", "json")
    }

    const handleFileSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (e.target.files === null) {
            return
        }
        const file = e.target.files[0];
        fileReader.readAsText(file);
        fileReader.onloadend = () => {
            if (fileReader.result === null) {
                return;
            }
            const result = fileReader.result;
            const country = JSON.parse(typeof result === "string" ? result : result.toString())
            setCountry(country.list1);
        }
    }

    useEffect(() => {
        const update = async () => {
            const JHUData = await Promise.all(FetchJHUData());
            const URLs = ["https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/locations.csv", "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/locations.csv"];
            const rawFetchedCountryList = URLs.map((url) => {
                return fetch(url)
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        return data;
                    });
            });
            const fetchedCountryList = await Promise.all(rawFetchedCountryList);
            const makeCountryList = (fetchedData: string, countryindex: number) => {
                return fetchedData.split("\n").map((arr) => {
                    return arr.split(",");
                }).reduce((prev, current, index) => {
                    return index === 0 ? [...prev] : [...prev, current[countryindex]];
                }, [])
            };
            const CountryList = fetchedCountryList.map((country, index) => {
                const arrayedCountryList = index === 0 ? makeCountryList(country, 1) : makeCountryList(country, 0);
                return arrayedCountryList.filter((country) => country !== "" && country !== undefined);
            });
            setRawData(JHUData);
            setAllCountryList(CountryList);
        };
        update();
    }, []);

    const formatter = (value: number | undefined) => {
        if (value === undefined) {
            return;
        }
        return chartData.labels[value];
    }

    return (
        <div className='fetchdata' style={{ display: props.display }}>
            <h2>諸外国の感染状況（Johns Hopkins Univ./Our World in Data）</h2>
            <Form layout="vertical">
                <FormItem label="指標">
                    <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                        <Option key="new_cases">新規陽性者数</Option>
                        <Option key="ICU"> 重症者数</Option>
                    </Select>

                </FormItem>
                <FormItem label="国名">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange} value={country}>
                        {countryList.map((data, index) => {
                            return index === 0 ? <Option key=""> </Option> : <Option key={data}>{data}</Option>
                        })}
                    </Select>
                    <Button type="primary" onClick={handleKeepClick}>デフォルトに設定</Button>
                    <Button type="primary" onClick={() => handleExportSettingsClick(country)}>設定をエクスポート</Button>
                    <Input type="file" bordered={false} onChange={(e) => handleFileSelectChange(e)}></Input>
                </FormItem>
            </Form>


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
            <Space size={"small"}>
                <Button type="primary" className="fetchButton" onClick={handleChartClick}>グラフ更新</Button>
                <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
            </Space>

            <p><Text>出典：Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource]</Text></p>
        </div>
    )
};

export default DisplayJHUData;