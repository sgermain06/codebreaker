import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import axios from 'axios';
import { useFormik } from 'formik';

import fromState from '../../../state/selectors';

import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import pick from 'lodash/pick';

function PlayerEditor(props) {

    const {
        token
    } = props;
    const { id } = props.match.params;

    axios.interceptors.request.use(config => ({
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }));

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
        },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            try {
                console.log(values);
                const response = await axios.put(`http://localhost:5000/api/v1/players/${id}`, values);
                console.log(response.data);
                // await login(values);
            }
            catch (error) {
                console.log(error);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        } 
    });

    const setValues = formik.setValues;

    useEffect(() => {
        const getData = async id => {
            try {
                if (id !== 'new') {
                    const response = await axios.get(`http://localhost:5000/api/v1/players/${id}`)
                    setValues(pick(response.data, ['name', 'username', 'password']));
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        getData(id);
    }, [id, setValues]);

    return (
        <>
            <h2>Player editor for {id}</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    variant='standard'
                    id="username"
                    name="username"
                    label='Username'
                    disabled={formik.isSubmitting}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    variant='standard'
                    id="name"
                    name="name"
                    label='Name'
                    disabled={formik.isSubmitting}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <LoadingButton
                    loading={formik.isSubmitting}
                    variant="contained"
                    type="submit"
                >Save</LoadingButton>

            </form>
        </>
    )
}

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

export default connect(mapStateToProps)(withRouter(PlayerEditor));