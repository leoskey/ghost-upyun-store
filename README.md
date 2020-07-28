## Installation
```shell
yarn add ghost-upyun-store
npm i ghost-upyun-store
```

## Usage
```json
"storage": {
  "active": "ghost-upyun-store", // content\adapters\storage\ghost-upyun-store
  "ghost-upyun-store": {
    "bucket": "<your bucket name>",
    "operator": "<your operator>",
    "password": "<your password>",
    "prefix": "YYYY/MM/",
    "domian": "<your bucket domain>"
  }
}
```