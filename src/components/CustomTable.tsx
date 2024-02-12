import {Table} from 'flowbite-react'
import { TABLEPROPS } from '../models';



const CustomTable = ({tasks, handleDelete} : TABLEPROPS) => {
    return ( 
        <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Task Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          {
              tasks.map((task) => (
                  <Table.Body key={task._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{task.name}</Table.Cell>
                    <Table.Cell>{task.status}</Table.Cell>
                    <Table.Cell>{task.description}</Table.Cell>
                    <Table.Cell className="flex space-x-5">
                      <a href={`/edit/${task._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                      <button onClick={() => handleDelete(task._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))
          }
         
        </Table>
      </div>
     );
}
 
export default CustomTable;