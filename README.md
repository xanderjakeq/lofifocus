# lofifocus.io

Listen to lofi with some background noise, get work done.

## Features

### Data Ownership

User generated stored in
[Gaia](https://docs.stacks.co/build-apps/references/gaia). Gaia is a
"Decentralized storage architecture for off-chain data".



## Project Setup

Auth: [Stacks Auth](https://docs.stacks.co/build-apps/guides/authentication)
Audio storage/api: [Firebase Storage](https://firebase.google.com)
User Data: Gaia

### File Structure

- `functions/`: firebase cloud functions, `node express` app that handles audio
  tracks.
- `server/`: `node express` server that handles user data storage with gaia
- `src/`: source directory for the frontend `React App`
- `rust_server`: experimental rust server (irrelevant)


## Development

Make sure `node` is available. (Using `yarn` as the package manager)
Need a [Blockstack](https://blockstack.org/) account

Run `yarn` in the `root`, `functions/` and `server/` directories to install
dependencies.

Add `serviceAccount.json` within `functions/` which you can get in the firebase
[console](https://console.firebase.google.com/u/0/project/lofifocus-71c8f/settings/serviceaccounts/adminsdk)
for a project.
Add `.env` file within `server/` containing:

```
MONGO_DB_URL=mongodbURL
```

Get them running!

functions/
```
yarn serve
```

server/
```
node index.json
```

root/ (for the react app)
```
yarn start
```

Start making changes!
