import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TomatoLogo from '../images/TomatoLogo.png';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Basic password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
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
                if (response.status === 409) {
                    throw new Error('Username already exists');
                } else {
                    throw new Error('Failed to create account');
                }
            }

            setSuccess(true);
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{
                backgroundColor: '#f8f9fa',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    maxWidth: '400px'
                }}>
                    <div style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0' }}>Account Created Successfully!</h2>
                        <p style={{ margin: '0' }}>Redirecting you to login...</p>
                    </div>
                    <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '80px', height: '80px' }} />
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

            {/* Back to login link */}
            <div style={{
                padding: '15px 40px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Link 
                    to="/" 
                    style={{
                        textDecoration: 'none',
                        color: '#db3d3d',
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}
                >
                    ← Back to Login
                </Link>
            </div>

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
                        Create Account
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '16px',
                        margin: '0'
                    }}>
                        Join our grocery store management system
                    </p>
                </div>

                {/* Registration Form */}
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

                    <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
                                placeholder="Choose a username"
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

                        <div style={{ marginBottom: '24px' }}>
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
                                placeholder="Create a password"
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

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                                color: '#333',
                                fontSize: '14px'
                            }}>
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {loading ? 'Creating Account...' : 'Create Account'}
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
                        Already have an account? 
                        <Link 
                            to="/" 
                            style={{
                                color: '#db3d3d',
                                textDecoration: 'none',
                                fontWeight: '500',
                                marginLeft: '4px'
                            }}
                        >
                            Sign in here
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

export default Register;