import Axios from "../utils/axios";

export class BookService {
  static getBooks = async () => {
    let response = await Axios.get("/book");
    return response;
  };

  static createBook = async (payload) => {
    let response = await Axios.post("/book", payload);
    console.log(response);
    return response;
  };
}
