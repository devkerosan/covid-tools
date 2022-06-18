import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Select, Input, Space, Card, Typography, List, Slider } from 'antd';
import FormatSurveyData from './modules/FormatSurveyData';
import './FetchData.css';
import FetchUSData from './modules/FetchUSData';
import { RawData, RawData_US } from './modules/FetchData_types';
import FetchData from './modules/FetchData';
import FormatDataForTable from './modules/FormatDataForTable';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import ExportData from './modules/ExportData';
import { CloseCircleOutlined, CloseCircleTwoTone } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import CsvChartsInterface from './modules/CsvChartsInterface';
import { Chart, registerables } from 'chart.js';
const { Option } = Select;
const { Text } = Typography;

Chart.register(...registerables)

interface IndicatorDetail {
    [key: string]: string
}

const IndicatorDetail: IndicatorDetail = {
    mask: "公共の場でマスクを常に（ほとんど）着用していた人の割合",
    activity_large_event: "24時間以内に10人以上が参加するイベントに参加した人の割合　※アメリカはデータなし",
    activity_public_transit: "24時間以内に公共交通機関を利用した人の割合　※アメリカはデータなし",
    activity_restaurant_bar: "24時間以内に飲食店を利用した人の割合　※アメリカはデータなし",
    activity_shop: "24時間以内に買い物に行った人の割合　※アメリカはデータなし",
    activity_spent_time: "24時間以内に同居人以外と過ごした人の割合　※アメリカはデータなし",
    activity_work_outside_home: "24時間以内に職場へ出勤した人の割合　※アメリカはデータなし",
    mask_work_outside_home_1d: "職場でマスクを着用していた人の割合　※アメリカはデータなし",
    mask_shop_1d: "買い物をするときにマスクを着用していた人の割合　※アメリカはデータなし",
    mask_restaurant_1d: "飲食店でマスクを着用していた人の割合　※アメリカはデータなし",
    mask_spent_time_1d: "同居人以外の人と過ごす際にマスクを着用していた人の割合　※アメリカはデータなし",
    mask_large_event_1d: "10人以上が参加するイベントでマスクを着用していた人の割合　※アメリカはデータなし",
    mask_public_transit_1d: "公共交通機関でマスクを着用していた人の割合　※アメリカはデータなし",
    worried_catch_covid: "コロナに感染することに不安を感じている人の割合　※アメリカはデータなし",
    belief_distancing_effective: "ソーシャルディスタンスの確保に感染拡大を防ぐ効果があると考えている人の割合　※アメリカはデータなし",
    belief_masking_effective: "マスクの着用に感染拡大を防ぐ効果があると考えている人の割合　※アメリカはデータなし",
    others_distanced_public: "過去７日間、公共の場においてほとんどの人が1m以上の身体的距離を確保していたと感じる人の割合　※アメリカはデータなし",
    others_masked_public: "過去７日間、公共の場においてほとんどの人がマスクを着用していたと感じる人の割合　※アメリカはデータなし",
    belief_vaccinated_mask_unnecessary: "ワクチンを接種していればマスクを着用する必要はないと考えている人の割合　※アメリカはデータなし",
    belief_children_immune: "子供はコロナに感染しないと考えている人の割合　※アメリカはデータなし",
    belief_no_spread_hot_humid: "高温多湿な環境ではコロナは感染拡大しないと考えている人の割合　※アメリカはデータなし",
    received_news_govt_health: "過去７日間、政府から発信されるコロナに関する情報を受け取った人の割合　※アメリカはデータなし",
    trust_covid_info_govt_health: "政府の発信するコロナに関する情報を信用している人の割合　※アメリカはデータなし",
    testing_rate: "過去14日間、コロナの検査を受けた人の割合　※アメリカはデータなし",
    ever_tested: "これまでに一度でもコロナの検査を受けたことがある人の割合　※アメリカはデータなし"
};

const DisplaySurveyData: React.FC<{ display: string }> = (props) => {
    if (localStorage.getItem("country") === null) {
        localStorage.setItem("country", JSON.stringify([]));
    }
    const [data, setData] = useState<string[][]>([[]]);
    const [country, setCountry] = useState<string[]>(JSON.parse(localStorage.getItem("country") || ""));
    const [errorCountry, setErrorCountry] = useState<string[]>([]);
    const [indicator, setIndicator] = useState<string>("");
    const [daterange, setDateRange] = useState<string>("");
    const [defaultCountryList, setDefaultCountryList] = useState<string[]>([]);
    const [chartData, setChartData] = useState<any>({ labels: [""], datasets: [{ label: "", data: [""] }] });
    const [chartWidth, setChartWidth] = useState<any>([0, 0]);
    const handleClick = async (): Promise<void> => {
        const ResolvedData: RawData[] = await Promise.all(FetchData(country, indicator));
        const RawData_US: RawData_US | undefined = country.includes("UnitedStates") === true ? await FetchUSData() : undefined;
        const errc = ResolvedData.reduce((prev: string[], current, index) => {
            return current.data === null ? [...prev, country[index]] : [...prev];
        }, [])
        setErrorCountry(errc);
        setData(FormatSurveyData(ResolvedData.filter(c => c.data !== null), RawData_US));
        ExportData(FormatSurveyData(ResolvedData.filter(c => c.data !== null), RawData_US));
    }
    const handleCountryChange = (value: string[]): void => {
        setCountry(value);
    }

    const handleIndicatorChange = (value: string): void => {
        setIndicator(value);
    };

    const handleKeepClick = () => {
        localStorage.setItem("country", JSON.stringify(country));
    }


    const handleChartClick = async () => {
        const ResolvedData: RawData[] = await Promise.all(FetchData(country, indicator));
        const RawData_US: RawData_US | undefined = country.includes("UnitedStates") === true ? await FetchUSData() : undefined;
        const ArrayToCSV = (arr: string[][]) => {
            let csvData = 'data:text/csv;charset=utf-8,'; /// 最初にcsvDataに出力方法を追加しておく
            arr.forEach((a: string[]) => {
                const row = a.join(',');
                csvData += row + '\r\n';
            });
            return csvData;
        };
        const csv = ArrayToCSV(FormatSurveyData(ResolvedData.filter(c => c.data !== null), RawData_US));
        console.log(csv)
        const chartData = CsvChartsInterface(csv);
        console.log(chartData);
        setChartData(chartData);
        setChartWidth([0, chartData.datasets[0].data.length])
    }

    const handleSliderChange = (value: [number, number]) => {
        setChartWidth(value);
    }

    const formatter = (value: number | undefined) => {
        if (value === undefined) {
            return;
        }
        return chartData.labels[value];
    }

    // const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setDateRange(e.target.value);
    // }
    useEffect(() => {
        const fetchCountryList = async () => {
            const RawCountryList = await fetch("https://covidmap.umd.edu/api/country")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    return data;
                });
            const CountryList = RawCountryList.data.map((c: { country: string }) => {
                return c.country;
            });
            setDefaultCountryList(CountryList);
        };
        fetchCountryList();
    }, []);
    return (
        <div className="fetchdata" style={{ display: props.display }}>
            <h2>諸外国のアンケート結果（Maryland and Facebook Survey）</h2>
            <Form layout="vertical">
                <FormItem label="指標">
                    <Select allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                        <Option key="mask">マスク着用率</Option>
                        <Option key="mask_work_outside_home_1d">マスク着用率（職場）</Option>
                        <Option key="mask_shop_1d">マスク着用率（買い物）</Option>
                        <Option key="mask_restaurant_1d">マスク着用率（飲食店）</Option>
                        <Option key="mask_spent_time_1d">マスク着用率（同居人以外と過ごすとき）</Option>
                        <Option key="mask_large_event_1d">マスク着用率（大規模イベント）</Option>
                        <Option key="mask_public_transit_1d">マスク着用率（公共交通機関）</Option>
                        <Option key="activity_large_event">大規模イベント参加率</Option>
                        <Option key="activity_public_transit">公共交通機関利用率</Option>
                        <Option key="activity_restaurant_bar">飲食店利用率</Option>
                        <Option key="activity_shop">買い物をした人の割合</Option>
                        <Option key="activity_spent_time">同居人以外と過ごした人の割合</Option>
                        <Option key="activity_work_outside_home">職場へ出社した割合</Option>
                        <Option key="worried_catch_covid">コロナを不安に感じている人の割合</Option>
                        <Option key="belief_distancing_effective">ソーシャルディスタンスが効果的だと考えている人の割合</Option>
                        <Option key="belief_masking_effective">マスクが効果的だと考えている人の割合</Option>
                        <Option key="others_distanced_public">他人のソーシャルディスタンス率</Option>
                        <Option key="others_masked_public">他人のマスク着用率</Option>
                        <Option key="belief_vaccinated_mask_unnecessary">ワクチン接種していればマスクが不要と考える人の割合</Option>
                        <Option key="belief_children_immune">子供はコロナにかからないと考える人の割合</Option>
                        <Option key="belief_no_spread_hot_humid">高温多湿な環境であればコロナは感染拡大しないと考える人の割合</Option>
                        <Option key="received_news_govt_health">政府から発信されるコロナに関する情報を受け取った人の割合</Option>
                        <Option key="trust_covid_info_govt_health">政府から発信されるコロナに関する情報を信じる人の割合</Option>
                        <Option key="testing_rate">最近検査を受けたか</Option>
                        <Option key="ever_tested">検査を受けたことがあるか</Option>
                    </Select>
                    <div style={{ margin: 5, padding: 5, backgroundColor: 'white', borderColor: 'grey', border: "1px solid", borderRadius: 5 }}>
                        <Text>指標の説明</Text><br />
                        <span>{IndicatorDetail[indicator]}</span>
                    </div>

                </FormItem>
                <FormItem label="国名">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange} value={country}>
                        {defaultCountryList.map((d) => {
                            return <Option key={d}>{d}</Option>
                        })}
                        {indicator === "mask" ? <Option key="UnitedStates">United States</Option> : <></>}

                    </Select>
                    <Button type="primary" onClick={handleKeepClick}>デフォルトに設定</Button>
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
            </Space><br />
            <Text>データ取得エラー</Text>
            <List style={{ backgroundColor: 'white' }} size="small" bordered dataSource={errorCountry} renderItem={item => <List.Item><CloseCircleTwoTone twoToneColor="red" /> {item}はデータがありません</List.Item>} />

            {/* <FormItem label="Date">
                    <Input placeholder="yyyymmdd-yyyymmdd" onChange={handleDateRangeChange} />
                </FormItem> */}

            <p><Text>出典：The University of Maryland Social Data Science Center Global COVID-19 Trends and Impact Survey, in partnership with Facebook（https://gisumd.github.io/COVID-19-API-Documentation/）</Text></p>
            {/* <FormatDataForTable TableValue={data} /> */}
        </div>
    );
}

export default DisplaySurveyData;