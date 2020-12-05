---
title: Server-Sent Events in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASERh
date: 2020-12-06T07:35:00.000Z
---
When there is a need to build a real-time application, the first thing that comes to mind is WebSockets, which is fine, but we have some other options to consider.

One of them is **Server-Sent Events** that provide uni-directional communication flow between server and client.

## Server-Sent Events

**Server-Sent Events** allow only the server to notify the client about specific events, not the other way.

They are very simple to implement, but there are some important things to know before choosing them to be used in your application:

* The technology is based on the plain HTTP
* Allows only uni-directional data flow (as it has already been mentioned)
* It is limited to text-only data, no binaries allowed

## Client-Side

The Server-Sent Event API is contained in the `EventSource` interface.

To open the connection to a server, create a new **EventSource** object with the URL of the script that generates the events:

```javascript
const eventSource = new EventSource("http://localhost:8000/api/events");
```

Once the connection has been instantiated, we need to listen to the events coming from the server:

```javascript
eventSource.addEventListener("message", (event) => {
  // "event.data" is a string
  const data = JSON.parse(event.data);
  
  // Prints whatever was sent by the server
  console.log(data);
});
```

**Important note:** Since the server sends text-only, we need to **stringify** it on the server-side and **parse** it on the client.

By default, if the connection between the server and the client closes, it is restarted. But it can be terminated using the **close** method:

```javascript
eventSource.close();
```

When an error happens (network timeout or something), an **error** event is generated and we can listen for it:

```javascript
eventSource.addEventListener("error", (error) => {
  // Prints the information about an error
  console.log(error);
});
```

## Server-Side

To establish a connection with the client, we need to send **200** status code along with the **Content-Type: text/event-stream** and **Connection: keep-alive** headers.

## Server-Sent Events vs WebSockets

The WebSocket protocol allows exchanging events between the server and the client. The data can be sent in both directions.

What are the main differences between both technologies?

* Server-Sent Events are based on HTTP, WebSockets on the WebSocket protocol
* Server-Sent Events do not allow bi-directional data flow, WebSockets do
* Server-Sent Events do not allow sending binary data, WebSockets do
* Server-Sent Events provide an automatic reconnection if the connection is lost, WebSockets don't (you need to implement it manually)
* Server-Sent Events have a limited maximum number of opened connections (6), which can be painful if you need to open more tabs, WebSockets do not have any limits

Seeing all those disadvantages of using Server-Sent Events, are they really a competitor of WebSockets?

They are much simpler and faster to implement, so if you need a quick way to set up the uni-directional real-time communication between the server and the client, and aware of all potential risks, this is the best way to go.

But be aware that there is a high chance that the solution will be eventually refactored to the WebSockets.