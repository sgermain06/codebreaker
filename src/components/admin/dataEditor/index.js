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
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import omit from 'lodash/omit';
import capitalize from 'lodash/capitalize';
import mapValues from 'lodash/mapValues';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';

import styles from './styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const useStyles = makeStyles(styles);

function DataEditor(props) {

    const classes = useStyles();

    const {
        id,
        title,
        entity,
        onSave,
        validation,
    } = props;

    const [entityState, setEntityState] = useState(entity);
    const [showPassword, setShowPassword] = useState({});

    const formik = useFormik({
        initialValues: entity,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            if (!isNil(validation)) {
                const errors = await validation(values);
                if (!isEmpty(errors)) {
                    actions.setErrors(errors);
                    return;
                }
            }
            await onSave(values, id);
        },
    });

    const setValues = formik.setValues;

    useEffect(() => {
        setEntityState(entity);
    }, [entity, setEntityState]);

    useEffect(() => {
        const filteredValues = mapValues(entityState, value => value.value);
        setValues(filteredValues);
        setShowPassword(mapValues(pickBy(entityState, value => value.type === 'password'), () => false));
    }, [entityState, setValues]);

    const fieldTypeHandler = key => {
        if (entityState[key]) {
            const type = entityState[key].type;
            if (Object.keys(showPassword).includes(key)) {
                return showPassword[key] ? 'text' : 'password';
            }
            return type || 'text';
        }
    };

    const handleClickShowPassword = key => {
        setShowPassword({
            ...showPassword,
            [key]: !showPassword[key],
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={title ? title : `${entity.name} Editor`} className={classes.centered} />
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                {Object.keys(omit(entityState, ['_id', '__v'])).map((key, index) => {
                                    let endAdornment = null;
                                    if (entityState[key] && entityState[key].type === 'password') {
                                        endAdornment = <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword(key)}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {!showPassword[key] ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>;
                                    }
                                    return (
                                        <Grid item xs={12} key={`DataEditor-${index}`}>
                                            <TextField
                                                className={classes.textField}
                                                required={(entityState[key] && entityState[key].required) || false}
                                                type={fieldTypeHandler(key)}
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
                                                InputProps={{
                                                    endAdornment
                                                }}
                                            />
                                        </Grid>
                                    );
                                })}
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
    validation: PropTypes.func,
};

export default DataEditor;