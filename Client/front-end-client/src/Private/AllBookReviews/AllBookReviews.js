import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../Auth/AuthContext.js';
import './AllBookReviews.css';
import SingleReview from '../SingleReview/SingleReview.js';
import Loading from '../Loading/Loading.js';

const AllBookReviews = (props) => {

    const token = localStorage.getItem('token');
    const [reviews, setReviews] = useState([]);
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const reviewText = useRef();
    const { user } = useAuth();
    const { id } = props.match.params;

    const submitReview = () => {

        const reviewData = {
            text: reviewText.current.value,
            user: `${user.sub}`
        };
        return fetch(`http://localhost:4000/library/books/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (typeof res[0] === 'string' || res.message) {
                    throw new Error(res[0] || res.message);
                }
                alert('Review added!');
                reviewText.current.value = '';
                return setReviews(res);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }


    const editReviewText = (reviewId, editedReview) => {
        
        fetch(`http://localhost:4000/library/books/${id}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedReview)
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]) {
                    throw new Error(res);
                }
                const index = reviews.findIndex(review => review.id === res.id);
                const copy = [...reviews];
                copy[index] = res;

                setReviews(copy);
            })
            .catch(err => console.log(err));
    }

    const removeReview = (reviewId) => {
        fetch(`http://localhost:4000/library/books/${id}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                setReviews(reviews.filter(review => review.id !== res.id));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch(`http://localhost:4000/library/books/${id}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                return setBook(res);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4000/library/books/${id}/reviews`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                setLoading(false);
                return setReviews(res);
            })
            .catch((err) => console.log(err));
    }, [id, token]);

    const backToCurrentBook = () => {
        props.history.goBack();
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <div className="reviewed-book">
                <img src={book.img} className="book-image" alt="book-cover" onClick={backToCurrentBook}></img>
                <div className="book-info-section" onClick={backToCurrentBook}>
                    <h5>{book.title}</h5>
                    <p>{book.author}</p>
                </div>
            </div>
            <div className="review-section">
                <h1 id="reviews-title">REVIEWS</h1>
                <div className="text-area">
                    <textarea rows="3" cols="30" ref={reviewText} className="create-review-input" placeholder="Write a review here...">
                    </textarea>
                    <button className="review-button" onClick={submitReview}>Leave review</button>
                </div>
                <div className="all-reviews">
                    {reviews.length === 0
                        ?
                        <div>There are no reviews yet...</div>
                        :
                        reviews.map((review) => {
                            return (
                                <SingleReview
                                    {...review}
                                    key={review.id}
                                    edit={(editedReview) => editReviewText(review.id, editedReview)}
                                    remove={() => removeReview(review.id)} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AllBookReviews;