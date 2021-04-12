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



