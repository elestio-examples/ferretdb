#set env vars
set -o allexport; source .env; set +o allexport;

#wait until the server is ready
echo "Waiting for software to be ready ..."
sleep 60s;


docker run --rm -it --network=ferretdb --entrypoint=mongosh mongo \
  "mongodb://${POSTGRES_USER}:${POSTGRES_PASSWORD}@ferretdb/ferretdb?authMechanism=PLAIN"