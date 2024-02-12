import axios from "axios"
import { BASE_URL } from "./url"

export const fetchUsers = async(url) => {
    await axios.get(`${BASE_URL}/users`)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}