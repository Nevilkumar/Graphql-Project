import React from 'react'
import { useQuery } from "@apollo/client";

import { getSingleBookQuery } from '../queries/queries';


const BookDetails = ({bookId}) => {

    let { loading, data } = useQuery(getSingleBookQuery, {
        variables : {
            id: bookId
        }
    });
    console.log(data)

    if(loading){
        return <div id='book-details'>Loading Book Data...</div>
    }

    return (
        <div id='book-details'>
            {
                data.book==null ? 
                    <h2>No Book Selected...</h2>
                :
                <div>
                    <h2>{ data?.book?.name }</h2>
                    <p>{ data?.book?.genre }</p>
                    <p>{ data?.book?.author?.name }</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { data?.book?.author?.books.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}

export default BookDetails
