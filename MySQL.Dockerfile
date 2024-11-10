FROM mysql:8.0
ENV MYSQL_DATABASE collectiqoDB
COPY scripts/mysql /docker-entrypoint-initdb.d/