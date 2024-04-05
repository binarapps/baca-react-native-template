#!/usr/bin/env bash

# --- Define doppler variables ---
export DOPPLER_TOKEN_DEVELOPMENT=
export DOPPLER_TOKEN_STAGING=
export DOPPLER_TOKEN_PROD=
# --- End Definitions Section ---

# check if we are being sourced by another script or shell
[[ "${#BASH_SOURCE[@]}" -gt "1" ]] && { return 0; }

# --- Begin Code Execution Section ---
echo $DOPPLER_TOKEN_DEVELOPMENT
echo $DOPPLER_TOKEN_STAGING
echo $DOPPLER_TOKEN_PROD
