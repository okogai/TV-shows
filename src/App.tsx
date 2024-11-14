import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import ShowDetails from './components/ShowDetails/ShowDetails.tsx';
import Home from './containers/Home.tsx';
import NavBar from './components/NavBar/NavBar.tsx';

const App = () => (
    <>
      <header>
        <NavBar />
      </header>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
);

export default App;
