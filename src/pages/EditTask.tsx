import axios from "axios";
import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/url";



const EditTask = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')



    const { slug } = useParams()

    const navigate = useNavigate()



    const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = {
            name,
            description,
            status
        }
        await axios.patch(`${BASE_URL}/task/${slug}`, data)
            .then(response => {
                console.log(response)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchTask = async () => {
        await axios.get(`${BASE_URL}/task/${slug}`)
            .then(response => {
                setName(response.data.task.name)
                setDescription(response.data.task.description)
                setStatus(response.data.task.status)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchTask()
    }, [])
    return (
        <form onSubmit={handleEdit} className="grid grid-rows-2 border p-10 m-32 rounded-lg shadow-md">
            <div className="mt-10">
                <FloatingLabel variant="standard" label="Task name" value={name} onChange={event => setName(event.target.value)} required />
            </div>

            <div className="mt-10">
                <Label>Status</Label>
                <Select  value={status} id="status" onChange={event => setStatus(event.target.value)} required>
                    <option value={'pending'}>Pending</option>
                    <option value={'completed'}>Completed</option>
                    <option value={'failed'}>Failed</option>
                </Select>
            </div>

            <div className="mt-10">
                <FloatingLabel variant="standard" label="Description" value={description} onChange={event => setDescription(event.target.value)} required />

            </div>

            <Button type="submit" className="w-48 mt-10" >Update Task</Button>

        </form>
    );
}

export default EditTask;