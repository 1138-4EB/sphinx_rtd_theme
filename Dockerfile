# $(command -v winpty) docker run --rm --user=$(id -u) -itv /$(pwd)://tmp/src -w //tmp/src IMAGE bash
# export HOME=/tmp
# yarn
# grunt build

FROM ubuntu:bionic

RUN apt-get update \
 && apt-get install -y curl git gnupg2 \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update \
 && apt-get install -y yarn gcc make ruby ruby-dev python3-pip \
 && yarn global add bower grunt-cli \
 && gem install sass
