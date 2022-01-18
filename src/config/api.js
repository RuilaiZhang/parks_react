import axios from "axios";

const picnicAPI = axios.create({

  baseURL: process.env.REACT_APP_PICNIC_API
})

// cb function uses the request to add jwt to header
// Should work now
picnicAPI.interceptors.request.use(req => {
  const jwt = sessionStorage.getItem('jwt');
  if (jwt) {
    req.headers["Authorization"] = `Bearer ${jwt}`
  }
  return req;
})

export default picnicAPI;

export function parseError(error) {
  const {response} = error;
  if(!response) return "404 error";
  if(response.data.error) return response.data.error
  if(response.data.errors) return response.data.errors.join(", ")
}