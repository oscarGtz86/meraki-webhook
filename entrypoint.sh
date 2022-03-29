#!/bin/bash
################################################################
# Written by: Oscar Escamilla                                  #
# Purpose: Server entrypoint                                   #
# Date: 29.03.2022                                             #
################################################################

#set -e

if [[ "$1" = 'run' ]]; then
    npm start
else
    logger "Params: $@"
    exec "$@"
fi