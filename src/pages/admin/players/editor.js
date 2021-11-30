import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import axios from 'axios';

import fromState from '../../../state/selectors';

import DataEditor from '../../../components/admin/dataEditor';

import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import capitalize from 'lodash/capitalize';

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
                        },
                        confirmPassword: {
                            label: 'Confirm Password',
                            value: ''
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
        />
    )
}

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

export default connect(mapStateToProps)(withRouter(PlayerEditor));