set -o allexport; source .env; set +o allexport;
#Restart the stack after files are restored
docker-compose up -d;
sleep 20s;

#restore from last dump
gunzip < ./lastDump.sql.gz | docker-compose exec -T db psql -U postgres

docker-compose exec -T db psql -U postgres -c "ALTER ROLE postgres WITH PASSWORD '$POSTGRES_PASSWORD';"

docker-compose down;
docker-compose up -d;

