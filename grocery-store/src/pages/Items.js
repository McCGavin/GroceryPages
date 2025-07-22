import React, { useState, useEffect } from 'react';
import TomatoLogo from '../images/TomatoLogo.png';
import { NavLink } from 'react-router-dom';

function Items() {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');

    const itemsPerPage = 50;


    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);

            let url = 'http://localhost:8081/items';

            if (sortOption === 'nameAsc') url += '?_sort=name&_order=asc';
            else if (sortOption === 'nameDesc') url += '?_sort=name&_order=desc';
            else if (sortOption === 'priceAsc') url += '?_sort=price&_order=asc';
            else if (sortOption === 'priceDesc') url += '?_sort=price&_order=desc';

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch items');
                const data = await response.json();
                setAllItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [sortOption]);

    const filteredItems = allItems.filter(item =>
        typeof item === 'string'
            ? item.toLowerCase().includes(searchTerm.toLowerCase())
            : item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>


            <div style={{ backgroundColor: '#db3d3d', height: '30px' }} />


            <div style={{ flexGrow: 1 }}>

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
                <div style={{ display: 'flex', justifyContent: 'center', margin: '-40px 0 10px 0' }}>
                    <img src={TomatoLogo} alt="Tomato Logo" style={{ width: '120px', height: '120px' }} />
                </div>

                {/* Search */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '15px',
                        backgroundColor: '#f2edf7',
                        padding: '5px 10px',
                        width: '400px'
                    }}>
                        <span style={{ marginRight: '10px', fontSize: '20px' }}>☰</span>
                        <input
                            type="text"
                            placeholder="Hinted search text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flexGrow: 1,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: '#f2edf7',
                                fontSize: '14px'
                            }}
                        />
                        <span style={{ marginLeft: '10px', fontSize: '18px' }}>🔍</span>
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}
                    >
                        <option value="default">-- Sort Items --</option>
                        <option value="nameAsc">Name ↑</option>
                        <option value="nameDesc">Name ↓</option>
                        <option value="priceAsc">Price ↑</option>
                        <option value="priceDesc">Price ↓</option>
                    </select>
                </div>

                {/* Items List */}
                <div style={{
                    margin: '0 auto',
                    backgroundColor: '#f3eaea',
                    width: '90%',
                    height: '650px',
                    overflowY: 'scroll',
                    padding: '15px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        fontWeight: 'bold'
                    }}>
                        <div>List of Items</div>

                    </div>

                    {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}
                    {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                    {!loading && !error && displayedItems.map((item, index) => (
                        <div
                            key={index}
                            style={{ padding: '5px 0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <span>{typeof item === 'string' ? item : item.name}</span>
                            <span>${item.price?.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Pagination */}
            <div style={{
                backgroundColor: '#db3d3d',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <span
                    style={{ marginRight: '20px', color: '#fff', cursor: 'pointer' }}
                    onClick={() => goToPage(currentPage - 1)}
                >
                    ← Previous
                </span>

                {[...Array(totalPages).keys()].map((i) => {
                    const pageNum = i + 1;
                    if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 2) {
                        return (
                            <span
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                style={{
                                    margin: '0 5px',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    backgroundColor: pageNum === currentPage ? '#8d1515' : 'transparent',
                                    color: '#fff',
                                    fontWeight: pageNum === currentPage ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                            >
                                {pageNum}
                            </span>
                        );
                    } else if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                        return <span key={pageNum} style={{ color: '#fff' }}>...</span>;
                    } else {
                        return null;
                    }
                })}

                <span
                    style={{ marginLeft: '20px', color: '#fff', cursor: 'pointer' }}
                    onClick={() => goToPage(currentPage + 1)}
                >
                    Next →
                </span>
            </div>

        </div>
    );
}

export default Items;