export const dataSizeSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

export const dataSizeFromSuffix = ({ size, unit }) => {
    const index = dataSizeSuffixes.indexOf(unit);
    if (index === -1) {
        return size;
    }
    return size * Math.pow(1024, index);
}

export const dataSizeSuffix = (value, startPoint = 0) => {
    let index = 0;
    let currentValue = value;

    while (Math.floor(currentValue / 1024) > 0 && (index + startPoint + 1) < dataSizeSuffixes.length) {
        currentValue /= 1024;
        index++;
    } 

    return `${Number(currentValue.toFixed(2))} ${dataSizeSuffixes[index + startPoint]}`;
};