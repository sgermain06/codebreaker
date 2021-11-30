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

function VulnerabilitiesEditor(props) {

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

    const [vulnerability, setVulnerability] = useState({});

    const handleSave = async (values, id) => {
        try {
            if (id === 'new') {
                const { data } = await axios.post(`${$config.endpoint}/api/v1/vulnerabilities`, values);
                console.log(data);
            }
            else {
                const { data } = await axios.put(`${$config.endpoint}/api/v1/vulnerabilities/${id}`, values);
                console.log(data);
            }
            props.history.push('/admin/vulnerabilities');
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async id => {
            try {
                if (id !== 'new') {
                    const response = await axios.get(`${$config.endpoint}/api/v1/vulnerabilities/${id}`)
                    setVulnerability(mapValues(pick(response.data, ['name', 'description', 'service', 'version']), (v, k) => ({ label: capitalize(k), value: v, required: true })));
                }
                else {
                    setVulnerability({
                        name: {
                            label: 'Name',
                            value: '',
                            required: true,
                        },
                        description: {
                            label: 'Description',
                            value: '',
                            required: true,
                        },
                        password: {
                            label: 'Service',
                            value: '',
                            required: true,
                        },
                        confirmPassword: {
                            label: 'Version',
                            value: '',
                            required: true,
                        },
                    })
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        getData(id);
    }, [id, setVulnerability]);

    return (
        <DataEditor
            title={id === 'new' ? 'New Vulnerability' : 'Edit Vulnerability'}
            onSave={handleSave}
            entity={vulnerability}
            id={id}
        />
    )
}

const mapStateToProps = state => ({
    token: fromState.Authentication.token()(state),
});

export default connect(mapStateToProps)(withRouter(VulnerabilitiesEditor));