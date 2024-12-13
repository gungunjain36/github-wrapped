import axios from "axios";

const fetchUserInfo = async (username) => {
    const url = `https://api.github.com/users/${username}`;

    try {
      const response = await axios.get(url);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return ('User not found');
      } else if (error.response && error.response.status === 403) {
        return ('Rate limit exceeded. Try again later.');
      } else {
        return ('An error occurred. Please try again.');
      }
    }
  };

  export default fetchUserInfo;
