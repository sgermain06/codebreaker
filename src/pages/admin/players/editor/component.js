import React, { useEffect, useState } from 'react';

import md5 from 'md5';

import DataEditor from '../../../../components/admin/dataEditor';

import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import capitalize from 'lodash/capitalize';

function PlayerEditor(props) {

    const {
        get,
        post,
        put,
        enqueueSnackbar,
    } = props;
    const { id } = props.match.params;

    const [player, setPlayer] = useState({});
    const [password, setPassword] = useState('');

    const handleSave = async (values, id) => {
        try {
            delete values.confirmPassword;
            if (id === 'new') {
                await post('/players', {
                    ...values,
                    password: md5(values.password)
                });
            }
            else {
                if (!isEmpty(values.password)) {
                    values.password = md5(values.password);
                }
                else {
                    delete values.password;
                }
                await put(`/players/${id}`, values);
            }
            props.history.push('/admin/players');
        }
        catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
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
            else if (md5(values.password) === password) {
                errors.password = 'Password must be different from previous password.';
            }
        }
        return errors;
    };

    useEffect(() => {
        const getData = async id => {
            try {
                if (id !== 'new') {
                    const response = await get(`/players/${id}`)
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
                else {
                    setPlayer({
                        name: {
                            label: 'Name',
                            value: '',
                            required: true,
                        },
                        username: {
                            label: 'Username',
                            value: '',
                            required: true,
                        },
                        password: {
                            label: 'Password',
                            value: '',
                            type: 'password',
                            required: true,
                        },
                        confirmPassword: {
                            label: 'Confirm Password',
                            value: '',
                            type: 'password',
                        },
                    })
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

export default PlayerEditor;