FROM mysql:latest
ENV MYSQL_DATABASE collectiqoDB
COPY src/scripts/mysql /docker-entrypoint-initdb.d/