# Complete MERN Boilerplate With React Redux.     
Getting Start With Create-React-App Redux React-Redux React-Router-Dom Node Express MongoDB All Together
This is a complete template for React developers.

Setup Node React Environment is not easy and takes so much time. Especially when Redux adds, setting Action Reducer Redux-Thunk is a hard task. Also, a little mistake can waste lots of time. That’s why I build it, to help other React Developers.  

## Installation

At first, select a suitable position in your Hard-Disk to download this. You should use a Terminal or PowerShell or any command-line prompt. Then write this to your command prompt.

Download This Boilerplate 
### `git clone https://github.com/rupam71/R.git`
Now it saves in a Directory called R. Now go there 
### `cd R`
Now you have to install all npm module 
### `npm install`
After finish this, you have to go Client Directory. All kinds of front-end code we write here 
### `cd client`
Again you have to install all npm module which requires for the front-end
### `npm install`


## Available Scripts

To start the Backend development server, From the project directory, you can run:
### `npm run dev`

Runs the Backend server in 
[http://localhost:5000](http://localhost:5000) Open to view it in the browser.

There are also other scripts available, for Heroku. You can simply see this in the `package.json` file

Now to run the Front-End Development server, at first, you have to go `/client` directory

```bash
cd client 
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.




## Available NPM Modules

### Front-End

In `client/public/index.js` Bootstrap Semantic Ui and Font Awsome CDN already there. You can modify this as your wish.
 
In `client/src/app.js` I already put `React Router`.

In `client/src/action/index.js`, there will be your all `Redux Action`. I put 3 sample Actions there. 

In the `client/src/reducer` directory, you will write your reducer code. 

In the `client/src/component` directory, you will write your class and functional component.

In `client/src/component/Home` and `client/src/component/Navbar`, I write 2 demo class component with with `Redux` and `React-Redux` . You will easily understand when you see it. 

And Lastly, the `client/src/setUpProxy` file will connect your development Front-End Server with the development Back-End Server.

### Back-End

In `config/dev.env` file, we will write all our secret key. Like bycrypt or hash key. Example,

config/dev.env
### `secretKey=123456`
We will use this key, in other file as 
### `hashCode(process.env.secretKey)`

### BEWARE
In the `.gitignore` file you must add the config folder. just add this to second-line `/config`

Or all your secret keys will publish.

# Remove Existing Git Folder
It will be better to delete the existing git folder and install it again. Use
```bash
rm .git
rmdir .git
git init
```

You are fine now.

Happy Coding...


# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# Thank you for using and reading this.


