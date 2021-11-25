import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:8080/customer',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})

class CustomerDataService {
    getPersonalInfo() {
        return http.get(`/info`)
    }
    updatePersonalInfo(data) {
        return http.post(`/update`, data)
    }
    sendFeedback(data) {
        return http.post('/feedback', data)
    }
    getNotifications(offset, num) {
        return http.get(`/notifs?num=${num}&offset=${offset}`)
    }
    getNumberOfNotifs() {
        return http.get('/notifs/length')
    }
    getFavourList() {
        return http.get('/favours')
    }
    removeFavour(code) {
        return http.get(`/favours/remove?code=${code}`)
    }
    getPurchases(offset, num) {
        return http.get(`/purchases?num=${num}&offset=${offset}`)
    }
    getNumberOfPurchases() {
        return http.get('/purchases/length')
    }
    getPurchaseDetail(purchaseID) {
        return http.get(`/purchases/${purchaseID}`)
    }
}
export default new CustomerDataService();