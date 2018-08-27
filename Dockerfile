FROM debian:stretch as builder

RUN apt-get update && apt-get install curl gnupg2 software-properties-common -y && \
	curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt-get install nodejs npm -y

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && apt-get install yarn binutils -y

COPY . /usr/src/eos-voter
WORKDIR /usr/src/eos-voter

RUN yarn install && yarn package-linux


FROM debian:stretch 

COPY --from=builder /usr/src/eos-voter /opt/eos-voter

RUN apt-get update && \
	apt-get -y install libgtk3.0 libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 -y && \
	ln -s /opt/eos-voter/release/linux-unpacked/eos-voter /usr/bin/eos-voter

ENTRYPOINT [ "/usr/bin/eos-voter" ]
