import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About';
import Favorite from './components/Favorite';
import Footer from './components/Footer';
import List from './components/List';
import Search from './components/Search';

export default function App() {
  return (
    <Router>
      <div className="container">
        <Search />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Favorite />
                <List />
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
