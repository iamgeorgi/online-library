import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../media/book-logo.jpg';
import { useAuth } from '../../Auth/AuthContext.js';
import { useHistory } from 'react-router-dom';

const Header = (props) => {

    const token = localStorage.getItem('token');
    const { user, setUser } = useAuth();
    const [search, setSearch] = useState('');
    const [allBooks, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('token');
        alert('You successfully logged out!');
        setUser(null);
        history.push('/');
    }

    useEffect(() => {
        fetch('http://localhost:4000/library/books', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                return setBooks(res);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setFilteredBooks(allBooks.filter(book => {
            return book.title.toLowerCase().includes(search.toLocaleLowerCase())
        }));
    }, [allBooks, search]);

    useEffect(() => {
        props.sendData(filteredBooks);
        props.searchInput([search]);
    }, [filteredBooks, search]);

    const handleSearch = (searchedData) => {
        if (searchedData) {
            fetch(`http://localhost:4000/library/books?search=${searchedData}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(res => {
                    history.push(`/library/books?search=${searchedData}`);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <div className="wrapper">
                <div className="top">
                    <div className="left-top-section">
                        <img className="logo" src={logo} alt="logo" />
                        <input type="text" placeholder="Search for books..." className="search-bar" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button className="header-buttons" onClick={() => handleSearch(search)}>Search</button>
                    </div>
                    <div className="right-top-section">
                        <p className="username">Welcome, {user.username}</p>
                        <button className="header-buttons" onClick={logOut}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;