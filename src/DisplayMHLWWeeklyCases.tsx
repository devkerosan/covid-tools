import { Form, Select, Button, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect, useState } from "react";
const { Option } = Select;
const { Text } = Typography;

const ExportMHLWWeeklyData = (data: string[], indicator: string) => {
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

const DisplayMHLWWeeklyData: React.FC<{ display: string }> = (props) => {
    const [indicator, setIndicator] = useState<string>("");
    const [RawData, setRawData] = useState<string[]>([]);
    const handleClick = async () => {
        ExportMHLWWeeklyData(RawData, indicator);
    };
    const handleIndicatorChange = (value: string) => {
        setIndicator(value);
    };


    useEffect(() => {
        const update = async () => {
            const URLs = ["https://covid19.mhlw.go.jp/public/opendata/newly_confirmed_cases_detail_weekly.csv", "https://covid19.mhlw.go.jp/public/opendata/severe_cases_detail_weekly.csv"];
            const rawMHLWWeeklyData = URLs.map((url) => {
                return fetch(url)
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        return data;
                    });
            });
            const fetchedMHLWWeeklyData = await Promise.all(rawMHLWWeeklyData);
            setRawData(fetchedMHLWWeeklyData);

        };
        update();
    }, []);
    return (
        <div className='fetchdata' style={{ display: props.display }}>
            <h2>年代別・都道府県別の感染状況（厚生労働省）</h2>
            <Form layout="vertical">
                <FormItem label="指標">
                    <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                        <Option key="new_cases">新規陽性者数</Option>
                        <Option key="severe_cases">重症者数</Option>
                    </Select>
                </FormItem>
            </Form>
            <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
            <p><Text>出典：NYC Department of Health and Mental Hygiene（https://github.com/nychealth/coronavirus-data）</Text></p>
        </div>
    )
};

export default DisplayMHLWWeeklyData;