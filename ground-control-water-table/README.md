This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Things I'd improve
This has been a fun project but I've had to call it a day at this stage, so here's a list of all the things I'd like to improve

### Functionality
- The main functionality missing is URL params so the user could share pages / bookmark them etc
- Map chart data doesn't work on Alarm and State, this is because the data is boolean, you can display boolean data in AG Charts but I didn't implement this in time
- When you open the data range you have to press the close button again to close the panel, this is kind of annoying - I would implement a event listener and if the user clicks anywhere that isn't the panel then we close the panel
- Language strings - it's annoying having text strings everywhere, I would rip them all out and add language strings, also I had some cool ideas for right to left languages and this project is built with that in mind so I could easily implement it
- Unit tests!
- More componentization - I've made the table in to a component but really I'd like to have a table row component, maybe a table header component and so on
- I wish I'd changed the time format to something more human readable
- Adding Y axis labelling for the charts for the units of measurement
- The date range component could be improved - like a date range selector component would work better than two calendar components but as the range of the data from the first to last date was over years the components I tried didn't work too well .. but with more research I bet there's something that would work
- Typescript - out of the box NextJS uses Typescript but I haven't really added any typing thought the app so it would be nice to go and refactor everything to be typed
- Map functionality has two sensor spots on one location - I'd like to implement something on the map so you can choose which you want to view .. or maybe sensor filtering on the maps pop up
- The 'No data' component for the table is just some text, I'd make this a full component
- No loading state - need to add a spinner.. I think and hope the app is just about fast enough that I get away without one!
- I made a custom hook useToggle for showing / hiding content but I only really use this to show the date component, I could expand it's functionality to for the table row show and hide and anywhere else we need that functionality
- Show date range buttons could benifit from a calendar icon
- No account or language select on mobile view


### Styling
- I would like to refine the sensor select element - the styling could be improved, the drop down items are all very squashed together, styling select elements is annoying as you likely need to create a custom version
- I would have liked to implemented the language select drop down menu and at a stretch actual language selection
- A Login holding page for the account icon would have also been nice
- I've done a little css modules which is great - but I ended up just dumping a load of the CSS in the globals.css due to time constraints
- Linting
- Naming conventions and naming stuff in general, some of the functions could be named better - naming stuff is hard! And a standard naming convention - again implementing some linting rules would help tidy this
- The branding is ok, colours and fonts, look and feel etc but I'd like to refine it further
- Chart component feels very v1 and could be refined - by default I'd likely show just the last months worth of data instead of the whole set, maybe some common search options like 'View last months data' or 'previous month' to jump the whole thing back one month .. something like that, it feels slightly cluttered atm - those time stamps at the bottom don't help!

### Other stuff missing
- Accessibility testing - although I've built the app with accessibility in mind I haven't done an audit
- Improved use of available HTML5 tags like <nav> and <main>



### I'll call it a day on this project when

- mobile styling is done
- We have at least one unit test
- Loading spinner
- remove logging