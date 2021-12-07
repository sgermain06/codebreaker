import testStyles from '../nodes/styles';
export default function styles(theme) {
    const testNode = testStyles(theme).root;
    return {
        root: {
            height: '100%',
            minWidth: '200px',
            '& > div': {
                margin: `${theme.spacing(1)} 0`,
            }
        },
        testNode: {
            ...testNode,
            width: '150px',
            height: '42px',
        }
    };
}
