import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Auth/AuthContext';
import ratingStar from '../../media/rating-star.svg'
import '../SingleBook/SingleBook.css'
import Loading from '../Loading/Loading';

const SingleBook = (props) => {

    const token = localStorage.getItem('token');
    const [book, updateBook] = useState([]);
    const [reviews, updateReviews] = useState([]);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [userBook, setUserBooks] = useState(false);
    const [loading, setLoading] = useState(true);
    const [queryParams, setQueryParams] = useState('');
    const [rating, setRating] = useState(1);
    const { id } = props.match.params;
    const { user } = useAuth();


    // Single book result
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4000/library/books/${id}${queryParams}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                if (res.users_id) {
                    setIsBorrowed(true);
                } else {
                    setIsBorrowed(false)
                }

                if (res.users_id === user.sub) {
                    setUserBooks(true);
                } else {
                    setUserBooks(false);
                }
                setLoading(false);
                return updateBook(res);
            })
            .catch((err) => console.log(err));
    }, [isBorrowed, queryParams]);

    // Reviews result
    useEffect(() => {
        fetch(`http://localhost:4000/library/books/${id}/reviews`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                return updateReviews(res);
            })
            .catch((err) => console.log(err));
    }, []);


    const redirect = () => {
        console.log(props.history);
        return props.history.push(`/library/books/${id}/reviews`);
    }

    const handleBorrow = () => {
        const userInfo = {
            userId: user.sub
        };

        return fetch(`http://localhost:4000/library/books/${id}`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => setIsBorrowed(true))
            .catch((err) => console.log(err));
    };

    const handleRemove = () => {
        // setIsBorrowed(false);
        // // setUserBooks(false);
        return fetch(`http://localhost:4000/library/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => setIsBorrowed(false))
            .catch((err) => console.log(err));
    }

    if (loading) {
        return <Loading />
    }
    const getRating = (e) => {
        setRating(Number(e.target.value));
    };

    const submitRating = (e) => {
        e.preventDefault();
        props.history.push(`?rate=${rating}`);
        console.log(props.history);
        setQueryParams(props.history.location.search);
    };

    const recentReviews = reviews.filter((word, index) => index < 2);

    const reviewsView = recentReviews.length !== 0
        ? (<>
            <h3>Latest reviews</h3>
            {recentReviews.map(review => <p key={review.id} className="current-review">"{review.text}"</p>)}
        </>)
        : (<><h3>Be the first to write review</h3></>)

        const bookRatingStar = Array(book.rate).fill(<img src={ratingStar} className="rating rating-1" alt="rating-star"></img>);

    return (
        <div className="single-book-wrapper">
            <div className="cover">
                <img src={book.img} className="book" alt="book-cover"></img>
            </div>
            <div className="info-section">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <div className="rating-stars">
                    {   book.rate 
                    ? bookRatingStar.map(rate => rate)
                    : <p>No one rated this book yet</p> 
                    }
                </div>
                <form className='rate' onSubmit={submitRating}>
                    <select name="rate" id="rate" onChange={getRating}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <input className="rate-submit" type="submit" value="Submit" />
                </form>
                <div className="book-buttons">
                    {isBorrowed
                        ? (<button className="borrowed">Already Borrowed</button>)
                        : (<button className="borrow" onClick={handleBorrow}>Borrow</button>)
                    }
                    {userBook
                        ? (<button className="remove" onClick={handleRemove}>Remove</button>)
                        : (<></>)
                    }
                </div>
            </div>
            <div className="review-section">
                {reviewsView}
                <button onClick={redirect} className="button-review">View all</button>
            </div>
        </div>
    );
}

export default SingleBook;