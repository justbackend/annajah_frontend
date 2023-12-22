import axios from "axios";

const Axios = axios.create({
  baseURL: "https://alnajah.pythonanywhere.com/kids/",
});

export default Axios;