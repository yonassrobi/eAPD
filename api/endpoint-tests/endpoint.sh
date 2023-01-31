#!/usr/bin/env sh

export API_URL=http://localhost:8081
unset DEV_DB_NAME

rm ./endpoint-tests/endpoint-data.json
echo "[]" > endpoint-data.json

./test-server-setup.sh

docker-compose -f ../docker-compose.endpoint-tests.yml -p api exec -e ENDPOINT_COVERAGE_CAPTURE=true api-for-testing yarn test-endpoints $@
EXIT_CODE=$? # this must stay right after the test run so that the EXIT_CODE is properly reported

docker cp api-container:/app/api/endpoint-data.json endpoint-data.json
docker-compose -f ../docker-compose.endpoint-tests.yml -p api down

mv endpoint-data.json ./endpoint-tests

node endpoint-tests/endpoint-coverage.js
exit $EXIT_CODE
