type MicroData = {
    country: string,
    indicator: string,
    data: number[]
}

type Props = {
    data: MicroData,
    onClick: (value: number[]) => void
}

const MicroDataCard: React.FC<Props> = (props) => {
    return (
        <div className='rounded-md bg-blue-200 w-min p-2 m-2' onClick={() => props.onClick(props.data.data)}>
            <div>{props.data.country}</div>
            <div>{props.data.indicator}</div>
        </div>
    )
};

export default MicroDataCard;