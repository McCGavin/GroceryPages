import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [executingOrders, setExecutingOrders] = useState(new Set());

    const fetchOrders = async (search = '', sort = '', order = 'desc') => {
        setLoading(true);
        setError(null);

        try {
            let url = `${process.env.REACT_APP_BASE_URL}/orders`;
            
            // Handle sorting
            if (sort) {
                if (sort === 'time') {
                    url += `/sort/time?ascending=${order === 'asc'}`;
                } else if (sort === 'customer') {
                    url += `/sort/customer`;
                } else if (sort === 'price') {
                    url += `/sort/price?ascending=${order === 'asc'}`;
                }
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();


            let filteredOrders = data;
            if (search) {
                filteredOrders = data.filter(order => 
                    order.orderID.toString().includes(search) ||
                    order.customerID.toString().includes(search) ||
                    order.items.some(item => 
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }

            setOrders(filteredOrders);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchOrders(searchTerm, sortBy, sortOrder);
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        fetchOrders(searchTerm, newSort, sortOrder);
    };

    const handleOrderChange = (newOrder) => {
        setSortOrder(newOrder);
        fetchOrders(searchTerm, sortBy, newOrder);
    };

    const handleLogout = () => {
        // Clear any stored authentication data
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const executeOrder = async (orderId) => {
        setExecutingOrders(prev => new Set([...prev, orderId]));
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${orderId}/execute`, {
                method: 'POST'
            });
            
            if (!response.ok) {
                throw new Error('Failed to execute order');
            }
            
            // Refresh orders after execution
            await fetchOrders(searchTerm, sortBy, sortOrder);
            
            // Show success message
            alert(`Order #${orderId} executed successfully!`);
        } catch (err) {
            alert(`Error executing order: ${err.message}`);
        } finally {
            setExecutingOrders(prev => {
                const newSet = new Set(prev);
                newSet.delete(orderId);
                return newSet;
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const getOrderStatusColor = (status) => {
        return status ? '#27ae60' : '#e74c3c';
    };

    const getOrderStatusText = (status) => {
        return status ? 'Executed' : 'Pending';
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #db3d3d',
                        borderTop: '4px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '16px' }}>Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        padding: '20px',
                        borderRadius: '8px'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0' }}>Error</h2>
                        <p style={{ margin: '0' }}>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

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
                    Order Management
                </h1>
                <p style={{
                    color: '#666',
                    fontSize: '16px',
                    margin: '0'
                }}>
                    View and manage all customer orders
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
                    maxWidth: '800px'
                }}>
                    <form onSubmit={handleSearch} style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        alignItems: 'center', 
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <input
                            type="text"
                            placeholder="Search by Order ID, Customer ID, or Item Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                border: '2px solid #e1e5e9',
                                borderRadius: '8px',
                                fontSize: '14px',
                                minWidth: '300px',
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
                                backgroundColor: '#fff'
                            }}
                        >
                            <option value="">Sort by...</option>
                            <option value="time">Order Time</option>
                            <option value="customer">Customer ID</option>
                            <option value="price">Order Price</option>
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
                                backgroundColor: '#fff'
                            }}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#db3d3d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(219, 61, 61, 0.2)'
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
                </div>
            </div>

            {/* Orders Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px',
                padding: '0 40px',
                flex: 1,
                marginBottom: '40px'
            }}>
                {orders.length === 0 ? (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{
                            color: '#666',
                            margin: '0 0 10px 0'
                        }}>
                            No orders found
                        </h3>
                        <p style={{
                            color: '#999',
                            margin: '0'
                        }}>
                            {searchTerm ? 'Try adjusting your search criteria' : 'No orders have been placed yet'}
                        </p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.orderID} style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Order Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '15px'
                            }}>
                                <div>
                                    <h3 style={{
                                        margin: '0 0 5px 0',
                                        color: '#333',
                                        fontSize: '18px',
                                        fontWeight: '600'
                                    }}>
                                        Order #{order.orderID}
                                    </h3>
                                    <p style={{
                                        margin: '0 0 5px 0',
                                        color: '#666',
                                        fontSize: '14px'
                                    }}>
                                        Customer: {order.customerID}
                                    </p>
                                    <span style={{
                                        backgroundColor: getOrderStatusColor(order.orderStatus),
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {getOrderStatusText(order.orderStatus)}
                                    </span>
                                </div>
                                
                                <div style={{
                                    textAlign: 'right'
                                }}>
                                    <div style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#2c3e50',
                                        marginBottom: '5px'
                                    }}>
                                        ${(order.orderPrice / 100).toFixed(2)}
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        color: '#666'
                                    }}>
                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>

                            {/* Order Date */}
                            <div style={{
                                fontSize: '14px',
                                color: '#666',
                                marginBottom: '20px',
                                flex: '1'
                            }}>
                                {formatDate(order.orderTime)}
                            </div>

                            {/*Action Buttons*/}
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                marginTop: 'auto'
                            }}>
                                <Link
                                    to={`/orders/${order.orderID}`}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    View Details
                                </Link>
                                
                                {!order.orderStatus && (
                                    <button
                                        onClick={() => executeOrder(order.orderID)}
                                        disabled={executingOrders.has(order.orderID)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: executingOrders.has(order.orderID) ? '#ccc' : '#27ae60',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: executingOrders.has(order.orderID) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {executingOrders.has(order.orderID) ? 'Executing...' : 'Execute Order'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div style={{
                backgroundColor: '#db3d3d',
                height: '30px'
            }} />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Orders;