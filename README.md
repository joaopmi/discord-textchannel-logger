# Info
Simple logger for textChannels.


- [GITHUB](https://github.com/joaopmi/discord-textchannel-logger) 
- [NPM](https://www.npmjs.com/package/discord-textchannel-logger)

# Installation

```
npm i discord-textchannel-logger
```

## Usage

```typescript
import { initLogger, Logger } from 'discord-textchannel-logger';

initLogger(getClient());//INIT ONLY ONCE

let loggerOne: Logger = new Logger(
    {
        textChannelID: "idTextChannel",
        consoleLog: true,
        customHeaderConsole: "=== CONSOLE CUSTOM HEADER ===",
        printCurrentTimeConsole:true,
    }
);

loggerOne.log('Hello World');

let loggerTwo: Logger = new Logger(
    {
        textChannelID: "idTextChannel",
        customHeader: "=== TEXT CHANNEL CUSTOM HEADER ===",
    }
);

loggerTwo.log('Hello World 2');

export {loggerOne,loggerTwo};

```

# Dependencies Used
```json
discord.js: ^14.2.0
circular-reference-remover: ^1.0.5
```

## Documentation

- Function ```initLogger(client:Client):void``` - Accepts the Client your bot is connected to. Need to init once.

- Class ```Logger``` - Class to send messages to textChannels and console. Needs ```InitOptions``` in constructor, if it's an invalid value, it'll throw a ```TextChannelNotFound```.

- - Function ```log(value:any):void``` - Send ```value``` (if not ```undefined```) to configured textChannel in ```InitOptions``` and print on ```console``` (if configured in ```InitOptions```). If ```value``` it's a typeof ```object```, it'll try to ```JSON.stringify``` it, unless, if it's an ```Error``` instance, it'll print its stack trace. In case of ```JSON.stringify``` failure it'll use the ```object.toString```.

- Options ```Logger.InitOptions``` - 
- - ```console.log?:boolean``` - If true print the value on console
- - ```printCurrentTimeConsole?:boolean``` - If true print the current time as ```toLocaleString``` on console. If it's true, prints after the custom headers. Example: 
```'customHeaderIfExists\n' + 14/12/2021 10:39:54 ==> 'message'```
- - ```jsonSpace?:number``` - The space indent of JSON.stringify in ```log```. ```Default: 2```

- - ```textChannelID:string``` - (Obligatory) ID of the textChannel to print on.
- - ```customHeader?:string``` - Custom log header to print along before the message
- - ```customHeaderConsole?:string``` - Custom log header to print on console before the message

- ```Errors``` - 
- - ```NoClientError``` - In case there's no client configured with ```initLogger```
- - ```TextChannelNotFound``` - If the ID of the ```textChannel``` does not resolve to an existent channel
- - ```InvalidTextChannel``` - If the ID of the ```textChannel``` resolve to a non-textChannel

## Contributing
Pull requests are welcome, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
