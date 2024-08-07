import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addBook, removeBook } from "../actions/book/bookAction";
import ModalCreate from "../components/Book/ModalCreate";
import Table from "../components/Book/Table";

// interface Book {
//   author: string;
//   name: string;
//   rating: number;
//   status: string;
// }

function BookPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.getBooks);
  const [form, setForm] = useState({
    name: "",
    author: "",
    rating: "Available",
    status: "Excellent",
  });

  // const [name, setName] = useState("");
  // const [author, setAuthor] = useState("");
  // const [status, setStatus] = useState("Available");
  // const [rating, setRating] = useState("Excellent");
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

  const handleSave = async () => {
    // console.log("new book", newBook);
    const newBook = {
      name: form.name,
      author: form.author,
      rating: form.rating,
      status: form.status,
    };
    console.log("new book", newBook);
    await dispatch(addBook(newBook));
    toggleModal();
  };

  const handleDelete = async (id) => {
    await dispatch(removeBook(id));
  };

  return (
    <>
      {/* form create */}
      {isModalOpen && (
        <ModalCreate
          toggleModal={toggleModal}
          handleFormSubmit={handleSave}
          bookForm={form}
          handleStateChange={setForm}
        />
      )}

      {/* list tables  */}
      <Table
        books={data}
        toggleModal={toggleModal}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default BookPage;
