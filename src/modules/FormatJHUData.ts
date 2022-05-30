import { parse } from "path/posix";
import MakeDateArray from "./MakeDateArray";

const toKebabDate = (serialnum: number): string => {
    return Math.floor(serialnum / 10000).toString() + "-" + Math.floor(serialnum % 10000 / 100).toString().padStart(2, "0") + "-" + Math.floor(serialnum % 100).toString().padStart(2, "0");
}

const FormatJHUData = (data: string[], country: string[], indicator: string): any => {
    switch (indicator) {
        case "new_cases":
            const newCasesRawData = data[0].split("\n").map((arr) => {
                return arr.split(",");
            });
            const countryIndex = country.map((c) => {
                return newCasesRawData[0].indexOf(c);
            })
            return country.length === 0 ? newCasesRawData : newCasesRawData.map((arr) => {
                return arr.reduce((prev: string[], value, index) => {
                    return index === 0 || countryIndex.includes(index) ? [...prev, value] : prev;
                }, []);
            });
        case "ICU":
            const ICURawData = data[1].split("\n").map((arr) => {
                return arr.split(",");
            });
            const ExtractedCountryData: { [key: string]: string }[] = country.map((c) => {
                const filterdData = ICURawData.filter((arr) => {
                    return arr[0] === c && arr[3] === "Daily ICU occupancy per million";
                });
                return filterdData.reduce((prev, current) => {
                    return { ...prev, [current[2]]: current[4] }
                }, {});
            });

            const dateArray = MakeDateArray("2020-01-01");
            const dateBasedArray = dateArray.map((date) => {
                const particularDateData = ExtractedCountryData.map((c) => {
                    return c[toKebabDate(parseInt(date))];
                });
                return [date, ...particularDateData];
            })

            return [["date", ...country], ...dateBasedArray];
    }
    return undefined

};

export default FormatJHUData;