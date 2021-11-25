import http from '../http-common';
class CustomerDataService {
    getPersonalInfo() {
        return http.get(`/customer/info`)
    }
    updatePersonalInfo(data) {
        return http.post(`/customer/update`, data)
    }
    sendFeedback(data) {
        return http.post('/customer/feedback', data)
    }
}
export default new CustomerDataService();