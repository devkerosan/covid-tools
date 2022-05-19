import { RawData } from "./FetchData_types";

const FetchData = (country: string[]): Promise<RawData>[] => {
    const urlarr: string[] = country.map((c: string): string => {
        return c === "UnitedStates" ? "" : `https://covidmap.umd.edu/apiv2/resources?indicator=mask&type=daily&country=${c}`;
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