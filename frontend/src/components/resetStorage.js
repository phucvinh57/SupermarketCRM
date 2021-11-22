const resetStorage = () => {
    setTimeout(() => {
        window.location.href = '/'
        window.localStorage.setItem('mode', '')
        window.localStorage.setItem('id_ssn', '')
    }, 1000)
};

module.exports = resetStorage