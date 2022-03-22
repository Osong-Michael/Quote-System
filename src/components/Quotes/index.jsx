import React, { useEffect, useState } from "react";
import Quote from "../Quote";

import './index.css'

const Quotes = () => {
    const [state, setState] = useState();
    const [quote, setQuote] = useState({ author: '', quote: '' });

    useEffect(() => {
        getAllQuotes()
    }, []);

    const getAllQuotes = () => {
        fetchQuotes()
        .then(res => res.json())
        .then(data => setState([...data]))
        .catch(err => console.log(err))
    }

    const fetchQuotes = async () => {
        const response = await fetch('http://localhost:3000/quotes');
         return response
    };


    const deleteQuote = async id => {
        const respone = await fetch(`http://localhost:3000/quotes/${id}`, { method: 'DELETE'});

        respone && getAllQuotes();
    }

    const showModal = () => {
        const modal = document.querySelector('#modal');
        modal.showModal();
    }

    const closeModal = () => {
        const modal = document.querySelector('#modal');
        modal.close();
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setQuote({ ...quote, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        addQuote(quote)
            .then(res => res.json())
            .then(data => {
                setQuote({  author: '', quote: '' });
                getAllQuotes();
                closeModal();

            })
            .catch(err => console.log(err))
    }

    const addQuote = async quote => {
        const res = await fetch('http://localhost:3000/quotes',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(quote)
            }
        );
        return res
    }

    return (
        <div className="ctn">
            <h1 style={{ textAlign: 'center'}}> All Quotes</h1>
            <button type="button" className="add-btn" onClick={() => showModal()}>+</button>
            {state && state.map(quote => {
                return ( <Quote key={quote.id} quote={quote} deleteQuote={deleteQuote} /> )
            })}

            <dialog className="modal" id="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-grp">
                        <label className="label">Author</label>
                        <input type="text" className="add-form" value={quote.author} onChange={handleChange} name="author" required />
                    </div>

                    <div className="form-grp">
                        <label className="label">Quote</label>
                        <textarea rows={7} value={quote.quote} onChange={handleChange} name="quote" required />
                    </div>

                    <div className="btn">
                        <input type="submit" className="submit-btn"/>
                        <input type="button" className="submit-btn cancel" value="Cancel" onClick={closeModal}/>
                    </div>
                </form>
            </dialog>
        </div>
    )
}


export default Quotes;