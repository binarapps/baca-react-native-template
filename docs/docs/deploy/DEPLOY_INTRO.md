---
id: deploy-intro
slug: /deploy/intro
title: App deployment
sidebar_position: 1
tags:
  - Deploy
  - Android app
  - Mobile development
  - React native
description: Intro to app deployment
---

# App deployment with EAS 🕐 / 📱

### Legend

- Required to start development - 🚀
- Required to start testing - 🕐
- Required to deploy an app - 📱
- Nice to have - 🌈

> **Note!** If you encounter any troubles with building and publishing an app please add a comment and address it to **Michał Baumruck** or **Mateusz Rostkowski**

### When and how to: build, submit, and update an app

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Type of testing</th>
        <th>Requirements</th>
        <th>When to USE</th>
    </tr>
    <tr>
        <td rowspan="2">Update</td>
        <td rowspan="2">
            <ul>
                <li>Replace javascript/typescript code in mobile app (expo go or native app)</li>
                <li>Use eas update</li>
            </ul>
        </td>
        <td>Expo go</td>
        <td>
            <ul>
                <li>Expo project configuration 🕐</li>
                <li>Testing in Expo Go 🕐</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>When you want to perform fast tests,</li>
                <li>you can add native libraries, but the need to be supported by expo go (check expo docs if library is supported by expo go, for example: https://docs.expo.dev/versions/latest/sdk/accelerometer/)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Native app</td>
        <td>
            <ul>
                <li>App configuration 🕐</li>
                <li>Update</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>When you have only typescript changes</li>
                <li>When you want to update native app</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Build</td>
        <td>
            <ul>
                <li>Process of building native app</li>
                <li>Use eas build </li>
            </ul>
        </td>
        <td>Native app</td>
        <td rowspan="2">
            <ul>
                <li>App configuration 🕐</li>
                <li>
                    Before first build go through this:
                    <ul>
                        <li>iOS - Build & deploy the iOS app 🕐 / 📱 </li>
                        <li>android - Build & deploy Android app 🕐 / 📱</li>
                    </ul>
                </li>
            </ul>
        </td>
        <td>
            <ul>
                <li>When you want to build native app</li>
                <li>
                    When you have native changes, for example: 
                    <ul>
                        <li>adding native library</li>
                        <li>changing app icons / app names</li>
                        <li>adding expo plugin - https://docs.expo.dev/config-plugins/plugins-and-mods/</li>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Submit</td>
        <td>
            <ul>
                <li>Process of submitting app to the stores (app store and play store)</li>
                <li>Use eas submit </li>
            </ul>
        </td>
        <td>Native app</td>
        <td>
            <ul>
                <li>When you want to submit app for testers or production users</li>
                <li>When you have created build and you want to submit it (in most cases it will go automatically build + submit)</li>
            </ul>
        </td>
    </tr>
</table>

### Types of testing

<table>
    <tr>
        <th>Platform</th>
        <th>Pros</th>
        <th>Cons</th>
    </tr>
    <tr>
        <td>Expo go</td>
        <td>
            <ul>
                <li>Fast</li>
                <li>Easy</li>
                <li>Automated way to distribute app</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Can't test native modules that are not supported by expo go like: firebase analytics,  onesignal</li>
                <li>It's little different than native app, will need additional tests after testing in expo go</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Native app</td>
        <td>
            <ul>
                <li>Testing all native modules</li>
                <li>Supports expo plugins</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Complicated build process (only for first time)</li>
                <li>Complicated distribution and installation on devices (only for first time)</li>
            </ul>
        </td>
    </tr>
</table>
