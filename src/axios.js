import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-3-226-121-227.compute-1.amazonaws.com:32178/api', // Backend Spring Boot base URL
});


export default instance;
