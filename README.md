System to track the location of every drone in real-time.
Using: Node, Express, Angular7, Socket.io, REST, Docker.

The server consists of Node/Express which uses a RESTful service to consume individual done data. It then stires a list of the data in memory. Evert 10 seconds this data is pushed to the client usining Sockets.
The client uses Angular 7 to display a table for drone data. It uses Sockets to listen for updated data, which is reflected on the table.

To Build and Run
- To build the Docker image, go to /drone-example and run: docker build -t drone-example .
- To run the server, go to /drone-example and run: docker run -p 3000:3000 drone-example
- To test if the server is running, http://localhost:3000/
- To run the client, go to /drone-example/NgDroneClient and run: ng serve. Then in a browser enter http://localhost:4200/.

To add data
- There is an included Postman collection that can be used to call the RESTful service and populate/update the list of drones (see  /drone-example/Drone-Example.postman_collection.json). 
- The POST body is in the format [id, speed, latitude, longitude] e.g. [2, 11, -32.015392, 21.119277]. You can add as many drones as you like, or update an existing drone. The results should be reflected in the browser at http://localhost:4200/.

To Test
- To run e2e test of the front end, got to /drone-example/NgDroneClient and run: ng e2e
  Protractor tests can be found in /drone-example/NgDroneClient/e2e/src/app.e2e-spec.ts.

Miscelaneous
- To see what Docker containers are running, run: docker ps
- To stop a container, run: docker stop CONTAINER_ID e.g. docker stop 68cb75348e73
- To run the server while developing to be able to see code changes, go to /drone-example and run: nodemon server.js