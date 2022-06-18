const ExportFile = (filedata: string, filename: string, extension: string) => {
    const blob = new Blob([filedata], { type: 'text/plain' })
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", url);
    a.setAttribute("download", filename + "." + extension);
    console.log(a)
    a.click();
    document.body.removeChild(a);

};

export default ExportFile;