const amqp = require("amqplib/callback_api");
function connectRabbit() {
	amqp.connect("amqp://guest:guest@rabbitmq:5672/", (error0, connection) => {
		if (error0) {
			throw error0;
		}

		// Create a channel to send messages to the worker
		connection.createChannel((error1, channel) => {
			if (error1) {
				throw error1;
			}
			console.log("conncted to rabbitmq");

			// Define the name of the task to run (e.g. "predict_task")
			const taskName = "predict_task";

			// Define the input data to send to the worker
			const inputData = 5;

			// Convert the input data to a string and send it to the worker
			const inputString = JSON.stringify(inputData);

			channel.assertQueue("", { exclusive: false }, (error2, queue) => {
				if (error2) {
					throw error2;
				}
				channel.sendToQueue(taskName, Buffer.from(inputString), {
					replyTo: queue.queue,
				});
			});

			// Wait for the worker to send the prediction back
			channel.consume(
				"",
				(message) => {
					const prediction = message.content.toString();
					console.log(`Prediction: ${prediction}`);
					connection.close();
				},
				{ noAck: true }
			);
		});
	});
}

module.exports = connectRabbit;
