import React, { useEffect, useRef, useState } from 'react'
import { fetchImages } from '../api/fetchImages';
import ImageModal from './ImageModal';
import Loader from './Loader';

const Images = () => {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchQueries, setSearchQueries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  let method = useRef('flickr.photos.getRecent');

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + 1000 >= scrollHeight) {
      setPage(page + 1)
    }
  }

  const fetchSearchedData = () => {
    method.current = 'flickr.photos.search';
    setImages([]);
    page === 1 ? fetchData() : setPage(1);
    setShowSuggestions(false);
    // searchQueries && !searchQueries.includes(searchText) ? setSearchQueries([searchText, ...searchQueries]) : setSearchQueries([searchText]);
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory && searchHistory.includes(searchText)) {
      return;
    }
    if (searchHistory) {
      searchHistory.length>=5 && searchHistory.pop();
      searchHistory = [searchText, ...searchHistory];
    }
    else {
      searchHistory = [searchText];
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  const fetchData = () => {
    setLoading(true);
    fetchImages(method.current, page, searchText)
      .then((data) => {
        setImages((prevImages) => {return [...prevImages, ...data]});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const toggleModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    imgSrc ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
  }

  const clearLocalStorage = (e) => {
    e.stopPropagation();
    localStorage.removeItem('searchHistory');
    setSearchQueries([]);
  }

  useEffect(() => {
    if (searchText.replace(/^\s+/g, '')) {
      const timer = setTimeout(() => {
        fetchSearchedData();
      }, 500);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [searchText])

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [images])

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    setSearchQueries(searchHistory);
  }, [])

  return (
    <>
      <header className='bg-black h-28 flex flex-col justify-center items-center'>
        <h1 className='text-white text-2xl font-bold'>Search Photos</h1>
        <input className='m-2 p-4 text-sm rounded-sm h-4 w-80' value={searchText} onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search for a keyword' onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => { setShowSuggestions(false) }, 100)} />
        {searchQueries && showSuggestions && <div className='absolute top-24 rounded-b-lg max-h-36 w-80 bg-white overflow-y-hidden shadow-lg'>
          {searchQueries.map((query, index) => {
            return <div className='p-1 cursor-pointer text-sm hover:bg-gray-200 flex justify-between' key={index} onClick={() => { setSearchText(query) }} >🔍 {query}
            {index === 4 && <button className='text-white relative bottom-1 p-1 text-sm rounded-md bg-red-700' onClick={clearLocalStorage}>Clear</button>}
            </div>
          })}
        </div>}
      </header>

      <main>
        <div className='flex justify-center flex-wrap'>
          {images.map((image) => {
            let imgSrc = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
            return <img onClick={() => toggleModal(imgSrc)} className='cursor-pointer my-3 mx-4 w-64 h-48' key={image.id} src={imgSrc} alt='image' />
          })}
        </div>
        {loading && <Loader />}
        {images.length === 0 && !loading && <h1 className='text-3xl text-center m-10'>No Images to Show. Please try again!</h1>}
        {selectedImage && <ImageModal imgSrc={selectedImage} closeModal={() => toggleModal('')} />}
      </main>
    </>
  )
}

export default Images