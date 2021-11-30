import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';

import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import TextField from '@mui/material/TextField';
import Button from '@mui/lab/LoadingButton';

import omit from 'lodash/omit';
import capitalize from 'lodash/capitalize';
import mapValues from 'lodash/mapValues';

import styles from './styles';

const useStyles = makeStyles(styles);

function DataEditor(props) {

    const classes = useStyles();

    const {
        id,
        title,
        entity,
        onSave,
    } = props;

    const [entityState, setEntityState] = useState(entity);

    const formik = useFormik({
        initialValues: entity,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            await onSave(values, id);
            actions.setSubmitting(false);
        },
    });

    const setValues = formik.setValues;

    useEffect(() => {
        setEntityState(entity);
    }, [entity, setEntityState]);

    useEffect(() => {
        const filteredValues = mapValues(entityState, value => value.value);
        console.log(filteredValues);
        setValues(filteredValues);
    }, [entityState, setValues]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={title ? title : `${entity.name} Editor`} className={classes.centered} />
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                {Object.keys(omit(entityState, ['_id', '__v'])).map((key, index) =>
                                    <Grid item xs={12} key={`DataEditor-${index}`}>
                                        <TextField
                                            className={classes.textField}
                                            required={(entityState[key] && entityState[key].required) || false}
                                            variant='standard'
                                            fullWidth
                                            label={(entityState[key] && entityState[key].label) || capitalize(key)}
                                            id={key}
                                            name={key}
                                            value={formik.values[key] || ''}
                                            disabled={formik.isSubmitting}
                                            onChange={formik.handleChange}
                                            error={formik.touched[key] && Boolean(formik.errors[key])}
                                            helperText={formik.touched[key] && formik.errors[key]}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12} className={classes.centered}>
                                    <Button type='submit' color='primary' variant='contained' disabled={formik.isSubmitting}>Save</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

DataEditor.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default DataEditor;