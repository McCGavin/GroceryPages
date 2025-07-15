import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// You’ll create these later:
import Items from './pages/Items';
import Orders from './pages/Orders';
import EditItems from "./pages/EditItems";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/editItems" element={<EditItems />} />
            </Routes>
        </Router>
    );
}

export default App;
