import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as taskApi from "../api/task"
import * as userApi from "../api/user"
import { Modal, Button, Form} from 'react-bootstrap';



const EditTaskPage = () => {

    const [show, setShow] = useState(true)
    const [users, setUsers] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [assignedTo, setAssignedTo] = useState()
    

    useEffect(() => {
            const Data = async () => {
                const userRes = await userApi.getAll()
                if (userRes.success) setUsers(userRes.data)

                    
                const task = await taskApi.getOne(params.taskId)
                if(task.success){
                    setTitle(task.data.title)
                    setDescription(task.data.description)
                    setAssignedTo(task.data.assignedTo)
                }
            }
            Data()
        }, [params.taskId])


    const handleClose = () => {
        setShow(false)
        navigate(-1)
    }

    const handleUpdate = async () => {
            const res = await taskApi.update({
                id: params.taskId,
                title,
                description,
                assignedTo
            })
    
            if(res.success){
                alert('Задача обновлен!')
                handleClose()
            }else{
                alert('Ошибка при обновлении')
            }
        }
    

    return(
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Обновить Задачу</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Называние</Form.Label>
                        <Form.Control
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" value={description} rows={3} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Назначить участника</Form.Label>
                    <Form.Select
                    value={assignedTo || ""}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    >
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                        {user.name}
                        </option>
                    ))}
                    </Form.Select>

                    </Form.Group>
                    
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Отмена
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                    Обновить
                    </Button>
                </Modal.Footer>
                </Modal>
    )

}

export default EditTaskPage