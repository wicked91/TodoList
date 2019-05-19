## Heroku URL
https://todolist-wicked91j.herokuapp.com/

## Installation

Step. 1
```
$ git clone https://github.com/wicked91/TodoList.git
```

Step. 2
```
$ npm install && cd client && npm install
```

Step. 3
config/keys_dev.js 파일 생성

```
module.exports = {
    mongoURI: "MONGO_ATLAS_URI 입력"
};
```
Step. 4
```
 $ cd client
 $ npm run build
```

Step. 5
```
$ cd ..
$ npm start
```

Step. 6
http://localhost:5000 접속




