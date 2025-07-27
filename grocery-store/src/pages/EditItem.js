import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function EditItem() {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items/${id}`);
                if (!response.ok) throw new Error('Item not found');
                const data = await response.json();
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    imageID: data.imageID || '',
                    itemPrice: data.itemPrice || '',
                    itemQuantity: data.itemQuantity || '',
                    discountCode: data.discountCode || '',
                    isOnSale: data.isOnSale || false
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const submitData = {
                ...formData,
                itemPrice: parseInt(formData.itemPrice),
                itemQuantity: parseInt(formData.itemQuantity)
            };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });
            if (!response.ok) throw new Error('Failed to update item');
            navigate(`/items/${id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/items/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete item');
            navigate('/items');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading item data...</p>
            </div>
        );
    }

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
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <NavLink to="/items" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? '#db3d3d' : '#2c3e50',
                        fontWeight: '600',
                        fontSize: '16px',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#ffeaea' : 'transparent',
                        border: isActive ? '2px solid #db3d3d' : '2px solid transparent'
                    })}>Items</NavLink>
                    <NavLink to="/orders" style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? '#db3d3d' : '#2c3e50',
                        fontWeight: '600',
                        fontSize: '16px',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#ffeaea' : 'transparent',
                        border: isActive ? '2px solid #db3d3d' : '2px solid transparent'
                    })}>Orders</NavLink>
                </div>
                <button onClick={handleLogout} style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
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

            {/* Main Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 400px) 1fr',
                gap: '40px',
                padding: '0 20px 40px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Left Panel */}
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
                        border: '2px dashed #dee2e6',
                        color: '#6c757d'
                    }}>
                        <div>
                            <div style={{ fontSize: '48px' }}>📦</div>
                            <p>Image ID: {formData.imageID || 'None'}</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <form onSubmit={handleSubmit} style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Edit Item</h1>

                    <label>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Name *</div>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
                    </label>

                    <label>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description</div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} style={textareaStyle} />
                    </label>

                    <label>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Image ID</div>
                        <input type="text" name="imageID" value={formData.imageID} onChange={handleInputChange} style={inputStyle} />
                    </label>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <label style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Price (cents)</div>
                            <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleInputChange} min="0" required style={inputStyle} />
                        </label>
                        <label style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quantity</div>
                            <input type="number" name="itemQuantity" value={formData.itemQuantity} onChange={handleInputChange} min="0" required style={inputStyle} />
                        </label>
                    </div>

                    <label>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Discount Code</div>
                        <input type="text" name="discountCode" value={formData.discountCode} onChange={handleInputChange} style={inputStyle} />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" name="isOnSale" checked={formData.isOnSale} onChange={handleInputChange} style={{ marginRight: '10px' }} />
                        <span style={{ fontWeight: 'bold' }}>Item is on Sale</span>
                    </label>

                    {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <button type="button" onClick={() => navigate(`/items/${id}`)} style={btnStyle('#666')}>Cancel</button>
                        <button type="button" onClick={handleDelete} style={btnStyle('#e74c3c')}>Delete</button>
                        <button type="submit" disabled={saving} style={btnStyle(saving ? '#ccc' : '#db3d3d')}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ backgroundColor: '#db3d3d', height: '30px', marginTop: '40px' }} />
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
};

const textareaStyle = {
    ...inputStyle,
    resize: 'vertical'
};

const btnStyle = (bg) => ({
    padding: '12px 24px',
    backgroundColor: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: bg === '#ccc' ? 'not-allowed' : 'pointer'
});

export default EditItem;
