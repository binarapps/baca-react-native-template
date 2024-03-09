#!/usr/bin/env bash 
source ./scripts/doppler_variables.sh

# Global colors
normal=$'\e[0m'                           # (works better sometimes)
bold=$(tput bold)                         # make colors bold/bright
red="$bold$(tput setaf 1)"                # bright red text
green=$(tput setaf 2)                     # dim green text
fawn=$(tput setaf 3); beige="$fawn"       # dark yellow text
darkblue=$(tput setaf 4)                  # dim blue text
blue="$bold$darkblue"                     # bright blue text
purple=$(tput setaf 5); magenta="$purple" # magenta text
pink="$bold$purple"                       # bright magenta text
darkcyan=$(tput setaf 6)                  # dim cyan text
gray=$(tput setaf 7)                      # dim white text
darkgray="$bold"$(tput setaf 0)           # bold black = dark gray text


# Global variables
ENVIRONMENT_NAME=$1
function install_doppler {
  (curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh || wget -t 3 -qO- https://cli.doppler.com/install.sh) | sh || echo "${pink}There was some problem with installing doppler, and it's needed to get environment varialbes, please download it manually - https://docs.doppler.com/docs/cli"
  # When using this on windows try this commands
  # scoop bucket add doppler https://github.com/DopplerHQ/scoop-doppler.git
  # scoop install doppler
}

if command -v doppler >/dev/null 2>&1 ;
then echo "${green}[START WORK] Setting Doppler token for Baca App | ${red}$ENVIRONMENT_NAME ${normal}"
  echo Now setting token and printing env for env: $ENVIRONMENT_NAME
  if [ $ENVIRONMENT_NAME = "qa" ]; then
    doppler setup --config=qa --token=$DOPPLER_TOKEN_DEVELOPMENT --no-interactive
    doppler secrets download --config=qa --token=$DOPPLER_TOKEN_DEVELOPMENT --no-file --format=env-no-quotes > .env
    doppler secrets download --config=qa --token=$DOPPLER_TOKEN_DEVELOPMENT --no-file > env.json
  fi
  if [ $ENVIRONMENT_NAME = "staging" ]; then
    doppler setup --config=stg --token=$DOPPLER_TOKEN_STAGING --no-interactive
    doppler secrets download --config=stg --token=$DOPPLER_TOKEN_STAGING --no-file --format=env-no-quotes > .env
    doppler secrets download --config=stg --token=$DOPPLER_TOKEN_STAGING --no-file  > env.json
  fi
  if [ $ENVIRONMENT_NAME = "production" ]; then
    doppler setup --config=prd --token=$DOPPLER_TOKEN_PROD --no-interactive
    doppler secrets download --config=prd --token=$DOPPLER_TOKEN_PROD --no-file --format=env-no-quotes > .env
    doppler secrets download --config=prd --token=$DOPPLER_TOKEN_PROD --no-file > env.json
  fi
  echo Created envs for env: $ENVIRONMENT_NAME
else
  read -p "${green}We require Doppler CLI, but it's not installed. Do you wish to install it? (y/n)${normal} " answer
  case ${answer:0:1} in
      y|Y )
          install_doppler
          ./scripts/generate_dotenv.sh $ENVIRONMENT_NAME
      ;;
      * )
          echo "We need doppler to set environement variables, you can download it manually - https://docs.doppler.com/docs/cli"
      ;;
  esac
fi