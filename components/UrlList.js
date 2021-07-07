import { useEffect, useState } from 'react';

const UrlList = () => {
    const [userId, setUserId] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        console.log('here to get user id');
      const {userId, error} = {}
      if (error) {
          
      }
      if (userId) {
          setUserId(userId)
          localStorage.setItem('userId', userId)
      }
    }, [])
    return (
      <div>
          <p>Helo baby</p>
          {error && (
            <div className='mt-8 pt-5 pb-5 pl-5 pr-5 bg-red-200 rounded text-red-600 font-bold'>
                {error} 
            </div>
          )}
          
      </div>
    )
  }

  export default UrlList