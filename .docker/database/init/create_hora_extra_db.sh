#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE hora_extra;
    GRANT ALL PRIVILEGES ON DATABASE hora_extra TO docker;
    CREATE DATABASE hora_extra;
    GRANT ALL PRIVILEGES ON DATABASE hora_extra TO docker;
EOSQL