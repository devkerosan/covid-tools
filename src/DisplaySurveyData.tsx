import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Select, Input, Space, Card, Typography, List } from 'antd';
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
const { Option } = Select;
const { Text } = Typography;

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
    mask_public_transit_1d: "公共交通機関でマスクを着用していた人の割合　※アメリカはデータなし"
};

const DisplaySurveyData: React.FC = () => {
    const [data, setData] = useState<string[][]>([[]]);
    const [country, setCountry] = useState<string[]>([]);
    const [errorCountry, setErrorCountry] = useState<string[]>([]);
    const [indicator, setIndicator] = useState<string>("");
    const [daterange, setDateRange] = useState<string>("");
    const [defaultCountryList, setDefaultCountryList] = useState<string[]>([]);
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
        <div className="fetchdata">
            <h2>海外でのアンケート結果（Maryland and Facebook Survey）</h2>
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
                    {/* <Button type="primary" onClick={handleKeepClick}>デフォルトに設定</Button> */}
                </FormItem>
                <Text>データ取得エラー</Text>
                <List style={{ backgroundColor: 'white' }} size="small" bordered dataSource={errorCountry} renderItem={item => <List.Item><CloseCircleTwoTone twoToneColor="red" /> {item}はデータがありません</List.Item>} />
                {/* <FormItem label="Date">
                    <Input placeholder="yyyymmdd-yyyymmdd" onChange={handleDateRangeChange} />
                </FormItem> */}
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
            {/* <FormatDataForTable TableValue={data} /> */}
        </div>
    );
}

export default DisplaySurveyData;