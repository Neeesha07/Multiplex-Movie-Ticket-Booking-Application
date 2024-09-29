import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const Stats = ({ownerId}) => {
    const [grossingMovie, setGrossingMovie] = useState('');
    const [revenue, setRevenue] = useState(0);
    const [ticketsSold, setTicketsSold] = useState(0);
    const [error, setError] = useState('');
    const longId = '1';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieResponse = await fetch(`http://win10-2-186:8888/multiplex-ms/getHighestGrossing/${ownerId}`);
                if (!movieResponse.ok) throw new Error('Failed to fetch highest grossing movie');

                const movieData = await movieResponse.json();
                setGrossingMovie(movieData.movieName);
                setRevenue(movieData.revenue);
            } catch (error) {
                console.error('Error fetching highest grossing movie:', error);
                setError('Failed to load highest grossing movie.');
            }

            // try {
            //     const ticketsResponse = await fetch('http://win10-2-186:8888/multiplex-ms//totalTicketsThatDay/1');
            //     if (!ticketsResponse.ok) throw new Error('Failed to fetch tickets sold');

            //     const ticketsData = await ticketsResponse.json();
            //     setTicketsSold(ticketsData);
            // } catch (error) {
            //     console.error('Error fetching tickets sold this week:', error);
            //     setError('Failed to load tickets sold.');
            // }
        };

        fetchData();
    }, [longId]);

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center align-items-centemin-vh-100">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Card className="text-bg-light shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-warning text-center">Statistics</Card.Title>
                            {error && <div className="text-danger text-center mb-2">{error}</div>}
                            <Card.Text>
                                <strong>Highest Grossing Movie:</strong> {grossingMovie || 'Loading...'}
                            </Card.Text>
                            <Card.Text>
                                <strong>{grossingMovie}'s Revenue:</strong> ₹{revenue.toLocaleString() || 'Loading...'}
                            </Card.Text>
                            {/* <Card.Text>
                                <strong>Tickets Sold This Week:</strong> {ticketsSold || 'Loading...'}
                            </Card.Text> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Stats;
