import axios from "axios";
import { error } from "./logger";

const request = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = response.data;
    return data;
  } catch (err) {
    error(error);
    throw err;
  }
};

module.exports = request;
