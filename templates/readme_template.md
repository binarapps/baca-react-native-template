# @_OWNER_/_NAME_

This is a template to be used with expo. It includes all the necessary stuff to start working with expo framework. It has the most popular packages included so it's easier to start coding the app itself without all the necessary boilerplate setup. It has:

Version in the `package.json` is one to one the latest expo on which the template was tested.

## Scripts

#### 1. Bootstrap - At start you should trigger script

```
yarn b
```

The script gives you opportunity to setup the essentialest variables for your project like app name, bundle ID or android package name

#### 2. Generators

```
yarn g
```

Usage:

- You can use this script to generate new common screen, tabs screen or new bottom tab, from screen template. You have possiblity to change screen template for your own.
- You can use this script for generate new common component (atom, molecule, organism, common) from component template. You have possiblity to change component template for your own.

## Run Locally

1. Clone the project

```bash
  git clone git@github.com:binarapps/_NAME_.git
```

2. Go to the project directory

```bash
  cd _NAME_
```

3. Install dependencies

```bash
  yarn
```

4. Setup environment variables (right now not needed because we are using only mocked values)

- We are using doppler in our project, and almost everything is happening automatically
- While doing the setup for the first time you need to follow this [instructions](./scripts/README.md) - "1. `generate_dotenv.sh`"

5. Start the expo server

```bash
  yarn start
```

## Icons

This template uses [Remix icon set](https://remixicon.com/)

It is added to the app as a font generated by [icomoon app](https://icomoon.io/app/#/select).

- [adding new icon docs](https://baca-docs.vercel.app/docs/icons)

<!-- TODO: Improve this step -->

## Sync up with template:

<details>

<summary>With git history</summary>

This tutorial is needed when you clone baca-react-native-template and you keep git repository

1. Add template remote

```bash
git remote add template git@github.com:binarapps/baca-react-native-template.git
```

2. Go to new branch (for safety reason)

```bash
git checkout -b "sync_with_template/1"
```

3. Fetch template remote

```bash
git fetch template
```

4. Merge with template

```bash
git merge template/main --no-commit
```

5. Review changes

- There can be some issues with files that you were also working, make sure merge doesnt remove your logic

6. Adjust and commit changes

```bash
git commit -m "chore: sync up with template code"
```

</details>

<details>

<summary>No git history</summary>

This tutorial is needed when you don't have git history from baca-react-native-template

1. Add template remote

```bash
git remote add template git@github.com:binarapps/baca-react-native-template.git
```

2. Go to new branch (for safety reason)

```bash
git checkout -b "sync_with_template/1"
```

3. Fetch template remote

```bash
git fetch template
```

4. Merge with template

```bash
git merge -X theirs template/main --allow-unrelated-histories --no-commit
```

5. Review changes

- There can be some issues with files that you were also working, make sure merge doesnt remove your logic

6. Adjust and commit changes

```bash
git commit -m "chore: sync up with template code"
```

</details>

<!--
TODO: ISSUE-33 (https://github.com/binarapps/baca-react-native-template/issues/33)
Replace this section witha a new UI lib instructions when this issue will be done.

## Working with designer in your project

-->

## Deploy

### First time

When doing deploy for the first time please use this documentation prepared us

- https://baca-docs.vercel.app/docs/deploy/intro

### Next time

When you will properly setup deployment for your project you should be able to just run one of this commands:

1. QA

   ```bash
   # DEPLOY
   yarn deploy:qa:ios
   yarn build:qa:android

   # UPDATE
   yarn update:qa
   ```

2. Staging

   ```bash
   # DEPLOY
   yarn deploy:staging:ios
   yarn build:staging:android

   # UPDATE
   yarn update:staging
   ```

3. Production

   ```bash
   # DEPLOY
   yarn deploy:production:ios
   yarn build:production:android

   # UPDATE
   yarn update:production
   ```
