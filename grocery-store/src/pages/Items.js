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

    const handleLogout = () => {
        // Clear any stored auth data
        localStorage.removeItem('authToken');
        navigate('/');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 40px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderBottom: '3px solid #db3d3d'
            }}>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <NavLink
                        to="/items"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: isActive ? '#db3d3d' : '#2c3e50',
                            fontWeight: '600',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: isActive ? '#ffeaea' : 'transparent',
                            border: isActive ? '2px solid #db3d3d' : '2px solid transparent',
                            transition: 'all 0.2s ease'
                        })}
                    >
                        Items
                    </NavLink>
                    <NavLink
                        to="/orders"
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: isActive ? '#db3d3d' : '#2c3e50',
                            fontWeight: '600',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            backgroundColor: isActive ? '#ffeaea' : 'transparent',
                            border: isActive ? '2px solid #db3d3d' : '2px solid transparent',
                            transition: 'all 0.2s ease'
                        })}
                    >
                        Orders
                    </NavLink>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(231, 76, 60, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#c0392b';
                        e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#e74c3c';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Logout
                </button>
            </nav>

            {/* Logo */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '20px 0',
                position: 'relative',
                zIndex: 1
            }}>
                <img 
                    src={TomatoLogo} 
                    alt="Tomato Logo" 
                    style={{ 
                        width: '120px', 
                        height: '120px',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }} 
                />
            </div>

            {/* Page Title */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{
                    color: '#2c3e50',
                    fontSize: '36px',
                    fontWeight: '700',
                    margin: '0 0 10px 0'
                }}>
                    Item Management
                </h1>
                <p style={{
                    color: '#666',
                    fontSize: '16px',
                    margin: '0'
                }}>
                    Browse and manage your inventory
                </p>
            </div>

            {/* Search and Filter Controls */}
            <div style={{ 
                padding: '0 40px', 
                marginBottom: '30px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '1000px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        flexWrap: 'nowrap'
                    }}>
                        <form onSubmit={handleSearch} style={{
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center',
                            flex: 1,
                            minWidth: 0
                        }}>
                            <input
                                type="text"
                                placeholder="Search by Item Name, Description, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    flex: 1,
                                    minWidth: '200px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#db3d3d'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            />

                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    minWidth: '120px'
                                }}
                            >
                                <option value="">Sort by...</option>
                                <option value="price">Price</option>
                                <option value="quantity">Quantity</option>
                            </select>

                            <select
                                value={sortOrder}
                                onChange={(e) => handleOrderChange(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    minWidth: '110px'
                                }}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>

                            <button
                                type="submit"
                                style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#db3d3d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(219, 61, 61, 0.2)',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#c93333';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#db3d3d';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Search
                            </button>
                        </form>

                        <button
                            onClick={() => navigate('/items/create')}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                boxShadow: '0 2px 4px rgba(39, 174, 96, 0.2)',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#219a52';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#27ae60';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Create New Item
                        </button>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                padding: '0 40px',
                flex: 1,
                marginBottom: '40px'
            }}>
                {items.map(item => (
                    <div key={item.id} style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '200px',
                            marginBottom: '15px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {item.imageID ? (
                                <img 
                                    src={item.imageID} 
                                    alt={item.name}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f8f9fa',
                                display: item.imageID ? 'none' : 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #dee2e6',
                                color: '#6c757d',
                                flexDirection: 'column'
                            }}>
                                <div style={{ fontSize: '32px', marginBottom: '5px' }}>📦</div>
                                <span style={{ fontSize: '12px' }}>No Image</span>
                            </div>
                        </div>
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
                height: '30px'
            }} />
        </div>
    );
}

export default ItemsList;