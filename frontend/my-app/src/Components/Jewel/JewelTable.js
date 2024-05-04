import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startRemoveJewels, startGetJewels } from '../Actions/Jewels'
import JewelForm from './JewelForm'
import {
    Card,
    Button,
    } from 'react-bootstrap'
  import{Modal, ModalHeader,
    ModalBody,
    ModalFooter,} from 'reactstrap'
  import '../../index.css'
import axios from 'axios'
export default function JewelsTable() {
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const [wishlist, setWishlist] = useState([]);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetJewels())
    }, [dispatch])

    const jewels = useSelector((state) => {
        return state.jewels
    })

    const toggle = () => setModal(!modal)

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if (userConfirm) {
            dispatch(startRemoveJewels(id))
        }
    }

    const handleAddToWishlist = async (id,images,caption, price) => {
        try {
            await axios.post('http://localhost:3009/api/wishlists', { jewelId: id,images,caption, price })
            console.log(`Added item with ID ${id} to wishlist.`)
            setWishlist([...wishlist, id]);

        } catch (error) {
            console.error('Error adding item to wishlist:', error)
        }
    }    
    const isItemInWishlist = (id) => wishlist.includes(id) // Check if the item is in the wishlist

    return (
        <div style={{ paddingTop: '50px', paddingBottom: '100px' }}>
            <div className="row" style={{ paddingTop: '200px' }}>
                {jewels && jewels.data && jewels.data.map((ele, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Card style={{ marginTop: '220px', marginBottom: '230px' }}>
                        <Card.Img variant="top" src={`http://localhost:3009/${ele.images}`}style={{ height: '500px' }} />
                            <Card.Body>
                                <Card.Title>{ele.caption}</Card.Title>
                                <Card.Text>
                                    Price: {ele.price}
                                </Card.Text>
                                <span
                    className="wishlist-icon"
                    onClick={() =>
                      isItemInWishlist(ele._id)
                        ? setWishlist(wishlist.filter((item) => item !== ele._id))
                        : handleAddToWishlist(ele._id, ele.images, ele.caption, ele.price)
                    }
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      color: isItemInWishlist(ele._id) ? 'red' : 'black', 
                      
                    }}
                  >
                    <i className="far fa-heart"></i>
                  </span>

                                <div className="buttons">
                                    <Button
                                        onClick={() => {
                                            setEditId(ele._id)
                                            toggle()
                                        }}
                                        color="primary"
                                    >
                                        Edit
                                    </Button>{' '}
                                    <Button
                                        onClick={() => {
                                            handleRemove(ele._id)
                                        }}
                                        color="danger"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Jewel</ModalHeader>
                <ModalBody>
                    <JewelForm editId={editId} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Save Changes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}