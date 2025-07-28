import Board from '../components/Board'
import * as projectApi from "../api/project"
import * as taskApi from "../api/task"
import * as userApi from "../api/user"
import { useEffect, useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BoardPages = () => {

    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])

    
    const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [] 
    })

    useEffect(() => {
        const Data = async () => {
            const projectRes = await projectApi.getAll()
            if(projectRes.success) setProjects(projectRes.data)

            const taskRes = await taskApi.getAll()
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

            const userRes = await userApi.getAll()
            if (userRes.success) setUsers(userRes.data)
        }
        Data()
    }, [])


    const [show, setShow] = useState(false)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [project, setProject] = useState(null)
    const [assignedTo, setAssignedTo] = useState(null)

    

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const handleCreateTask = async () => {
        if(!title.trim() || !description.trim()) return

        const selectedProject = projects.find(p => p.name === project)
        if(!selectedProject) return alert("Проект не найден")

        const newTask = {
            title,
            description,
            project: selectedProject._id,
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
            setProject(projects[0]?.name || '')
            handleClose()
        } else {
            alert("Ошибка при создании")
        }
        
    } 

    return (
        <> 
        <Button variant="primary" onClick={handleShow} className='mt-3'>
        Создать 
        </Button>

        <hr/>
        
        <Board tasks={tasks} setTasks={setTasks}/>

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

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Выбор Проекта</Form.Label>
                        <Form.Select
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                        >
                            <option value="">-- Выберите проект --</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project.name}>
                                    {project.name}
                                </option>
                            ))}
                        </Form.Select>

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