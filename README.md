# reviews-frontend

Use the app [here](https://reviews-frontend-ochre.vercel.app/login)
** HOX **
he backend is probably at sleep so it will take few minutes for it to wake up from the first call. If you just login it will eventually give error or log you in when it wakes up... Also the add rating API is probably at sleep so try adding a review and after it gives an error try again after waiting until it works.

You can use the username: admin with password: adminPass123!
This has some items with reviews already added. Otherwise there are some JSON files with reviews in the testData folder for you to try the rating.

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

It has unit tests that cover almost 100% (could not test hover on recharts, because this is apparently not possible :( ) of all the files. Testing is done solely with Jest. This application is deployed into Vercel.com and you can access it from this [link](https://reviews-frontend-ochre.vercel.app/login)

## configuration
If you are running this without the backend you will need the link for the backend API, please contact me at iiro.s.partanen@gmail.com to get this. Alternatively you can run the backend at the same time
and then just create a .env.local file with REACT_APP_URL=http://localhost:8080/api (or the URL the backend uses) in it into the root directory.

The tests **can** be run without this file.

## Running

The backend is probably at sleep so it will take few minutes for it to wake up from the first call. If you just login it will eventually give error or log you in when it works... Also the add reviews API is probably at sleep so try adding a review and after it gives an error try again after waiting until it works.

User with already added items and reviews:
username: admin
password: adminPass123!

### Build 
To run this application you will need to fulfill configuration.

You can then use either docker if you have it installed or just the command line. To run the dockerfile run ```docker build -t frontend .```
and then run ```docker run -p 3000:3000 frontend``` and the application should start in http://localhost:3000/

Alternatively you can run the application from the command line you just need to run from the root directory `npm install` in the terminal and then `npm run`
### Test
To run the tests you just need to clone the repository and from the root directory at the terminal run `npm run jest`. If you want coverage for the tests run `npm run jest -- --coverage` and if you want specific tests run for example `npm run jest --login (--coverage)`

## Technologies
The framework is React with JavaScript. For styling I use plain CSS with SaSS. React and JS being chosen for their relativity in the frontend space. Not using for example Bootstrap is because I
feel that it is important to learn the fundamentals of CSS before using those.
