function Card(id, name, columnId) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.columnId = columnId;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var $cardRename = $('<button class="btn-primary">Zmień nazwę karty</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		$cardRename.click(function(event){
			var newCardName = prompt('Podaj nową nazwę karty');
			event.preventDefault();
			self.renameCard(newCardName, columnId);
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append($cardRename);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.element.remove();
			}
		});
	},

	renameCard: function(newCardName, columnId) {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				bootcamp_kanban_column_id: columnId,
				name: newCardName
			},
			success: function(response) {
				self.element.find('p').replaceWith(newCardName);
			}
		});
	}
};