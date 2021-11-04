export const chartTheme = darkMode => ({
    axis: {
        style: {
            axis: {
                fill: 'transparent',
                stroke: 'rgba(102, 102, 102, 0.5)',
                strokeWidth: 1,
                strokeLineCap: 'round',
                strokeLinejoin: 'round',
            },
            tickLabels: {
                fontSize: 12,
                padding: 8,
                fill: darkMode ? '#ccc' : '#333'
            },
            grid: {
                fill: 'none',
                stroke: 'rgba(102, 102, 102, 0.5)',
                strokeWidth: 1,
                strokeLineCap: 'round',
                strokeLinejoin: 'round',
            }
        }
    },
    data: {
        fill: 'rgba(102, 102, 102, 0.5)',
        stroke: darkMode ? '#ccc' : '#333',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    }
});

const exportObject = {
    chartTheme
};

export default exportObject;