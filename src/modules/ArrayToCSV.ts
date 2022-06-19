const ArrayToCSV = (arr: string[][]) => {
    let csvData = 'data:text/csv;charset=utf-8,';
    arr.forEach((a: string[]) => {
        const row = a.join(',');
        csvData += row + '\r\n';
    });
    return csvData;
};

export default ArrayToCSV;