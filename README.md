# Bundl

A web app that cuts food delivery costs by letting people in the same location
pool their orders. Browse restaurants, see what others nearby are ordering, chat
to coordinate, and split one delivery fee instead of paying several.

Built for [NUS Orbital](https://orbital.comp.nus.edu.sg/) (CP2106), summer 2024.
A longer write-up is at [ishan-agarwal.com/work/bundl](https://ishan-agarwal.com/work/bundl).

## Attribution

Built by [@ritulkrsingh](https://github.com/ritulkrsingh) and
[@ishan-agarwal-05](https://github.com/ishan-agarwal-05). We worked side by side
on one laptop, so the original commits are all under Ritul's account.

## Features

- Browse restaurants and add orders from several of them to one cart
- See other users' open orders, grouped by restaurant
- Real-time chat (Socket.IO) to agree on a shared order

## Stack

React with Material-UI on the front end, Node.js and Express behind it,
Socket.IO for chat, MongoDB for storage, Vite for the build.

## Running it

```bash
npm install
cp .env.example .env    # then fill in your own values
node addSampleData.js   # seeds sample restaurants
npm run dev             # front end
node server.js          # API
```

You'll need a MongoDB connection string of your own. The original deployment was
on Heroku's free tier and is long since dead.

## What we'd have built next

Automatic matching by location and order time, Google OAuth, live GrabFood
data, encrypted chat, bill splitting, and a proper mobile layout. It was a
summer project and it stopped when the summer did.

## Honest scope

Student project. Coordination happens by hand in chat, authentication is basic,
and there are no tests. One known issue worth fixing before anyone runs
this for real: the JWT issued at login is never verified on later requests, so
routes like `/api/cart/:userId` trust whatever user id the client sends.

The repo also used to have `.env` files with live credentials committed. Those
were removed from the entire history in September 2026.
