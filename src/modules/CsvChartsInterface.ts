import Backward7daysAverage from "./Backward7daysAverage";

const colors = ["white", "red", "blue", "green", "black", "yellow", "purple"];

const CsvChartsInterface = (csv: string) => {
    const arrayData = csv.split("\r\n").map((row) => {
        return row.split(",");
    });
    const zeroArray = arrayData.filter((val: string[]) => {
        const boolean = val.slice(1, val.length - 1).some((val2) => {
            return val2 !== "0" && val2 !== "0.0"
        })
        return boolean;

    });

    zeroArray[0].shift();

    zeroArray.splice(1, 1);

    const labels = zeroArray.map((row) => {
        return row[0];
    }).slice(1);
    const datasetName = zeroArray[0];
    const dataset: string[][] = zeroArray[0].map((val) => {
        return Array(0);
    });
    zeroArray.forEach((row) => {
        row.forEach((data, index) => {

            dataset[index].push(data);
        })
    })
    const datasets = datasetName.map((country, index) => {
        dataset[index].shift();
        return {
            label: country,
            data: Backward7daysAverage(dataset[index]),
            pointRadius: 0,
            borderColor: colors[index % 7],
            spanGaps: true,
            borderWidth: 2,
        }
    }).slice(1);

    return {
        labels: labels,
        datasets: datasets
    };
};

export default CsvChartsInterface;