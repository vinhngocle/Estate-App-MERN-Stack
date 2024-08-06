import { useState } from "react";

interface Book {
  // id: number;
  author: string;
  name: string;
  rating: string;
  status: string;
}

interface ModalCreateProps {
  toggleModal: () => void;
  handleSave: (form: Book) => void;
}

function ModalCreate({ toggleModal, handleSave }: ModalCreateProps) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [rating, setRating] = useState("Excellent");

  const handleFormSubmit = () => {
    const newBook: Book = {
      // You can replace this with a proper ID generation logic
      author,
      name,
      rating,
      status,
    };
    handleSave(newBook);
    toggleModal();
  };

  return (
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
                onClick={handleFormSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalCreate;
