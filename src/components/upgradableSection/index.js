import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { withRouter } from 'react-router-dom';

function UpgradableSection(props) {

    return (
        <Card>
            <CardHeader
                style={{
                    textAlign: 'left'
                }}
                title={props.title}
                subheader={props.value}
            />
            <CardContent>
                <div className="Upgrade-feature">
                    {props.children.map((child, key) => <div key={key}>{child}</div>)}
                </div>
            </CardContent>
        </Card>
    )
}

UpgradableSection.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default withRouter(UpgradableSection);