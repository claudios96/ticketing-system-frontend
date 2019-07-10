FROM nginx

COPY ./ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY package*.json /

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y apt-utils
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y curl
RUN apt-get install -y nodejs
RUN npm install -y
RUN npm install -g -y grunt
RUN npm install -g -y bower
RUN apt-get install -y git
RUN bower install -y moment --save --allow-root
RUN bower install -y ng-tags-input --save --allow-root
RUN bower install -y angular-moment --save --allow-root
RUN bower install -y angular-highlightjs --save --allow-root

CMD grunt serve
EXPOSE 9000