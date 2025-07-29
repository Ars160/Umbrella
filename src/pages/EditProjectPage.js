import { useEffect, useState } from "react"
import { Form, useNavigate, useParams } from "react-router-dom"
import * as projectApi from "../api/project"
import * as userApi from "../api/user"
import { FormControl, FormGroup, FormLabel, FormSelect, Button } from "react-bootstrap"


const EditProjectPage = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [members, setMembers] = useState([])
    const [users, setUsers] = useState([])



    useEffect(() => {
        const Data = async () => {
        const res = await projectApi.getOne(params.id)
        if(res.success) {
            setName(res.data.name)
            setDescription(res.data.description)
            setMembers(res.data.members?.map(m => m._id))
        }

        const userRes = await userApi.getAll();
        if (userRes.success) setUsers(userRes.data);
        }

        Data()
    }, [params.id])

    const handleUpdate = async () => {
        const res = await projectApi.update(params.id, {
            name,
            description,
            members
        })

        if(res.success){
            alert('Проект обновлен!')
            navigate('/projects')
        }else{
            alert('Ошибка при обновлении')
        }
    }

    return(
        <div>
            <h2>Редактировать проект</h2>

            <Form>
                <FormGroup>
                    <FormLabel>Называние</FormLabel>
                    <FormControl value={name} onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Описание</FormLabel>
                    <FormControl as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Участники</FormLabel>
                    <FormSelect multiple value={members} onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions).map(o => o.value)
                        setMembers(values)
                    }}>
                        {
                            users.map(user => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))
                        }

                    </FormSelect>
                </FormGroup>
                <Button onClick={handleUpdate}>Сохранить</Button>
            </Form>
        </div>
    )
}

export default EditProjectPage

