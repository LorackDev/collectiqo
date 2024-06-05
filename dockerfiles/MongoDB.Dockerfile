FROM mongo:latest

RUN mkdir -p /data/db2 \
    && echo "dbpath = /data/db2" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /data/db2

COPY scripts/mongodb/addSampleData.js /data/db2/scripts/
COPY scripts/mongodb/setDefaultTemplates.js /data/db2/scripts/

RUN apt-get update && apt-get install -y wget \
    && wget -O /usr/local/bin/mongo https://downloads.mongodb.org/tools/db/mongodb-database-tools-100.6.1 \
    && chmod +x /usr/local/bin/mongo

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db2 --smallfiles \
    && mongo --host 127.0.0.1:27017 /data/db2/scripts/addSampleData.js \
    && mongo --host 127.0.0.1:27017 /data/db2/scripts/setDefaultTemplates.js \
    && mongod --dbpath /data/db2 --shutdown \
    && chown -R mongodb /data/db2

VOLUME /data/db2

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles"]