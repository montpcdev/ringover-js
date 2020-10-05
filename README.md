# ringover-js

ringover-js is a client for https://developer.ringover.com.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install ringover-js.

```bash
npm i @kriscarilloxyz/ringover-js
```

## Usage

```javascript
const Ringover = require('@kriscarilloxyz/ringover-js')

const client = new Ringover(token) 
const callsList = await client.callsList(params)
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
