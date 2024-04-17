import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {startRemoveJewels} from '../Actions/Jewels'
import JewelForm from './JewelForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function JewelsTable(){
    const [modal, setModal] = useState(false);
    const [editId,setEditId] = useState('')

    const dispatch = useDispatch()

    const jewels = useSelector((state)=>{
        return state.jewels
      })

      const toggle = () => setModal(!modal);

      const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            dispatch(startRemoveJewels(id));
        }
    }
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>images</th>
                        <th>price</th>
                        <th>caption</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jewels&&jewels.data&& jewels.data.map((ele)=>{
                        return <tr key = {ele._id}>
                            <td>{ele.images&& ele.images.map((image,i)=>(
                            <img key={i} src={image} alt={`Image ${i + 1}`} style={{ width: '100px', height: 'auto' }} />
                    ))}</td>
                            <td>{ele.price}</td>
                            <td>{ele.caption}</td>
                            <td>
                            <button onClick={() => {
                                    setEditId(ele._id);
                                    toggle();
                                }}>edit</button>
                            <button onClick={() => {
                                    handleRemove(ele._id);
                                }}>remove</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
        <ModalBody>
          <JewelForm editId = {editId} toggle = {toggle}/>
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
        </div>
    )
}