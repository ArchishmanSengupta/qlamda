import axios from "axios";

export default async function  getData(){
    const response = await axios.get('https://bf25-2405-201-9002-d04b-8a8-3c02-fc8e-ab75.ngrok-free.app/questions');
    const data = response.data;
    return data;
}