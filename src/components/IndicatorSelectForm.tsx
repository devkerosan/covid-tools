import { Form, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
const { Option } = Select;

type IndicatorOption = {
    key: string,
    itemName: string
}

type Props = {
    options: IndicatorOption[],
    label: string,
    onChange: (value: string) => void
}

const IndicatorSelectForm: React.FC<Props> = (props) => {
    const handleIndicatorChange = (value: string) => {
        props.onChange(value);
    };
    return (
        <Form layout="vertical" style={{ padding: "10px", margin: "10px", backgroundColor: "white", borderRadius: "10px" }}>
            <span className="text-base">{props.label}</span>
            <Select allowClear placeholder="Please Select" style={{ width: '100%' }} onChange={handleIndicatorChange}>
                {props.options.map((option) => {
                    return (
                        <Option key={option.key}>{option.itemName}</Option>
                    )
                })}
            </Select>
        </Form>

    )
};

export default IndicatorSelectForm;