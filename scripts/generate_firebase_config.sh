#!/bin/bash

# Program for signing to firebase app.

# Variables
# Global colors
normal=$'\e[0m'                           # (works better sometimes)
bold=$(tput bold)                         # make colors bold/bright
red="$bold$(tput setaf 1)"                # bright red text
green=$(tput setaf 2)                     # dim green text
fawn=$(tput setaf 3); beige="$fawn"       # dark yellow text
yellow="$bold$fawn"                       # bright yellow text
darkblue=$(tput setaf 4)                  # dim blue text
blue="$bold$darkblue"                     # bright blue text
purple=$(tput setaf 5); magenta="$purple" # magenta text
pink="$bold$purple"                       # bright magenta text
darkcyan=$(tput setaf 6)                  # dim cyan text
cyan="$bold$darkcyan"                     # bright cyan text
gray=$(tput setaf 7)                      # dim white text
darkgray="$bold"$(tput setaf 0)           # bold black = dark gray text
white="$bold$gray"

set -o allexport
[[ -f .env ]] && source .env
set +o allexport

# FILE NAMES
androidConfig=google-services.json
iosConfig=GoogleService-Info.plist

cat .env
echo "${normal}[START] Saving google services files"
base64 --help
echo $ANDROID_FIREBASE_CONFIG | base64 -d > $androidConfig
echo $IOS_FIREBASE_CONFIG | base64 -d > $iosConfig

echo "${green}[SUCCESS] Saving  google services json ${normal}"
