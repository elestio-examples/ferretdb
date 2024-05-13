#save latest dump to disk
docker-compose exec -T db pg_dumpall -c -U postgres | gzip > ./lastDump.sql.gz