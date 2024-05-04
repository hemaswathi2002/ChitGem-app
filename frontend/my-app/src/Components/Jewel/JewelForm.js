import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateJewels, startUpdateJewels } from '../Actions/Jewels'
import { Form, Button } from 'react-bootstrap'

export default function JewelsForm(props) {
    const [images, setImages] = useState([])
    const [price, setPrice] = useState(0)
    const [caption, setCaption] = useState('')
    const [jewels, setJewels] = useState({})

    const jewel = useSelector((state) => {
        return state.jewels
    })

    const { editId } = props
    const dispatch = useDispatch()

    useEffect(() => {
        const editedJewel = jewel?.data?.find((ele) => ele._id == editId)
        setJewels(editedJewel)
        if (editedJewel) {
            setImages(editedJewel.images || [])
            setPrice(editedJewel.price || 0)
            setCaption(editedJewel.caption || '')
        } else {
            setImages([])
            setPrice(0)
            setCaption('')
        }
    }, [jewels, editId])

    const resetJewelForm = () => {
        setImages([])
        setPrice(0)
        setCaption('')
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages(prevImages => [...prevImages, ...files])
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

           const formData = new FormData()
        for (let i = 0; i < images.length; i++) {

            formData.append('images', images[i])
        }
        formData.append('price', price)
        formData.append('caption', caption)
    
        if (editId) {
            dispatch(startUpdateJewels(editId, formData))
        } else {
            dispatch(startCreateJewels(formData))
        }
        resetJewelForm()
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '45vh', marginTop: '10px' }}>
            <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '60%' }}>
                <h2>Jewel Form</h2>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group controlId="formImages">
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} accept="image/*" multiple required />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formCaption">
                        <Form.Label>Caption</Form.Label>
                        <Form.Control type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}