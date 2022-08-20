const csvSplit = (line: string) => {
    const splittedLine = line.split(",");
    return splittedLine.reduce((prev: string[], current) => {
        const lastString = prev === [] ? [""] : [...prev, ...current];
        if (prev.length === 0) return [...prev, current];
        return current.includes('"') === true && prev[prev.length - 1].includes('"') ? [...prev.splice(-1, 1, ...lastString)] : [...prev, current];
    }, [])
};

export default csvSplit;