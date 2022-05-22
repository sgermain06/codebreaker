export const chartTheme = (darkMode, height) => ({
    layout: {
        autosize: true,
        margin: { l: 25, r: 35, t: 25, b: 25 },
        height,
        plot_bgcolor: 'rgba(102, 102, 102, 0.5)',
        paper_bgcolor: 'rgba(102, 102, 102, 0.4)',
        font: {
            color: darkMode ? '#ccc' : '#333',
        },
    },
    config: {
        displayModeBar: false,
        responsive: true,
        staticPlot: true
    },
    style: {
        width: '100%',
        height: '100%'
    }
});

const exportObject = {
    chartTheme,
};

export default exportObject;