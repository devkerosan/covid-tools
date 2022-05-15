import { DateBasedObject, DateBasedObject_country, MicroRawData_US, RawData_US } from "./FetchData_types";

const MakeDateBasedObject_US = (rawdata_us: RawData_US | undefined): DateBasedObject => {
    const FormattedData: DateBasedObject_country = rawdata_us !== undefined ? rawdata_us.epidata.reduce((prev: DateBasedObject_country, DailyData: MicroRawData_US): any => {
        return { ...prev, ...{ [DailyData.time_value]: DailyData.value * 1000000000000 / 100 / 1000000000000 } };
    }, {}) : {};
    return { "UnitedStates": FormattedData };
};

export default MakeDateBasedObject_US;