FROM mysql:latest
ENV MYSQL_DATABASE collectiqoDB
COPY scripts/mysql /docker-entrypoint-initdb.d/