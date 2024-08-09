import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBooks,
  addBook,
  removeBook,
  updateBook,
} from "../actions/book/bookAction";
import Table from "../components/Book/Table";
import ModalCreate from "../components/Book/ModalCreate";

function BookPage() {
  const dispatch = useDispatch();
  const { data, meta, isLoading, error } = useSelector(
    (state) => state.getBooks
  );
  const [form, setForm] = useState({
    id: "",
    name: "",
    author: "",
    rating: "Excellent",
    status: "Available",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalCreate = () => {
    setTitleModal("Create Modal");
    cleanForm();
    openModal();
  };

  const handleFormSubmit = async (newBook) => {
    // const newBook = {
    //   id: form.id,
    //   name: form.name,
    //   author: form.author,
    //   rating: form.rating,
    //   status: form.status,
    // };
    console.log("newbook", newBook);

    if (newBook.id === "" || newBook.id === null) {
      await dispatch(addBook(newBook));
    } else {
      await dispatch(updateBook(newBook));
    }
    // const query = {
    //   page: pageNumber,
    //   take: 5,
    // };
    // dispatch(getBooks(query));
    closeModal();
  };

  const handleDelete = async (id) => {
    await dispatch(removeBook(id));
  };

  const handleEdit = async (book) => {
    setForm({
      id: book.id,
      name: book.name,
      author: book.author,
      rating: book.rating,
      status: book.status,
    });
    setTitleModal("Edit Modal");
    openModal();
  };

  const handlePageChange = (pageNumber) => {
    const query = {
      page: pageNumber,
      take: 5,
    };
    dispatch(getBooks(query));
  };

  const cleanForm = () => {
    setForm({
      id: "",
      name: "",
      author: "",
      rating: "Excellent",
      status: "Available",
    });
  };

  return (
    <>
      {/* form create */}
      {isModalOpen && (
        <ModalCreate
          titleModal={titleModal}
          closeModal={closeModal}
          handleFormSubmit={handleFormSubmit}
          bookForm={form}
          handleStateChange={setForm}
        />
      )}

      {/* list tables  */}
      <Table
        books={data}
        openModal={openModalCreate}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        pageCount={meta.pageCount}
        currentpage={meta.page}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default BookPage;
