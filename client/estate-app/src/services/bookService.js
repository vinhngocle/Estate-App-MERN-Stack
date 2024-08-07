import Axios from "../utils/axios";

export default {
  getBooks: async () => {
    let response = await Axios.get("/book");
    return response;
  },

  createBook: async (payload) => {
    let response = await Axios.post("/book", payload);
    console.log(response);
    return response;
  },

  removeBook: async (id) => {
    let response = await Axios.delete("/book", id);
    console.log(response);
    return response;
  },
};
