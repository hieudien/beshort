import axios from "axios"

const getShortUrl = async function(longUrl) {
    if (!longUrl) {
        return { error: 'Please input a valid URL' }
    }
    const header = {
        headers: { 
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_BEARER_TOKEN,
            'Content-Type': 'application/json'
        }
    }
    const body = {
        "long_url": longUrl
    }
    let result = {}
    await axios.post(process.env.NEXT_PUBLIC_SHORT_END_POINT, body, header)
    .then(res => {
        const { data: { link }} = res
        result = { link }
    })
    .catch(error => {
        result = { error: 'Server error!'}
        let { response: { data: { message }}} = error
        if (message){
            message === 'ALREADY_A_BITLY_LINK' && (message = 'This is already a bittly link.')
            result = { error: message }
        }
    })
    return result
}

export { getShortUrl }