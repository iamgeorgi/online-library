import React, { useState } from 'react';
import { useAuth } from '../../Auth/AuthContext';

const SingleReview = (props) => {

    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [viewReviewText, setViewReviewText] = useState(props.text);
    const [tempEdit, setTempEdit] = useState(props.text);

    const toggleReviewEdit = () => {
        setEditMode(prevState => !prevState);
    }

    const cancelReviewEdit = () => {
        setEditMode(prevState => !prevState);
        setTempEdit(viewReviewText);
    }

    const saveEdit = () => {
        if (tempEdit) {
            setViewReviewText(tempEdit);
            props.edit({ text: tempEdit, user: props.name });
            toggleReviewEdit();
        } else {
            alert('Text is required!');
        }
    }

    return (
        <div className="current-rev">
            <p>{props.name}:</p>
            {editMode
                ?
                <p className="review-text">
                    <input className="input-text" value={tempEdit} onChange={(e) => setTempEdit(e.target.value)}></input>
                </p>
                :
                <>
                    {user.username === props.name
                        ?
                        <p className="review-text" onClick={toggleReviewEdit}>{viewReviewText}</p>
                        :
                        <p className="review-text">{viewReviewText}</p>
                    }
                </>
            }
            {user.username === props.name
                ?
                <div className="review-buttons">
                    {editMode
                        ?
                        <>
                            <button className="review-button" onClick={saveEdit}>Save</button>
                            <button className="review-button" onClick={cancelReviewEdit}>Cancel</button>
                        </>
                        :
                        <>
                            <button className="review-button" onClick={toggleReviewEdit}>Edit</button>
                            <button className="delete-button" onClick={props.remove}>Delete review</button>
                        </>
                    }
                </div>
                : null}
            <br />
        </div>
    );
}

export default SingleReview;