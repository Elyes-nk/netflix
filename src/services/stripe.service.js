export default {
    createSession(body) {
        return fetch(`${process.env.API_URL}/checkout/`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => res.json())
    }
}