import { Button, Typography, Space, Slider } from 'antd';
import Form from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import ExportData from './modules/ExportData';
import FetchJHUData from './modules/FetchJHUData';
import FormatJHUData from './modules/FormatJHUData';
import IndicatorSelectForm from './components/IndicatorSelectForm';
import CountrySelectForm from './components/CountrySelectForm';
import LineChartField from './components/LineChartField';
import useFetchedData from './hooks/useFetchedData';
const { Text } = Typography;
const IndicatorOptions = [{ key: "new_cases", itemName: "新規陽性者数" }, { key: "ICU", itemName: "重症者数" }];

const DisplayJHUData: React.FC<{ display: string }> = (props) => {
    if (localStorage.getItem("country") === null) {
        localStorage.setItem("country", JSON.stringify([]));
    }
    const [RawData, setRawData] = useState<string[]>([]);
    const [country, setCountry] = useState<string[]>(JSON.parse(localStorage.getItem("country") || ""));
    const [allCountryList, setAllCountryList] = useState<string[][]>([[]]);
    const [countryList, setCountryList] = useState<string[]>([]);
    const [indicator, setIndicator] = useState<string>("");
    const handleClick = async () => {
        const UpdatedData = FormatJHUData(RawData, country, indicator);
        ExportData(UpdatedData);
    };
    const handleIndicatorChange = (value: string) => {
        setIndicator(value);

        if (value === "new_cases") {
            setCountryList(allCountryList[0]);
        } else if (value === "ICU") {
            setCountryList(allCountryList[1]);
        }
    };
    useEffect(() => {
        const update = async () => {
            const JHUData = await Promise.all(FetchJHUData());
            const URLs = ["https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/locations.csv", "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/locations.csv"];
            const rawFetchedCountryList = URLs.map((url) => {
                return fetch(url)
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        return data;
                    });
            });

            const fetchedCountryList = await Promise.all(rawFetchedCountryList);
            const makeCountryList = (fetchedData: string, countryindex: number) => {
                return fetchedData.split("\n").map((arr) => {
                    return arr.split(",");
                }).reduce((prev, current, index) => {
                    return index === 0 ? [...prev] : [...prev, current[countryindex]];
                }, [])
            };
            const CountryList = fetchedCountryList.map((country, index) => {
                const arrayedCountryList = index === 0 ? makeCountryList(country, 1) : makeCountryList(country, 0);
                return arrayedCountryList.filter((country) => country !== "" && country !== undefined);
            });
            setRawData(JHUData);
            setAllCountryList(CountryList);
        };
        update();
    }, []);
    return (
        <div className='fetchdata' style={{ display: props.display }}>
            <h2>諸外国の感染状況（Johns Hopkins Univ./Our World in Data）</h2>
            <Form layout="vertical">
                <IndicatorSelectForm
                    options={IndicatorOptions}
                    label="指標"
                    onChange={handleIndicatorChange}
                />
                <CountrySelectForm
                    selectedCountry={country}
                    countryList={countryList}
                    label="国名" onCountryChange={(value) => setCountry(value)}
                    onFileSelectChange={(value) => setCountry(value)}
                />
            </Form>
            <LineChartField
                data={FormatJHUData(RawData, country, indicator)}
            />
            <Space size={"small"}>

                <Button type="primary" className="fetchButton" onClick={handleClick}>データ取得</Button>
            </Space>

            <p><Text>出典：Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource]</Text></p>
        </div>
    )
};

export default DisplayJHUData;