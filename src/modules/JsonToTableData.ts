import MakeDateArray from "./MakeDateArray";

type RecordType = {
    country: string;
    date: string;
    new_cases: number;
    severe_cases: number;
}

const JsonToTableData = (json: RecordType[]) => {
    const dateArray = MakeDateArray("2022-07-01");
    const tabledata = dateArray.map((daterow) => {
        const datedata = json.filter((val) => {
            return val.date === daterow;
        }).map((obj) => obj.new_cases);
        return [daterow, ...datedata];
    });
    const countryList = Array.from(new Set(
        json.map((row) => row.country)
    ))
    console.log([countryList, ...tabledata])
    return [["date", ...countryList], ...tabledata];
};

export default JsonToTableData;