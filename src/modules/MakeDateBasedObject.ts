import { DateBasedObject, DateBasedObject_country, MicroRawData, RawData } from "./FetchData_types";

const MakeDateBasedObject = (rawdata: RawData[]): DateBasedObject => {
    const DateBasedObject: DateBasedObject = rawdata.reduce((prev: DateBasedObject, CountryData: RawData) => {
        const FormattedCountryData: DateBasedObject_country = CountryData.data.reduce((prev: DateBasedObject_country, DailyData: MicroRawData) => {
            return { ...prev, ...{ [DailyData.survey_date]: DailyData.percent_mc } };
        }, {});
        const returns: DateBasedObject = { [CountryData.data[0].country]: FormattedCountryData };
        return { ...prev, ...returns };
    }, {});
    return DateBasedObject;
}
export default MakeDateBasedObject;