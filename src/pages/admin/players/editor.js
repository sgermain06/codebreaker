import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import axios from 'axios';

import crypto from 'crypto';

import fromState from '../../../state/selectors';

import DataEditor from '../../../components/admin/dataEditor';

import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import capitalize from 'lodash/capitalize';

const hex_md5 = string => crypto.createHash('md5').update(string).digest('hex');

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

    const [player, setPlayer] = useState({});
    const [password, setPassword] = useState('');

    const handleSave = async (values, id) => {
        try {
            console.log(values);
            console.log(id);
            console.log(password);
            // const response = await axios.put(`http://localhost:5000/api/v1/players/${id}`, values);
            // console.log(response.data);
            // await login(values);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleValidation = (values) => {
        const errors = {};
        if (values.password) {
            if (values.confirmPassword === '') {
                errors.confirmPassword = 'Confirm password is required when password is provided';
            }
            else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords must match.';
            }
            else if (hex_md5(values.password) === password) {
                errors.password = 'Password must be different from previous password.';
            }
        }
        return errors;
    };

    useEffect(() => {
        const getData = async id => {
            try {
                if (id !== 'new') {
                    const response = await axios.get(`http://localhost:5000/api/v1/players/${id}`)
                    setPlayer({
                        ...mapValues(pick(response.data, ['name', 'username']), (v, k) => ({ label: capitalize(k), value: v, required: true })),
                        password: {
                            label: 'Password',
                            value: '',
                            type: 'password',
                        },
                        confirmPassword: {
                            label: 'Confirm Password',
                            value: '',
                            type: 'password',
                        }
                    });
                    setPassword(response.data.password);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        getData(id);
    }, [id, setPlayer]);

    return (
        <DataEditor
            title={id === 'new' ? 'New Player' : 'Edit Player'}
            onSave={handleSave}
            entity={player}
            id={id}
            validation={handleValidation}
        />
    )
}

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

export default connect(mapStateToProps)(withRouter(PlayerEditor));