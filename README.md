# Projet TCHATHER


## Database

### User

| FieldName        | Type                |
| ---------------- | ------------------- |
| userId           | String(uuid)        |
| userName         | String              |
| userEmail        | String              |
| userPassword     | String              |
| userConversation | Array<Conversation> |

### Message

| FieldName           | Type                |
| ------------------- | ------------------- |
| messageId           | String(uuid)        |
| messageText         | String              |
| messageAttachements | Array<attachements> |
| messageSender       | User                |
| conversation        | Array<Conversation> |

### Conversation

| FieldName            | Type                    |
| -------------------- | ----------------------- |
| conversationId       | String(uuid)            |
| conversationType     | "ONE_TO_ONE" \| "GROUP" |
| conversationUsers    | Array<User>             |
| conversationMessages | Array<Message>          |
| conversationName     | String                  |

### Attachement

| FieldName           | Type         |
| ------------------- | ------------ |
| attachementId       | String(uuid) |
| attachementFileType | String       |
| attachementFileName | String       |
| attachementUrl      | String       |
| Message             | Message      |





# Test

 - Base de donnée sql 
 - à la racine faire yarn install
 - dans un autre terminal a la racine du projet faire **yarn build-watch:common** 
 - cd packages/tchatter_api
 - changer les valeur de connection de la base de donnée dans le .env
 - npx prisma migrate dev
 - yarn test 

 # Env

 ```
    DATABASE_URL="mysql://root@localhost:3306/tchather"
    APP_JWT_SECRET=DvEJ5d3t8zdknjmnQkQjAXBS2x9bQjMt4NMFutT8Mb5zfJ4xVWnaqCuScfvz
```