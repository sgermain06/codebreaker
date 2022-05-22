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

export const coreColor = prefersDarkMode => prefersDarkMode ? '#ccc' : '#333';

export const fillColor = 'rgba(102, 102, 102, 0.4)';

const exportObject = {
    chartTheme,
    coreColor,
    fillColor
};

export default exportObject;