import React from 'react';
import AddMultiplexForm from './AddMultiplexForm';
import AddMovieForm from './AddMovieForm';
import AddFeedback from './FeedbackForm';
import EditMultiplexForm from './EditMultiplexForm';
import AddScreeningForm from './AddScreening';
import DeleteMovieForm from './DeleteMovieForm';
import UpdateMovieForm from './UpdateMovieForm';

const ActionButtons = ({ ownerId }) => {
    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-primary text-center mb-4">Quick Actions</h5>
                        <div className="row g-3">
                            <div className="col-6 col-md-4">
                                <AddMultiplexForm ownerId={ownerId} />
                            </div>
                            <div className="col-6 col-md-4">
                                <AddMovieForm ownerId={ownerId} />
                            </div>
                            <div className="col-6 col-md-4">
                                <AddFeedback />
                            </div>
                            <div className="col-6 col-md-4">
                                {/* <EditMultiplexForm /> */}
                                <UpdateMovieForm/>
                            </div>
                            <div className="col-6 col-md-4">
                                <AddScreeningForm />
                            </div>
                            <div className="col-6 col-md-4">
                                <DeleteMovieForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionButtons;