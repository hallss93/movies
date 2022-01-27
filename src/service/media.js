import api from "./index";

const URL = {
  MOVIES: "discover",
  MOVIE: "",
};

export default {
  getAllMovie: async (type = "movie", page) => {
    try {
      const response = await api.get(`${URL.MOVIES}/${type}?page=${page}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getMovie: async (id, type) => {
    try {
      const response = await api.get(`${URL.MOVIE}/${type}/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};
