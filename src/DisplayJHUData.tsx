import { Select, Input, Button } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import ExportData from './modules/ExportData';
import FetchJHUData from './modules/FetchJHUData';
import FormatDataForTable from './modules/FormatDataForTable';
import FormatJHUData from './modules/FormatJHUData';
const { Option } = Select;

const DisplayJHUData: React.FC = () => {
    const [country, setCountry] = useState<string[]>([]);
    const [daterange, setDateRange] = useState<string>("");

    const handleClick = async () => {
        const JHUData = await FetchJHUData();
        ExportData(FormatJHUData(JHUData, country));
    };
    const handleCountryChange = (value: string[]) => {
        setCountry(value);
    };
    const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange(e.target.value);
    };
    return (
        <div className='fetchdata'>
            <h2>JHU Covid-19 Dataset</h2>
            <Form layout="vertical">
                <FormItem label="Country">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange}>
                        <Option key="Japan">Japan</Option>
                        <Option key="France">France</Option>
                        <Option key="Italy">Italy</Option>
                        <Option key="United States">United States</Option>
                    </Select>
                </FormItem>
                <FormItem label="Date">
                    <Input placeholder="yyyymmdd-yyyymmdd" onChange={handleDateRangeChange} />
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>Fetch</Button>
        </div>
    )
};

export default DisplayJHUData;