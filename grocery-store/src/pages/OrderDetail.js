import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function OrderDetail() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [executing, setExecuting] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${orderId}`);
                if (!response.ok) throw new Error('Order not found');
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleExecuteOrder = async () => {
        if (!window.confirm('Are you sure you want to execute this order?')) return;

        setExecuting(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${orderId}/execute`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to execute order');
            }

            // Refresh order data
            const updatedResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${orderId}`);
            if (updatedResponse.ok) {
                const updatedData = await updatedResponse.json();
                setOrder(updatedData);
            }

            alert(`Order #${orderId} executed successfully!`);
        } catch (err) {
            alert(`Error executing order: ${err.message}`);
        } finally {
            setExecuting(false);
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

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading order...</div>;
    if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
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
                <div style={{ display: 'flex', gap: '30px' }}>
                    <NavLink to="/items" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? '#db3d3d' : '#2c3e50',
                        fontWeight: '600',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#ffeaea' : 'transparent',
                        border: isActive ? '2px solid #db3d3d' : '2px solid transparent'
                    })}>Items</NavLink>
                    <NavLink to="/orders" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? '#db3d3d' : '#2c3e50',
                        fontWeight: '600',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#ffeaea' : 'transparent',
                        border: isActive ? '2px solid #db3d3d' : '2px solid transparent'
                    })}>Orders</NavLink>
                </div>
                <button onClick={handleLogout} style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>Logout</button>
            </nav>

            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '100px', height: '100px' }} />
            </div>

            {/* Page Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 400px) 1fr',
                gap: '40px',
                padding: '0 20px 40px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                flex: 1
            }}>
                {/* Left Panel - Order Summary */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    alignSelf: 'start'
                }}>
                    <div style={{
                        width: '100%',
                        height: '250px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6',
                        color: '#6c757d',
                        flexDirection: 'column'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
                        <p style={{ margin: '10px 0', fontSize: '18px', fontWeight: '600', color: '#2c3e50' }}>
                            Order #{order.orderID}
                        </p>
                        <div style={{
                            backgroundColor: getOrderStatusColor(order.orderStatus),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            {getOrderStatusText(order.orderStatus)}
                        </div>
                    </div>
                    <p style={{ marginTop: '10px', fontSize: '14px', color: '#666', margin: '10px 0 0 0' }}>
                        Order Summary
                    </p>
                </div>

                {/* Right Panel - Order Details */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ marginBottom: '30px', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px' }}>
                        <h1 style={{ fontSize: '28px', margin: '0', color: '#2c3e50' }}>Order #{order.orderID}</h1>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{
                                fontSize: '14px',
                                color: '#666',
                                backgroundColor: '#f8f9fa',
                                padding: '4px 12px',
                                borderRadius: '12px'
                            }}>
                                Customer ID: {order.customerID}
                            </span>
                            <span style={{
                                fontSize: '14px',
                                color: getOrderStatusColor(order.orderStatus),
                                backgroundColor: getOrderStatusColor(order.orderStatus) + '15',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontWeight: '600'
                            }}>
                                {getOrderStatusText(order.orderStatus)}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Order Details</h3>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef'
                        }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
                                <strong>Order Date:</strong> {formatDate(order.orderTime)}
                            </p>
                            <p style={{ margin: '0', fontSize: '16px' }}>
                                <strong>Total Items:</strong> {order.items.length}
                            </p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Items in Order</h3>
                        <div style={{ 
                            display: 'inline-block',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e9ecef',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        width: 'fit-content',
                                        minWidth: '400px'
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            flexShrink: 0
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
                                                color: '#6c757d'
                                            }}>
                                                <span style={{ fontSize: '20px' }}>📦</span>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{item.name}</h4>
                                            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c3e50' }}>
                                                ${(item.itemPrice / 100).toFixed(2)}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>
                                                each
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Total Price</h3>
                        <p style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            color: '#db3d3d',
                            margin: '0'
                        }}>
                            ${(order.orderPrice / 100).toFixed(2)}
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <Link to="/orders" style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(108, 117, 125, 0.3)'
                        }}>
                            Back to Orders
                        </Link>

                        {!order.orderStatus && (
                            <button
                                onClick={handleExecuteOrder}
                                disabled={executing}
                                style={{
                                    backgroundColor: executing ? '#ccc' : '#27ae60',
                                    color: 'white',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: executing ? 'not-allowed' : 'pointer',
                                    boxShadow: executing ? 'none' : '0 4px 12px rgba(39, 174, 96, 0.3)'
                                }}
                            >
                                {executing ? 'Executing...' : 'Execute Order'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />
        </div>
    );
}

export default OrderDetail;