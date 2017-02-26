// 15.8.2

window.onload = function() {

	var link = document.getElementById('link');

	var linkDiv = link.getBoundingClientRect();

	// var linkTwo = window.location;
	// console.log(linkTwo);

	// var f1Element = document.getElementById('f1');
	// var f1Win = f1Element.contentWindow;

	// console.log(f1Win.frameElement == f1Element);

	// console.log(window.frameElement === null)

	function getScrollOffsets(win) {
		win = win || window;

		if(win.pageXScroll) {
			return {
				x: win.pageXScroll,
				y: win.pageYScroll
			};
		}

		var dom = win.document;
	}
}