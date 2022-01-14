import React, { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {

    const [bookData, setBookData] = useState({
        name: "",
        genre: "",
        authorId: "",
    });

    const { loading, data } = useQuery(getAuthorsQuery);
    const [addBookFunc] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if(loading){
            return ( <option>Loading Authors</option> );
        } else {
            return data.authors.map((author,i) => {
                return (<option key={i} value={author.id}>{author.name}</option>)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addBookFunc({ 
            variables: { 
                    name:bookData.name, 
                    genre:bookData.genre, 
                    authorId:bookData.authorId 
            },
            refetchQueries: [{ query: getBooksQuery }] 

        });

        
        setBookData({
            name: "",
            genre: "",
            authorId: "",
        })
    }

    return (
        <>
        <form id="add-book" onSubmit={handleSubmit} >
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={bookData.name} onChange={ (e) => setBookData({...bookData, name: e.target.value}) } />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={bookData.genre} onChange={ (e) => setBookData({...bookData, genre: e.target.value}) } />
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={bookData.authorId} onChange={ (e) => setBookData({...bookData, authorId: e.target.value}) }>
                    <option>Select author</option>
                    { displayAuthors() }
                </select>
            </div>
            <button>+</button>
        </form>
        </>
    )
}

export default AddBook
