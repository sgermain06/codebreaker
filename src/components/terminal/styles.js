import Red from '@mui/material/colors/red';
import Cyan from '@mui/material/colors/cyan';

export default function styles(theme) {
    return {
        '@keyframes blink': {
            '50%': {
                backgroundColor: 'transparent',
                color: 'white',
            }
        },
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            fontSize: '1em',
            background: 'rgba(66, 66, 66, 1)',
            borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
        },
        cursor: {
            backgroundColor: 'transparent',
        },
        active: {
            backgroundColor: 'white',
            color: 'black',
            animation: '$blink 1s step-start infinite',
        },
        prompt: {
            color: Cyan[400],
        },
        commandError: {
            color: Red[500],
        },
        content: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            height: '100%',
            width: '100%',
            textAlign: 'left',
            padding: theme.spacing(2),
            overflowX: 'hidden',
            overflowY: 'scroll',
            wordBreak: 'break-all',
        },
        screen: {
            position: 'relative',
            height: '100%',
        },
        input: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            opacity: 0.1,
            height: '100%',
            width: '100%',
        },
    };
}
