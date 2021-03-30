/* function BaseModal */
function Menu(app, titleText, closeButtonText) {
	this.element = document.createElement('div');
	this.modal = document.createElement('div');
	this.title = document.createElement('h2');
	this.closeButton = document.createElement('button');

	this.title.innerHTML = titleText;
	this.closeButton.innerHTML = closeButtonText;

	this.element.classList.add('modal-frame');
	this.modal.classList.add('modal-content');
	
	this.modal.appendChild(this.title);
	this.modal.appendChild(this.closeButton);
	this.element.appendChild(this.modal);
	document.body.appendChild(this.element);
	
	this.show = function() {
		this.element.style.display = "flex";
		clearInterval(app.data.interval);
	}

	this.hide = function() {
		this.element.style.display = "none";
		app.data.interval = setInterval(app.gameCycle, INTERVAL_TIME);
	}

	this.closeButton.onclick = (e) => {
		this.hide();
	}
}

function nextLevelWindow (app, titleText, closeButtonText) {
	this.__proto__ = new Menu(app, titleText, closeButtonText)
	this.hide = function() {
		this.element.style.display = "none";
		app.updateLevel(++app.data.lvl);
	}

	this.closeButton.onclick = (e) => {
		this.hide();
	}

}

function endGameWindow (app, titleText, closeButtonText) {
	this.__proto__ = new Menu(app, titleText, closeButtonText)
	this.hide = function() {
		this.element.style.display = "none";
		location.reload();
	}

	this.closeButton.onclick = (e) => {
		this.hide();
	}
}