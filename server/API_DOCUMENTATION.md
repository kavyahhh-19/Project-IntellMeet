# IntellMeet Backend API Documentation

Base URL:

```text
http://localhost:5000/api
```

Authentication header for protected routes:

```text
Authorization: Bearer YOUR_TOKEN
```

## Health Check

### Check Backend Status

```http
GET /health
```

Expected response:

```json
{
  "success": true,
  "message": "IntellMeet backend is running"
}
```

## Auth APIs

### Signup

```http
POST /auth/signup
```

Body:

```json
{
  "name": "Kavya",
  "email": "kavya@example.com",
  "password": "123456"
}
```

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "kavya@example.com",
  "password": "123456"
}
```

### Get Current User

```http
GET /auth/me
```

Protected: Yes

## User/Profile APIs

### Get Profile

```http
GET /users/profile
```

Protected: Yes

### Update Profile

```http
PUT /users/profile
```

Protected: Yes

Body:

```json
{
  "name": "Kavya Vempati"
}
```

## Meeting APIs

### Create Meeting

```http
POST /meetings
```

Protected: Yes

Body:

```json
{
  "title": "Sprint Planning",
  "description": "Planning backend tasks",
  "scheduledAt": "2026-06-25T10:00:00.000Z",
  "durationMinutes": 45,
  "participants": []
}
```

### Get Meetings

```http
GET /meetings
```

Protected: Yes

### Get Meeting By ID

```http
GET /meetings/:id
```

Protected: Yes

### Update Meeting

```http
PUT /meetings/:id
```

Protected: Yes

Body example:

```json
{
  "status": "live"
}
```

### Delete Meeting

```http
DELETE /meetings/:id
```

Protected: Yes

## Message APIs

### Get Meeting Messages

```http
GET /meetings/:meetingId/messages
```

Protected: Yes

## Task APIs

### Create Task

```http
POST /tasks
```

Protected: Yes

Body:

```json
{
  "title": "Prepare sprint report",
  "description": "Summarize sprint progress",
  "meeting": "MEETING_ID",
  "priority": "high",
  "dueDate": "2026-06-25T10:00:00.000Z"
}
```

### Get Tasks

```http
GET /tasks
```

Protected: Yes

Filter examples:

```http
GET /tasks?status=todo
GET /tasks?priority=high
```

### Get Task By ID

```http
GET /tasks/:id
```

Protected: Yes

### Update Task

```http
PUT /tasks/:id
```

Protected: Yes

Body example:

```json
{
  "status": "done"
}
```

### Delete Task

```http
DELETE /tasks/:id
```

Protected: Yes

## AI Meeting Intelligence APIs

### Save Transcript

```http
POST /ai/meetings/:meetingId/transcript
```

Protected: Yes

Body:

```json
{
  "transcript": "Kavya should prepare backend documentation. Dhruv should complete meeting UI."
}
```

### Generate Summary

```http
POST /ai/meetings/:meetingId/generate-summary
```

Protected: Yes

### Get Meeting Intelligence

```http
GET /ai/meetings/:meetingId/intelligence
```

Protected: Yes

### Create Tasks From Action Items

```http
POST /ai/meetings/:meetingId/create-tasks
```

Protected: Yes

## Notification APIs

### Get Notifications

```http
GET /notifications
```

Protected: Yes

### Mark One Notification As Read

```http
PATCH /notifications/:id/read
```

Protected: Yes

### Mark All Notifications As Read

```http
PATCH /notifications/read-all
```

Protected: Yes

## Analytics APIs

### Overview Analytics

```http
GET /analytics/overview
```

Protected: Yes

### Meeting Analytics

```http
GET /analytics/meetings
```

Protected: Yes

### Task Analytics

```http
GET /analytics/tasks
```

Protected: Yes

## Socket.io Events

Frontend connection:

```js
const socket = io("http://localhost:5000", {
  auth: {
    token,
  },
});
```

### Events Frontend Emits

```text
join-meeting
leave-meeting
send-message
typing-start
typing-stop
webrtc-offer
webrtc-answer
webrtc-ice-candidate
toggle-audio
toggle-video
screen-share-started
screen-share-stopped
```

### Events Frontend Listens To

```text
joined-meeting
new-message
participant-joined
participant-left
user-typing
user-stopped-typing
webrtc-offer
webrtc-answer
webrtc-ice-candidate
participant-audio-toggled
participant-video-toggled
participant-screen-share-started
participant-screen-share-stopped
meeting-error
message-error
```

## Common Protected Request Format

Every protected API must include this header:

```text
Authorization: Bearer YOUR_TOKEN
```

For JSON requests, include:

```text
Content-Type: application/json
```

## Notes For Frontend Team

- Use the login token from `/auth/login` for all protected routes.
- Meeting, task, AI, notification, and analytics routes require authentication.
- Socket.io also requires the same token in the `auth` object during connection.
- Avatar upload is currently skipped and can be added later as an optional enhancement.
