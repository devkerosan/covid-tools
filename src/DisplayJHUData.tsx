import { Select, Button } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useState } from 'react';
import ExportData from './modules/ExportData';
import FetchJHUData from './modules/FetchJHUData';
import FormatJHUData from './modules/FormatJHUData';
const { Option } = Select;

const DisplayJHUData: React.FC = () => {
    const [RawData, setRawData] = useState<string>("");
    const [country, setCountry] = useState<string[]>([]);
    const handleClick = async () => {
        const UpdatedData = FormatJHUData(RawData, country);
        ExportData(UpdatedData);
    };
    const handleCountryChange = (value: string[]) => {
        setCountry(value);
    };

    const prepareCountryList = (data: string) => {
        return data.split("\n").map((arr) => {
            return arr.split(",");
        });
    };

    useEffect(() => {
        const update = async () => {
            const JHUData = await FetchJHUData();
            setRawData(JHUData);
        };
        update();
    }, []);

    return (
        <div className='fetchdata'>
            <h2>海外での100万人あたり新規陽性者数（Johns Hopkins Univ./Our World in Data）</h2>
            <Form layout="vertical">
                <FormItem label="国名">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange}>
                        {prepareCountryList(RawData)[0].map((data, index) => {
                            return index === 0 ? <Option key=""> </Option> : <Option key={data}>{data}</Option>
                        })}
                    </Select>
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>Fetch</Button>
        </div>
    )
};

export default DisplayJHUData;