This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

cd into the correct directory
`cd .\ground-control-water-table\`

```bash

npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then go to `http://localhost:3000/`


## Project requirements
I believe I had met all the requirements, here they are again with an explanation of how and where I believe I had met them

- [x] Consume JSON sample data and decode sensor data
> This is done in `/src/app/functions/decodeAndMutateData.tsx` - here I decode the package data from base64 and also mutate the data in to the structure I desire
- [x] Present the data in tabular form; with appropriate:
     - [x] Formatting/styling for data types
     > You can find the table component on the homepage - http://localhost:3000/ each table row has a 'show details' which can be expanded to show all the data available for that unique item
     - [x] Arrangement and presentation
     > The table data is clear and readable on all screensizes
     - [x] Search/filtering capabilities
     > I have searching / filtering on ID, sensor ID as well as date range filtering
     - [x] UI performance for data size
     > Works well for me! There is a small initial load so I have implemented a spinner to tell the user the page is still loading
     - [x] Cross browser and screen size considerations
     > Tested on all the sizes and devices mentioned below
- [x] Visualise the “sensor” data
     - [x] Impress us by visualising some/all of the sensor data
     > Checkout the 'map' page for a visualization of the data

## My take on the task
I've recored a short YouTube video explaining my take on the task which I feel is a better approach than discribing in text but the summary is that it was a lot of fun, I was confident about displaying the data in a tabular format but wanted to explore the 'visualization' of the data

After some research I decided I wanted to go down creating some charts of the data, I created a photoshop of my ideas which also helped with the visual UI design and gave me a good direction on where I wanted to take the design language

Next was understanding the data - decoding the payload gave all the details, this straight away made me think of having a 'show details' functionality on the tabular data

I started to notice a lot of the lat and lang values matched and initially I couldn't understand why - I thought the 100,000 data points would be dotted all over the globe

My assumption then was that these were different results from the the same sensors and I could group them accordingly, you can see me mutating the data into groups in `/src/app/functions/groupData.tsx` - I did this separatly and not in the main decoding and mutating function as I only needed to group the data for the visual component

## Testing
I've testing the app on Mac M1 silicon - Sonoma, Windows both with in Chrome and Firefox
Mobile testing all through Chrome emulation - iPhone 12 Pro, iPhone Pro Max, Samsung Galaxy S8

## Things I'd improve
This has been a fun project but I've had to call it a day at this stage, so here's a list of all the things I'd like to improve

### Functionality
- The main functionality missing is URL params so the user could share pages / bookmark them etc
- Map chart data doesn't work on Alarm and State, this is because the data is boolean, you can display boolean data in AG Charts but I didn't implement this in time
- When you open the data range you have to press the close button again to close the panel, this is kind of annoying - I would implement a event listener and if the user clicks anywhere that isn't the panel then we close the panel
- Language strings - it's annoying having text strings everywhere, I would rip them all out and add language strings, also I had some cool ideas for right to left languages and this project is built with that in mind so I could easily implement it
- Unit tests! It really pains me that I haven't implement unit tests due to time constraints - all of my work in my current position is writen alongside with unit tests
- More componentization - I've made the table in to a component but really I'd like to have a table row component, maybe a table header component and so on
- I wish I'd changed the time format to something more human readable
- Adding Y axis labelling for the charts for the units of measurement
- The date range component could be improved - like a date range selector component would work better than two calendar components but as the range of the data from the first to last date was over years the components I tried didn't work too well .. but with more research I bet there's something that would work
- Typescript - out of the box NextJS uses Typescript but I haven't really added any typing thought the app so it would be nice to go and refactor everything to be typed
- Map functionality has two sensor spots on one location - I'd like to implement something on the map so you can choose which you want to view .. or maybe sensor filtering on the maps pop up
- The 'No data' component for the table is just some text, I'd make this a full component
- I made a custom hook useToggle for showing / hiding content but I only really use this in a few places, I could expand it's functionality to for the table row show and hide and anywhere else we need that functionality
- Show date range buttons could benifit from a calendar icon
- No account or language select call to actions on mobile view
- I'd like to do more browser and device testing and optimise the design for popular set ups


### Styling
- I would like to refine the sensor select element - the styling could be improved, the drop down items are all very squashed together, styling select elements is annoying as you likely need to create a custom select element
- I would have liked to implemented the language select drop down menu and at a stretch actual language selection
- A Login holding page for the account icon would have also been nice
- I've done a little css modules which is great - but I ended up just dumping a load of the CSS in the globals.css due to time constraints
- Linting
- Naming conventions and naming stuff in general, some of the functions could be named better - naming stuff is hard! And a standard naming convention - again implementing some linting rules would help tidy this
- The branding is ok, colours and fonts, look and feel etc but I'd like to refine it further
- Some stuff is hard coded like font sizes are all set to pixels, I'd like to explore a better solution
- Chart component feels very v1 and could be refined - by default I'd likely show just the last months worth of data instead of the whole set, maybe some common search options like 'View last months data' or 'previous month' to jump the whole thing back one month .. something like that, it feels slightly cluttered atm - those time stamps at the bottom don't help!

### Other stuff missing
- Accessibility testing - although I've built the app with accessibility in mind I haven't done an audit
- Improved use of available HTML5 tags like `<nav> and <main>`