import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {startCreateJewels,startUpdateJewels} from '../Actions/Jewels'
export default function JewelForm(props){
    
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [caption, setCaption] = useState('');
    const [jewels,setJewels] = useState({})

    const jewel = useSelector((state)=>{
        return state.jewels
      })



    const {editId} = props
    const dispatch = useDispatch()

    useEffect(() => {
        const editedJewel = jewel?.data?.find(ele=>ele._id == editId) 
        setJewels(editedJewel)
        if(editedJewel){
            setImages(editedJewel.images || [])
            setPrice (editedJewel.price || '')
            setCaption(editedJewel.caption || '')
        } else {
            setImages([])
            setPrice('')
            setCaption('')
        }
    }, [jewels,editId]);


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    const resetJewelForm = () => {
        setImages([]);
        setPrice('');
    setCaption('');
    };




    const handleSubmit = async (e)=>{
        e.preventDefault()

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });
        formData.append('price', price);
        formData.append('caption', caption);


        if (editId) {
            dispatch(startUpdateJewels(editId, formData));
        } else {
            dispatch(startCreateJewels(formData));
        }
        resetJewelForm()
    
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
                <div>
                <label htmlFor="image">Images</label>
                <input 
                type="file" 
                id="image" 
                onChange={handleImageChange} 
                accept="image/*" 
                multiple required />
                </div>
                <div>
                <label htmlFor="price">Price:</label>
                <input 
                type="number" 
                id="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                />
                </div>
                <div>
                <label htmlFor="caption">Caption:</label>
                <input type="text" 
                id="caption" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} />
                </div>
                <input type = 'submit'/>
            </form>
        </div>
    )
}