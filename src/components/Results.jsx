import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'
import { useResultContext } from '../contexts/ResultContextProvider'
import Loading  from './Loading'


  // url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk



const Results = () => {
  const { getResults, results, isLoading, searchTerm } = useResultContext()

  const location = useLocation()
  useEffect(() => {
    if(searchTerm) {
      if(location.pathname === '/videos') {
        getResults(`https://google-search3.p.rapidapi.com/api/v1/search/q=elon&num=40 videos`)
      } else if(location.pathname === '/images'){

        getResults(`https://google-search3.p.rapidapi.com/api/v1/image/q=${searchTerm}&num=40`)
      }
      else if(location.pathname === '/search'){

        getResults(`https://google-search3.p.rapidapi.com/api/v1/search/q=${searchTerm}&num=40`)
      }

      else if(location.pathname === '/news'){

        getResults(`https://google-search3.p.rapidapi.com/api/v1/news/q=${searchTerm}&num=40`)
      }
      
    }
        
  }, [searchTerm, location.pathname])

  console.log(location.pathname)

  if(isLoading) return <Loading />

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.results?.map(({link, title}, index) => (
              <div className="md:w-2/5 w-full" key={index}>
                <a href={link} target="_blank" rel='norefferrer'>
                  <p className='text-sm'>
                    {link.length > 30 ? link.substring(0, 30) : link }
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>
              </div>
          ))}
      </div>
      )

    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
            {results?.image_results?.map(({image, link: {href, title}}, index) => (
              <a className="sm:p-3 p-5" href={href} key={index} target="_blank" rel='noreferrer'>
                <img src={image?.src} alt={title} loading="lazy" />
                <p className='w-36 break-words text-small mt-2'>
                    {title}
                </p>
              </a>
            ))}
        </div>
      )

    case '/news':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-ceter">
          {results?.entries?.map(({links, id, source, title}, index) => (
              <div className="md:w-2/5 w-full" key={index}>
                <a href={links?.[0].href} target="_blank" rel='norefferrer' className="hover:underline">
                  <p className='text-lg dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>      
                </a>
                  <div className="flex gap-4">
                    <a href={source?.href} target="_blank" rel='noreferrer'>
                        {source?.href}
                    </a>
                  </div>          
              </div>
          ))}
      </div>
      )
    case '/videos':
      return (
        <div className="flex flex-wrap">
         {results?.results?.map((video, index) => (
           <div key={index} className="p-2">
             {console.log(video.additional_links[0])}
             <ReactPlayer url='https://www.youtube.com/watch?v=G-Cr00UYokU' controls width="355px" height="200px" />
           </div>
         ))}
        </div>
      )
    default:
      return 'Error';
  }
}

export default Results