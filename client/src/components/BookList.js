import React, { useState } from 'react'
import { useQuery } from "@apollo/client";

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {

    const [singleBookId, setSingleBookId] = useState(null);

    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    // console.log(data.books);

    return (
        <div>
            <ul id="book-list">
            {
                data.books.map((book, i) => ( 
                    <li key={i} onClick={(e) => setSingleBookId(book.id)}>{book.name}</li>
                ))
            }
            </ul>
            <BookDetails bookId={singleBookId} />
        </div>
    )
}

export default BookList
