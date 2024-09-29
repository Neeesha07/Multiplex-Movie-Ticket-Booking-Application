import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerInfo = ({ ownerId }) => {
    const [ownerName, setOwnerName] = useState('');

    useEffect(() => {
        if (ownerId) {
            // Replace with your endpoint and use the ownerId
            axios.get(`http://win10-2-186:8888/multiplex-ms/getMultiplex/${ownerId}`)
                .then(response => {
                    setOwnerName(response.data);
                })
                .catch(error => console.error(error));
        }
    }, [ownerId]);

    return (
        <div className="d-flex align-items-center mb-3">
            <span className="ms-2">{ownerName.multiplexOwnerName}</span>
        </div>
    );
};

export default OwnerInfo;
