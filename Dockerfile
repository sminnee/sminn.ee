FROM nginx:1.29.1-alpine
WORKDIR /usr/share/nginx/html
ADD _site/ .
ADD nginx.conf /etc/nginx/conf.d/default.conf
