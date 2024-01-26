---
id: deploy-android
slug: /deploy/android
title: Deploy android app
sidebar_position: 4
tags:
  - Deploy
  - Android app
  - Mobile development
  - React native
description: Deploy you react native android mobile app
---

# Build & deploy the Android app

1.Build first Android binary 🕐 / 📱

<ol type="a">
<li>
Select the proper build type <br>
You need to decide if you want to build an app that will be shared with Google Play Store or if it will be sent directly to final users.

If it will be deployed to the store you should build an <b>app-bundle</b> (.aab) file otherwise an <b>apk</b> (.apk) file. <br>
<br>

Configure buildType in eas.json as follows:

```
{
    "build": {
        "production": {
            "android": {
                "buildType": "app-bundle" // you can choose here between apk and app-bundle
                // ...rest of the properties
            }
        },
         "staging": {
            "android": {
                "buildType": "app-bundle" // you can choose here between apk and app-bundle
                // ...rest of the properties
            }
        },
         "qa": {
            "android": {
                "buildType": "apk" // you can choose here between apk and app-bundle
                // ...rest of the properties
            }
        }
    }
}
```

</li>
<li>
In the terminal run the build command (choose the proper environment (qa/staging/production)

```bash
yarn build:[qa/staging/production]:android
```

</li>
<li>
⚠️ You will be asked to generate a new Android Keystore. ⚠️

If your app already exists (perhaps the app has already been deployed to the store) and you have the Keystore file press <b>n</b> and follow the steps. <br>

If you do not have the Keystore file yet press <b>y</b>. <br>
<br>
CONGRATULATION !! 🥳🥳 You just started the first Android build of your app!

</li>
</ol>

2.Deploy the first version of the Android app for tests in Google Play Store. (internal testing) ?? / ?? <br>
The first submission to Google Play Store needs to be done manually.

<ol type="a">
<li>Log in to Play Developer Console.</li>
<li>
Choose your developer account (if you have more than one):

![Choose account](../static/android_account.png)

</li>
<li>
Create new app
<ol type="i">
<li>
Press Create App button on the right

![Create app button](../static/android_create_button.png)

</li>
<li>
Fill out the form for creating about new App.

![Fill the form](../static/android_create_form.png)

Fields description:

1)Add your app name. Depending on the type of your app, you are creating: <br>
<br>
a)your app name (qa) <br>
b)your app name (staging) <br>
c)your app name <br>
<br>
2)Choose your primary language (English, Polish, or some other).

3)Confirm Developer Programme Polices and US export laws <br>
<br>

</li>
<li>
Press Create app button in the right bottom corner (picture in the previous step). <br>
You should create a new app for each environment you need to use (e.g. qa, staging, production).
</li>
</ol>
</li>
<br>
<li>
Download your build file (<b>apk</b> or <b>app-bundle</b>) from the expo dev console.
<ol type="i">
<li>Log in to the expo dev console.</li>
<li>Choose your organization from the dropdown in the top left corner.</li>
<li>Choose your project from the left sidebar.</li>
<li>
Choose Builds tab from the left sidebar.

![Builds tab](../static/android_builds.png)

</li>
<li>
Pick a build you want to release for testing

![Pick a build](../static/android_pick_build.png)
<br>
<br>
Sometimes if you do not see the build which you want to download, you may need to refresh the page (there is some heavy caching on the Expo site).

</li>
<li>
Download the build binary file.

![Download build](../static/android_download.png)

If you downloaded an <b>apk</b> file, you can share this file directly with your end users (could be sent via slack, diawi, google drive, etc.).

If you downloaded an <b>app-bundle</b> file, it will be used in the next step.

</li>
</ol>
</li>
<li>
Prepare the internal test.
<ol type="i">
<li>
Go to the Internal testing tab from the menu on the left (ensure you are working on the proper app - the app name is visible in the right top corner)

![Internal testing tab](../static/androind_internal_testing.png)

</li>
<li>
Press Create new release button.

![Create new release](../static/android_new_release.png)

</li>
<li>
Upload the binary file (downloaded in the previous step <b>app-bundle</b> file - .aab) and fill out the release form.

![Upload binary](../static/android_upload_binary.png)

Fields description: <br>
1)Button to upload binary file (upload binary download in the previous step (7.d). <br>
2)Release name - will be automatically filled based on your build number and app version. You could change it to any other name. <br>
3)Release notes - notes visible for users in the Play Store talking about changes in the current version of the app.

</li>
<li>
Press Review release button

![Review release](../static/android_review_release.png)

</li>
<li>
Rollout new release

If your app does not have any issues (there will be shown no errors) it means that is ready to go public. <br>
<br>
Press Start roll-out internal testing button

![Start rollout](../static/android_start_rollout.png)

If you meet any errors, you need to resolve them before releasing an app for internal testing.

</li>
<li>
Confirm roll-out operation modal

Press the Rollout button.

![Confirm rollout](../static/android_confirm_rollout.png)

CONGRATULATION !! 🥳🥳 You just released the first version of the app for internal testing.

</li>
</ol>
</li>
<li>
Invite testers to test your app.
<ol type="i">
<li>Go to the internal testing tab (7.e.i)</li>
<li>
Enter Testers tab

![Testers tab](../static/android_testers_tab.png)

</li>
<li>
Add testers.

You can add testers in two different ways.

![Choose testers](../static/android_choose_testers.png)

1)Select an already define (if you have such) list of testers for example Binarapps <br>
2)Create a new list of testers. You will need to add names and testers' emails to the list. <br>
<br>
To apply any changes press Save changes button in the bottom right corner.

</li>
<li>
Send invitation link to testers.

1.Press Copy link button

![Copy link](../static/android_copy_link.png)

2.Send copied link to testers.

Testers should enter the link in web browser (ideally on a mobile device) when they are logged in to the email address provided on the testers list. Otherwise, the link could be opened in incognito mode - login is required to the proper Google Account.<br>
<br>
3.Testers should accept invitation by pressing Accept invite button.

![Accept invite](../static/android_accept_invite.png)

4.Testers are now able to download an app from Google Play Store - press the button download it on Google Play.

The link needs to be opened on an Android device, otherwise, the installation will not be possible.

![Download app](../static/android_install_app.png)

CONGRATULATION !! 🥳🥳 You just invited the first tester of the app for internal testing.

</li>
</ol>
</li>
</ol>
<br>
3.Build and deploy the next versions of the app to the Google Play Store. 🌈 / 🕐 / 📱 <br>
<br>
To run this step, ensure that you already have built and deployed the first version of the app (it means, that you need to go through steps 6 and 7 for qa / staging / production version of the app depending of your needs) <br>
<br>
Only the first submission of the Android app needs to be done manually. Every next submission could be automated 🥳. <br>
To make it possible, <b>Google Service Account</b> key file needs to be provided.

<ol type="a">
<li>
Generate <b>Google Service Account</b> key → follow the instruction.

To generate the above you will need to contact with account owner of your project.

</li>
<li>Put generated <b>Google Service Account</b> key in the root dir of your project.</li>
<li>
Add Google Service Account key to .gitignore file.

```
your_google_service_account_key.json
```

</li>
<li>
Configure eas.json to use the <b>Google Account Service</b> key, and to send a new app version for the internal testing path.

```
"submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "path_to_your_google_service_account_key",
        "track":"internal"
      }
    },
    "staging": {
      "android": {
        "serviceAccountKeyPath": "path_to_your_google_service_account_key",
        "track":"internal"
      }
    },
    "qa": {
      "android": {
        "serviceAccountKeyPath": "path_to_your_google_service_account_key",
        "track":"internal"
      }
    }
}
```

</li>
<li>
Build and deploy a new version of the app

In project dir terminal run:

```bash
yarn deploy:[qa/staging/production]:android
```

Choose the proper app version depending on the environment for which you want to create a build. <br>
<br>
CONGRATULATION !! 🥳🥳 You have just automated the build and deployment process for Android!

</li>
</ol>
