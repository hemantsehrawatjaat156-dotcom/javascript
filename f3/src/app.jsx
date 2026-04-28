import react from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './Profile';
import { UserContent } from './Usercontext';

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
