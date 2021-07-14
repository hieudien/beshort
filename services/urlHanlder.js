import { useState } from "react"
import { createContainer } from "unstated-next"

function useUrlHandler(initialState = []) {
  let [urlList, setUrlList] = useState(initialState)
  let add = (newUrl) => setUrlList([...urlList, newUrl])
  let update = (urlList) => setUrlList(urlList)
  return { urlList, add, update }
}

let UrlHandler = createContainer(useUrlHandler)
export default UrlHandler
