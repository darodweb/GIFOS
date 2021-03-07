const api = {

    getGifs: function (URL) {
        return (
            new Promise((resolve, reject) => {
                fetch(URL)
                    .then(response => resolve(response.json()))
                    .catch(error => reject(error))
            })
        )
    }
};


export { api };