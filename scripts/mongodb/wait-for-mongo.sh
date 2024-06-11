#!/bin/bash

until /usr/bin/mongo --eval "print(\"waited for connection\")"
do
    sleep 1
done