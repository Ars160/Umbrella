import { useEffect, useState } from "react"
import * as projectApi from "../api/project"
import { useNavigate } from "react-router-dom"
import { Modal, Button, Form} from 'react-bootstrap';
import * as userApi from "../api/user"




const ProjectsPage = () => {

    const [projects, setProjects] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([])
    


    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const navigate = useNavigate()

    useEffect(() => {
        const Data = async () => {
            const projectRes = await projectApi.getAll()
            if(projectRes.success) setProjects(projectRes.data)
                

        const userRes = await userApi.getAll()
        if (userRes.success) setUsers(userRes.data)
        }
        Data()
    }, [])

    const handleGoToProject = (projectId) => {
        navigate(`/project/${projectId}`);
      };

    const handleCreateProject = async () => {
            if(!name.trim() || !description.trim()) return
    
            const newProject = {
                name,
                description,
                members: selectedUsers
              };
              
    
            const res = await projectApi.create(newProject)
    
            if(res.success){
                setProjects([...projects, res.data])
                setName('')
                setDescription('')
                handleClose()
            } else {
                alert("Ошибка при создании")
            }
            
        }

    const handleDelete = async (projectId) => {
            const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
            if (confirmDelete) {
                await projectApi.deleted(projectId);
            }
    }

    return(
        <>
         <Button variant="primary" onClick={handleShow} className='mt-3'>
        Создать Проект 
        </Button>

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать Проект</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Называние</Form.Label>
                        <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                    <Form.Label>Участники проекта</Form.Label>
                    <Form.Select multiple value={selectedUsers} onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
                        setSelectedUsers(selectedOptions);
                    }}>
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
                    <Button variant="primary" onClick={handleCreateProject}>
                    Создать
                    </Button>
                </Modal.Footer>
                </Modal>

        <div>
        <h2 className="text-xl font-semibold mb-3">Список проектов</h2>
        <ul className="space-y-4">
        {projects.map((project) => (
            <li key={project._id} className="border p-4 rounded shadow-sm my-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <button
                onClick={() => handleGoToProject(project._id)}
                className="btn btn-secondary"
              >
                Перейти →
              </button>

              <button
                onClick={() => navigate(`/projects/${project._id}/edit`)}
                className="btn btn-primary mx-2"
              >
                Изменить
              </button>

              <button
                onClick={() => handleDelete(project._id)}
                className="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </li>
        ))
        }
        </ul>

        </div>
        </>
    )

}

export default ProjectsPage

