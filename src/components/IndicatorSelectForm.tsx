import { Select } from "antd";
const { Option } = Select;

// const handleIndicatorChange = (value: string) => {
//     setIndicator(value);
//     if (value === "new_cases") {
//         setCountryList(allCountryList[0]);
//     } else if (value === "ICU") {
//         setCountryList(allCountryList[1]);
//     }

// };

const IndicatorSelectForm: React.FC = () => {
    return (
        <div></div>
        // <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
        //     <Option key="new_cases">新規陽性者数</Option>
        //     <Option key="ICU"> 重症者数</Option>
        // </Select>

    )
};

export default IndicatorSelectForm;