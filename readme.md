## Run Locally

Clone the project

```bash
  git clone https://github.com/kamalgupta97/sdeTask.git
```

Go to the project directory

```bash
  cd sdetask
```

Install dependencies

```bash
  npm install
```

Add a .env file

```bash
  JWT_SECRET_KEY=EXAMPLE
  ATLAS_DB_SECRET_KEY ="YOUR MONGODB ATLAS DATABASE URL OR LOCAL MONGO URL"
```

Start the server

```bash
  npm start
```

## API ENDPOINTS INFORMATION

#### BASE URL

```http
 https://drive-sdetask.herokuapp.com
```

#### REGISTER

```http
  POST /register
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | **Required** |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

Takes name, email, password and will return created user along with token

#### LOGIN

```http
  POST /login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

Takes email, password and will return existing user along with token

#### ROOT FOLDER

```http
  GET  /folders/root
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

Takes a token in the header and return details of root folder.

#### SPECIFIC FOLDER

```http
  GET  /folders/root/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

Takes a token and id of the folder return details of that folder.

#### CREATE A FOLDER

```http
  POST  /folders
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| Parameter      | Type                      | Description     |
| :------------- | :------------------------ | :-------------- |
| `folderName`   | `string`                  | **Required**    |
| `parentId`     | `ObjectID`                | `Default =null` |
| `path`         | `string`                  | **Required**    |
| `user`         | `Mongo ObjectID`          | **Required**    |
| `childfolders` | `Array of Mongo ObjectID` | `Default =[]`   |
| `childfiles`   | `Array of Mongo ObjectID` | `Default =[]`   |
| `ItemsInside`  | `Number`                  | `Default =0`    |

Takes a token and above text fields of the folder return newly created folder.

#### DELETE A FOLDER

```http
  DELETE  /folders/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

Takes a token and id of the folder return details of that deleted folder.

#### RENAME A FOLDER

```http
  patch  /folders/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

| Parameter    | Type     | Description  |
| :----------- | :------- | :----------- |
| `folderName` | `string` | **Required** |

Takes a token and id and updated name of the folder return details of that renamed folder.

#### MOVE A FOLDER

```http
  patch  /folders/move/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

| Parameter  | Type       | Description  |
| :--------- | :--------- | :----------- |
| `parentId` | `ObjectID` | **Required** |

Takes a token and id and updated parentId of the folder return details of that moved folder.

#### CREATE A FILE

```http
  POST  /files
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| Parameter   | Type             | Description     |
| :---------- | :--------------- | :-------------- |
| `fileName`  | `string`         | **Required**    |
| `parentId`  | `Mongo ObjectID` | `Default =null` |
| `file_url`  | `string`         | **Required**    |
| `extension` | `string`         | **Required**    |
| `user`      | `Mongo ObjectID` | **Required**    |

Takes a token and above text fields of the file return newly created file.

#### DELETE A FILE

```http
  DELETE  /files/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

Takes a token and id of the file return details of that deleted file.

#### RENAME A FILE

```http
  patch  /files/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `fileName` | `string` | **Required** |

Takes a token and id and updated name of the file return details of that renamed file.

```http
  patch  /files/move/:id
```

| Header         | Type     | Description  |
| :------------- | :------- | :----------- |
| `Bearer Token` | `string` | **Required** |

| URL PARAMS | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | **Required** |

| Parameter  | Type       | Description  |
| :--------- | :--------- | :----------- |
| `parentId` | `ObjectID` | **Required** |

Takes a token and id and updated parentId of the file return details of that moved file.

# Important Technical Decisions

| ITD 1                                     | MongoDB(Atlas) will be used to store data                                                                                                       |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Options Considered(Chosen Option in bold) | MySQL/PostgreSQL/**MongoDB**                                                                                                                    |
| Reason                                    | It is easier to understand becuase it saves document pretty much similar to JS objects, using atlas becuase I want to access this data globally |

| ITD 2                                     | Express will be used to write REST APIs                                                              |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Options Considered(Chosen Option in bold) | Node(Http)/**Express**                                                                               |
| Reason                                    | To avoid lot of extra code for creating servers and other things. Express have great community also. |

| ITD 3                                     | Multer will be used for file uploads                                                                       |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| Options Considered(Chosen Option in bold) | express-fileupload / **Multer**                                                                            |
| Reason                                    | It adds a body and file object or files, that will be easier to differenciate between textfields and files |

| ITD 4                                     | bycrypt will be used for encryption passwords                                           |
| :---------------------------------------- | :-------------------------------------------------------------------------------------- |
| Options Considered(Chosen Option in bold) | **bcryptjs**/simplecrypt                                                                |
| Reason                                    | It is latest and widely used by the developers and have great community support as well |

| ITD 5  | jsonwebtoken will be used to do token authentication                                                           |
| :----- | :------------------------------------------------------------------------------------------------------------- |
| Reason | will be easier to users instead of passing all the data again and again in the request they can pass a tocken. |
