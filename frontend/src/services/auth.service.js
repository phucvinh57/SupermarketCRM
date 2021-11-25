import http from '../http-common'

class AuthService {
    logIn(ssn) {
        return http.post('/auth/login', { ssn: ssn })
    }
    logOut() {
        return http.get('/auth/logout')
    }
}

export default new AuthService();