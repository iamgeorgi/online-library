import React, { useEffect, useState } from 'react';
import ratingStar from '../../media/rating-star.svg';
import Loading from '../Loading/Loading';
import { withResource } from '../../Hooks/withResource';
import { BookItem } from './BookItem';

const MainView = withResource(({ books1 }) => {
    // const { books } = books1;
    // const [allBooks, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <section>

            <>
            <div className="wrapper">
                {
                    books1 && books1.books.map((book) => {
                        console.log('book', book);
                        return (
                                <BookItem currentBook={book} />
                        );
                    })
                }
            </div>
            </>
        </section >
    );
}, 'https://api.itbook.store/1.0/new', 'books1');

export default MainView;