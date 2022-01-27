# TMDB Mobile Application Server

The Movie Database (TMDB) is a popular, user editable database for movies and TV shows. This is the repo for server application for retrieve the data to mobile application by consume the TMDB APIs.

### Please follow the instructions to configure the project.

## Getting Started

#### Requirements

- Node JS - [Install NodeJS](https://nodejs.org/en/).
- Yarn - [Install yarn](https://yarnpkg.com/en/docs/install)

#### Cloan the project and Run

```
git clone https://github.com/dilipchandima/MovieApp-Server.git
```

- From inside the project

Run following command for install the dependencies

```
yarn
```

Change Database connection

```
Please update the following file src -> database -> connection.ts
```

Run following command for start the server

```
yarn dev
```

This command will start the server and the scheduler for update the database
