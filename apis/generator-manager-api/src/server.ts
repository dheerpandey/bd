import { createServer } from 'http';
import { createApp } from './create-app';
const port = process.env.PORT || 8081;
const app = createApp();
const server = createServer(app);
server.listen(port, () => console.log('Generator Manager Service Listening On Port ' + port));

process.on('SIGINT', () => {
    console.log('SIGINT received ...');
    console.log('Shutting down the server');

    server.close(() => {
        console.log('Server has been shutdown');
        console.log('Exiting process ...');
        process.exit(0);
    });
});
