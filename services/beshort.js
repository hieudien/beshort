import axios from "axios"

const getShortUrl = async function(longUrl) {
    if (!longUrl || !validURL(longUrl)) {
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

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export { getShortUrl }