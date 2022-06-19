import { Select, Button, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { ChangeEvent } from "react";
import ExportFile from "../modules/ExportFile";
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
        <FormItem label={props.label}>
            <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '100%' }} onChange={handleCountryChange} value={props.selectedCountry}>
                {props.countryList.map((data, index) => {
                    return index === 0 ? <Option key=""> </Option> : <Option key={data}>{data}</Option>
                })}
            </Select>
            <Button type="primary" onClick={handleKeepClick}>デフォルトに設定</Button>
            <Button type="primary" onClick={() => handleExportSettingsClick(props.selectedCountry)}>設定をエクスポート</Button>
            <Input type="file" bordered={false} onChange={(e) => handleFileSelectChange(e)}></Input>
        </FormItem>
    )
};

export default CountrySelectForm;