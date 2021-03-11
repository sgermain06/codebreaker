export const dataSizeSuffix = (value, startPoint = 0) => {
    const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
    let index = 0;
    let currentValue = value;

    while (Math.floor(currentValue / 1024) > 0 && (index + startPoint + 1) < suffixes.length) {
        currentValue /= 1024;
        index++;
    } 

    return `${Number(currentValue.toFixed(4))} ${suffixes[index + startPoint]}`;
};