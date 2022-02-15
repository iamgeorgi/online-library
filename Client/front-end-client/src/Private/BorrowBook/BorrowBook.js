import React, { useEffect, useState } from 'react';
import '../MainView/MainView.css';
import ratingStar from '../../media/rating-star.svg';
import { useAuth } from '../../Auth/AuthContext';
import Loading from '../Loading/Loading';
// import cover from '../../media/tamplate-book-cover.jpg';
// import SingleBook from '../SingleBook/SingleBook.js'

const BorrowBook = (props) => {
    const [allBooks, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const { user } = useAuth();
    const redirect = (id) => props.history.push(`/library/books/${id}`);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/library/books', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then(res => {
                const userBooks = res.filter(book => book.users_id === user.sub);
                setLoading(false);
                return setBooks(userBooks);
            })
            .catch((err) => console.log(err));
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <section>
                {allBooks.length === 0
                    ?
                    <h1 style={{ marginTop: 50, textAlign: "center" }}>You are not in debt yet...</h1>
                    :
                    <>
                        {allBooks.map((book) => {
                            return (
                                <div className="single-book" key={book.id}>
                                    <img src={book.img} className="book" onClick={() => redirect(book.id)} alt={book.title}></img>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    {/* <div className="rating-stars">
                                        <img src={ratingStar} className=" rating rating-1" alt="rating-star"></img>
                                        <img src={ratingStar} className=" rating rating-2" alt="rating-star"></img>
                                        <img src={ratingStar} className=" rating rating-3" alt="rating-star"></img>
                                        <img src={ratingStar} className=" rating rating-4" alt="rating-star"></img>
                                        <img src={ratingStar} className=" rating rating-5" alt="rating-star"></img>
                                    </div> */}
                                </div>
                            );
                        })}
                    </>
                }
            </section>
        </>
    );
}

export default BorrowBook;