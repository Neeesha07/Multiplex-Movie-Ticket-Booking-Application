import React from 'react';
import Navbar from './Navbar';
import OwnerInfo from './OwnerInfo';
import Stats from './Stats';
import ActionButtons from './ActionButtons';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import AddScreening from './AddScreening';

const Dashboard = () => {
    const ownerId = 12345;

    return (
        <div className="container-fluid">
            <Welcome />
            <Navbar />
            <div className="row">
                <div className="col-md-8 col-lg-9">
                    <Stats />
                </div>
                <div className="col-md-4 col-lg-3">
                    <OwnerInfo ownerId={ownerId} />
                </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
                <ActionButtons />
            </div>

        </div>
    );
};

export default Dashboard;
