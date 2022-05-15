import React from 'react';
import { useState } from 'react';
import { Button, Select, Input, Space } from 'antd';
import FormatSurveyData from './modules/FormatSurveyData';
import './FetchData.css';
import FetchUSData from './modules/FetchUSData';
import { CSVData, RawData, RawData_US } from './modules/FetchData_types';
import FetchData from './modules/FetchData';
import FormatDataForTable from './modules/FormatDataForTable';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import FetchJHUData from './modules/FetchJHUData';
import FormatJHUData from './modules/FormatJHUData';
import ExportData from './modules/ExportData';
const { Option } = Select;

const DisplaySurveyData: React.FC = () => {
    const [data, setData] = useState<string[][]>([[]]);
    const [country, setCountry] = useState<string[]>([]);
    const [daterange, setDateRange] = useState<string>("");
    const handleClick = async (): Promise<void> => {
        const ResolvedData: RawData[] = await Promise.all(FetchData(country, daterange));
        const RawData_US: RawData_US | undefined = country.includes("UnitedStates") === true ? await FetchUSData(daterange) : undefined;
        setData(FormatSurveyData(ResolvedData, RawData_US, daterange));
        console.log(FormatSurveyData(ResolvedData, RawData_US, daterange));
        ExportData(FormatSurveyData(ResolvedData, RawData_US, daterange));
    }
    const handleCountryChange = (value: string[]): void => {
        setCountry(value);
    }
    const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDateRange(e.target.value);
    }
    return (
        <div className="fetchdata">
            <h2>Maryland and Facebook Survey</h2>
            <Form layout="vertical">
                <FormItem label="Country">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange}>
                        <Option key="japan">Japan</Option>
                        <Option key="france">France</Option>
                        <Option key="italy">Italy</Option>

                        <Option key="UnitedStates">United States</Option>
                    </Select>
                </FormItem>
                <FormItem label="Date">
                    <Input placeholder="yyyymmdd-yyyymmdd" onChange={handleDateRangeChange} />
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>Fetch</Button>
            <FormatDataForTable TableValue={data} />
        </div>
    );
}

export default DisplaySurveyData;