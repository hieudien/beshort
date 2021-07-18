import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react"
import { getUserUrl, removeURL } from "../services/airtable"
import UrlHandler from "../services/urlHanlder"
import { toastInfo, toastError } from '../services/toast'
import deleteIcon from '../images/delete.png'
import copyIcon from '../images/copy.webp'
import Image from 'next/image'

const UrlList = () => {
  let urlHanlder = UrlHandler.useContainer()
  const user = useUser()
  useEffect(async () => {
    if (user) {
      localStorage.setItem("userId", user.id)
      fetchUrl()
    }
  }, [])
  async function fetchUrl() {
     const result = await getUserUrl(user.id)
      if (result.err) {
        toastError('Error while get URL data. ' + result.err.message)
        return
      }
      urlHanlder.update(result)
  }
  async function remove(airId) {
    urlHanlder.remove(airId)
    const res = await removeURL(airId)
    if (res.success) {
      toastInfo('removed!')
    } else {
      toastError('Some error while removing.')
      fetchUrl()
    }
  }
  function handleRowClick (event, text) {
    event.target.select()
    navigator.clipboard.writeText(text)
    toastInfo('copied!')
  }
  function urlListRender(urlList) {
    if (!urlList.length) {
      return
    }
    const items = urlList.map((row) => {
      return (
        <tr key={row.id}>
          <td className="w-2/6 sm:w-2/12 border border-green-600">{row.name}</td>
          <td className="w-3/6 sm:w-3/12 border border-green-600 hidden sm:table-cell p-1">
            <input className="w-full" defaultValue={row.long_url} readOnly={true} onFocus={(event) => handleRowClick(event, row.long_url)}/>
          </td>
          <td className="w-3/6 sm:w-3/12 border border-green-600">
            <input className="w-full" defaultValue={row.short_url} readOnly={true} onFocus={(event) => handleRowClick(event, row.short_url)}/>
          </td>
          <td className="sm:w-2/12 border border-green-600 hidden sm:table-cell">{row.created_at.slice(0, 19).replace('T', ' ')}</td>
          <td className="sm:w-1/12 border border-green-600">
            <button onClick={() => remove(row.airId)}>
              <Image className="object-contain" width="20" height="20" src={deleteIcon} alt="Delete Icon" />
            </button>
          </td>
        </tr>
      )
    })
    return (
      <table className="text-sm table-fixed border-separate border border-green-800 text-center w-96 sm:w-full">
        <thead>
          <tr>
            <th className="w-2/6 sm:w-2/12 border border-green-600">Title</th>
            <th className="w-3/6 sm:w-3/12 border border-green-600 hidden sm:table-cell">Long URL</th>
            <th className="w-3/6 sm:w-3/12 border border-green-600">Shorted URL</th>
            <th className="sm:w-2/12 border border-green-600 hidden sm:table-cell">Created At</th>
            <th className="sm:w-1/12 border border-green-600">Action</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    )
  }
  return (
    <div>
      {urlHanlder.urlList.length > 0 ? (
        <span>
          <p className="w-max font-bold">Hi {user.lastName}, here is your URLs list:</p>
          <p className="w-max">Click/tap on link to copy.</p>
        </span>
      ) : (
        <p className="w-max font-bold">Hi {user.lastName}, you have no URL, let short some!</p>
      )}
      <div>{urlListRender(urlHanlder.urlList)}</div>
    </div>
  )
}

export default UrlList