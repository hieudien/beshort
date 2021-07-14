import { useState } from 'react';
import { getShortUrl } from '../services/beshort'
import { createURL } from "../services/airtable"
import UrlHandler from "../services/urlHanlder"
import Image from 'next/image'
import copyIcon from '../images/copy.webp'
import { toastInfo, toastError } from '../services/toast'

const InputArea = () => {
  let urlHanlder = UrlHandler.useContainer()
  const [longUrl, setLongUrl] = useState("")
  const [shortedUrl, setShortedUrl] = useState("")
  const [userId, setUserId] = useState(null)
  const [title, setTitle] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { link, error } = await getShortUrl(longUrl)
    if (error) {
      toastError(error,)
      return
    }
    if (link) {
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
        toastError('Some error while create URL.')
      } else {
        toastInfo('saved!')
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
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r w-20"
          type="submit"
        >
          short it!
        </button>
      </form>
      {shortedUrl && (
        <span>
          <div className="mt-5 pt-2 pb-2 pl-5 bg-gray-200 rounded" >
            <span>your shorted: {" "}</span>
            <a href={shortedUrl} target="_blank" className="underline italic pl-3">
              {shortedUrl}
            </a>
            <button className="float-right mr-5" onClick={() => {
              navigator.clipboard.writeText(shortedUrl)
              toastInfo('copied!')
            }}>
              <Image className="object-contain" width="20" height="20" src={copyIcon} alt="Copy Icon" />
            </button>
          </div>
          {userId && (
            <form className="flex mt-5" onSubmit={saveURL}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                id="title"
                type="text"
                aria-label="title"
                placeholder="enter title"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r w-20"
                type="submit"
              >
                save it!
              </button>
            </form>
          )}
        </span>
      )}
    </div>
  )
}

  export default InputArea;