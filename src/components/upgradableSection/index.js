import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

function UpgradableSection(props) {

    return (
        <React.Fragment>
            <div className="Upgrade-header" display="in-line">
                {props.title}: {props.value}
            </div>
            <div className="Upgrade-feature" display="in-line">
                {props.children.map((child, key) => <div key={key}>{child}</div>)}
            </div>
        </React.Fragment>
    )
}

UpgradableSection.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default withRouter(UpgradableSection);