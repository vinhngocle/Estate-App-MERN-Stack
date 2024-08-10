import React from "react";

interface Book {
  id: number;
  author: string;
  name: string;
  rating: string;
  status: string;
}

interface ModalCreateProps {
  titleModal: string;
  closeModal: () => void;
  handleFormSubmit: (form: Book) => void;
  bookForm: Book;
  handleStateChange: (value: object) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function ModalCreate({
  titleModal,
  closeModal,
  handleFormSubmit,
  bookForm,
  handleStateChange,
}: ModalCreateProps) {
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
                  {titleModal}
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
                        required
                        type="text"
                        name="book-name"
                        id="book-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={bookForm.name}
                        onChange={(e) =>
                          handleStateChange({
                            ...bookForm,
                            name: e.target.value,
                          })
                        }
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
                        required
                        type="text"
                        name="author"
                        id="author"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={bookForm.author}
                        onChange={(e) =>
                          handleStateChange({
                            ...bookForm,
                            author: e.target.value,
                          })
                        }
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
                        value={bookForm.status}
                        onChange={(e) =>
                          handleStateChange({
                            ...bookForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
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
                        value={bookForm.rating}
                        onChange={(e) =>
                          handleStateChange({
                            ...bookForm,
                            rating: e.target.value,
                          })
                        }
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Average">Average</option>
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
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                value="Submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleFormSubmit(bookForm)}
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ModalCreate);
