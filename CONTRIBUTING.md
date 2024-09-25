# Contributing to BACA

## Documentation

We include a `README.md` and `LICENSE` in the root of the folder. You should read all of them. The license is a standard MIT permissive license.

## For contributors

We are using doppler to set environment variables, and because of that there could be two types of contributors:

1. External - doesn't work in binarapps
2. Internal - work in binarapps

### Contributing as external contributor

1. Create `.env` file in root folder
2. Fill `.env` file like that:

   ```.env
   API_URL=https://api.baca.binar.app
   ENVIRONMENT_NAME=qa
   ```

3. Install dependencies:

   ```sh
   yarn
   ```

4. Start development server

   ```sh
   yarn start
   ```

### Contributing as internal contributor

1. Setup doppler variables

- checkout this docs

2. Generate `.env` file

   ```sh
   yarn generate:env:qa
   ```

3. Install dependencies:

   ```sh
   yarn
   ```

4. Start development server

   ```sh
   yarn start
   ```
