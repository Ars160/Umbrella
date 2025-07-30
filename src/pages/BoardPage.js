import Board from '../components/Board'
import * as taskApi from "../api/task"
import * as userApi from "../api/user"
import * as projectApi from "../api/project"
import { useEffect, useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const BoardPages = () => {


    const {projectId} = useParams() 
    const [users, setUsers] = useState([])
    const [projectName, setProjectName] = useState() 
    

    
    const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [] 
    })

    useEffect(() => {
        const Data = async () => {

            const taskRes = await taskApi.getByProjectId(projectId)
            if(taskRes.success){
                
                const mappedTasks = {
                    todo: [],
                    inProgress: [],
                    done: []
                }

                for (let task of taskRes.data){
                    mappedTasks[task.status]?.push(task)
                }

                setTasks(mappedTasks)
            }

            const project = await projectApi.getOne(projectId)
            if(project.success) setProjectName(project.data.name)

            const userRes = await userApi.getAll()
            if (userRes.success) setUsers(userRes.data)
        }
        Data()
    }, [projectId])


    const [show, setShow] = useState(false)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [assignedTo, setAssignedTo] = useState(null)

    

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const handleCreateTask = async () => {
        if(!title.trim() || !description.trim()) return

        const newTask = {
            title,
            description,
            project: projectId,
            assignedTo 
        }

        const res = await taskApi.create(newTask)

        if(res.success){
            setTasks((prev) =>({
            ...prev,
            todo: [...prev.todo, res.data.task ]
            }))
            setTitle('')
            setDescription('')
            handleClose()
        } else {
            alert("Ошибка при создании")
        }
        
    } 

    return (
        <>
        <h2 className='mt-3 text-center'>{projectName}</h2>
        <Button variant="primary" onClick={handleShow}>
        Создать Задание
        </Button>

        <hr/>
        
        <Board tasks={tasks} setTasks={setTasks} projectId={projectId}/>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать Заданию</Modal.Title>
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
                        <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Назначить на пользователя</Form.Label>
                        <Form.Select
                            value={assignedTo || ""}
                            onChange={(e) => setAssignedTo(e.target.value)}
                        >
                            <option value="">-- Выберите исполнителя --</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name || user.email} {/* зависит от твоей схемы */}
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
                    <Button variant="primary" onClick={handleCreateTask}>
                    Создать
                    </Button>
                </Modal.Footer>
                </Modal>
        </>
    );
    }

export default BoardPages;