FROM mysql:9.1
ENV MYSQL_DATABASE collectiqoDB
COPY scripts/mysql /docker-entrypoint-initdb.d/