import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import Welcome from '../components/Welcome';
import Navbar from '../components/Navbar';
import DiscountFooter from '../components/DiscountFooter';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../features/movieSlice';
import { setTicketBooker } from '../features/ticketBookerSlice';
import Announcement from './Announcement';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movie);
  const { ticketBooker, loading: ticketBookerLoading } = useSelector((state) => state.ticketBooker);
  const [searchTerm, setSearchTerm] = React.useState('');

 
  const foreignUserId = useSelector((state) => state.userId);
  console.log(foreignUserId);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(`http://win10-2-186:8888/multiplex-ms/allMovies`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setMovies(data));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchTicketBookerDetails = async () => {
      try {
        const response = await fetch(`http://win10-2-186:8888/ticketBooker/getBookerByForeignUserId/${foreignUserId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setTicketBooker(data));
      } catch (error) {
        console.error('Error fetching ticketBooker details:', error);
      }
    };

    fetchAllMovies();
    fetchTicketBookerDetails();
  }, [dispatch, foreignUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = Array.from(
    new Map(
      movies
        .filter(movie => movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(movie => [movie.movieName.toLowerCase(), movie])
    )
  ).map(([, movie]) => movie);

  return (
    <div className="container-fluid py-2 bg-light">
      <Welcome />
      
      <Announcement /> {/* Add Announcement component here */}
      <Navbar />
      <div className="mb-4 position-relative">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search className="position-absolute top-50 end-0 translate-middle-y me-3" size={24} />
      </div>

      <h2 className="mb-3 text-primary">Featured Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        {filteredMovies.map((movie) => (
          <div key={movie.movieName} className="col">
            <Link to={`/movie/${movie.movieName}`} state={{ movie }} className="text-decoration-none">
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      <hr />
      <h2 className="mt-2 text-primary">Discounts</h2>
      <DiscountFooter />
      <Footer />
    </div>
  );
};

export default Dashboard;
