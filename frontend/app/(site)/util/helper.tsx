// util/helper.ts
import axios from "axios";

export async function getData() {
  try {
    // TODO: ADD DOTENV FILE TO FETCH SERVER URL FROM ENV FILE
    // CREATE env.example file to send other the creds
    const response = await axios.get('http://localhost:8080/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
