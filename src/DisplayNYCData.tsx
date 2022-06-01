import { Form, Select, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect, useState } from "react";
import ExportData from "./modules/ExportData";
const { Option } = Select;

const ExportNYCData = (data: string[], indicator: string) => {
    const index = indicator === "new_cases" ? 0 : 1;
    const testdata = 'data:text/csv;charset=utf-8,' + data[index];
    const encodeUri = encodeURI(testdata);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", encodeUri);
    a.setAttribute("download", "data" + ".csv");
    a.click();
    document.body.removeChild(a);
};

const DisplayNYCData: React.FC<{ display: string }> = (props) => {
    const [indicator, setIndicator] = useState<string>("");
    const [RawData, setRawData] = useState<string[]>([]);
    const handleClick = async () => {
        ExportNYCData(RawData, indicator);
    };
    const handleIndicatorChange = (value: string) => {
        setIndicator(value);
    };


    useEffect(() => {
        const update = async () => {
            const URLs = ["https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/cases-by-day.csv", "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/tests.csv"];
            const rawNYCData = URLs.map((url) => {
                return fetch(url)
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        return data;
                    });
            });
            const fetchedNYCData = await Promise.all(rawNYCData);
            setRawData(fetchedNYCData);

        };
        update();
    }, []);
    return (
        <div className='fetchdata' style={{ display: props.display }}>
            <h2>ニューヨーク市の感染状況（NewYork Times）</h2>
            <Form layout="vertical">
                <FormItem label="指標">
                    <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                        <Option key="new_cases">新規陽性者数</Option>
                        <Option key="test">検査数</Option>
                    </Select>
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
        </div>
    )
};

export default DisplayNYCData;