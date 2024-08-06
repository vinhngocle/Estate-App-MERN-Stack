import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addBook, addBookSuccess } from "../actions/book/bookAction";
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
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [rating, setRating] = useState("Excellent");
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
    const newBook = {
      author,
      name,
      rating,
      status,
    };
    // console.log("new book", newBook);
    await dispatch(addBook(newBook));
    toggleModal();
  };

  return (
    <>
      {/* form create */}
      {isModalOpen && (
        // <ModalCreate toggleModal={toggleModal} handleSave={handleSave} />
        <div
          data-modal-backdrop="static"
          aria-hidden="true"
          className="bg-white rounded-lg shadow dark:bg-gray-700 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-[1000px] max-h-full text-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <form action="" className="p-6">
                <div className="px-4 py-6 space-y-12 border border-sky-700">
                  <div className="">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Create Book
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-left">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="book-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Book name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="book-name"
                            id="book-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Author
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="author"
                            id="author"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Status
                        </label>
                        <div className="mt-2">
                          <select
                            id="status"
                            name="status"
                            autoComplete="status"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option>Available</option>
                            <option>Not Available</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="rating"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Rating
                        </label>
                        <div className="mt-2">
                          <select
                            id="rating"
                            name="rating"
                            autoComplete="rating"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option>Excellent</option>
                            <option>Very Good</option>
                            <option>Average</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    value="Submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* list tables  */}
      <Table data={data} toggleModal={toggleModal} />
    </>
  );
}

export default BookPage;
