import AuthService from "../services/auth.service";

const resetStorage = function() {
    window.location.href = '/'
    window.localStorage.setItem('mode', '')
    AuthService.logOut().then(response => {
        alert(response.data.login)
    })
};

export default resetStorage