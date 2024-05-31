export const authFetch = async (linkToAuth, values) => {
    // console.log(values)
    // console.log(JSON.stringify(values))
    try {
        const response = await fetch(linkToAuth, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

       return response.json()
    } catch (e) {
        console.error(e)
    }
}

const lol = []