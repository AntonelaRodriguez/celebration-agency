

## Description

Back end made to manage orders for
customers with the following requirements:
You want to save customer data (email, password), from a service
- The client can login to a service
- The client can request an event indicating, address, date and
hour
- From a service to be able to list the event requests (indicating the
user and event request data) with pagination
- Write a script that backs up a database every night and
upload this file to a storage
- The file format must be: ${project_name}${database}-$
{format_date(YYYYMMDD.HHMMSS => 20201231.235900)}.${ext}
- Database connection variables must be passed by variables
environment
- In the storage there should only be a maximum of 15 backups, they should be eliminated
from the oldest every time I upload a new one

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
