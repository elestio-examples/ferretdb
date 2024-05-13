#Restart the stack after files are restored
docker-compose up -d;
sleep 5s;

#restore from last dump
gunzip < ./lastDump.sql.gz | docker-compose exec -T db psql -U postgres

docker-compose exec -T db psql -U db -c "ALTER ROLE postgres WITH PASSWORD '$POSTGRES_PASSWORD';"