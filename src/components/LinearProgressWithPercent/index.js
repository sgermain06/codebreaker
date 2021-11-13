import React from 'react';
import * as PropTypes from 'prop-types';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithPercent(props) {
    return (
        <Box display='flex' alignItems='center' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
            <Box width='100%' mr={1}>
                <LinearProgress variant="determinate" {...props} value={Math.round(props.value)} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary" style={{ paddingLeft: '8px' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithPercent.propTypes = {
    value: PropTypes.number.isRequired,
}

export default LinearProgressWithPercent;