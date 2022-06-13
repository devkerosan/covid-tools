import Backward7daysAverage from "./Backward7daysAverage";

const colors = ["white", "red", "blue", "green", "black", "yellow", "purple"];

const CsvChartsInterface = (csv: string) => {
    const arrayData = csv.split("\r\n").map((row) => {
        return row.split(",");
    });
    arrayData[0].shift();
    arrayData.splice(1, 1);
    const labels = arrayData.map((row) => {
        return row[0];
    }).slice(1);
    const datasetName = arrayData[0];
    const dataset: string[][] = arrayData[0].map((val) => {
        return Array(0);
    });
    arrayData.forEach((row) => {
        row.forEach((data, index) => {
            dataset[index].push(data);
        })
    })
    const datasets = datasetName.map((country, index) => {
        return {
            label: country,
            data: Backward7daysAverage(dataset[index]),
            pointRadius: 0,
            borderColor: colors[index]
        }
    }).slice(1);

    return {
        labels: labels,
        datasets: datasets
    };
};

export default CsvChartsInterface;