import { Select } from "antd";
import React from "react";
import DataTicket from "./DataTicket";
import LinedButton from "./LinedButton";

const { Option } = Select;

type Props = {
    parameter: string;
    country: string;
    option: string[];
    onParameterChange: (e: string) => void;
    onCountryChange: (e: string) => void;
    onOptionChange: (e: string[]) => void;
    onIssueClick: () => void;

}

const TicketEditor: React.FC<Props> = (props) => {
    return (
        <div className="h-[512px] w-96 rounded-md shadow-lg border-t-8 border-black p-2">
            <h1 className="text-2xl font-bold">Data Ticket</h1>
            <div className="mb-4">
                <span>Parameter</span>
                <Select className="w-full" placeholder="Select Parameter" onChange={(e) => props.onParameterChange(e)}>
                    <Option value="New Cases">New Cases</Option>
                </Select>
            </div>
            <div className="mb-4">
                <span>Country</span>
                <Select className="w-full" placeholder="Select Country" onChange={(e) => props.onCountryChange(e)}>
                    <Option value="Japan">Japan</Option>
                </Select>
            </div>
            <div className="mb-4">
                <span>Option</span>
                <Select className="w-full" placeholder="Select Option" mode="multiple" onChange={(e) => props.onOptionChange(e)}>
                    <Option value="per capita">per capita</Option>
                    <Option value="7d rolling average">7d rolling average</Option>
                </Select>
            </div>
            <div className="flex border-dotted justify-center items-center border-2 border-gray-300 h-48 mb-2">
                <DataTicket parameter={props.parameter} country={props.country} option={props.option} />
            </div>
            <div className="flex justify-end">
                <LinedButton onClick={() => props.onIssueClick()}>Issue</LinedButton>
            </div>
        </div>
    )
};

export default TicketEditor;