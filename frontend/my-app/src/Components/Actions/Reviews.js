import axios from 'axios';

export const getReviews = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3009/api/reviews');
            dispatch(setReviews(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

const setReviews = (data) => {
    return {
        type: 'SET_REVIEW',
        payload: data
    };
};

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    };
};

export const addReview = (reviewData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3009/api/reviews', reviewData);
            dispatch(addReviewSuccess(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

const addReviewSuccess = (data) => {
    return {
        type: 'ADD_REVIEW',
        payload: data
    };
};

export const updateReview = (id, reviewData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3009/api/reviews/${id}`, reviewData);
            dispatch(updateReviewSuccess(response.data));
            return response.data;
        } catch (err) {
            console.error('Error updating review:', err);
            throw err;
        }
    };
};

const updateReviewSuccess = (data) => {
    return {
        type: 'UPDATE_REVIEW',
        payload: data
    };
};

export const removeReview = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3009/api/reviews/${id}`);
            dispatch(removeReviewSuccess(id));
            return response.data;

        } catch (err) {
            console.log(err);
        }
    };
};

const removeReviewSuccess = (id) => {
    return {
        type: 'DELETE_REVIEW',
        payload: id
    };
};
