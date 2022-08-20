type Props = {
    parameter: string;
    country: string;
    option: string[];
    isDeletable?: boolean;
    isSelectable?: boolean;
    deleteButtonClick?: () => void;
    onClick?: () => void;
}

const DataTicket: React.FC<Props> = (props) => {
    return (
        <div onClick={props.onClick} className={props.isSelectable ? "border-2 border-transparent hover:border-black hover:border-2" : "border-2 border-transparent"}>
            <div className="flex-col relative inline-block content-center bg-gray-50 w-52 px-2 py-1 m-2 rounded border-l-8 border-blue-500 shadow-md">
                {props.isDeletable && <button className="absolute right-2" onClick={props.deleteButtonClick}><i className="material-icons text-sm ml-auto rounded-full px-1 transition ease-in-out hover:bg-gray-200 active:bg-gray-300 duration-300">close</i></button>}
                <div className="flex items-center text-lg font-bold"><i className="material-icons text-lg mr-1">show_chart</i>{props.parameter}</div>
                <div className="flex items-center text-md font-bold mb-2 ml-1"><i className="material-icons text-base mr-1">pin_drop</i>{props.country}</div>
                {props.option.map((opt, index) => {
                    return (
                        <span key={index} className="inline-block text-xs bg-blue-500 px-2 py-1 mb-1 ml-1 text-white rounded-full">*{opt}</span>
                    )
                })}
            </div>
        </div>
    )
};

export default DataTicket;