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

            const MappedData: Map<string, string>[] = [];
            country.forEach((c) => {
                const filterdData = ICURawData.filter((arr) => {
                    return arr[0] === c && arr[3] === "Daily ICU occupancy per million";
                });
                const ExtractedCountryDataMap = new Map<string, string>();
                filterdData.forEach((data) => {
                    ExtractedCountryDataMap.set(data[2], data[4]);
                })
                MappedData.push(ExtractedCountryDataMap);
            })
            console.log(MappedData)
            const dateArray = MakeDateArray("2020-01-01");
            let recentExistDate = ["0", "0", "0"];
            const dateBasedArray = dateArray.map((date) => {
                const particularDateData = MappedData.map((c, index) => {
                    if (c.get(toKebabDate(parseInt(date))) === undefined) {
                        console.log(recentExistDate)
                        return c.get(toKebabDate(parseInt(recentExistDate[index])));
                    }
                    console.log(date)
                    recentExistDate[index] = date;
                    return c.get(toKebabDate(parseInt(date)));
                });
                return [date, ...particularDateData];
            })
            dateBasedArray.forEach((date) => date[0] = toKebabDate(parseInt(date[0] as string)))
            console.log(dateBasedArray)

            return [["date", ...country], ...dateBasedArray];
    }
    return undefined

};

export default FormatJHUData;