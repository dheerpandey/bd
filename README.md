# BD

The purpose of this applicatoin to showcase the business case from BD.

-   Persistence is implemented using an in-memory repository layer. This can be
    substituted with any persistence technology of your choice.
## Web
This is in Angular, source code is in Web folder.
Web application can be accessed from http://localhost:4200/ after running npm start.
### Dev Build (from Web folder)
```bash
$ npm install
$ npm start
```
### Production Build (from Web folder)
```bash
$ npm run build
$ npm run test
$ npm run e2e
$ npm run serve
```

## APIs
There are total 3 restful services in NodeJS.
1. Multiplier Manager.
2. Generator Manager.
3. Batch Manager.

Batch Manager API is the entry point for Web Application. Other 2 APIs are been accessed from Batch Manager.
All the 3 services should be up and running befor sending any batch request from the Web Application.
### Dev Build (apis\multiplier-manager-api)

```bash
$ npm install
$ npm start
```
Run these commands from respective service root path to keep all the 3 services up and running.
1. apis\multiplier-manager-api > npm install and npm start 
	To verify that the application is working correctly, access this endpoint http://localhost:8082/api/multiplier/ping
	
2. apis\generator-manager-api > npm install and npm start 
	To verify that the application is working correctly, access this endpoint http://localhost:8081/api/generator/ping
	
3. apis\batch-manager-api > npm install and npm start 
	To verify that the application is working correctly, this endpoint http://localhost:8080/api/batch/ping

The dev build starts the application in watch mode. If you make any changes to
the source files, the application will recompile and restart.

you should get success response.

### Production Build (apis\multiplier-manager-api)

```bash
$ npm run build
$ npm run serve
```
These commands applies to all the 3 APIs.
All the three APIs have following endpoints
1. /create		[POST]
2. /ping		[POST]
3. /get-all		[POST]
4. /clear-all	[POST]