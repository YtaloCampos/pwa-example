let activities = JSON.parse(localStorage.getItem('activities')) || [];

const validator = new Validator();
const activity = new Activity();

const cForm = document.getElementById('c-form');
const cTitle = document.getElementById('c-title');
const cList = document.getElementById('c-list');
const cTitleError = document.getElementById('c-title-error');

function treatSession() {
	localStorage.setItem('activities', JSON.stringify(activities));
}

function captureRemoveEvents() {
	for (let i = 0; i < activities.length; i++) {
		document.getElementById(`c-remove_${i}`).addEventListener('click', () => {
			activities.splice(i, 1);
			activity.build(cList, activities);

			captureRemoveEvents();
			treatSession();
		})
	}
}

function registerActivity() {
	activities.unshift(activity.getData(activities));
	activity.build(cList, activities);

	captureRemoveEvents();
	treatSession();
}

cForm.addEventListener('submit', e => {
	e.preventDefault();

	const validatorResult = validator.isValid(cTitle.value);
	
	if (validatorResult) {
		activity.setTitle(cTitle.value);
		activity.clearFields(cTitle);
		registerActivity();
	}
});

if (activities.length > 0) {
	activity.build(cList, activities);
	captureRemoveEvents();
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('/service-worker.js', {scope: '/service-worker.js'})
	.then(function(reg) {
        console.log('Service worker Registered');
    })
    .catch(function (err) {
        console.log('erro', err);
    });
}
