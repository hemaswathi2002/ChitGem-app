import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, updateReview } from '../Actions/Reviews';

export default function ReviewsForm(props) {
    const dispatch = useDispatch();
    const serverErrors = useSelector((state) => state.reviews.serverErrors);
    const review = useSelector((state) => state.reviews.data.find(ele => ele._id === props.editId));

    const [form, setForm] = useState(review ? {
        ratings: review.ratings,
        description: review.description
    } : {
        ratings: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const resetForm = () => {
            setForm({
                ratings: '',
                description: ''
            });
        };

        if (review) {
            dispatch(updateReview(review._id, form));
        } else {
            dispatch(addReview(form));
        }

        resetForm();
    };

    return (
        <>
            {
                serverErrors.length > 0 && (
                    <div>
                        These errors prohibited the form from being saved:
                        <ul>
                            {serverErrors.map((ele, i) => (
                                <li key={i}> {ele.msg}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="ratings"
                    >
                        Rating
                    </label>
                    <input
                        type="text"
                        value={form.ratings}
                        onChange={handleChange}
                        name="ratings"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                        name="description"
                    />
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
        </>
    );
}
