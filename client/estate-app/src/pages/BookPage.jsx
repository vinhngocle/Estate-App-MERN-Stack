import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addBook, addBookSuccess } from "../actions/book/bookAction";
import ModalCreate from "../components/Book/ModalCreate";
import Table from "../components/Book/Table";

// interface Book {
//   id: number;
//   author: string;
//   bookName: string;
//   rating: number;
//   status: string;
// }

function BookPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.getBooks);
  // const [book, setBook] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (newBook) => {
    // Dispatch an action to save the new book or update the state directly
    // For now, we'll update the state directly
    // Assuming `data` is an array of books
    // dispatch({
    //   type: "ADD_BOOK",
    //   payload: newBook,
    // });
    dispatch(addBookSuccess(newBook));
    console.log(data);
    // data.push(newBook);
  };

  return (
    <>
      {/* form create */}
      {isModalOpen && (
        <ModalCreate toggleModal={toggleModal} handleSave={handleSave} />
      )}

      {/* list tables  */}
      <Table data={data} toggleModal={toggleModal} />
    </>
  );
}

export default BookPage;
