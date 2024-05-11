---
id: backend-connection
slug: /backend-connection
title: Backend connection
sidebar_position: 4
tags:
  - Backend
  - react-query
  - axios
  - react native
  - orval
description: Backend connection - check how to fetch data from backend and display it for users
---

# Backend connection

This template uses this packages to keep connection with backend:

- [axios](https://axios-http.com/docs/intro) - direct calls to backend
- [react-query](https://tanstack.com/query/latest/docs/framework/react/overview) - use hooks that helps displaying data on UI
- [orval](https://orval.dev/overview) - generating query hooks based on swagger (provided by backend)

## Generate new query

1. Get `swagger-spec.json` - example: https://gist.github.com/lenage/08964335de9064540c8c335fb849c5da
2. Replace it in `./scripts/data` folder
3. Run script `yarn generate:query`
4. See the magic happens ✨

## Description (in case of any changes)

1. How orval works

- When running script `yarn generate:query` underground there is a script `yarn orval --config ./orval.config.ts`
- As you can see the config file is `orval.config.ts`, there are a lot options that we can modify, but the most important for us are:
  - target - where typescript types should be placed
  - schemas - where query hooks and moks should be placed
  - override-header - additionally turning off `no-explicit-any` eslint rule
  - mutator - where is api instance placed
  - afterAllFilesWrite - what should happened when the script will run - we are running liter with fix flag
- Orval is very flexible and you can do a lot modifications, please check [their docs](https://orval.dev/overview) for reference

2. How to do changes to axios instance

- Orval allows to use custom axios instance, but it needs to be created in specific way
- To check how it's build please check `src/services/api/custom-instance.ts` file
