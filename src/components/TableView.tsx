type Props = {
    data: (string | number)[][]
}

const TableView: React.FC<Props> = (props) => {
    return (
        <table className="w-64 border-collapse border-2">
            <tbody>
                {props.data.map((row, index_row) => {
                    return (
                        <tr key={index_row} className="border-2">
                            {row.map((val, index_col) => {
                                return (
                                    <td key={index_col} className="border-2">{val}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};

export default TableView;