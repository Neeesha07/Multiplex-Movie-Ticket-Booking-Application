import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import OwnerInfo from '../components/OwnerInfo';
import Stats from '../components/Stats';
import ActionButtons from '../components/ActionButtons';
import Welcome from '../components/Welcome';
import './Dashboard.css';
import NavbarMultiplex from '../components/NavbarMultiplex';
import { useParams } from 'react-router-dom';
import Announcement from './Announcement';
import axios from 'axios';

const MultiplexDashBoard = () => {
    const { userid } = useParams();
    const [ownerId, setOwnerId] = useState(null);
    
    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await axios.get(`http://win10-2-186:8888/multiplex-ms/getowneridbyuserid/${userid}`);
                setOwnerId(response.data);
                console.log(ownerId)
            } catch (error) {
                console.error('Error fetching owner ID:', error);
            }
        };

        fetchOwnerId();
    }, [userid]);

    return (
        <div className="dashboard">
            <div className="container-fluid mt-3">
                <Welcome /> 
                <Announcement />
                <NavbarMultiplex />
                <div className="row mt-4">
                    <div className="col-md-8">
                        <Stats />
                    </div>
                    <div className="col-md-4">
                        {ownerId !== null && <OwnerInfo ownerId={ownerId} />}
                    </div>
                </div>
                <div className="mt-4">
                    {ownerId !== null && <ActionButtons ownerId={ownerId} />}
                </div>
            </div>
        </div>
    );
};

export default MultiplexDashBoard;
