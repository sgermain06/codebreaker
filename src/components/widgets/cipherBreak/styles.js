import { grey, lightGreen } from "@mui/material/colors";

export default function styles(theme) {
    return {
        cipherGrid: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        cipherGridCell: {
            width: '5%',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: '1vw',
            [theme.breakpoints.only('md')]: {
                fontSize: '1.5vw',
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '2vw',
            },
        },
        solved: {
            color: lightGreen['A400'],
        },
        processing1: {
            color: grey['400']
        },
        processing2: {
            color: grey['500']
        },
        processing3: {
            color: grey['600']
        },
        processing4: {
            color: grey['700']
        },
    };
}
