# Notification System Design

## Stage 1

### REST API Design

#### GET Notifications

```http
GET /notifications

Response:

[
  {
    "id": 1,
    "type": "Event",
    "message": "Workshop starts at 10 AM",
    "timestamp": "2026-04-22T17:51:18"
  }
]
POST Notification
POST /notifications

Request:

{
  "type": "Event",
  "message": "Workshop starts at 10 AM"
}
Logging Middleware

The logging middleware records:

API requests
response status
timestamps
errors

Purpose:

debugging
monitoring
auditing
Stage 2
Database Choice

MongoDB is suitable because:

flexible schema
scalable
fast write operations
efficient for notification systems
Notification Schema
{
  "_id": "ObjectId",
  "studentId": 101,
  "type": "Event",
  "message": "Workshop starts at 10 AM",
  "read": false,
  "createdAt": "timestamp"
}
Existing SQL Query
SELECT *
FROM notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt DESC;
Optimization

Create index:

CREATE INDEX idx_notifications
ON notifications(studentId, isRead, createdAt DESC);
Stage 3
Mark Notifications as Read
UPDATE notifications
SET isRead = true
WHERE studentId = 1042;
Improvements
indexing
pagination
caching
bulk updates
Stage 4
Scalability Improvements

Problems:

repeated database queries
heavy traffic
slower loading

Solutions:

Redis caching
pagination
WebSockets
lazy loading
queue-based processing
Stage 5
Problems in Existing Implementation

Issues:

sequential notification sending
blocking operations
no batching
poor scalability
Better Approach

Use:

asynchronous queues
worker services
batch notification processing

Pseudo code:

queue.add(notification)

worker.process(async () => {
   sendEmail()
   sendInApp()
})
Stage 6
Top Notifications Logic

Approach:

maintain priority queue
sort by priority
keep only top 10 notifications

Benefits:

efficient memory usage
faster retrieval
scalable performance