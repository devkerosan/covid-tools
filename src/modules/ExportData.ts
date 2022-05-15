const ExportData = (data: string[][]) => {
    const ArrayToCSV = (arr: string[][]) => {
        let csvData = 'data:text/csv;charset=utf-8,'; /// 最初にcsvDataに出力方法を追加しておく
        arr.forEach((a: string[]) => {
            const row = a.join(',');
            csvData += row + '\r\n';
        });
        return csvData;
    }
    const csvData = ArrayToCSV(data);
    const encodeUri = encodeURI(csvData);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", encodeUri);
    a.setAttribute("download", "data" + ".csv");
    a.click();
    document.body.removeChild(a);
};

export default ExportData;