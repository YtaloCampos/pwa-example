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

	build(el, activities, sessionHandler) {
		const itemsStyle = [
			'd-flex', 
			'justify-content-between',
			'text-dark',
			'text-sm',
			'text-bold',
			'align-items-center',
			'mb-3'
		], btnsStyle = [
			'c-btn',
			'btn-xs'
		], wrapperStyle = [
			'd-flex',
			'align-items-center',
			'c-pointer',
			'w-100'
		];

		el.innerHTML = '';
		
		let list = document.createElement('ul');
		for (let i = 0; i < activities.length; i++) {
			let item = document.createElement('li');
			let wrapperItem = document.createElement('div');
			let titleItem = document.createElement('p');
			let inputItem = document.createElement('input');
			let btnItem = document.createElement('BUTTON');

			// list style
			item.classList.add(...itemsStyle);

			// activitie title element
			titleItem.textContent = activities[i].title;
			titleItem.classList.add('c-title');
			if (activities[i]['checked']) {
				titleItem.classList.add('line-through');
			}
			
			// activitie checkbox element
			inputItem.type = 'checkbox';
			inputItem.name = 'c-confirm';
			inputItem.classList.add('c-confirm');
			inputItem.checked = !!activities[i]['checked']

			// title & checkbox container 
			wrapperItem.classList.add(...wrapperStyle);
			wrapperItem.appendChild(inputItem);
			wrapperItem.appendChild(titleItem);
			wrapperItem.addEventListener('click', () => {
				if (!activities[i]['checked']) {
					inputItem.checked = true;
					activities[i]['checked'] = inputItem.checked;
					titleItem.classList.add('line-through');
				} else {
					inputItem.checked = false;
					activities[i]['checked'] = inputItem.checked;
					titleItem.classList.remove('line-through');
				}

				sessionHandler();
			})
			
			// activitie remove element 
			btnItem.innerHTML = '<i class="fas fa-times"></i>';
			btnItem.classList.add(...btnsStyle);
			btnItem.id = `c-remove_${i}`;
			btnItem.name = 'c-remove';
			
			item.appendChild(wrapperItem);
			item.appendChild(btnItem);
			list.appendChild(item);
		}

		el.appendChild(list);
		sessionHandler();
	}
}