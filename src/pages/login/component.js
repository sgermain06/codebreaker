import React from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { makeStyles } from '@mui/styles';
import styles from './styles';
import { isEmpty } from 'lodash-es';

const useStyles = makeStyles(styles);

function Login(props) {

    const {
        username,
        login
    } = props;

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            username,
            password: '',
            rememberUsername: !isEmpty(username),
        },
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            try {
                console.log(values);
                await login(values);
            }
            catch (error) {
                console.log(error);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            actions.setSubmitting(false);
        }
    });

    const handleCheckboxChange = (event) => {
        console.log('Checked?', event.target.checked);
        formik.setFieldValue('rememberUsername', event.target.checked);
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Login" className={classes.header} />
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} className={classes.content}>
                                    <TextField
                                        fullWidth
                                        id="username"
                                        name="username"
                                        label="Username"
                                        disabled={formik.isSubmitting}
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.content}>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        disabled={formik.isSubmitting}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.content}>
                                    <FormGroup>
                                        <FormControlLabel
                                            disabled={formik.isSubmitting}
                                            control={<Checkbox
                                                id="rememberUsername"
                                                name="rememberUsername"
                                                onChange={handleCheckboxChange}
                                                className={classes.checkbox}
                                                checked={formik.values.rememberUsername}
                                            />}
                                            label="Remember Username"
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <CardActions className={classes.centered}>
                                <LoadingButton
                                    loading={formik.isSubmitting}
                                    variant="contained"
                                    type="submit"
                                >Login</LoadingButton>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

Login.propTypes = {
    username: PropTypes.string,
    login: PropTypes.func.isRequired,
}

export default Login;