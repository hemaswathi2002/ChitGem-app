import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startRemoveJewels, startGetJewels } from '../Actions/Jewels'
import JewelForm from './JewelForm'
import { Card, Button } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'
import { startGetUserDetails } from '../Actions/Users'
import Swal from 'sweetalert2'

export default function JewelsTable() {
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const [wishlist, setWishlist] = useState([])
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [searchQuery, setSearchQuery] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetJewels())
        dispatch(startGetUserDetails())
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        setWishlist(storedWishlist)
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const jewels = useSelector((state) => state.jewels)
    const userRole = useSelector((state) => state.users.users.role)

    useEffect(() => {
        console.log("Price Range:", priceRange)
        console.log("Search Query:", searchQuery)
        console.log("Jewels Data:", jewels.data)
    }, [priceRange, searchQuery, jewels.data])

    console.log("Initial jewels data:", jewels.data)

    const filteredJewels = jewels.data.filter((jewel) => {
        return jewel.price >= priceRange[0] &&
            jewel.caption.toLowerCase().includes(searchQuery.toLowerCase())
    })
    console.log("Filtered jewels data:", filteredJewels)

    const toggle = () => setModal(!modal)

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?")
        if (userConfirm) {
            dispatch(startRemoveJewels(id))
        }
    }

    const isItemInWishlist = (jewelId) => wishlist.includes(jewelId)

    const handleAddToWishlist = async (id, images, caption, price) => {
        try {
            if (isItemInWishlist(id)) {
                const updatedWishlist = wishlist.filter((item) => item !== id)
                setWishlist(updatedWishlist)
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))

                await axios.delete(`http://localhost:3009/api/wishlists/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                })

             
            } else {
                await axios.post('http://localhost:3009/api/wishlists', { jewelId: id, images, caption, price }, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                })
                console.log(`Added item with ID ${id} to wishlist.`)
                const updatedWishlist = [...wishlist, id]
                setWishlist(updatedWishlist)
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))

                Swal.fire({
                    text: 'Item added to wishlist!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        } catch (error) {
            console.error('Error adding/removing item to/from wishlist:', error)
        }
    }

    return (
        <div style={{ paddingTop: '80px', paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }}>
                <input
                    type="range"
                    min="0"
                    max="10000000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    style={{ backgroundColor: 'maroon', width: '300px', marginRight: '10px' }}
                /><br />
                <div style={{ fontSize: '14px', color: 'maroon', justifyContent: 'left' }}>
                    Price Range: RS: {priceRange[0]}
                </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search for product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '5px', width: '300px' }}
                />
            </div>
            <div className="row" style={{ paddingTop: '200px' }}>
                {filteredJewels.map((ele, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Card style={{ marginTop: '220px', marginBottom: '230px' }}>
                            <Card.Img variant="top" src={`http://localhost:3009/${ele.images}`} style={{ height: '500px' }} />
                            <Card.Body>
                                <Card.Title>{ele.caption}</Card.Title>
                                <Card.Text>Price: {ele.price}</Card.Text>
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
                                {userRole !== 'customer' && (
                                    <div>
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
                                )}
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
