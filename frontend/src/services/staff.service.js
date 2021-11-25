import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:8080/staff',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})

class StaffDataService {
    getCustomer(query) {
        return http.get(`/cinfo?query=${query}`)
    }
    getDonutData(cssn) {
        return http.get(`/stat/donut?cssn=${cssn}`)
    }
    getBarData(cssn, start, end, mode) {
        return http.get(`/stat/bar?cssn=${cssn}&start=${start}&end=${end}&mode=${mode}`)
    }
    getLineData(cssn, start, end, mode) {
        return http.get(`/stat/line?cssn=${cssn}&start=${start}&end=${end}&mode=${mode}`)
    }
    getCustomerList() {
        return http.get('/clist')
    }
}

export default new StaffDataService();