import { Button, Label, Select, TextInput, Datepicker } from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/url";
import CustomTable from '../components/CustomTable'
import { PRIORITY, TASKS } from "../models";
import CustomSpinner from "../components/CustomSpinner";
import useTokenStore from "../store/tokenStore";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const HomePage = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [priority, setPriority] = useState<PRIORITY>('normal')
  const [assignee, setAssignee] = useState('')

  const [tasks, setTasks] = useState<TASKS>([] as TASKS)
  const [loading, setLoading] = useState(false)

  const { token } = useTokenStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      name,
      description,
      startDate,
      endDate,
      priority,
      assignee
    }

    const authorization = token

    // await axios.post(`${BASE_URL}/task`, data, { headers: { Authorization: `Bearer ${authorization}` } })
    //   .then(response => {
    //     console.log(response.data)
    //     toast.success('Task Added Successfully', {
    //       position: "top-center",
    //       autoClose: 1000,
    //       hideProgressBar: false
    //     })
    //   })
    //   .catch(error => {
    //     toast.error(error.response.data.msg, {
    //       position: "top-center",
    //       autoClose: 1000,
    //       hideProgressBar: false
    //     })
    //     console.log(error)
    //   })

    console.log(data)

    fetchTasks()
  }

  const fetchTasks = () => {
    setLoading(true)
    axios.get(`${BASE_URL}/task`)
      .then(response => {
        setTasks(response.data.tasks)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`${BASE_URL}/task/${id}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

    fetchTasks()
  }

  

  const handleStartDate = (date : Date) => {
    if (date instanceof Date) {
      setStartDate(date);
    }
  }
  const handleEndDate = (date : Date) => {
    if (date){
      setEndDate(date)
    }
  }


  useEffect(() => {
    fetchTasks()

  }, [])
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="grid border p-10 m-32 rounded-lg shadow-md">
        <div className="my-10">

          <div className="mb-5">
            <Label>Task name</Label>
            <TextInput type="text" value={name} onChange={event => setName(event.target.value)} required />
          </div>
          <div className="mb-5">
            <Label>Description</Label>
            <TextInput type="text" value={description} onChange={event => setDescription(event.target.value)} required />
          </div>

          <div className="mb-5">
            <Label>Start Date</Label>
            <Datepicker value={startDate.toISOString().split('T')[0]} onChange={handleStartDate} required />
          </div>

          <div className="mb-5">
            <Label>End Date</Label>
            <Datepicker value={endDate.toISOString().split('T')[0]} onChange={handleEndDate} required />
          </div>

          <div className="mb-5">
            <Label>Priority Level</Label>
            <Select value={priority} onChange={event => setPriority(event.target.value as PRIORITY)}>
              <option value={'urgent'}>Urgent</option>
              <option value={'critical'}>Critical</option>
              <option value={'normal'}>Normal</option>
            </Select>
          </div>

          <div className="mb-5">
            <Label>Assignee</Label>
            <Select value={assignee} onChange={event => setAssignee(event.target.value)}>
              <option value="eddy">Eddy</option>
              <option value="kobby">Kobby</option>
            </Select>
          </div>

        </div>


        {loading ? <CustomSpinner /> : <Button type="submit" className="w-48" >Add Task</Button>}


      </form>

      <section className="mx-32">
        <CustomTable tasks={tasks} handleDelete={handleDelete} />
      </section>
    </>
  );
}

export default HomePage;