const csvSplit = (line: string) => {
    const splittedLine = line.split(",");
    return splittedLine.reduce((prev: string[], current) => {
        console.log(current)
        const lastString = prev === [] ? "" : prev[prev.length - 1].concat(current);
        return current.includes('"') === true && prev[prev.length - 1].includes('"') ? [...prev.splice(-1, 1, lastString)] : [...prev, current];
    }, [])
};

export default csvSplit;