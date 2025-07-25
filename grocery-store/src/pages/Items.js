import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function ItemsList() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchItems = async (search = '', sort = '', order = 'asc') => {
        setLoading(true);
        setError(null);

        try {
            let url = `${process.env.REACT_APP_BASE_URL}/items`;
            const params = new URLSearchParams();

            if (search) params.append('search', search);
            if (sort) params.append('sort', sort);
            if (order) params.append('order', order);

            if (params.toString()) {
                url += '?' + params.toString();
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();

            // Map the backend data to match frontend expectations
            const mappedItems = data.map(item => ({
                id: item.itemID,
                name: item.name,
                description: item.description,
                imageID: item.imageID,
                itemPrice: item.itemPrice,
                itemQuantity: item.itemQuantity,
                discountCode: item.discountCode,
                isOnSale: item.isOnSale
            }));

            setItems(mappedItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchItems(searchTerm, sortBy, sortOrder);
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        fetchItems(searchTerm, newSort, sortOrder);
    };

    const handleOrderChange = (newOrder) => {
        setSortOrder(newOrder);
        fetchItems(searchTerm, sortBy, newOrder);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 40px',
                fontWeight: 'bold'
            }}>
                {['/', '/items', '/orders', '/EditItems'].map((path, i) => {
                    const names = ['Home', 'Items', 'Orders', 'EditItems'];
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            style={({ isActive }) => ({
                                textDecoration: isActive ? 'underline' : 'none',
                                color: isActive ? '#db3d3d' : 'black'
                            })}
                        >
                            {names[i]}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '-40px 0 20px 0' }}>
                <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '120px', height: '120px' }} />
            </div>

            {/* Search and Filter Controls with Create Button */}
            <div style={{ padding: '0 40px', marginBottom: '20px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />

                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                            <option value="">Sort by...</option>
                            <option value="price">Price</option>
                            <option value="quantity">Quantity</option>
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => handleOrderChange(e.target.value)}
                            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#db3d3d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Search
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/items/create')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#db3d3d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#c93333'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#db3d3d'}
                    >
                        + Create New Item
                    </button>
                </div>
            </div>

            {/* Items Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                padding: '0 40px',
                flex: 1
            }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                            {item.name}
                            {item.isOnSale && (
                                <span style={{
                                    marginLeft: '10px',
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px'
                                }}>
                                    ON SALE
                                </span>
                            )}
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>
                            {item.description}
                        </p>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '10px' }}>
                            ${(item.itemPrice / 100).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                            Stock: {item.itemQuantity}
                        </div>
                        <Link
                            to={`/items/${item.id}`}
                            style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                backgroundColor: '#db3d3d',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            <div style={{
                backgroundColor: '#db3d3d',
                height: '30px',
                marginTop: '20px'
            }} />
        </div>
    );
}

export default ItemsList;