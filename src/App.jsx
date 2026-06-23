import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/work" element={<><Work /><Footer /></>} />
        <Route path="/services" element={<><Services /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;