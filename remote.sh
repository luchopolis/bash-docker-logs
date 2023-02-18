#!/bin/bash

dockerOpt=''

executeDockerLogs() { 
  responseLogContainer=$(docker container ls --format='{{json .}}' | jq -s);
  echo "$responseLogContainer";
}

showContainerRunning() {
  case "$dockerOpt" in
    ("logs") executeDockerLogs;;
  esac
}


while getopts d: flag
do
  case "${flag}" in
    d) 
      dockerOpt=${OPTARG} 
      showContainerRunning ;;
  esac
done