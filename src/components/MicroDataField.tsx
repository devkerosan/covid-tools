import MicroDataCard from "./MicroDataCard";

type MicroData = {
    country: string,
    indicator: string,
    data: number[]
}

type Props = {
    data: MicroData[],
    onClick: (value: number[]) => void,
}

const MicroDataField: React.FC<Props> = (props) => {
    return (
        <div className='flex'>
            {props.data.map((data, index) => {
                return <MicroDataCard key={index} data={data} onClick={(value) => props.onClick(value)} />
            })}
        </div>
    )
};

export default MicroDataField;