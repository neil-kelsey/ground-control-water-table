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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




Things missing

Functionality
- The main functionality missing is URL params so the user could share pages / bookmark them etc
- Map data doesn't work on Alarm and State, this is because the data is boolean, you can display boolean data in AG Charts but I didn't implement this in time
- When you open the data range you have to press the close button again to close the panel, this is kind of annoying - I would implement a event listener and if the user clicks anywhere that isn't the panel then we close the panel
- Language strings - it's annoying having strings everywhere, I would rip them all out and add language strings, also I had some cool ideas for right to left languages and this project is built with that in mind so I could easily implement it
- Unit tests!
- More componentization - I've made the table in to a component but really I'd like to have a table row component, maybe a table header component and so on
- I wish I'd changed the time format to something more human readable
- Adding Y axis labelling for the charts for the units of measurement
- The date range component could be improved - like a date range selector component would work better than two calendar components but as the range of the data from the first to last date was over years the components I tried didn't work too well .. but with more research I bet there's something that would work
- Typescript - out of the box NextJS uses Typescript but I haven't really added any typing thought the app so it would be nice to go and refactor everything to be typed
- Map functionality has two sensor spots on one location - I'd like to implement something on the map so you can choose which you want to view .. or maybe sensor filtering on the maps pop up



Styling
- I would like to refine the sensor select element - the styling could be improved, the drop down items are all very squashed together
- I would have liked to implemented the language select drop down menu and at a stretch actual language selection
- A Login holding page for the account icon would have also been nice
- I've done a little css modules which is great - but I ended up just dumping a load of the CSS in the globals.css due to time constraints
- Linting
- The 'No data' component for the table is just some text, I'd make this a full component
- No loading state - need to add a spinner.. I think and hope the app is just about fast enough that I get away without one!
- I made a custom hook useToggle for showing / hiding content but I only really use this to show the date component, I could expand it's functionality to for the table row show and hide and anywhere else we need that functionality







404
mobile
one unit test
