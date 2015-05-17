//- Create a menu of food items with prices.
//- The application should allow the user to add items to a receipt.
//- The application should display and update the running total and tax.
//- The application should be nicely styled.

// needed global variables for a receipt array, my unordered cart list,
// all of the buttons next to their respective food items, tax/sub/total,
// and the box the receipts are hosted in so i can make it scroll to the
// bottom everytime it overflows

var receipt = [{name: "food", price: null, quantity: 0}];
var cart = document.querySelector(".cart");
var button = document.querySelectorAll("button");
var total = document.querySelector("#total");
var subtotal = document.querySelector("#subtotal");
var tax = document.querySelector("#tax");
var box = document.querySelector(".top");
var which;

onload = function(event) {
	for(var j = 0; j < button.length; j++){
		button[j].addEventListener("click", function(event) {
			which = $(event.target).closest("tr");
			var dish = which[0].querySelector(".names").textContent;
			var cost = parseFloat(which[0].querySelectorAll("td")[1].textContent.split("$")[1]);
			var test = [];
			console.log(which);
			console.log(dish, cost);
// this will run through the receipt array and check if the clicked dish is
// already there. if it is, it'll add the cost of that dish to the original
// if it isn't, it'll make a new object, push it to the receipt array
			for (var i = 0; i <= receipt.length; i++) {
				if (dish === receipt[i].name) {
					receipt[i].price += cost;
					receipt[i].quantity ++;
					test.push("one")
					break;
				} 
				else if (receipt[i].name != dish && receipt[i] != receipt[receipt.length - 1]) {
					
				} 
// the test array is just to get the function to stop iterating if it finds
// a match
				else if (test.length > 0) {
					break;
				}
				else {
					var trio = {};
					trio.name = dish;
					trio.price = cost;
					trio.quantity = 1;
					receipt.push(trio);
					break;
				}
			}

// this is getting the subtotal/tax/total to change with each addition.
// also calls the function to change the list at the bottom
			var before = parseFloat(total.textContent) + cost;
			var taxed = before * 0.03;
			subtotal.textContent = before.toFixed(2);
			tax.textContent = taxed.toFixed(2);
			total.textContent = (parseFloat(tax.textContent) + before).toFixed(2);
			changeList();
		});
	} 
}


// this part makes it so when new items are created/the quantity of old items
// are updated the receipt list will actually update.
var changeList = function() {
	if (receipt[0].name === "food") {
		receipt.shift();
	}
// couldn't think of a better way to do it than to just rerender it every
// time something is added. will rethink later.
	$(".cart").empty();
	for (var i = 0; i < receipt.length; i++) {
		var nextItem = document.createElement("li");
		var minus = document.createElement("button");
		minus.setAttribute("class", "minus");
		minus.textContent = "-";
		var newTable = document.createElement("table");
		var newRow = document.createElement("tr");
		newTable.appendChild(newRow);
		var newCell1 = document.createElement("td");
		var newCell2 = document.createElement("td");
		newCell2.textContent = receipt[i].quantity + "x " + receipt[i].name + " $" + receipt[i].price;
		newCell1.appendChild(minus);
		newRow.appendChild(newCell1);
		newRow.appendChild(newCell2);
		nextItem.appendChild(newTable);
		cart.appendChild(nextItem);
		box.scrollTop = 9999999999;
	}
}


// and every sad little thing from here on was me trying desperately to get
// the remove buttons to work. just couldn't hack it this go around. :(




// //this will keep track of the quantity of all items
// var totalItems = 1;

// //this will update the quanity of all items
// var numberOfItems = function() {
// 	receipt.map(function(e) {
// 		totalItems += e.quantity;
// 	})
// }

// removes items from receipt list, subtracts from subtotal, tax, and total
// var removeItem = function() {
// 	var subtract = cart.querySelectorAll(".minus");
// 	for (var i = 0; i < subtract.length; i++) {
// 		subtract[i].addEventListener("click", function(event) {
// 			numberOfItems();
// 			which = $(event.target).closest("tr");
// 			var textParse = which[0].querySelectorAll("td")[1].textContent;
// 			var oldCost = parseFloat(textParse.split(" $")[1]);
// 			var oldAmount = parseInt(textParse.split("x")[0]);
// 			var itemCost = parseFloat((oldCost / oldAmount).toFixed(2));
// 			var x = textParse.indexOf("x") + 2;
// 			var dollar = textParse.indexOf("$") - 1;
// 			var sameName = textParse.slice(x, dollar);
// 			console.log(sameName, oldAmount, oldCost);
// 			for (var j = 0; j < receipt.length; j++) {
// 				if (receipt[j].name === sameName) {
// 					receipt[j].price -= itemCost;
// 					receipt[j].quantity -= 1;
// 					if (receipt[j].quantity === 0) {
// 						receipt.splice([j], 1);
// 						if (receipt.length === 0) {
// 							var dummy = {name: "food", price: null, quantity: 0};
// 							receipt.push(dummy);
// 						}
// 					}
// 				}
// 			}
// 		});
// 	}
// //this statement will make sure there's always something in the receipt 
// //array so that our original simple function always runs
	
// }



// jaden's example; i think i applied it all right


// reciept = {
// 	items: [{
//		name: 'thing';
//	}],
//	total: function() {
//		var total = 0;
//		receipt.items.map(function(item)) {
//			total += item.price;
// 		}
// 	}
// }

// receipt.total();


// if (receipt.items.length === 0) {
//	items.push({
//		name: "afkjhdjkfg",
//		price: 3.33,
//	})
//} else if (something) {
//		for(var item in receipt.items) {
//			if (receipt.items[2].name)