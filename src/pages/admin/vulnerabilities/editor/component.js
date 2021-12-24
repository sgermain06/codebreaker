import React, { useEffect, useState } from 'react';

import DataEditor from '../../../../components/admin/dataEditor';

import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import capitalize from 'lodash/capitalize';

function VulnerabilitiesEditor(props) {

    const {
        get,
        post,
        put,
        enqueueSnackbar,
    } = props;
    const { id } = props.match.params;

    const [vulnerability, setVulnerability] = useState({});

    const handleSave = async (values, id) => {
        try {
            if (id === 'new') {
                await post('/vulnerabilities', values);
            }
            else {
                await put(`/vulnerabilities/${id}`, values);
            }
            props.history.push('/admin/vulnerabilities');
        }
        catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async id => {
            try {
                if (id !== 'new') {
                    const response = await get(`/vulnerabilities/${id}`)
                    setVulnerability(mapValues(pick(response, ['name', 'description', 'service', 'version']), (v, k) => ({ label: capitalize(k), value: v, required: true })));
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
                        service: {
                            label: 'Service',
                            value: '',
                            required: true,
                        },
                        version: {
                            label: 'Version',
                            value: '',
                            required: true,
                        },
                    })
                }
            }
            catch (err) {
                enqueueSnackbar(err.message, { variant: 'error' });
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

export default VulnerabilitiesEditor;