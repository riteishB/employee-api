const axios = require("axios");
const getSwansonQuote = async () => {
  const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
  const response = await request(url);
  return response[0];
};

const getDadJokes = async () => {
  const url = "https://icanhazdadjoke.com/";
  const response = await request(url);
  return response.joke;
};

module.exports = {
  getSwansonQuote,
  getDadJokes,
};
