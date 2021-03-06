import { grey, lightGreen } from "@material-ui/core/colors";

export default function styles(theme) {
    return {
        cipherTable: {
            marginLeft: 5,
            marginTop: 5,
        },
        cipherGrid: {
            width: '30px',
            textAlign: 'center',
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
