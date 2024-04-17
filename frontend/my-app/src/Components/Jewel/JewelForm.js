import {useState} from 'react'
export default function JewelForm(){

    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [caption, setCaption] = useState('');

    const handleImageChange = (e)=>{
        e.preventDefault()
    }

    const handleSubmit = (e)=>{
        // e.target
    }

    return(
        <div>
            <h2>Jewel Form</h2>
            {/* <form>
                <div>
                    <input type = "file"
                    />
                </div>
            </form> */}
             <form onSubmit={handleSubmit}>
                <label htmlFor="image">Images</label>
                <input 
                type="file" 
                id="image" 
                onChange={handleImageChange} 
                accept="image/*" 
                multiple required />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required /><br /><br />

                <label htmlFor="caption">Caption:</label>
                <input type="text" id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} required /><br /><br />

                <button type="submit">Add Jewel</button>
            </form>
        </div>
    )
}