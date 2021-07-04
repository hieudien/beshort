import axios from "axios"

const getShortUrl = async function(longUrl) {
    if (!longUrl || !validURL(longUrl)) {
        return {
            error: 'Please input a valid URL'
        }
    }
    const header = {
        headers: { Authorization: "Bearer " + process.env.BEARER_TOKEN }
    }
    const body = {
        "long_url": longUrl
    }
    console.log(process.env.SHORT_END_POINT);
    const result = await axios.post(process.env.SHORT_END_POINT, body, header)
    if (!result) {
        return {
            error: 'Server error!'
        }
    }
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