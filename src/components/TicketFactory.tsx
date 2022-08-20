import { useState } from "react";
import DataTicket from "./DataTicket";
import Panel from "./Panel"

type Props = {
    onClick: () => void;
    tickets: DataTicket[];
    processedData: DataTicket[];
    isSelectable?: boolean;
    deleteButtonClick: (key: string) => void;
}

type DataTicket = {
    parameter: string;
    country: string;
    option: string[];
    key: string;
    isInFactory?: boolean;
}

const onStyle = "flex w-52 justify-center items-center border-2 border-black bg-black h-16 mx-6 my-3 transition ease-in-out dulation-300 hover:scale-110 cursor-pointer active:scale-100";
const offStyle = "flex w-52 border-dotted justify-center items-center border-2 border-gray-300 h-16 mx-6 my-3 transition ease-in-out dulation-300 hover:scale-110 cursor-pointer active:scale-100";

const openStyle = "flex flex-col items-center border-dotted border-2 border-black";
const closedStyle = "hidden";

const TicketFactory: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Panel title="Ticket Factory" height="h-auto">
            <div className="flex flex-row">
                <div className="flex flex-col items-center border-dotted border-2 border-black">
                    {props.tickets.map((ticket) => {
                        return (
                            <DataTicket isDeletable deleteButtonClick={() => props.deleteButtonClick(ticket.key)} key={ticket.key} parameter={ticket.parameter} country={ticket.country} option={ticket.option} />
                        )
                    })}
                    <div onClick={props.onClick} className={props.isSelectable ? onStyle : offStyle}>
                        <i className="block material-symbols-outlined text-gray-400">add_circle</i>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-center before:border-t-2 before:w-4 before:border-dotted before:border-black after:border-t-2 after:w-4 after:border-dotted after:border-black">
                        <i onClick={() => setIsOpen(!isOpen)} className="block material-symbols-outlined text-black cursor-pointer hover:scale-125 transition dulation-300 active:scale-100">add_circle</i>
                    </div>
                </div>
                <div className={isOpen ? openStyle : closedStyle}>
                    {props.processedData.map((ticket) => {
                        return (
                            <DataTicket isDeletable deleteButtonClick={() => props.deleteButtonClick(ticket.key)} key={ticket.key} parameter={ticket.parameter} country={ticket.country} option={ticket.option} />
                        )
                    })}
                    <div onClick={props.onClick} className={props.isSelectable ? onStyle : offStyle}>
                        <i className="block material-symbols-outlined text-gray-400">add_circle</i>
                    </div>
                </div>

            </div>
        </Panel>
    )
};

export default TicketFactory;