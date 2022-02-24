# My Drive App

This is a nodejs backend application to manage your folder on the cloud.
It has many features including user can

- create/delete/rename/move a folder
- create/delete/rename/move a file
  took insparations from google drive.

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
```

Start the server

```bash
  npm start
```

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
