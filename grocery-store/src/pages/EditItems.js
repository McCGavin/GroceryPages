import React from 'react';
import TomatoLogo from '../images/TomatoLogo.png';
import { NavLink } from 'react-router-dom';

function EditItem() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* Top Red Bar */}
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

            {/* Page Content */}
            <div style={{ flexGrow: 1 }}>

                {/* Navbar */}
                <nav style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '20px',
                    padding: '10px 40px',
                    fontWeight: 'bold'
                }}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            color: isActive ? '#db3d3d' : 'black'
                        })}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/items"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            color: isActive ? '#db3d3d' : 'black'
                        })}
                    >
                        Items
                    </NavLink>
                    <NavLink
                        to="/orders"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            color: isActive ? '#db3d3d' : 'black'
                        })}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/EditItems"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            color: isActive ? '#db3d3d' : 'black'
                        })}
                    >
                        EditItems
                    </NavLink>
                </nav>

                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '-40px 0 10px 0' }}>
                    <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '120px', height: '120px' }} />
                </div>

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    margin: '0 auto',
                    backgroundColor: '#f3eaea',
                    width: '90%',
                    height: '650px',
                    padding: '20px',
                    overflowY: 'scroll'
                }}>

                    {/* Edit Form */}
                    <div style={{ width: '45%' }}>
                        <h3 style={{ color: '#d00000' }}>Edit item</h3>

                        {['Item name', 'Item Price', 'Quantity', 'Department', 'Discount Code', 'Sale Status'].map((label, index) => (
                            <div key={index} style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>{label}</label>
                                <input
                                    type="text"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        backgroundColor: '#ccc',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <span style={{ color: 'blue', cursor: 'pointer' }}>Confirm</span>
                            <span style={{ color: 'red', cursor: 'pointer' }}>Delete</span>
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div style={{ width: '2px', backgroundColor: '#ccc', height: '100%' }} />

                    {/* Item Image Section */}
                    <div style={{ width: '45%' }}>
                        <h3 style={{ color: '#d00000' }}>Item Image</h3>

                        <div style={{
                            width: '100%',
                            height: '250px',
                            backgroundColor: '#666',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            Photo
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '24px', marginBottom: '20px' }}>
                            <span style={{ cursor: 'pointer' }}>Upload Photo</span>
                            <span style={{ cursor: 'pointer' }}>Save Current Photo</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'blue', cursor: 'pointer' }}>Confirm</span>
                            <span style={{ color: 'red', cursor: 'pointer' }}>Clear Image</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Red Bar */}
            <div style={{
                backgroundColor: '#db3d3d',
                padding: '10px',
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold'
            }}>
                Edit Item Page
            </div>
        </div>
    );
}

export default EditItem;