import { RawData_US } from './FetchData_types';

const FetchUSData = (): Promise<RawData_US> => {
    const today = new Date();
    const daterange = "20200424" + "-" + today.getFullYear() + ("00" + (today.getMonth() + 1)).slice(-2) + ("00" + today.getDate()).slice(-2);
    console.log(daterange);
    const CMUDelphiURL: string = `https://api.covidcast.cmu.edu/epidata/covidcast/?signal=fb-survey:smoothed_wwearing_mask_7d&time_type=day&time_values=${daterange}&geo_type=nation&geo_value=*`;
    return fetch(CMUDelphiURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};

export default FetchUSData;