import { RawData_US } from './FetchData_types';

const FetchUSData = (daterange: string): Promise<RawData_US> => {
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