import { useState } from "react"
import { createContainer } from "unstated-next"

function useUrlHandler(initialState = []) {
  let [urlList, setUrlList] = useState(initialState)
  let add = (newUrl) => setUrlList([newUrl, ...urlList])
  let update = (urlList) => setUrlList(urlList)
  let remove = (airId) =>  setUrlList(urlList.filter(row => row.airId !== airId))
  return { urlList, add, update, remove }
}

let UrlHandler = createContainer(useUrlHandler)
export default UrlHandler
