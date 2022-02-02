export default {
    createSession(body) {
        return fetch("http://localhost:3030/api/checkout/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => res.json())
    }
}