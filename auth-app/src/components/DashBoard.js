import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure CSS imports are at the top
import Navbar from './Navbar'; // Then import components
import OwnerInfo from './OwnerInfo';
import Stats from './Stats';
import ActionButtons from './ActionButtons';
import Welcome from './Welcome';
import './Dashboard.css'; // Custom styles at the end


const Dashboard = () => {
    const ownerId = 12345;

    return (
        <div className="dashboard">
            <Navbar />
            <div className="container-fluid mt-3">
                <Welcome />
                <div className="row mt-4">
                    <div className="col-md-8">
                        <Stats />
                    </div>
                    <div className="col-md-4">
                        <OwnerInfo ownerId={ownerId} />
                    </div>
                </div>
                <div className="mt-4">
                    <ActionButtons ownerId={ownerId} />
                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;