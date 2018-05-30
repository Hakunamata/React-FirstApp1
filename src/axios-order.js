import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-12a8f.firebaseio.com/"
});

export default instance;
