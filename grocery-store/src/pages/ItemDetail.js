import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';
import { NavLink } from 'react-router-dom';

function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items/${id}`);
                if (!response.ok) {
                    throw new Error('Item not found');
                }
                const data = await response.json();
            
                // Map the backend data to match frontend expectations
                const mappedItem = {
                    id: data.itemID,  // Map itemID to id
                    name: data.name,
                    description: data.description,
                    imageID: data.imageID,
                    itemPrice: data.itemPrice,
                    itemQuantity: data.itemQuantity,
                    discountCode: data.discountCode,
                    isOnSale: data.isOnSale
                };
            
                setItem(mappedItem);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleLogout = () => {
        // Clear any stored authentication data
        localStorage.removeItem('authToken');
        navigate('/');
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
                    <p style={{ color: '#666', fontSize: '16px' }}>Loading item details...</p>
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
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0' }}>Error</h2>
                        <p style={{ margin: '0' }}>{error}</p>
                    </div>
                    <Link 
                        to="/items" 
                        style={{
                            color: '#db3d3d',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Back to Items
                    </Link>
                </div>
            </div>
        );
    }

    if (!item) return <div>Item not found</div>;

    const getStockColor = (quantity) => {
        if (quantity > 50) return '#27ae60';
        if (quantity > 20) return '#f39c12';
        if (quantity > 0) return '#e67e22';
        return '#e74c3c';
    };

    const getStockStatus = (quantity) => {
        if (quantity > 50) return 'In Stock';
        if (quantity > 20) return 'Low Stock';
        if (quantity > 0) return 'Very Low Stock';
        return 'Out of Stock';
    };

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
                        width: '100px', 
                        height: '100px',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }} 
                />
            </div>

            {/* Back Button */}
            <div style={{ padding: '0 20px', marginBottom: '20px', maxWidth: '1200px', margin: '0 auto 20px auto', width: '100%' }}>
                <Link to="/items" style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none', 
                    color: '#db3d3d',
                    fontSize: '16px',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease'
                }}>
                    <span style={{ marginRight: '8px' }}>←</span>
                    Back to Items
                </Link>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '0 20px 40px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 400px) 1fr',
                    gap: '40px',
                    alignItems: 'start'
                }}>
                    {/* Image Section */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        padding: '30px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '300px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                            border: '2px dashed #dee2e6'
                        }}>
                            <div style={{
                                textAlign: 'center',
                                color: '#6c757d'
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    marginBottom: '10px'
                                }}>📦</div>
                                <p style={{ margin: '0', fontSize: '14px' }}>
                                    Image ID: {item.imageID || 'No image'}
                                </p>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '15px',
                            marginTop: '20px'
                        }}>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#db3d3d'
                                }}>
                                    ${(item.itemPrice / 100).toFixed(2)}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    textTransform: 'uppercase',
                                    fontWeight: '600'
                                }}>
                                    Price
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: getStockColor(item.itemQuantity)
                                }}>
                                    {item.itemQuantity}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    textTransform: 'uppercase',
                                    fontWeight: '600'
                                }}>
                                    In Stock
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        padding: '40px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}>
                        {/* Header */}
                        <div style={{
                            marginBottom: '30px',
                            paddingBottom: '20px',
                            borderBottom: '2px solid #f8f9fa'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '10px'
                            }}>
                                <h1 style={{
                                    margin: '0',
                                    color: '#2c3e50',
                                    fontSize: '36px',
                                    fontWeight: '700'
                                }}>
                                    {item.name}
                                </h1>
                                {item.isOnSale && (
                                    <span style={{
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        On Sale
                                    </span>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    backgroundColor: '#f8f9fa',
                                    padding: '4px 12px',
                                    borderRadius: '12px'
                                }}>
                                    ID: #{item.id}
                                </span>
                                <span style={{
                                    fontSize: '14px',
                                    color: getStockColor(item.itemQuantity),
                                    backgroundColor: getStockColor(item.itemQuantity) + '15',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontWeight: '600'
                                }}>
                                    {getStockStatus(item.itemQuantity)}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ 
                                color: '#2c3e50', 
                                marginBottom: '15px',
                                fontSize: '20px',
                                fontWeight: '600'
                            }}>
                                Description
                            </h3>
                            <p style={{
                                color: '#666',
                                fontSize: '16px',
                                lineHeight: '1.7',
                                margin: '0',
                                backgroundColor: '#f8f9fa',
                                padding: '20px',
                                borderRadius: '12px',
                                border: '1px solid #e9ecef'
                            }}>
                                {item.description || 'No description available for this item.'}
                            </p>
                        </div>

                        {/* Detailed Information */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '20px',
                                borderRadius: '12px',
                                border: '1px solid #e9ecef'
                            }}>
                                <h4 style={{ 
                                    color: '#2c3e50', 
                                    margin: '0 0 10px 0',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    Price Details
                                </h4>
                                <div style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#db3d3d',
                                    marginBottom: '5px'
                                }}>
                                    ${(item.itemPrice / 100).toFixed(2)}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    ({item.itemPrice} cents)
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '20px',
                                borderRadius: '12px',
                                border: '1px solid #e9ecef'
                            }}>
                                <h4 style={{ 
                                    color: '#2c3e50', 
                                    margin: '0 0 10px 0',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    Inventory
                                </h4>
                                <div style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: getStockColor(item.itemQuantity),
                                    marginBottom: '5px'
                                }}>
                                    {item.itemQuantity}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                                    {getStockStatus(item.itemQuantity)}
                                </div>
                            </div>
                        </div>

                        {/* Discount Code */}
                        {item.discountCode && (
                            <div style={{ 
                                marginBottom: '30px',
                                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                background: '#3498db',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>
                                    Special Discount Available
                                </div>
                                <div style={{
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace',
                                    letterSpacing: '2px'
                                }}>
                                    {item.discountCode}
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        <div style={{ 
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center'
                        }}>
                            <Link
                                to={`/items/${item.id}/edit`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    backgroundColor: '#db3d3d',
                                    color: 'white',
                                    padding: '16px 32px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(219, 61, 61, 0.3)',
                                    transition: 'all 0.2s ease',
                                    gap: '8px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#c93333';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(219, 61, 61, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#db3d3d';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(219, 61, 61, 0.3)';
                                }}
                            >
                                Edit Item
                            </Link>
                        </div>
                    </div>
                </div>
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

export default ItemDetail;