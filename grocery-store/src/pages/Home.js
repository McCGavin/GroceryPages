import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();

            navigate('/items');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

            {/* Main Content Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px'
            }}>
                {/* Logo and Welcome Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <img 
                        src={TomatoLogo} 
                        alt="Tomato Logo" 
                        style={{ 
                            width: '120px', 
                            height: '120px',
                            marginBottom: '20px',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                        }} 
                    />
                    <h1 style={{
                        color: '#db3d3d',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '16px',
                        margin: '0'
                    }}>
                        Sign in to access your grocery store
                    </p>
                </div>

                {/* Login Form */}
                <div style={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    {error && (
                        <div style={{
                            backgroundColor: '#ffebee',
                            color: '#c62828',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            textAlign: 'center',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#333',
                                fontSize: '14px'
                            }}>
                                Username
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box',
                                    backgroundColor: loading ? '#f5f5f5' : '#fff'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#db3d3d'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            />
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#333',
                                fontSize: '14px'
                            }}>
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    border: '2px solid #e1e5e9',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    boxSizing: 'border-box',
                                    backgroundColor: loading ? '#f5f5f5' : '#fff'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#db3d3d'}
                                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: loading ? '#ccc' : '#db3d3d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(219, 61, 61, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#c93333';
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(219, 61, 61, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#db3d3d';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 2px 4px rgba(219, 61, 61, 0.2)';
                                }
                            }}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Additional Info */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '32px',
                    color: '#666',
                    fontSize: '14px'
                }}>
                    <p style={{ margin: '0' }}>
                        Don't have an account? 
                        <Link 
                            to="/register" 
                            style={{
                                color: '#db3d3d',
                                textDecoration: 'none',
                                fontWeight: '500',
                                marginLeft: '4px'
                            }}
                        >
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#db3d3d',
                height: '30px'
            }} />
        </div>
    );
}

export default Home;