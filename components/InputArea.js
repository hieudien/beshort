import { useState } from 'react';
import { getShortUrl } from '../services/beshort'
import { createURL } from "../services/airtable"
import UrlHandler from "../services/urlHanlder"

const InputArea = () => {
  let urlHanlder = UrlHandler.useContainer()
  const [longUrl, setLongUrl] = useState("")
  const [shortedUrl, setShortedUrl] = useState("")
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  const [title, setTitle] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { link, error } = await getShortUrl(longUrl)
    if (error) {
      setError(error)
      return
    }
    if (link) {
      setError(null)
      setShortedUrl(link)
      const userId = localStorage.getItem("userId")
      if (userId) {
        setUserId(userId)
      }
    }
  }

  const saveURL = (e) => {
    e.preventDefault()
    createURL({
      fields: {
        name: title,
        user_id: userId,
        long_url: longUrl,
        short_url: shortedUrl,
      },
    }).then((res) => {
      setUserId(null)
      if (!res.success) {
        setError("Some error while create URL.")
      } else {
        urlHanlder.add(res.newUrl)
      }
    })
  }

  return (
    <div className="pt-8">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
          id="longUrl"
          type="text"
          aria-label="long URL"
          placeholder="enter long url"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
          type="submit"
        >
          short it!
        </button>
      </form>
      {error && (
        <div className="mt-8 pt-5 pb-5 pl-5 pr-5 bg-red-200 rounded text-red-600 font-bold">
          {error}
        </div>
      )}
      {shortedUrl && (
        <div>
          <div className="mt-8 pt-8 pb-8 pl-5 pr-5 bg-blue-200 rounded">
            your shorted:
            <a href={shortedUrl} target="_blank" className="underline italic">
              {" "}
              {shortedUrl}{" "}
            </a>
          </div>
          {userId && (
            <form className="flex pt-2" onSubmit={saveURL}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                id="title"
                type="text"
                aria-label="title"
                placeholder="enter Title"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r"
                type="submit"
              >
                save it!
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

  export default InputArea;