const express = require("express");
// const connectRabbit = require("./aq.js");
const celery = require("celery-node");
const app = express();

const client = celery.createClient(
	"amqp://guest:guest@rabbitmq:5672/",
	"redis://redis:6379/"
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/celery", (req, res) => {
	const { salary } = req.query;
	const task = client.createTask("tasks.predict_task");
	const result = task.delay(+salary);
	result.get().then((data) => {
		console.log(data);
		//   client.disconnect();
	});
	res.send("celery worker");
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
