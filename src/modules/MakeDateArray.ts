interface DateRange {
    start: number;
    end: number;
}

const toKebabDate = (serialnum: number): string => {
    return Math.floor(serialnum / 10000).toString() + "-" + Math.floor(serialnum % 10000 / 100).toString() + "-" + Math.floor(serialnum % 100).toString();
}

const toNumberDate = (stringDate: string): DateRange => {
    const splitDate: string[] = stringDate.split("-");
    return { start: parseInt(splitDate[0]), end: parseInt(splitDate[1]) };
}

const MakeDateArray = (stringDate: string): string[] => {
    const daterange: DateRange = toNumberDate(stringDate);
    const startDate: Date = new Date(toKebabDate(daterange.start));
    const endDate: Date = new Date(toKebabDate(daterange.end));
    const days: number = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const DateArray: string[] = Array.from(Array(days + 1).keys()).map((_: number, index: number) => {
        const date: Date = new Date(startDate.setDate(startDate.getDate() + (index === 0 ? 0 : 1)));
        return date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, "0") + date.getDate().toString().padStart(2, "0");
    });
    return DateArray;
}

export default MakeDateArray;