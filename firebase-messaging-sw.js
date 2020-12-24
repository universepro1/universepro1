self.addEventListener("push", event => event.waitUntil(onPush(event)));
self.addEventListener("notificationclick", event => event.waitUntil(onNotificationClick(event)));

async function onPush(event) {
	try {
		let json = event.data.json();
		console.log('push json received: ', json)
		if ('data' in json) {
			if ('gcm.notification.actions' in json.data)
				json.notification.actions = JSON.parse(json.data['gcm.notification.actions']);
			if ('gcm.notification.data' in json.data)
				json.notification.data = json.data['gcm.notification.data'];
		}
		self.registration.showNotification(json.notification.title, json.notification);
	} catch (e) {
		let text = event.data.text();
		console.error(e);
		console.log('push text received: ', text);
		await self.registration.showNotification(text);
	}
}
async function onNotificationClick(event) {
	console.log('push click: ', event);
	event.notification.close();
	let query = new URLSearchParams(event.notification.data || '');
	if (event.action)
		query.append('action', event.action);
	clients.openWindow((event.target.location.origin+'/')+'?'+query.toString());
}
