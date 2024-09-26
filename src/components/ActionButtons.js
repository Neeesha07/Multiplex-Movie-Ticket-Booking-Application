import React from 'react';
import AddMultiplexForm from './AddMultiplexForm'; 
import AddMovieForm from './AddMovieForm'; 
import AddFeedback from './FeedbackForm';
import EditMultiplexForm from './EditMultiplexForm';
import AddScreeningForm from './AddScreening';

const ActionButtons = ({ ownerId }) => {
    return (
        <div className="row self-align" style={{width:"50%"} }>

    <div className="col-12 col-md-6 mb-3">
        <AddMultiplexForm ownerId={ownerId} /> 
    </div>
    <div className="col-12 col-md-6 mb-3">
        <AddMovieForm ownerId={ownerId} /> 
    </div>
    <div className="col-12 col-md-6 mb-3">
        <AddFeedback />
    </div>
    <div className="col-12 col-md-6 mb-3">
        <EditMultiplexForm />
    </div>
    <div className="col-12 col-md-6 mb-3">
        <AddScreeningForm/>
    </div>

</div>

    );
};

export default ActionButtons;
