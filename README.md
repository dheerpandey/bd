# BD Test

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

## API
This API is in NodeJS
### Dev Build (from API folder)

```bash
$ npm install
$ npm start
```

The dev build starts the application in watch mode. If you make any changes to
the source files, the application will recompile and restart.

To verify that the application is working correctly, point your browser to [http://localhost:8080/api/batch/ping] -
you should get success response.

### Production Build (from API folder)

```bash
$ npm run build
$ npm run serve
```
