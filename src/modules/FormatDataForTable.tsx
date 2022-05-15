import { Table } from "antd";
import { CSVData, TableData } from "./FetchData_types";

type Props = {
    TableValue: CSVData[]
}

const FormatDataForTable: React.FC<Props> = (props: Props) => {
    const columns = props.TableValue[0].map((v: string | number): any => {
        return { title: v, dataIndex: v, key: v };
    });
    const TableData: TableData[] = props.TableValue.filter((v: CSVData, index: number): boolean => index !== 0)
        .map((dailydata: CSVData, index: number): any => {
            return dailydata.reduce((prev: TableData, value: string | number, index2: number): TableData => {
                return { ...prev, ...{ key: index, [props.TableValue[0][index2]]: value } };
            }, {})
        });
    console.log(TableData);
    return (
        <Table columns={columns} dataSource={TableData} />
    )
};

export default FormatDataForTable;