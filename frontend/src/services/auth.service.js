import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:8080/auth',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})


class AuthService {
    logIn(ssn) {
        return http.post('/login', { ssn: ssn })
    }
    logOut() {
        return http.get('/logout')
    }
}

export default new AuthService();