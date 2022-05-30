const FetchJHUData = () => {
    const URL = ["https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases_per_million.csv", "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/covid-hospitalizations.csv"];
    const Data = URL.map((url) => {
        return fetch(url)
            .then((responce) => {
                return responce.text();
            })
            .then((data) => {
                return data;
            })
    })
    return Data;
};

export default FetchJHUData;