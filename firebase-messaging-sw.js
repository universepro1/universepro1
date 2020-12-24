self.addEventListener("push", event => { event.waitUntil(onPush(event)) });
// self.addEventListener("notificationclick", event => { event.waitUntil(onNotificationClick(event)) });

async function onPush(event) {
	try {
		let json = event.data.json();
		console.log('push json received: ', json)
		self.registration.showNotification(json.notification.title, {
			body: json.notification.body,
			sound: json.notification.sound
		});
	} catch (e) {
		let text = event.data.text();
		console.error(e);
		console.log('push text received: ', text);
		await self.registration.showNotification(text);
	}
}
