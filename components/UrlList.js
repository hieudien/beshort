import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react"
import { getUserUrl } from "../services/airtable"
import UrlHandler from "../services/urlHanlder"

const UrlList = () => {
  let urlHanlder = UrlHandler.useContainer()
  const [error, setError] = useState(null)
  const user = useUser()
  useEffect(async () => {
    if (user) {
      localStorage.setItem("userId", user.id)
      const result = await getUserUrl(user.id)
      if (result.err) {
        setError(result.err)
        return
      }
      urlHanlder.update(result)
    }
  }, [])
  function urlListRender(urlList) {
    if (!urlList.length) {
      return <p>Your have no URL, let short some!</p>
    }
    const items = urlList.map((row) => {
      return (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.long_url}</td>
          <td>{row.short_url}</td>
          <td>{row.created_at}</td>
        </tr>
      )
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Long URL</th>
            <th>Shorted URL</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    )
  }
  return (
    <div>
      <p className="font-bold">Hi {user.lastName}, here is your URLs list:</p>
      <div>{urlListRender(urlHanlder.urlList)}</div>
      {error && (
        <div className="mt-8 pt-5 pb-5 pl-5 pr-5 bg-red-200 rounded text-red-600 font-bold">
          {error}
        </div>
      )}
    </div>
  )
}

export default UrlList