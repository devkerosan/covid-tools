export type RawData = { data: Array<MicroRawData>, status: string };

export type MicroRawData = {
    country: string,
    gid_0: string,
    iso_code: string,
    mc_se: number,
    mc_se_unw: number,
    percent_mc: number,
    percent_mc_unw: number,
    sample_size: number,
    survey_date: string
};

export type RawData_US = {
    epidata: Array<MicroRawData_US>,
    message: string,
    result: number
}

export type MicroRawData_US = {
    direction: null,
    geo_type: string,
    geo_value: string,
    issue: number,
    lag: number,
    missing_sample_size: number,
    missing_stderr: number,
    missing_value: number,
    sample_size: number,
    signal: string,
    source: string,
    stderr: number,
    time_type: string,
    time_value: number,
    value: number
}

export type DateBasedObject_country = {
    [index: string]: number
}

export type DateBasedObject = {
    [index: string]: DateBasedObject_country
}

export type CSVData = (string | number)[];

export type TableData = {
    [index: string]: string | number
}