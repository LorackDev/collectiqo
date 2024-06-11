FROM mongo:latest

COPY scripts/mongodb/setDefaultTemplates.js /scripts/setDefaultTemplates.js
COPY scripts/mongodb/addSampleData.js /scripts/addSampleData.js
COPY scripts/mongodb/wait-for-mongo.sh /scripts/wait-for-mongo.sh

RUN chmod +x /scripts/wait-for-mongo.sh \
    && mongod --fork --logpath /var/log/mongodb.log \
    && /scripts/wait-for-mongo.sh \
    && /usr/bin/mongo < /scripts/setDefaultTemplates.js \
    && /usr/bin/mongo < /scripts/addSampleData.js \
    && mongod --shutdown

CMD ["mongod"]