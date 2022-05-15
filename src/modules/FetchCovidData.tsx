import { Button } from "antd";

const FetchCovidData: React.FC = () => {
    const handleClick = async () => {
        const url = "https://api.covidcast.cmu.edu/epidata/covidcast/?signal=fb-survey:smoothed_wwearing_mask_7d&time_type=day&time_values=20220401-20220501&geo_type=nation&geo_value=*";
        const coviddata = await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            });
    };
    return (
        <div className='fetchcoviddata'>
            <Button onClick={handleClick}>Fetch</Button>
        </div>
    )
};

export default FetchCovidData;