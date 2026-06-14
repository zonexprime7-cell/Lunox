# rainlink-voice
A plugin for using nodelink's voice receiver endpoints

Install
```
npm i rainlink-voice
```

# Installation:

```js
const { Rainlink } = require('rainlink');
const { VoicePlugin } = require('rainlink-voice');

const rainlink = new Rainlink({
  library: new Library.DiscordJS(client),
  nodes: Nodes,
  plugins: [
    new VoicePlugin(),
  ],
});

rainlink.on("voiceConnect", (node) => console.log(node.options.name + " connected to voice receiver"))
```

# Events API

## voiceConnect

Emitted when connected to voice receive server

Callback function params:
| Param | Type         | Description                                                    |
|-------|--------------|----------------------------------------------------------------|
| node  | RainlinkNode | The rainlink node class that connected to voice receive server |


Example:
```js
rainlink.on("voiceConnect", (node) => console.log(node.options.name + " connected to voice receiver"))
```

## voiceDisconnect

Emitted when disconnected to voice receive server

Callback function params:
| Param  | Type         | Description                                                       |
|--------|--------------|-------------------------------------------------------------------|
| node   | RainlinkNode | The rainlink node class that disconnected to voice receive server |
| code   | number       | WS disconnect code                                                |
| reason | buffer       | Buffer have reason why node disconnected to voice receive server  |

Example:
```js
rainlink.on("voiceDisconnect", (node, code, reason) => console.log(`${node.options.name} disconnected to voice receiver with code: ${code} and reason: ${reason}`))
```

## voiceError

Emitted when voice receive server errored

Callback function params:
| Param | Type         | Description                                               |
|-------|--------------|-----------------------------------------------------------|
| node  | RainlinkNode | The rainlink node class that voice receive server errored |
| error | Error        | The error string of voice receive server                  |

Example:
```js
rainlink.on("voiceError", (node, error) => console.error(error))
```

## voiceStartSpeaking

Emitted when user started speaking

Callback function params:
| Param   | Type         | Description                                                               |
|---------|--------------|---------------------------------------------------------------------------|
| node    | RainlinkNode | The rainlink node class that connected to voice receive server            |
| userId  | string       | The discord user id of who started speaking right now                     |
| guildId | string       | The discord guild id of which guild have user started speaking right now  |


Example:
```js
rainlink.on("voiceStartSpeaking", (node, userId, guildId) => console.log(`User ${userId} started speaking at guild ${guildId}`))
```

## voiceEndSpeaking

Emitted when user finished speaking

Callback function params:
| Param   | Type         | Description                                                               |
|---------|--------------|---------------------------------------------------------------------------|
| node    | RainlinkNode | The rainlink node class that connected to voice receive server            |
| base64  | string       | The base64 string of who finished sspeaking (opus/ogg)                    |
| userId  | string       | The discord user id of who started speaking right now                     |
| guildId | string       | The discord guild id of which guild have user started speaking right now  |


Example:
```js
rainlink.on("voiceEndSpeaking", (node, base64, userId, guildId) => console.log(`User ${userId} finished speaking at guild ${guildId}`))
```