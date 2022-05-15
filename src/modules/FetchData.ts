import { RawData } from "./FetchData_types";

const FetchData = (country: string[], daterange: string): Promise<RawData>[] => {
    const urlarr: string[] = country.map((c: string): string => {
        return c === "UnitedStates" ? "" : `https://covidmap.umd.edu/api/resources?indicator=mask&type=daily&country=${c}&daterange=${daterange}`;
    }).filter((url: string): boolean => {
        return !(url === "");
    });
    const RawData: Promise<RawData>[] = urlarr.map((url: string): Promise<RawData> => {
        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            });
    });
    return RawData;
};

export default FetchData;