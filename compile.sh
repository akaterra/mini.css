#!/bin/sh

sass mini.sass mini.css && cleancss -O2 -o mini.min.css mini.css && gzip -9 -f -k mini.min.css
