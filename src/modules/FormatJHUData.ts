const FormatJHUData = (data: string, country: string[]) => {
    const RawData = data.split("\n").map((arr) => {
        return arr.split(",");
    });
    const countryIndex = country.map((c) => {
        return RawData[0].indexOf(c);
    })
    return country.length === 0 ? RawData : RawData.map((arr) => {
        return arr.reduce((prev: string[], value, index) => {
            return index === 0 || countryIndex.includes(index) ? [...prev, value] : prev;
        }, []);
    });
};

export default FormatJHUData;