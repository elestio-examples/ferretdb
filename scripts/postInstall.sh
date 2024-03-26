#set env vars
set -o allexport; source .env; set +o allexport;

#wait until the server is ready
echo "Waiting for software to be ready ..."
sleep 60s;

sed -i "s~PASSWORD_TO_CHANGE~${ADMIN_PASSWORD}~g" ./example/crud.js
sed -i "s~DOMAIN_TO_CHANGE~${DOMAIN}~g" ./example/crud.js