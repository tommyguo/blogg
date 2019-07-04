# Blogg

Blogg is a simple open-source blogging platform designed for developers. You get to own the code, hosting, and domain name while skipping the hassle of config, boilerplate, and setup. Download the code and get a blog running from your own personal domain in less than an hour!

Blogg provides just the basic blogging functionalities. Because you own the code, you can (and are encouraged to) modify and add new features to your blog. I think that Blogg can be helpful whether you want a simple website to jot down your thoughts or a professional blog that's filled with features.

# Technologies
Blogg is written in JavaScript on the front-end and back-end. It's a single page application that uses React on the front-end (and Webpack + Babel to prepare the React files). Front-end routing is handled with React Router while back-end routing for features such as HTTPS and API calls to the database are handled with Express. I use Sequelize as my ORM and PostgreSQL as my database. Blog posts are written in Markdown and converted to HTML to be served later using Remarkable. Authentication is done using Google Sign-In.

# Code Breakdown
On the top level of the directory, we have some config files such as `.babelrc` and `.eslintrc.js`. The `src` folder contains our code.

## src
* `config`: config files (mostly Webpack) tell us how to bundle our code. Our bundled code ends up in `blogg/dist` after we run the build script.
* `css`: css for our front-end!
* `db`: contains our ORM code and DB models. We have two models, `Post` and `Image`, and `index.js` sets up and exports our models.
* `files`: files in this folder end up in `blogg/dist` where they are served by accessing `/file_name` in the browser via express's static middleware.
* `html`: because we're running a SPA, there's only one HTML file, which our React code attaches to.
* `images`: like files, these images end up in `blogg/dist` and can be accessed by `/image_name`.
* `react`: this has all of our front-end React code. `components` contains reusable components across web pages. `pages` contains specific pages, which are built from components. `AppRouter.js` handles front-end routing with React Router and `index.js` renders everything.
* `server`: Our back-end server code. `apiServer.js` handles API calls to interact with our DB. `devServer.js` handles our main server in dev mode. The main difference between dev mode and prod mode is that Hot Module Reloading works in dev mode while HTTPS is only enabled in prod mode.

# Get Started

### Download the code

    git clone ``

### Install dependencies

    npm install

### Set up your virtual machine

I hosted my blog on a virtual machine (VM) on GCP.

### Set up your database

Blogg stores posts in a DB so that you don't have to manually edit code everytime you want to publish a post. I recommend using a DB that Sequelize supports such as MySQL, PostgreSQL, etc. If not, feel free to replace the code in `blogg/db`. For best results, you'll want to set up a DB in the cloud (GCP, AWS, Azure, etc.). I used PostgreSQL with Google Cloud Platform (GCP) and will walk through how I did that.

### Set up your .env file


### Create a Development build

    npm run buildDev

### Create a Production build

    npm run buildProd

### Start the servers

    npm start

Then navigate to `http://localhost:8080`

### Deploy to Google Cloud Platform

  TBD

# Feature Ideas