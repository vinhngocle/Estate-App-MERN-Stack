import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBooks,
  addBook,
  removeBook,
  updateBook,
} from "../actions/book/bookAction";
import Table from "../components/Book/Table";
import ModalCreate from "../components/Book/ModalCreate";

interface Book {
  id: number | null;
  author: string;
  name: string;
  rating: string;
  status: string;
}

interface RootState {
  getBooks: {
    data: Book[];
    meta: { pageCount: number; page: number };
    isLoading: boolean;
    error: Error | null;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
function BookPage() {
  const dispatch = useDispatch();
  const { data, meta, isLoading, error } = useSelector(
    (state: RootState) => state.getBooks
  );
  const [form, setForm] = useState<Book>({
    id: null,
    name: "",
    author: "",
    rating: "Excellent",
    status: "Available",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paramPaging, setParamPaging] = useState({
    page: 1,
    take: 5,
    search: "",
  });
  const [search, setSearch] = useState("");

  const didFetchRef = useRef(false);

  useEffect(() => {
    const fetchBooks = async () => {
      await dispatch(getBooks(paramPaging));
    };

    // Fetch data only if it hasn't been fetched yet or paramPaging has changed
    if (!didFetchRef.current) {
      fetchBooks();
      didFetchRef.current = true; // Mark the initial fetch as done
    } else {
      fetchBooks(); // Fetch books again when paramPaging changes
    }
  }, [dispatch, paramPaging]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  // if (data.length === 0) {
  //   console.log("No books available"); // Log to console
  //   return <div className="p-4 text-center">No books available</div>; // Display message
  // }

  const closeModal = () => setIsModalOpen(false);

  const openModal = () => setIsModalOpen(true);

  const openModalCreate = () => {
    cleanForm();
    openModal();
  };

  const handleFormSubmit = async (newBook: Book) => {
    if (newBook.id === null) {
      await dispatch(addBook(newBook));
    } else {
      await dispatch(updateBook({ ...newBook }));
    }

    closeModal();
  };

  const handleDelete = async (id: number) => {
    await dispatch(removeBook(id));
    await dispatch(getBooks(paramPaging));
  };

  const handleEdit = async (book: Book) => {
    setForm({
      id: book.id,
      name: book.name,
      author: book.author,
      rating: book.rating,
      status: book.status,
    });
    openModal();
  };

  const handlePageChange = (pageNumber: number) => {
    setParamPaging((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };

  const handleSearch = () => {
    setParamPaging((prev) => ({
      ...prev,
      search: search,
    }));
  };

  const cleanForm = () => {
    setForm({
      id: null,
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
          titleModal={form.id ? "Edit Modal" : "Create Modal"}
          closeModal={closeModal}
          handleFormSubmit={handleFormSubmit}
          bookForm={form}
          handleStateChange={(value) =>
            setForm((prev) => ({ ...prev, ...value }))
          }
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
        search={search}
        handleSearch={handleSearch}
        handleStateChange={setSearch}
      />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(BookPage);
