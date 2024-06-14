export const loginShema = {
  email: {
    notEmpty: {
      errorMessage: "Email  cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string",
    },
    isEmail: {
      errorMessage: "Not a valid e-mail address"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    }
  }
}

export const registerSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be at least 5 characters with a max of 32 characters"
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    }
  },
  email: {
    notEmpty: {
      errorMessage: "Email  cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string",
    },
    isEmail: {
      errorMessage: "Not a valid e-mail address"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isString: {
      errorMessage: "Password must be a string",
    }
  }
}

export const verifySchema = {
  emailToken: {
    notEmpty: {
      errorMessage: "Email token cannot be empty",
    },
    isString: {
      errorMessage: "Email token must be a string",
    }
  }
}