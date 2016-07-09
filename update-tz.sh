#!/bin/sh

mkdir tz
cd tz
wget --retr-symlinks 'ftp://ftp.iana.org/tz/tzdata-latest.tar.gz' -O tzdata-latest.tar.gz
tar -zxvf tzdata-latest.tar.gz zone1970.tab

FILE="$PWD/../src/tz/timezones.json"

cat zone1970.tab | grep "^[^#;]" | cut -f3 | awk ' BEGIN { ORS = ""; print "["; } { print "\/\@"$0"\/\@"; } END { print "]"; }' | sed "s^\"^\\\\\"^g;s^\/\@\/\@^\",\"^g;s^\/\@^\"^g" > $FILE