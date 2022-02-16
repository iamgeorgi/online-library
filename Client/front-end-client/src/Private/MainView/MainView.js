import React, { useEffect, useState } from 'react';
import './MainView.css';
import ratingStar from '../../media/rating-star.svg';
import Loading from '../Loading/Loading';
import { withResource } from '../../Hooks/withResource';

const MainView = withResource(({ books1 }) => {
    console.log('books1', books1);
    // const { books } = books1;
    // const [allBooks, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    // const redirect = (id) => props.history.push(`/library/books/${id}`);

    // useEffect(() => {
    //     setLoading(true);
    //     fetch('http://localhost:4000/library/books', {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //         .then((res) => res.json())
    //         .then(res => {
    //             setLoading(false);
    //             setBooks(res);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <section>
                {books.length === 0
                    ?
                    <h1>There are no books in the library.</h1>
                    :
                    <>
                        {false
                            ?
                            <>
                                {false
                                    ?
                                    <div className="not-found-book">
                                        <h2>Book with name does not exist in the library... </h2>
                                    </div>
                                    :
                                    <>
                                        {/* {
                                            props.dataFromSearch.map((book) => {
                                                return (
                                                    <div className="single-book" key={book.id}>
                                                        <img src={book.img} className="book" onClick={() => redirect(book.id)} alt={book.title}></img>
                                                        <h3>{book.title}</h3>
                                                        <p>{book.author}</p>
                                                        <div className="rating-stars">
                                                            <img src={ratingStar} className=" rating rating-1" alt="rating-star"></img>
                                                            <img src={ratingStar} className=" rating rating-2" alt="rating-star"></img>
                                                            <img src={ratingStar} className=" rating rating-3" alt="rating-star"></img>
                                                            <img src={ratingStar} className=" rating rating-4" alt="rating-star"></img>
                                                            <img src={ratingStar} className=" rating rating-5" alt="rating-star"></img>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        } */}
                                    </>
                                }
                            </>
                            :
                            <>
                                {
                                    books.map((book) => {
                                        return (
                                            <div className="single-book" key={book.id}>
                                                <img 
                                                    src={book.img} 
                                                    className="book" 
                                                    // onClick={() => redirect(book.id)} 
                                                    alt={book.title}></img>
                                                <h3>{book.title}</h3>
                                                <p>{book.author}</p>
                                                <div className="rating-stars">
                                                    <img src={ratingStar} className=" rating rating-1" alt="rating-star"></img>
                                                    <img src={ratingStar} className=" rating rating-2" alt="rating-star"></img>
                                                    <img src={ratingStar} className=" rating rating-3" alt="rating-star"></img>
                                                    <img src={ratingStar} className=" rating rating-4" alt="rating-star"></img>
                                                    <img src={ratingStar} className=" rating rating-5" alt="rating-star"></img>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </>
                        }
                    </>
                }
            </section>
        </>
    );
}, 'https://api.itbook.store/1.0/new', 'books1');

export default MainView;