import Axios from "../utils/axios";

export default {
  getBooks: async (query) => {
    const queryString = new URLSearchParams(query).toString();
    const { data } = await Axios.get(`/book?${queryString}`);
    return data;
  },

  createBook: async (payload) => {
    let response = await Axios.post("/book", payload);
    return response;
  },

  removeBook: async (id) => {
    let response = await Axios.delete(`/book/${id}`);
    return response;
  },

  updateBook: async (id, payload) => {
    let response = await Axios.put(`/book/${id}`, payload);
    return response;
  },
};
