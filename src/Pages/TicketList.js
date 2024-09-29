// import React, { useEffect, useState } from 'react';
// import TicketCard from '../components/TicketCard';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';

// const TicketList = () => {

// const [tickets, setTickets] = useState([]); // State to hold the tickets
// const [loading, setLoading] = useState(true); // State to manage loading
// const { ticketBooker, loading: ticketBookerLoading } = useSelector((state) => state.ticketBooker);
// //const dispatch = useDispatch();



// const ticketbookerId = ticketBooker.bookerId ;
// console.log(ticketbookerId);

//   const fetchTickets = async () => {
//     if (!ticketbookerId) return; // Exit if ticketbookerId is null

//       setLoading(true);
     
//     try {
//       const response = await fetch(`http://win10-2-186:8888/ticketBooker/getticketsbybooker/${ticketbookerId}`); // Adjust the URL as needed
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json(); // Parse JSON data
//       setTickets(data); // Set the tickets from the response
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     } finally {
//       setLoading(false); // Set loading to false after fetching
//     }
//   };

//   useEffect(() => {  
//     fetchTickets();
  
// }, []); // Empty dependency array means this runs once on mount

// const refreshTickets = () => {
//   fetchTickets(); // Call fetchTickets to refresh the ticket list
// };

// console.log(tickets); // Log the tickets


//     return(
//     <>
//     <Navbar/>
//     <div className="container-fluid py-4  bg-dark min-vh-100 mt-2">
//       <h2 className="mb-4 text-primary">Booked Tickets</h2>
//       <div className="row">
//         {tickets.map((ticket, index) => (
//           <div key={index} className="col-md-6 col-lg-4 mb-3">
//             <TicketCard ticket={ticket}  onTicketDeleted={refreshTickets}/>
//           </div>
//         ))}
//       </div>
//     </div>
//     <Footer/>
//     </>
//     );
// };

// export default TicketList;

import React, { useEffect, useState, useCallback } from 'react';
import TicketCard from '../components/TicketCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ticketBooker } = useSelector((state) => state.ticketBooker);

  const ticketbookerId = ticketBooker ? ticketBooker.bookerId : null;

  const fetchTickets = useCallback(async () => {
    if (!ticketbookerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://win10-2-186:8888/ticketBooker/getticketsbybooker/${ticketbookerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [ticketbookerId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleTicketDeleted = useCallback(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4 bg-dark min-vh-100 ">
        <h2 className="mb-4 text-primary">Booked Tickets</h2>
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket.ticketId} className="col-md-6 col-lg-4 mb-3">
              <TicketCard ticket={ticket} onTicketDeleted={handleTicketDeleted} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketList;