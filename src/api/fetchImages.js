import axios from "axios"
import { FLICKR_API } from "../utils/constants"

export const fetchImages = (method, pageNo, searchText) => {
    return new Promise((resolve, reject) => {
        axios.get(`${FLICKR_API}/?method=${method}&api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}&text=${searchText}&per_page=40&format=json&nojsoncallback=1`)
        .then((res) => {
            resolve(res.data.photos.photo);
        })
        .catch((err) => {
            reject(err)
        })
    })
}