var Airtable = require("airtable")
var base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN,
}).base(process.env.NEXT_PUBLIC_AIR_TABLE_BASE)
const tableName = "user_url"
const air = base(tableName)
/**
 * Get user URL from Air Table
 * @param {*} userId
 * @returns array of urls
 */
const getUserUrl = async function (userId) {
  if (!userId) {
    return []
  }
  try {
    const res = await air
      .select({
        filterByFormula: "{user_id} = '" + userId + "'",
      })
      .all()
    return parseAirTableResponse(res)
  } catch (error) {
    return {
      err: error,
    }
  }
}

const createURL = async function (data) {
  let result = {
    success: false,
  }
  await air.create([{ ...data }]).then(res => result = {
          success: true,
          newUrl: res[0].fields,
        })
  return result
}

const updateURL = async function (data) {
  return {
    success: true,
  }
}

/**
 * Parse Air Table response to URL array
 * @param {*} res
 * @returns
 */
function parseAirTableResponse(res) {
  if (!res || !res.length) {
    return []
  }
  return res.map((row) => row.fields || [])
}

export { getUserUrl, createURL, updateURL }
