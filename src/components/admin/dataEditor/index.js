import React from 'react';
import * as PropTypes from 'prop-types';

function DataEditor(props) {

    return (
        <>
            <h2>Data Editor</h2>
        </>
    );
}

DataEditor.propTypes = {
    entity: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default DataEditor;