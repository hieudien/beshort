import { useState } from 'react';
import { getShortUrl } from '../services/beshort'

const InputArea = () => {
    const [longUrl, setLongUrl] = useState()
    const [shortedUrl, setShortedUrl] = useState()
    const [error, setError] = useState()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {link, error} = await getShortUrl(longUrl)
      if (error) {
        setError(error)
        return
      }
      if (link) {
        setError(null)
        setShortedUrl(link)
        //todo check if siginged to save link to usser from localstorage
      }
    }
    return (
      <div className='pt-8'>
        <form className='flex' onSubmit={handleSubmit}>
          <input value={longUrl} onChange={e => setLongUrl(e.target.value)} className='bg-gray-200 shadow-inner rounded-l p-2 flex-1' id='longUrl' type='text' aria-label='Long URL' placeholder='Enter long url' />
          <button className='bg-blue-500 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r' type='submit'>
            short it!
          </button>
        </form>
        { error && (
            <div className='mt-8 pt-5 pb-5 pl-5 pr-5 bg-red-200 rounded text-red-600 font-bold'>
                {error} 
            </div>
        )}
        { shortedUrl && (
          <div className='mt-8 pt-8 pb-8 pl-5 pr-5 bg-blue-200 rounded'>
            Your shorted: 
            <a href={shortedUrl} target='_blank' className='underline italic'> { shortedUrl } </a>
          </div>
        )}
        
      </div>
    )
  }

  export default InputArea;