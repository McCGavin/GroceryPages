import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// You’ll create these later:
import Items from './pages/Items';
import Orders from './pages/Orders';
import EditItem from "./pages/EditItem";
import ItemDetail from "./pages/ItemDetail";
import CreateItem from "./pages/CreateItem";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/:id" element={<ItemDetail />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/items/:id/edit" element={<EditItem />} />
                <Route path="/items/create" element={<CreateItem />} />
            </Routes>
        </Router>
    );
}

export default App;
