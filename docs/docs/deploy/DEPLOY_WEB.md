---
id: deploy-web
slug: /deploy/web
title: Deploy web
sidebar_position: 6
tags:
  - Deploy
  - react native web app
  - web app
  - Mobile development
  - React native
description: Build and deploy web app
---

# Build & deploy web app

Build and deploy the next version of web app. 🌈 / 🕐 /📱

## Build web app

```bash
npx expo export -p web
```

## Deploy

This starter comes with automatically vercel deplyoment so to deploy it you can just run this command:

```bash
vercel --prod
```

You can also follow [expo docs](https://docs.expo.dev/distribution/publishing-websites/) to check how differently you can deploy web app.

## Resolving issues

1. 404 on deployed app

There could be an issue like this: https://stackoverflow.com/questions/58065603/netlify-renders-404-on-page-refresh-using-react-and-react-router

This was resolved by adding `_redirects` file to public folder.

For some servers this could not work so you should do this additional setup:

- configure `htaccess` on the server like this:

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /subdirectory
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
</IfModule>
```
