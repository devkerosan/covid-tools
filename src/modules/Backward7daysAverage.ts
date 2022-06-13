const Backward7daysAverage = (data: string[]) => {
    const calculatableArray = data.map((val) => parseFloat(val));
    const average = (arr: number[]) => {
        const zeroNaNCount = arr.reduce((prev, current) => current === 0 || current === NaN ? prev + 1 : prev, 0);
        return zeroNaNCount === arr.length ? NaN : arr.reduce((prev, current) => prev + current / (arr.length - zeroNaNCount), 0);
    };

    const output = calculatableArray.map((val, index) => {
        return index < 7 ? average(calculatableArray.filter((val2, index2) => index2 <= index)) : average(calculatableArray.filter((val2, index2) => index - 6 <= index2 && index2 <= index));
    });

    return output.map((val) => val === 0 ? NaN : val);
};

export default Backward7daysAverage;