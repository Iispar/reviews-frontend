# reviews-backend

Frontend for the reviews application. Other repositories:
<br />
[Backend](https://github.com/Iispar/reviews-backend)
<br />
[api](https://github.com/Iispar/review-summary-API)

## About this project

**!! For a detailed look at the whole project please refer to the document in the files that was created for the college course. !!**

This is the frontend and also the main repository of the project that I created. It is a page where an online seller can input his items and
reviews that are associated with the items. The site automatically with machine learning rates the reviews and also calculates the top most positive and negative words
more on this in the APIs repository and also in the main document file.

It has unit tests that cover almost 100% (could not test hover on recharts, because this is apparently not possible :( ) of all the files. Testing is done solely with Jest.
**Currently this frontend is not deployed anywhere because it is still in development.**

## Prerequisites 
There is no prequisites to be installed for this frontend.

## configuration
If you are running this without the backend you will need the link for the backend API, please contact me at iiro.s.partanen@gmail.com to get this. Alternatively you can run the backend at the same time
and then just create a .env.local file with REACT_APP_URL=http://localhost:8080/api in it into the root directory..

The tests **can** be run without this file.

## Running
### Build 
To run this application you will need to fulfill configuration.

After that you can just need to clone the application from github and run from the root directory `npm install` in the terminal and then `npm run`
### Test
To run the tests you just need to clone the repository and from the root directory at the terminal run `npm run jest`. If you want coverage for the tests run `npm run jest -- --coverage` and if you want specific tests run for example `npm run jest --login (--coverage)`

## Technologies
The framework is React with JavaScript. For styling I use plain CSS with SaSS. React and JS being chosen for their relativity in the frontend space. Not using for example Bootstrap is because I
feel that it is important to learn the fundamentals of CSS before using those.
