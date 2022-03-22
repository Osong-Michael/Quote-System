import React from "react";
import './index.css'


const Quote = ({ quote, deleteQuote }) => {
    const closeDeleteModal = () => {
        const modal = document.querySelector('#delete');
        modal.close();
    }

    const openDeleteModal = () => {
        const modal = document.querySelector('#delete');
        modal.showModal();
    }

    return (
        <div className="quote-ctn">
            <h3>{quote.author}</h3>
            <p>{quote.quote}</p>

            <button type="button" onClick={openDeleteModal}>X</button>

            <dialog className="modal" id="delete">
                <p>Are you sure you want to delete this Quote?</p>
                <div className="btn">
                    <input type="button" className="submit-btn" value="Yes" onClick={() => deleteQuote(quote.id)}/>
                    <input type="button" className="submit-btn cancel" value="No" onClick={closeDeleteModal}/>
                </div>
            </dialog>
        </div>
    )
}

export default Quote