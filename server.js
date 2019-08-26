/*
 * The server consists of Node/Express which uses a RESTful service to consume individual done data. 
 * It then stires a list of the data in memory. Evert 10 seconds this data is pushed to the client usining Sockets.
 */
const express = require('express');
const socketIO = require ('socket.io');
const http = require ('http');
const app = express();
const morgan = require('morgan');
const server = http.Server(app);
const io = socketIO(server);

app.use(morgan('short'));
app.use(express.json());

/*
 * The maintained list of drone data.
*/
var drones = new Array();

/*
 * RESTful GET service used to check if this service is running.
 * e.g. http://localhost:3000/
 */
app.get('/', (req, res) => {
    res.send('drone-example-server running...');
});

/*
 * RESTful POST service used to recieve individual drone data.
 * e.g. http://localhost:3000/drone
 * with body format [id, speed, latitude, longitude] e.g. [2, 11, -32.015392, 21.119277].
*/
app.post('/drone', (req, res) => {
    updateDrones(req.body[0], req.body[1], req.body[2], req.body[3]);
    res.json('Drone updated successfully: '+req.body);
});

server.listen(3000, () => {
     console.log('server listening on port 3000');
});

/*
 * Use Sockets to send the data on connection. 
*/
io.on('connection', (socket) => {
    sendData(socket);
});

/*
 * Use Sockets to send the drone data to the client. This recurses very 10 seconds.
*/
function sendData(socket) {
    setTimeout(() => {
        for (var i = 0; i < drones.length; i++) {
            drones[i].lastUpdated = drones[i].lastUpdated10s ? drones[i].lastUpdated10s : new Date().getTime();
            if (drones[i].lat10s != drones[i].lat || drones[i].long10s != drones[i].long) {
                drones[i].distance = distanceInKmBetweenEarthCoordinates(drones[i].lat10s, drones[i].long10s, drones[i].lat, drones[i].long);
            } else {
                drones[i].distance = 0;
            }
            //console.log(drones[i].id+': '+drones[i].long10s+' - '+drones[i].long+' = '+drones[i].distance+'    lastUpdated: '+drones[i].lastUpdated);
            drones[i].lat10s = drones[i].lat;
            drones[i].long10s = drones[i].long;
            drones[i].lastUpdated10s = new Date().getTime();
        }
        socket.emit('drones', drones);
        sendData(socket);
    }, 10000);
}

/*
 * Update the drone data.
*/
function updateDrones(id, speed, lat, long) {
    let updated = false;
    for (var i = 0; i < drones.length; i++) {
        if (drones[i].id == id) {
            drones[i].speed = speed;
            drones[i].lat = lat;
            drones[i].long = long;
            updated = true;
            break;
        }
    }
    if (!updated) {
        drones.push({id:id, speed:speed, lat:lat, long:long, distance:'', lastUpdated:new Date().getTime()});
    }
}
 
/*
 * Return the distance in km betweeen the two geo positions.
*/
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}