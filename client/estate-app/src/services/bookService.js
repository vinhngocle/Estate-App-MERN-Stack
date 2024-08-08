import Axios from "../utils/axios";

export default {
  getBooks: async (query) => {
    const queryString = new URLSearchParams(query).toString();
    const { data } = await Axios.get(`/book?${queryString}`);
    console.log("response", data);
    return data;
  },

  createBook: async (payload) => {
    let response = await Axios.post("/book", payload);
    // console.log(response);
    return response;
  },

  removeBook: async (id) => {
    // console.log("payload remove", id);
    let response = await Axios.delete(`/book/${id}`);
    console.log(response);
    return response;
  },

  updateBook: async (id, payload) => {
    // console.log("id update ", id);
    // console.log("payload", payload);
    let response = await Axios.put(`/book/${id}`, payload);
    // console.log(response);
    return response;
  },
};
