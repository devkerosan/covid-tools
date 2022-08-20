import { PaperClipOutlined } from "@ant-design/icons";
import { Select, Button, Input, Form, Tooltip } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { ChangeEvent } from "react";
import ExportFile from "../modules/ExportFile";
import FileUploader from "./FileUploader";
const { Option } = Select;

type Props = {
    selectedCountry: string[],
    countryList: string[],
    label: string,
    onCountryChange: (value: string[]) => void,
    onFileSelectChange: (value: string[]) => void
}

const CountrySelectForm: React.FC<Props> = (props) => {
    const handleKeepClick = () => {
        localStorage.setItem("country", JSON.stringify(props.selectedCountry));
    };
    const handleExportSettingsClick = (countryList: string[]) => {
        const jsonData = JSON.stringify(
            {
                list1: countryList,
            }
        );
        ExportFile(jsonData, "settings", "json")
    };
    const handleFileSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const fileReader = new FileReader();
        if (e.target.files === null) {
            return;
        }
        const file = e.target.files[0];
        fileReader.readAsText(file);
        fileReader.onloadend = () => {
            if (fileReader.result === null) {
                return;
            }
            const result = fileReader.result;
            const country = JSON.parse(typeof result === "string" ? result : result.toString())
            props.onFileSelectChange(country.list1);
        }
    };
    const handleCountryChange = (countries: string[]) => {
        props.onCountryChange(countries);
    };
    return (
        <Form layout="vertical" style={{ padding: "10px", margin: "10px", backgroundColor: "white", borderRadius: "10px" }}>
            <div className="flex flex-row items-center">
                <span className="text-base">{props.label}</span>
                <Tooltip title="国名を保存" mouseEnterDelay={0} mouseLeaveDelay={0}>
                    <PaperClipOutlined onClick={() => handleExportSettingsClick(props.selectedCountry)} className="ml-auto text-base rounded-full p-1 transition ease-in-out hover:bg-gray-200 active:bg-gray-300 duration-300" />
                </Tooltip>
                <FileUploader onChange={handleFileSelectChange} />

            </div>

            <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange} value={props.selectedCountry}>
                {props.countryList.map((data, index) => {
                    return index === 0 ? <Option key=""> </Option> : <Option key={data}>{data}</Option>
                })}
            </Select>
            {/* <Button type="primary" onClick={handleKeepClick}>デフォルトに設定</Button> */}
            {/* <Input type="file" bordered={false} onChange={(e) => handleFileSelectChange(e)}></Input> */}
        </Form>

    )
};

export default CountrySelectForm;