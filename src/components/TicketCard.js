// import React, { useState } from 'react';
// import { Card, CardBody, CardHeader,  } from 'react-bootstrap';

// const TicketCard = ({ ticket }) => {
//     const [isCancelling, setIsCancelling] = useState(false);
//     const [cancelError, setCancelError] = useState(null);

//     const seatInfo = ticket.confirmedSeats.map((seatNumber, index) => 
//         `${seatNumber} (${ticket.seatTypes[index]})`
//       ).join(', ');

//       const handleCancel = async () => {
//         setIsCancelling(true);
//         setCancelError(null);
    
//         try {
//           // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//           const response = await fetch(`YOUR_API_ENDPOINT/cancel/${ticket.screeningId}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ticketId: ticket.screeningId }),
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to cancel ticket');
//           }
    
//           // If cancellation was successful, call the onCancelSuccess callback
          
//         } catch (error) {
//           console.error('Error cancelling ticket:', error);
//           setCancelError('Failed to cancel ticket. Please try again.');
//         } finally {
//           setIsCancelling(false);
//         }
//       };
//       const timeStamp = ticket.timeStamp; // e.g., "2024-09-24T08:30:00"
//       const [date, time] = timeStamp.split('T');
//   return (
//     <div className="Card mb-3 bg-light border border-dark">
//       <div className="card-header bg-primary text-white">
//         <h5 className="card-title mb-0">{ticket.movieName}</h5>
//       </div>
//       <div className="card-body">
//         <p className="card-text"><strong>Multiplex:</strong> {ticket.multiplexName}</p>
//         <p className="card-text"><strong>Date & Time:</strong> {date} & {time}</p>
//         <p className="card-text"><strong>Total Amount:</strong> ${ticket.totalAmount.toFixed(2)}</p>
//         <p className="card-text"><strong>Screening ID:</strong> {ticket.screeningId}</p>
//         <p className="card-text"><strong>Seats:</strong> {seatInfo}</p>
//         {/* <p className="card-text"><strong>Seat Types:</strong> {ticket.seatTypes.join(', ')}</p> */}
//         {cancelError && <p className="text-danger">{cancelError}</p>}
//         <button 
//           className="btn btn-danger mt-2" 
//           onClick={handleCancel} 
//           disabled={isCancelling}
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// };

// export default TicketCard;

import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Navbar from './Navbar';

const TicketCard = ({ ticket,onTicketDeleted }) => {
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelError, setCancelError] = useState(null);

    const seatInfo = ticket.confirmedSeats.map((seatNumber, index) => 
        `${seatNumber} (${ticket.seatTypes[index]})`
    ).join(', ');

    const handleCancel = async () => {
        setIsCancelling(true);
        setCancelError(null);
        
        const screeningId = ticket.screeningId; // Assuming ticket.screeningId is the ticket ID
        const seatsToCancel = ticket.confirmedSeats; // The seats to cancel
        const ticketId=ticket.ticketId

        try {
            // First, cancel the seats
            const cancelSeatsResponse = await fetch(`http://win10-2-186:8888/multiplex-ms/cancelseats/${screeningId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(seatsToCancel),
            });

            if (!cancelSeatsResponse.ok) {
                throw new Error('Failed to cancel seats');
            }

            // If the seats were successfully cancelled, then delete the ticket
            const deleteTicketResponse = await fetch(`http://win10-2-186:8888/ticketBooker/deleteticket/${ticketId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!deleteTicketResponse.ok) {
                throw new Error('Failed to delete ticket');
            }

            // If both requests succeed, you can handle success here (e.g., update state or show a message)
            alert('Ticket cancelled successfully!');
            onTicketDeleted();
            //window.location.reload();

        } catch (error) {
            console.error('Error cancelling ticket:', error);
            setCancelError('Failed to cancel ticket. Please try again.');
        } finally {
            setIsCancelling(false);
        }
    };

    const timeStamp = ticket.timeStamp; // e.g., "2024-09-24T08:30:00"
    const [date, time] = timeStamp.split('T');

    return (
       
        <div className="Card mb-3 bg-light border border-dark">
            <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{ticket.movieName}</h5>
            </div>
            <div className="card-body">
                <p className="card-text"><strong>Multiplex:</strong> {ticket.multiplexName}</p>
                <p className="card-text"><strong>Date & Time:</strong> {date} & {time}</p>
                <p className="card-text"><strong>Total Amount:</strong> ${ticket.totalAmount.toFixed(2)}</p>
                <p className="card-text"><strong>Screening ID:</strong> {ticket.screeningId}</p>
                <p className="card-text"><strong>Seats:</strong> {seatInfo}</p>
                {cancelError && <p className="text-danger">{cancelError}</p>}
                <Button 
                    variant="danger" 
                    onClick={handleCancel} 
                    disabled={isCancelling}
                >
                    {isCancelling ? 'Cancelling...' : 'Cancel'}
                </Button>
            </div>
        </div>
    );
};

export default TicketCard;
