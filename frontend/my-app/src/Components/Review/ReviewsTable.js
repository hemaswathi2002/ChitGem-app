import { useState,useEffect} from 'react';
import ReviewsForm from './ReviewsForm';
import { useDispatch } from 'react-redux';
import { getReviews,setServerErrors, removeReview } from '../Actions/Reviews';
import { Button, Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';

export default function ReviewsTable(props) {
    const dispatch = useDispatch();
    const [editId, setEditId] = useState('');
    const [modal, setModal] = useState(false);
    const { data } = props.reviews;

    useEffect(() => {
        dispatch(getReviews());
    }, [dispatch]);

    const toggle = () => {
        setModal(!modal);
        dispatch(setServerErrors([]));

    };

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            dispatch(removeReview(id));
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.ratings}</td>
                            <td>{ele.description}</td>
                            <td>
                                <button>show</button>
                                <button onClick={() => {
                                    setEditId(ele._id);
                                    toggle();
                                }}>edit</button>
                                <button onClick={() => {
                                    handleRemove(ele._id);
                                }}>remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
        <ModalBody>
            <ReviewsForm editId={editId} toggle={toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
            </>
    );
}
