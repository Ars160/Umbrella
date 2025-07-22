import './App.css';
import Board from './Components/Board'
import { useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  

  const projects = ['Project A', 'Project B', 'Project C']
  
  const [tasks, setTasks] = useState({
  todo: [],
  inProgress: [],
  done: [] 
  })


  const [show, setShow] = useState(false)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [project, setProject] = useState('Project A')
  

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleCreateTask = () => {
    if(!title.trim() || !description.trim()) return
    setTasks((prev) =>({
      ...prev,
      todo: [...prev.todo, { id: Date.now().toString(), title, description, project }]
    }))
    setTitle('')
    setDescription('')
    setProject('Project A')
    handleClose()
  } 

  return (
    <> 
      <Button variant="primary" onClick={handleShow}>
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
                      {projects.map((project) => (
                        <option value={project}>{project}</option>
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

export default App;
