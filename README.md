# Fictional MVP
![TravisCI](https://travis-ci.org/betacar/cbc_music.svg?branch=master)

This fictional client has asked for a recommendation system for his social music player system.
He wants you to essentially take note of what music the user has listened to, which people they follow and from there recommend some songs. There is no like or dislike so far.

In this system there are few "elements";

- **music**: have an ID and a list of tags.
- **users**: have an ID, follow N other users, have heard Y musics in the past.

### There are 5 endpoints

##### `POST /users`
Adds a user to the database.

The request body has one parameter:
- id: String.

##### `GET /users`
Returns the list of all users. It does not need any parameter in the request body.

##### `POST /follow`
Add one user follow relationship.

The request body have 2 params:
- from: String (\<user ID\>).
- to: String (\<user ID\>).

##### `POST /music`
Adds a music track to the database.

The request body have 2 params:
- id: String.
- generes: String.

##### `POST /listen`
Add one song as the user has just listened.

The request body have 2 params:
- user: String (\<user ID\>).
- music: String (\<music ID\>).

##### `GET /recommendations/:userId`
Return 5 music recommendations to this user, they should be sorted by relevance.

Has one URL parameter:
- user: String (\<user ID\>).

Response looks like:
```json
{
  list: ["<music ID>", "<music ID>", "<music ID>", "<music ID>", "<music ID>"]
}
```
---
## Usage

There are to ways to use the app. Runing `make run` or executing directly the binary `./bin/api`.

This will boot the application in `http://localhost:4000`.

### Structure
Resources and associated models and libraries are defined in ./app

###  Tests
- Run all tests: `make test`
- Run resource tests: `make test-resource`
- Run model and library unit tests: `make test-model`

### Loaders
- Load all stub data (users, follows and listen): `make load`
- Load users stub data: `make load-users`
- Load follows stub data: `make load-follows`
- Load listen stub data: `make load-listen`

## License
MIT.
