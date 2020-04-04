const axios = require("axios");
const logger = require("./logger");

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
    logger.error(error);
    throw err;
  }
};

module.exports = request;
