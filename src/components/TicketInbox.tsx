import DataTicket from "./DataTicket";

type Props = {
    dataset: DataTicket[];
    selectable: boolean;
    onClick: (key: string) => void;
    deleteButtonClick: (key: string) => void;

}
type DataTicket = {
    parameter: string;
    country: string;
    option: string[];
    key: string;
    isInFactory?: boolean;
}

const TicketInbox: React.FC<Props> = (props) => {
    return (
        <div className="h-[512px] w-[60%] rounded-md shadow-lg border-t-8 border-black p-2">
            <h1 className="text-2xl font-bold">Ticket Inbox</h1>
            <div className="h-[448px] flex flex-wrap items-start content-start overflow-auto">
                {props.dataset.map((ticket) => {
                    return (
                        <DataTicket isDeletable isSelectable={props.selectable} onClick={() => props.selectable && props.onClick(ticket.key)} deleteButtonClick={() => props.deleteButtonClick(ticket.key)} key={ticket.key} parameter={ticket.parameter} country={ticket.country} option={ticket.option} />
                    )
                })}
            </div>

        </div>
    )
};

export default TicketInbox;