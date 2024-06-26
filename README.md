
# ReactJS Assignment

## Live Demo:
https://photozenia.netlify.app/

## Tech Stack Used:
- ReactJS and Tailwind CSS

## Features:

1. Default - By default, we show the images from
https://www.flickr.com/services/api/flickr.photos.getRecent.html
2. Search - A Search bar is placed in the header. When a user is typing, results are displayed from https://www.flickr.com/services/api/flickr.photos.search.html . I have used throttling of 500ms i.e. API will be called 500ms after user has stopped typing to reduce the number of network calls.
3. Infinite Scroll - As you scroll down to the bottom of the page, more results are displayed if
there are more results.
4. Suggestions - Search queries are saved in the browser iteself (Local Storage) so that the next time
users come back, suggestions are showed from their last searched queries.
5. Preview - Clicking on a photo in the results will bring the photo up in a modal.
