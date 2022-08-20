import { CodeSandboxOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import DataTicket from "./components/DataTicket";
import LinedButton from "./components/LinedButton";
import Panel from "./components/Panel";
import TicketEditor from "./components/TicketEditor";
import TicketFactory from "./components/TicketFactory";
import TicketInbox from "./components/TicketInbox";


const { Option } = Select;

const SampleMicroData = [
    {
        country: "Japan",
        indicator: "new_cases",
        data: [12, 42, 51, 17, 35]
    },
    {
        country: "France",
        indicator: "new_cases",
        data: [22, 43, 71, 2, 65]
    }
]

type DataTicket = {
    parameter: string;
    country: string;
    option: string[];
    key: string;
    isInFactory?: boolean;
}

const DataEditor: React.FC<{ display: string }> = (props) => {
    const [dataset, setDataset] = useState<DataTicket[]>([]);
    const [select, setSelect] = useState(false);
    const [processedData, setProcessedData] = useState<DataTicket[]>([]);
    const [parameter, setParameter] = useState("No Data");
    const [country, setCountry] = useState("No Data");
    const [option, setOption] = useState<string[]>([]);
    const [isInboxOpen, setIsInboxOpen] = useState(false);

    const handleIssueClick = () => {
        const addedDataset = {
            parameter: parameter,
            country: country,
            option: option,
            key: new Date().getTime().toString(16)
        };
        setDataset([...dataset, addedDataset]);
    }

    const handleDeleteButtonClick = (key: string) => {
        const removedClickedData = [...dataset];
        setDataset(removedClickedData.filter((val) => val.key !== key));
    }

    const handleFactoryDeleteButton = (key: string) => {
        const clickedTicket = [...dataset].map((ticket) => {
            if (ticket.key === key) {
                ticket.isInFactory = false;
            }
            return ticket;
        });
        setDataset(clickedTicket);
    }

    const handleTicketClick = (key: string) => {
        const clickedTicket = [...dataset].map((ticket) => {
            if (ticket.key === key) {
                ticket.isInFactory = true;
            }
            return ticket;
        });
        setDataset(clickedTicket);
    }

    const handleParameterChange = (e: string) => {
        setParameter(e);
    }
    const handleCountryChange = (e: string) => {
        setCountry(e);
    }
    const handleOptionChange = (e: string[]) => {
        setOption(e);
    }
    const handleApiClick = async () => {
        const hello = await fetch('http://localhost:3001/')
            .then((res) => res.text());
        console.log(hello)
    }

    useEffect(() => {
        const update = async () => {

        };
        update();
    }, []);
    return (
        <div className='m-5' style={{ display: props.display }}>
            <div className="flex flex-row h-[512px] justify-between" style={isInboxOpen ? { display: "flex" } : { display: "none" }}>
                <TicketEditor parameter={parameter} country={country} option={option} onParameterChange={(e) => handleParameterChange(e)} onCountryChange={(e) => handleCountryChange(e)} onOptionChange={(e) => handleOptionChange(e)} onIssueClick={() => handleIssueClick()} />
                <RightOutlined className="self-center mx-4" />
                <TicketInbox dataset={dataset} onClick={(key) => handleTicketClick(key)} deleteButtonClick={(key) => handleDeleteButtonClick(key)} selectable={select} />

            </div>
            <TicketFactory isSelectable={select} onClick={() => setSelect(!select)} deleteButtonClick={(key) => handleFactoryDeleteButton(key)} tickets={dataset.filter((ticket) => ticket.isInFactory === true)} processedData={processedData} />
            {/* <MicroDataField data={SampleMicroData} onClick={handleClick} />
            {rawData}
            <TableView data={JsonToTableData(SAME_LENGTH_PANELDATA)} /> */}
            <div className="fixed flex justify-center top-5 right-0 p-3 pl-4 rounded-l-full bg-black hover:scale-105 cursor-pointer" onClick={() => setIsInboxOpen(!isInboxOpen)}>
                <i className="block material-symbols-outlined text-white text-3xl">inbox</i>
            </div>
            <button onClick={handleApiClick}>api</button>
        </div>
    )
};

export default DataEditor;