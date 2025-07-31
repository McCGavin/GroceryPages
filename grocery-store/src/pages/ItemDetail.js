import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, NavLink } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items/${id}`);
                if (!response.ok) throw new Error('Item not found');
                const data = await response.json();
                const mappedItem = {
                    id: data.itemID,
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
        localStorage.removeItem('authToken');
        navigate('/');
    };

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

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading item...</div>;
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
                maxWidth: '1800px',
                margin: '0 auto'
            }}>
                {/* Left Panel */}
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
                        overflow: 'hidden'
                    }}>
                        {item.imageID ? (
                            <img 
                                src={item.imageID} 
                                alt={item.name}
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    borderRadius: '12px'
                                }}
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            display: item.imageID ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #dee2e6',
                            color: '#6c757d',
                            flexDirection: 'column'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📦</div>
                            <p>No Image Available</p>
                        </div>
                    </div>
                    <p style={{ marginTop: '10px', fontSize: '14px', color: '#666', margin: '10px 0 0 0' }}>
                        Product Image
                    </p>
                </div>



                {/* Right Panel */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ marginBottom: '30px', borderBottom: '2px solid #f0f0f0', paddingBottom: '20px' }}>
                        <h1 style={{ fontSize: '28px', margin: '0', color: '#2c3e50' }}>{item.name}</h1>
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
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
                            {item.isOnSale && (
                                <span style={{
                                    backgroundColor: '#e74c3c',
                                    color: '#fff',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    On Sale
                                </span>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Description</h3>
                        <p style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #e9ecef',
                            fontSize: '16px',
                            color: '#555',
                            lineHeight: 1.6
                        }}>
                            {item.description || 'No description available.'}
                        </p>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Price</h3>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#db3d3d',
                            marginBottom: '5px'
                        }}>
                            ${(item.itemPrice / 100).toFixed(2)}
                        </p>
                        <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                            {item.itemPrice} cents
                        </p>

                        <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Quantity</h3>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: getStockColor(item.itemQuantity),
                            marginBottom: '5px'
                        }}>
                            {item.itemQuantity}
                        </p>
                        <p style={{ fontSize: '14px', color: '#888' }}>
                            {getStockStatus(item.itemQuantity)}
                        </p>
                    </div>


                    {item.discountCode && (
                        <div style={{
                            marginBottom: '30px',
                            backgroundColor: '#3498db',
                            color: '#fff',
                            padding: '20px',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontWeight: '600' }}>Special Discount Available</p>
                            <p style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                letterSpacing: '2px'
                            }}>
                                {item.discountCode}
                            </p>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <Link to={`/items/${item.id}/edit`} style={{
                            backgroundColor: '#db3d3d',
                            color: 'white',
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(219, 61, 61, 0.3)'
                        }}>
                            Edit Item
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />
        </div>
    );
}

export default ItemDetail;
