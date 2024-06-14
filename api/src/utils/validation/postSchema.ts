export const createPostSchema = {
  "postData.images": {
    isArray: {
      errorMessage: "Images must be a array",
    }
  },
  "postData.price": {
    notEmpty: {
      errorMessage: "Price cannot be empty",
    },
    isNumeric: {
      errorMessage: "Price must be a number",
    },
  },
  "postData.bedroom": {
    notEmpty: {
      errorMessage: "Bed room  cannot be empty",
    },
    isNumeric: {
      errorMessage: "Bed room must be a number",
    },
  },
  "postData.bathroom": {
    notEmpty: {
      errorMessage: "Bath room  cannot be empty",
    },
    isNumeric: {
      errorMessage: "Bath room must be a number",
    },
  },
}