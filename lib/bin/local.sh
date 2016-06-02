#!/bin/sh
echo 'working...'
xvfb :1337 -ac -screen 0 1280x1024x24 +render -noreset & export DISPLAY=:1337 & $1 $2 $3 2> node_modules/mean-seo/lib/bin/xvfb.log 

# errormessage=$( xvfb :1337 & export DISPLAY=:1337 & $1 $2 2> &1)
# echo $errormessage


#echo 'finished'
exit 0
