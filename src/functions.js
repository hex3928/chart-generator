export default {
    get: (url) => {

        return fetch(`${url}`)
            .then(res =>
                res.ok
                    ? res.json()
                    : {
                        error: true,
                        code: res.status,
                        message: res.statusText,
                    }
            )
            .catch( error => { return { error: true, code: "error", message: error } } )
    }
}