import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            let url = 'http://localhost:8081/orders';

            if (sortOption === 'timeAsc') url = 'http://localhost:8081/orders?_sort=timestamp&_order=asc';
            else if (sortOption === 'timeDesc') url = 'http://localhost:8081/orders?_sort=timestamp&_order=desc';
            else if (sortOption === 'priceAsc') url = 'http://localhost:8081/orders?_sort=totalPrice&_order=asc';
            else if (sortOption === 'priceDesc') url = 'http://localhost:8081/orders?_sort=totalPrice&_order=desc';
            else if (sortOption === 'customer') url = 'http://localhost:8081/orders?_sort=customerId&_order=asc';

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [sortOption]);

    const executeOrder = async (orderId) => {
        try {
            const res = await fetch(`http://localhost:8081/orders/${orderId}/execute`, {
                method: 'POST'
            });
            if (!res.ok) throw new Error('Execution failed');
            alert(`Order ${orderId} executed!`);
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />

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

            <div style={{ margin: '20px auto', width: '80%' }}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Orders</h2>
                    <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
                        <option value="default">-- Sort Orders --</option>
                        <option value="timeAsc">Time ↑</option>
                        <option value="timeDesc">Time ↓</option>
                        <option value="priceAsc">Price ↑</option>
                        <option value="priceDesc">Price ↓</option>
                        <option value="customer">Customer ID</option>
                    </select>
                </div>

                {loading && <p>Loading orders...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && (
                    <div style={{
                        backgroundColor: '#f5f5f5',
                        padding: '10px',
                        borderRadius: '8px',
                        maxHeight: '500px',
                        overflowY: 'scroll'
                    }}>
                        {orders.map(order => (
                            <div key={order.id} style={{
                                borderBottom: '1px solid #ccc',
                                padding: '10px 0',
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}>
                                <div>
                                    <div><strong>ID:</strong> {order.id}</div>
                                    <div><strong>Customer ID:</strong> {order.customerId}</div>
                                    <div><strong>Total Price:</strong> ${order.totalPrice}</div>
                                    <div><strong>Timestamp:</strong> {order.timestamp}</div>
                                </div>
                                <button
                                    style={{
                                        height: '40px',
                                        padding: '0 20px',
                                        backgroundColor: '#db3d3d',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => executeOrder(order.id)}
                                >
                                    Execute
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ backgroundColor: '#db3d3d', height: '30px', marginTop: 'auto' }} />
        </div>
    );
}

export default Orders;