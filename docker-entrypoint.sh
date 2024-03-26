#!/bin/bash

# Run migrations
npm run migration:create --name=init
npm run migration:generate --name=post
npm run migration:run

npm run migration2:create --name=init
npm run migration2:generate --name=post_query
npm run migration2:run
# Start the application
exec npm run start:dev