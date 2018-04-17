function Column(id, name) {
	var self = this;
	var columnId = id;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var $columnRename = $('<button class="btn-primary">Change description</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		$columnRename.click(function(event) {
			var newColumnName = prompt('Podaj nową nazwę');
			self.columnRename(newColumnName);
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append($columnRename)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	columnRename: function(newColumnName) {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				id: self.id, 
				name: newColumnName
			},
			success: function(response) {
				self.element.find('h2').replaceWith(newColumnName);
			}
		})
	},

	deleteColumn: function() {
	  var self = this;
	  $.ajax({
	  	url: baseUrl + '/column/' + self.id,
	  	method: 'DELETE',
	  	success: function(response) {
	  		self.element.remove();
	  	}
	  });
	}
};