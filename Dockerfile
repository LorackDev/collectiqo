FROM mysql:latest
ENV MYSQL_DATABASE collectiqoDB
COPY ./scripts/ /docker-entrypoint-initdb.d/