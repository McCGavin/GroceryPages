import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';
import { NavLink } from 'react-router-dom';

function ItemDetail() {
    const { id } = useParams();
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!item) return <div>Item not found</div>;

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

            {/* Back Button */}
            <div style={{ padding: '0 40px', marginBottom: '20px' }}>
                <Link to="/items" style={{ 
                    textDecoration: 'none', 
                    color: '#db3d3d',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}>
                    ← Back to Items
                </Link>
            </div>

            {/* Item Detail Card */}
            <div style={{
                margin: '0 auto',
                width: '80%',
                maxWidth: '600px',
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid #ddd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                {/* Item Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{
                        margin: '0 0 10px 0',
                        color: '#333',
                        fontSize: '32px'
                    }}>
                        {item.name}
                        {item.isOnSale && (
                            <span style={{
                                marginLeft: '15px',
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                padding: '5px 12px',
                                borderRadius: '15px',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                ON SALE
                            </span>
                        )}
                    </h1>
                    <div style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }}>
                        ${(item.itemPrice / 100).toFixed(2)}
                    </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>Description</h3>
                    <p style={{
                        color: '#666',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        margin: '0'
                    }}>
                        {item.description}
                    </p>
                </div>

                {/* Item Details Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div>
                        <h4 style={{ color: '#333', margin: '0 0 5px 0' }}>Stock Quantity</h4>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: item.itemQuantity > 50 ? '#27ae60' : 
                                   item.itemQuantity > 20 ? '#f39c12' : '#e74c3c'
                        }}>
                            {item.itemQuantity} in stock
                        </span>
                    </div>

                    <div>
                        <h4 style={{ color: '#333', margin: '0 0 5px 0' }}>Item ID</h4>
                        <span style={{ fontSize: '18px', color: '#666' }}>#{item.id}</span>
                    </div>
                </div>

                {/* Discount Code */}
                {item.discountCode && (
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{
                            backgroundColor: '#3498db',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            display: 'inline-block',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            Discount Code: {item.discountCode}
                        </div>
                    </div>
                )}

                {/* Add to Cart Button */}
                <div style={{ textAlign: 'center' }}>
                    <Link
                        to={`/items/${item.id}/edit`}
                        style={{
                            backgroundColor: '#db3d3d',
                            color: 'white',
                            padding: '15px 40px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Edit Item
                    </Link>
                </div>
            </div>

            <div style={{
                backgroundColor: '#db3d3d',
                height: '30px',
                marginTop: 'auto'
            }} />
        </div>
    );
}

export default ItemDetail;