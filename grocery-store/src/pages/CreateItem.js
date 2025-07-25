import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function CreateItem() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageID: '',
        itemPrice: '',
        itemQuantity: '',
        discountCode: '',
        isOnSale: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const submitData = {
                ...formData,
                itemPrice: parseInt(formData.itemPrice), // Convert to cents
                itemQuantity: parseInt(formData.itemQuantity)
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                throw new Error('Failed to create item');
            }

            navigate('/items');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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

            <div style={{ padding: '0 40px', flex: 1 }}>
                <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Create New Item</h1>

                {error && (
                    <div style={{
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Image ID
                        </label>
                        <input
                            type="text"
                            name="imageID"
                            value={formData.imageID}
                            onChange={handleInputChange}
                            placeholder="e.g., banana001.jpg"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Price (in cents) *
                            </label>
                            <input
                                type="number"
                                name="itemPrice"
                                value={formData.itemPrice}
                                onChange={handleInputChange}
                                required
                                min="0"
                                placeholder="199 (for $1.99)"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Quantity *
                            </label>
                            <input
                                type="number"
                                name="itemQuantity"
                                value={formData.itemQuantity}
                                onChange={handleInputChange}
                                required
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Discount Code
                        </label>
                        <input
                            type="text"
                            name="discountCode"
                            value={formData.discountCode}
                            onChange={handleInputChange}
                            placeholder="e.g., FRUIT99"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isOnSale"
                                checked={formData.isOnSale}
                                onChange={handleInputChange}
                                style={{ marginRight: '8px' }}
                            />
                            <span style={{ fontWeight: 'bold' }}>Item is on sale</span>
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/items')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#666',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: loading ? '#ccc' : '#db3d3d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Creating...' : 'Create Item'}
                        </button>
                    </div>
                </form>
            </div>

            <div style={{
                backgroundColor: '#db3d3d',
                height: '30px'
            }} />
        </div>
    );
}

export default CreateItem;