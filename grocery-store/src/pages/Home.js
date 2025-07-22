import React from 'react';
import { Link } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div style={{
            backgroundColor: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '100px', height: '100px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    width: '300px'
                }}>
                    <label>Email</label>
                    <input type="email" placeholder="Value"
                           style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
                    <label>Password</label>
                    <input type="password" placeholder="Value"
                           style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />

                    <Link to="/items" style={{ textDecoration: 'none' }}>
                        <button style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Sign In
                        </button>
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

export default Home;