---
title: A Complete Guide To Server-Sent Events in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASERh
date: 2020-12-06T07:35:00.000Z
---
When there is a need to build an application that allows real-time operations, the first thing that comes to mind is WebSockets, which is fine, but there are other options to consider as well.

One of them is **Server-Sent Events** that provide uni-directional communication flow between server and client.

## Server-Sent Events

**Server-Sent Events** is a server push technology enabling a client to receive automatic updates from the server via HTTP connection.

They are very simple to implement, but there are some important things to know before choosing them to be used in your application:

* The technology is based on the plain HTTP
* Allows only uni-directional data flow (as it has already been mentioned)
* It is limited to text-only data, no binaries allowed

## The API

The Server-Sent Event API is contained in the **EventSource** interface.

To open the connection to a server, create a new EventSource object with the URL of the script that generates the events:

```javascript
const eventSource = new EventSource("/api/events");
```

When the URL that is passed to the EventSource is on the other domain, a second parameter can be specified and a **withCredentials** property can be set to **true**, which means that the Cookie is sent together:

```javascript
const eventSource = new EventSource("http://localhost:8000/api/events", { withCredentials: true });
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

When the connection is opened, an **open** event is generated and we can listen for it:

```javascript
eventSource.addEventListener("open", (event) => {
  // Prints the information about an event
  console.log(event);
});
```

The state of the connection is stored in the **readyState** property of the EventSource:

* 0 - EventSource.CONNECTING
* 1 - EventSource.OPEN
* 2 - EventSource.CLOSED 

```javascript
const connectionState = eventSource.readyState;
```

## Server-Side

To establish a connection with the client, we need to send **200** status code along with the **Content-Type: text/event-stream** and **Connection: keep-alive** headers.

Let's take a look at the complete example using Node.js and explain each line of code in the comment:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3000;

// Store all connected clients
let clients = [];

const addSubscriber = (req, res) => {
  // Set necessary headers to establish a stream of events
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  };
  res.writeHead(200, headers);

  // Add a new client that just connected
  // Store the id and the whole response object
  const id = Date.now();
  const client = {
    id,
    res,
  };
  clients.push(client);

  console.log(`Client connected: ${id}`);

  // When the connection is closed, remove the client from the subscribers
  req.on('close', () => {
    console.log(`Client disconnected: ${id}`);
    clients = clients.filter((client) => client.id !== id);
  });
};

const notifySubscribers = (message) => {
  // Send a message to each subscriber
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(message)}\n\n`)
  );
};

// Add a new message and send it to all subscribed clients
const addMessage = (req, res) => {
  const message = req.body;

  // Return the message as a response for the "/message" call
  res.json(message);

  return notifySubscribers(message);
};

// Get a number of the clients subscribed
const getSubscribers = (_req, res) => {
  return res.json(clients.length);
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.get('/subscribe', addSubscriber);
app.post('/message', addMessage);
app.get('/status', getSubscribers);

// Start the app
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
```

The main goal of this code is to keep track of all connected clients and notify them of the data that was **POST**ed to the **/message** endpoint.

**Important note:** `\n` does a line break. `\n\n` means the end of the message, you should not forget to add that.

## Client-Side

On the client-side let's create a simple React component using EventSource API to connect to the event stream and display the real-time data:

```jsx
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Subscribe to the event stream
    const eventSource = new EventSource('http://localhost:3000/subscribe');
    eventSource.addEventListener('message', handleReceiveMessage);
    return () => {
      // Remove event listener and close the connection on unmount
      eventSource.removeEventListener('message', handleReceiveMessage);
      eventSource.close();
    };
  }, []);

  // Get the message and store it in the state
  const handleReceiveMessage = (event: any) => {
    const eventData = JSON.parse(event.data);
    setData((data) => data.concat(eventData));
  };

  // Send 5 random chars to the server
  const handleSendMessage = () => {
    axios.post('http://localhost:3000/message', {
      message: generateRandomChars(5),
    });
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <div>
        <h4>Click to send a message</h4>
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h4>Message List</h4>
        <p>Number of messages: {data.length}</p>
        {data.map((item, index) => (
          <div key={index}>{item.message}</div>
        ))}
      </div>
    </div>
  );
};
```

## Putting it Together

To see our example in action, start the client (your start script may be different):

`yarn start`

And the server:

`node server.js`

You should see the app running:

![Client-Side App](/img/screenshot-2020-12-05-at-11.18.44.png "Client-Side App")

And the server:

![Server-Side App](/img/screenshot-2020-12-05-at-11.13.50.png "Server-Side App")

Notice the log **Client connected: 1607163222261** which means that the connection has been established and we can use the channel to send events.

Click on the button **Send** on the UI (which **POST**s 5 random characters to the **/message** endpoint) and notice how they appear in the list:

![Working App](/img/ezgif.com-gif-maker-6-.gif "Working App")

## Custom Event Types

The default event type used by Server-Sent Events is a **message**.

A custom event can be sent by specifying the **event** at the event start:

```javascript
client.res.write(`event: join\ndata: ${JSON.stringify(message)}\n\n`);
```

And then the client can listen for that event:

```javascript
eventSource.addEventListener('join', handleReceiveMessage);
```

## Auto Reconnect

If the server crashes or the connection is lost, the **EventSource** is trying to reconnect, we do not have to care about it. 

Usually, there is a few seconds delay between the reconnections:

![Auto Reconnect](/img/ezgif.com-gif-maker-5-.gif "Auto Reconnect")

The server can provide a recommended delay by specifying the **retry** at the event start:

```javascript
// Retry each 5 seconds
client.res.write(`retry:5000\ndata: ${JSON.stringify(message)}\n\n`);
```

If the browser knows that there is no internet connection at the current moment, it will retry to reconnect once the internet connection is established.

## Last-Event-Id Header

It is essential that the connection is resumed at the same point where it got interrupted, so no messages are lost.

This can be achieved with the **Last-Event-Id** header that is added automatically if a certain condition is met.

Each message from the server should include a unique **id** field:

```javascript
client.res.write(`data: ${JSON.stringify(message)}\nid:500\n\n`);
```

When the browser receives a message with an **id** set, it sets the property `eventSource.lastEventId` to its value and upon reconnection sends this value in the **Last-Event-Id** header:

![Last-Event-Id header](/img/screenshot-2020-12-05-at-11.47.03.png "Last-Event-Id header")

**Important note:** the **id** should be appended after the **data** by the server, to ensure that the **eventSource.lastEventId** is updated after receiving the message.

## Browser Support

According to [caniuse](https://caniuse.com/?search=eventsource), Server-Sent Events are available for more than 96% of the users as of 06.12.2020:

![Browser Support Image](/img/screenshot-2020-12-05-at-14.54.45.png "Browser Support Image")

The following code can be used to check whether the browser supports the feature:

```javascript
if ("EventSource" in window) {
  // Implement it
}
```

## Sever-Sent Events vs WebSockets

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

## Summary

Server-Sent Events provide an easy way to establish uni-directional data flow between the server and the client via HTTP connection.

As any other feature, they have their own advantages and disadvantages, so choosing this technology requires some time spent checking if any of its limitations are not conflicting with the project requirements.