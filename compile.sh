#!/bin/sh

sass mini.sass mini.css && minify --output mini.min.css mini.css && gzip -9 -f -k mini.min.css
