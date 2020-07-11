#!/usr/bin/env sh

set -e

cd $(dirname $0)

GIT_BRANCH="$1"
if [ "x$1" = "x" ]; then
  GIT_BRANCH="tip"
fi

GIT_USER="GHA"
GIT_EMAIL="ci@gha"
GIT_SHA="`git rev-parse HEAD`"

if [ "x$GIT_ORIGIN" = "x" ]; then
  GIT_ORIGIN="`git config --get remote.origin.url`"
  GIT_USER="`git config user.name`"
  GIT_EMAIL="`git config user.email`"
fi

cp -r sphinx_btd_theme release
cd release

git init
git checkout --orphan "$GIT_BRANCH"
git add .

git config --local user.email "$GIT_EMAIL"
git config --local user.name "$GIT_USER"
git remote add origin "$GIT_ORIGIN"

git commit -a -m "$GIT_BRANCH $GIT_SHA"
git push origin +"$GIT_BRANCH"

cd ..
rm -rf release
