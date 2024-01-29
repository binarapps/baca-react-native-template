---
id: bootstrap
slug: /bootstrap/intro
title: Bootstrap - start development
sidebar_position: 1
tags:
  - Bootstrap
  - Getting started
  - Project structure
description: Bootstrap project structure, that is needed to start development your new project
---

# BOOTSTRAP - start development 🕐

Bootstrap project structure, that is needed to start development

### **What you need to do to start development?**

#### 1. Clone this repository

There are three types that you can clone the repo:

1. Init using this command (beaware that sometimes this template can't be updated on npm, in that case, clone this repository and reinitialize repozitory for yourself - check third type of setup)

```bash
npx create-expo-app --template=@binarapps/expo-ts-template name_of_your_app
```

2. Use this as template repo on GitHub
   ![Github Repository Template](../../static/img/github-repository-template.png)

3. Clone repository

   This usage is usefull when you want to keep git history, thanks to this you can sync incomming changes in this template

```bash
git clone git@github.com:binarapps/expo-ts-template.git
cd expo-ts-template
yarn
yarn start
```

- in that case you can also reinitialize repozitory if you don't want to keep history of commits

```bash
rm -r .git
git init
git commit -m "chore: initialize project"
```

#### 2. Login / register to expo

If you have expo account → go login with it

If you do not have expo account → register on your company email. In terminal type:

```bash
eas register
```

You will be redirected to expo registration page. If something is not right please make sure you have eas cli installed - `npm install -g eas-cli`

Login to expo account on your local machine.

1. login to expo cli from your project dir terminal. In terminal type:

```bash
eas login
```

2. put your username and password to your account register in step 3.

3. Check if you are correctly log in to your expo account. In terminal type:

```bash
eas whoami
```

#### 3. Create project on expo.dev

a. Sign in to the expo dev console (account created in the first step of repo configuration).

b. Select the proper organization you are working for from a dropdown:

![Select organization](../../static/img/expo_select.jpg)

Ideally, it will be an organization created by the client (especially for production builds), to easily pass access after the end of development.

c. Create a new Project in the organization.

I. From the sidebar menu click **All projects** button:

![All projects](../../static/img/expo_all.png)

II. On the page with the list of projects click **+New Project** button:

![New project](../../static/img/expo_new.png)

III. Apply **display name** and **slug** of your project.

Display name is a name that will be visible in the Expo Dev Console.

Slug is the name that will link your Expo application with your code.

![Project create](../../static/img/expo_create.png)

#### 4.Sync project with code.

Synchronize the newly created Expo Project to your app.

In app.json file please insert the following:

a. **slug name** - created in 1-st point.
b. **owner** - organization picked from the list in 1-st point

<!-- TODO: This should be better documented - we should update app.config.ts instead not app.json -->

```json
{
  "expo": {
    "owner": "your_organization_name",
    "slug": "example-app-name"
  }
}
```
