# Infinite Splash

Through this application, user can search for images using Unsplash API which would then be displayed to the user in grid layout. For searching the images, users can press the 'Enter' key as well as click on the search icon.
Along with this, user can also save the images in localStorage of their browser and view them in a saved images screen.
Saved images are categorized according to the search query provided to fetch the images.
Furthermore, Download button has been included, enabling users to download raw images.

## What's been used to develop this application?

#### Build

This application has been developed using React through Vite build tool. TypeScript has been implemented while developing this application.

#### Styling

Styling has been done using Tailwind CSS.

#### Navigation

React Router has been implemented for building a single page application with navigation between different screens.

#### Data fetching

Through the use of useInfiniteQuery hook provided by React Query, data has been fetched with added functionality of fetching more data to existing set of data. This is particulary useful while implementing infinite scroll functionality.
While fetching the data, axios is implemented for actual data fetching. For this, an axios instance is created by providing custom configuration to Unsplash API and access key. Then, by providing required parameters, images are fetched accordingly.

#### Infinite Scroll functionality

For providing infinite scroll functionality, InfiniteScroll component is implemented provided by react-infinite-scroller library.
