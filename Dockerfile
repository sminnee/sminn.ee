FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html
ADD _site/ .
ADD nginx.conf /etc/nginx/conf.d/default.conf
