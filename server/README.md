# TypeScript NodeJS Starter Project

Starter Project for TypeScript, NodeJS and Express.

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.
```
$ yarn
```

## Configuration
Create a `.env` file for application specific environment variables and update it according to your database & env specific params.
```bash
$ cp .env.example .env
```

## Migrations & Seeding
You'll need to run migrations to get your database ready.
```bash
# Run Migrations and seeds
$ yarn migrate
```

## Local Development
Run the server locally using nodemon on typescript watch mode.
```bash
$ yarn start # or npm start
```

## Production
First, build the application.

```bash
$ yarn build # or npm run build
```

Then, use [`pm2`](https://github.com/Unitech/pm2) to start the application as a service.

```bash
$ yarn service:start # or npm run service:start
```
## Testing
Running all tests.
```bash
# Running all tests.
$ yarn test

# Running all tests in watch mode.
$ yarn test:watch
```

Running all API tests (Acceptance Tests).
```bash
$ yarn test:api
```

Running all Unit Tests.
```bash
$ yarn test:unit
```

## License
Licensed under [MIT](LICENSE) License.
