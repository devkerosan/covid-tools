import ExportFile from "./ExportFile";

const ExportData = (data: string[][]) => {
    const ArrayToCSV = (arr: string[][]) => {
        let csvData = ""; /// 最初にcsvDataに出力方法を追加しておく
        arr.forEach((a: string[]) => {
            const row = a.join(',');
            csvData += row + '\r\n';
        });
        return csvData;
    }
    const csvData = ArrayToCSV(data);
    ExportFile(csvData, "data", "csv");
};

export default ExportData;