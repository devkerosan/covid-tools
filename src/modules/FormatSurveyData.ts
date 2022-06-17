import { CSVData, DateBasedObject, DateBasedObject_country, RawData, RawData_US } from './FetchData_types';
import MakeDateArray from './MakeDateArray';
import MakeDateBasedObject from './MakeDateBasedObject';
import MakeDateBasedObject_US from './MakeDateBasedObject_US';

const toKebabDate = (serialnum: number): string => {
    return Math.floor(serialnum / 10000).toString() + "-" + Math.floor(serialnum % 10000 / 100).toString().padStart(2, "0") + "-" + Math.floor(serialnum % 100).toString().padStart(2, "0");
}

const FormatSurveyData = (rawdata: RawData[], rawdata_US: RawData_US | undefined): string[][] => {
    const DateArray: string[] = MakeDateArray("2020-04-23");
    const DateBasedObject: DateBasedObject = rawdata === undefined ? MakeDateBasedObject_US(rawdata_US) : rawdata_US === undefined ? MakeDateBasedObject(rawdata) : { ...MakeDateBasedObject(rawdata), ...MakeDateBasedObject_US(rawdata_US) };
    const CountriesName: string[] = Object.keys(DateBasedObject);
    const FormattedData: (string | number)[][] = DateArray.map((date: string) => {
        const returns: number[] = Object.entries(DateBasedObject).reduce((prev: number[], country: [string, DateBasedObject_country]) => {
            return prev.concat(country[1][date] === undefined ? 0 : country[1][date]);
        }, []);
        return [toKebabDate(parseInt(date)), ...returns];
    });

    const ExportData = [["date", ...CountriesName], ...FormattedData];
    return ExportData.map((arr): string[] => {
        return arr.map((a): string => {
            return typeof (a) === "number" ? a.toString() : a;
        })
    })
}

export default FormatSurveyData;