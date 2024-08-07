import { v4 as uuidv4 } from "uuid";

let Posts = [
  {
    id: uuidv4(),
    text: "This is my first Post.",
  },
];

export default {
  add: async (data) => {
    return new Promise((resolve) => {
      Posts.push(data);
      setTimeout(resolve(data), 1000);
    });
    // return new Promise((resolve) => {
    //   const newPost = { ...data, id: uuidv4() };
    //   Posts = [...Posts, newPost]; // Ensure immutability
    //   setTimeout(() => resolve(newPost), 1000);
    // });
  },

  update: async (data) => {
    return new Promise((resolve) => {
      const { id, ...rest } = data;
      const targetIndex = Posts.findIndex((x) => x.id === id);

      if (targetIndex > -1) {
        Posts[targetIndex] = { ...data };
      } else {
        new Error("Faild to update.");
      }

      setTimeout(resolve(data), 1000);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      const targetIndex = Posts.findIndex((x) => x.id === id);

      if (targetIndex > -1) {
        Posts.splice(targetIndex, 1);
      } else {
        new Error("Faild to delete.");
      }

      setTimeout(resolve({ affected: 1 }), 1000);
    });
  },

  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(resolve(Posts), 1000);
    });
  },
};
