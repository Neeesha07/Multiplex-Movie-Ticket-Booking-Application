import logo from './logo.svg';
import './App.css';
import MultiplexListForMovie from './components/MultiplexListForMovie';
import MultiplexList from './components/MultiplexList';
import MoviesListForMultiplex from './components/MovieListForMultiplex';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/multiplexListForMovie' element={<MultiplexListForMovie/>} />
        <Route path='/multiplexList' element={<MultiplexList/>} />
        <Route path='/moviesListForMultiplex/:multiplexId' element={<MoviesListForMultiplex/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
