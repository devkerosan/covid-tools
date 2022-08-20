type RecordType = {
    country: string;
    date: string;
    new_cases: number;
    severe_cases: number;
}

export const SAME_LENGTH_PANELDATA: RecordType[] = [
    { country: "Japan", date: "2022-07-01", new_cases: 1700, severe_cases: 32 },
    { country: "Japan", date: "2022-07-02", new_cases: 1400, severe_cases: 22 },
    { country: "Japan", date: "2022-07-03", new_cases: 1200, severe_cases: 12 },
    { country: "France", date: "2022-07-01", new_cases: 6500, severe_cases: 72 },
    { country: "France", date: "2022-07-02", new_cases: 5600, severe_cases: 82 },
    { country: "France", date: "2022-07-03", new_cases: 5700, severe_cases: 84 }
];