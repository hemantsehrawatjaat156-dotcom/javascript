import react from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
       <Router>
            <Routes path="/"></Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
       </Router>
    )
}
