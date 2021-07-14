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
  function urlListRender(urlList) {
    if (!urlList.length) {
      return <p>Your have no URL, let short some!</p>
    }
    const items = urlList.map((row, index) => {
      return (
        <tr key={row.id}>
          <td className="border border-green-600">{index+1}</td>
          <td className="border border-green-600">{row.name}</td>
          <td className="border border-green-600">
            <input defaultValue={row.long_url}></input>
          </td>
          <td className="border border-green-600">{row.short_url}</td>
          <td className="border border-green-600">{row.created_at.slice(0, 19).replace('T', ' ')}</td>
          <td className="border border-green-600">
            <button className="float-left pl-3" onClick={() => {
              navigator.clipboard.writeText(row.short_url)
              toastInfo('copied!')
            }}>
              <Image className="object-contain" width="20" height="20" src={copyIcon} alt="Copy Icon" />
            </button>
            <button className="float-right pr-3" onClick={() => remove(row.airId)}>
              <Image className="object-contain" width="20" height="20" src={deleteIcon} alt="Delete Icon" />
            </button>
          </td>
        </tr>
      )
    })
    return (
      <table className="table-fixed border-separate border border-green-800 text-center">
        <thead>
          <tr>
            <th className="w-1/8 border border-green-600">#</th>
            <th className="w-1/5 border border-green-600">Title</th>
            <th className="w-1/5 border border-green-600">Long URL</th>
            <th className="w-1/5 border border-green-600">Shorted URL</th>
            <th className="w-1/5 border border-green-600">Created At</th>
            <th className="w-1/6 border border-green-600">Action</th>
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
    </div>
  )
}

export default UrlList