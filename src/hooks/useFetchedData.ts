import { useEffect, useState } from "react";

const useFetchedData = (urls: string[]) => {
    const [fetchedData, setFetchedData] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            const Data = await Promise.all(urls.map((url) => {
                return fetch(url);
            }))
            return Data;
        }
        fetchData().then((data) => setFetchedData(data))
    }, [])

    return fetchedData;
};

export default useFetchedData;