export const chartTheme = (darkMode, height) => ({
    layout: {
        autosize: true,
        margin: { l: 0, r: 0, t: 0, b: 0 },
        height,
        plot_bgcolor: 'rgba(102, 102, 102, 0.5)',
        paper_bgcolor: 'transparent',
        font: {
            color: darkMode ? '#ccc' : '#333'
        },
        xaxis: {
            showgrid: true,
            zeroline: false,
            showline: false,
            ticks: '',
            showticklabels: false
        },
        yaxis: {
            showgrid: true,
            zeroline: false,
            showline: false,
            ticks: '',
            showticklabels: false
        }
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

export const coreColors = prefersDarkMode => ([
    prefersDarkMode ? '#ccc' : '#333',
    prefersDarkMode ? '#ff9a91' : '#4f2622',
    prefersDarkMode ? '#3740e6' : '#131652',
    prefersDarkMode ? '#7eed68' : '#0b3b02',
]);

export const fillColors = [
    'rgba(102, 102, 102, 0.4)',
    'rgba(102, 0, 0, 0.4)',
    'rgba(0, 0, 102, 0.4)',
    'rgba(0, 102, 0, 0.4)',
]


const exportObject = {
    chartTheme,
    coreColors,
    fillColors
};

export default exportObject;