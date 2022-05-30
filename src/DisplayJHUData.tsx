import { Select, Button } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useState } from 'react';
import ExportData from './modules/ExportData';
import FetchJHUData from './modules/FetchJHUData';
import FormatJHUData from './modules/FormatJHUData';
const { Option } = Select;

const DisplayJHUData: React.FC = () => {
    const [RawData, setRawData] = useState<string[]>([]);
    const [country, setCountry] = useState<string[]>([]);
    const [allCountryList, setAllCountryList] = useState<string[][]>([[]]);
    const [countryList, setCountryList] = useState<string[]>([]);
    const [indicator, setIndicator] = useState<string>("");
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

    return (
        <div className='fetchdata'>
            <h2>諸外国の感染状況（Johns Hopkins Univ./Our World in Data）</h2>
            <Form layout="vertical">
                <FormItem label="指標">
                    <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                        <Option key="new_cases">新規陽性者数</Option>
                        <Option key="ICU"> 重症者数</Option>
                    </Select>
                </FormItem>
                <FormItem label="国名">
                    <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange}>
                        {countryList.map((data, index) => {
                            return index === 0 ? <Option key=""> </Option> : <Option key={data}>{data}</Option>
                        })}
                    </Select>
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
        </div>
    )
};

export default DisplayJHUData;