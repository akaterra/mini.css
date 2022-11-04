#!/bin/sh

sass mini.sass mini.css && minify mini.css > mini.min.css && gzip -9 -f -k mini.min.css
