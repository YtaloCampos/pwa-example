class Activity {
	constructor() {
		this.title = null;
	}

	setTitle(title) {
		this._title = title; 
	}

	getData() {
		return { title: this._title };
	}

	clearFields(titleField) {
		titleField.value = '';
		this.title = null;
	}

	build(el, activities) {
		const itemsStyle = [
			'd-flex', 
			'justify-content-between',
			'text-dark',
			'text-sm',
			'text-bold',
			'align-items-center'
		], btnsStyle = [
			'c-btn',
			'btn-xs',
			'mb-3'
		];

		el.innerHTML = '';
		
		let list = document.createElement('ul');
		for (let i = 0; i < activities.length; i++) {
			let item = document.createElement('li');
			let btnItem = document.createElement('BUTTON');

			item.classList.add(...itemsStyle);

			btnItem.innerHTML = '<i class="fas fa-times"></i>';
			btnItem.classList.add(...btnsStyle);
			btnItem.id = `c-remove_${i}`;

			item.appendChild(document.createTextNode(activities[i].title));
			item.appendChild(btnItem);
			list.appendChild(item);
		}

		el.appendChild(list);
	}
}