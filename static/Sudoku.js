/**
 * Created on Dec 21, 2015
 * 
 * @author: Mogoi Adrian
 */
var Sudoku = (function() {

	var _rows, _cols, _grid;

	// initialize the module with input data
	init = function(data) {
		_reorganizeData(data);
		return this;
	};

	// return true if sudoku is valid
	isValid = function() {
		return (_validate(_rows) && _validate(_cols) && _validate(_grid));
	};

	// validate rows
	_validate = function(data) {

		for (var row = 0; row < 9; row++) {

			data[row].sort();

			for (var col = 0; col < 9; col++) {

				var value = data[row][col], next_value = data[row][col + 1];

				// check if value exists and is a valid number
				if (!(value && value > 0 && value < 10)) {
					return false;
				}

				// check if numbers are unique
				if (col !== 8 && value === next_value) {
					return false;
				}

			}
		}
		return true;
	};

	// reorganize data into three structures
	_reorganizeData = function(data) {
		_rows = data;
		_cols = [];
		_grid = [];

		// Prefilling the structures with empty array objects
		for (var i = 0; i < 9; i++) {
			_cols.push([]);
			_grid.push([]);
		}

		for (var row = 0; row < 9; row++) {

			for (var col = 0; col < 9; col++) {

				// Save each column in a new row
				_cols[col][row] = data[row][col];

				// Calculate grid identifiers
				gridRow = Math.floor(row / 3);
				gridCol = Math.floor(col / 3);
				gridIndex = gridRow * 3 + gridCol;

				// Save each grid in a new row
				_grid[gridIndex].push(data[row][col]);

			}
		}

	};

	// make functions public
	return {
		init : init,
		isValid : isValid
	};
})();
var mat = [];

function test(x, y, m) {
	var n = mat[x][y]
	var val = (n == m)
	// console.log(x, y, mat[x][y], n)

	var c = document.getElementById("" + x + "-" + y)
	if (val)
		c.style.color = "red"

	return val
}

function add(x, y, n) {
	var c = document.getElementById("" + x + "-" + y)
	c.value = n
	mat[x][y] = n

	document.getElementById("menu").innerHTML = Sudoku.init(mat).isValid().toString()

	// mat[x][y] = null
	// var val = true
	// console.log("------", x, y)
	// for (var k = 0; k < 9; k++)
	// for (var j = 0; j < 9; j++)
	// for (var i = 0; i < 9; i++) {
	// var sx = Math.floor(j / 3) * 3 + (i % 3)
	// var sy = Math.floor(k / 3) * 3 + Math.floor(i / 3)
	//
	// // vertical
	// if (x != i && y != k)
	// if (test(i, k, n))
	// document.getElementById("menu").innerHTML += "v<br>"
	// val = false;
	//
	// // horizontal
	// if (x != j && y != i)
	// if (test(j, i, n))
	// document.getElementById("menu").innerHTML += "h<br>"
	// val = false;
	//
	// // section
	// if (x != sx && y != sy)
	// if (test(sx, sy, n))
	// document.getElementById("menu").innerHTML += "s<br>"
	// val = false;
	//
	// }

	// c.style.color = (val ? "black" : "red")

}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (!(charCode >= 49 && charCode <= 57))
		return false;
	var s = evt.srcElement.id.split("-");
	// console.log(evt)
	var x = parseInt(s[0])
	var y = parseInt(s[1])

	add(x, y, (evt.which - 48))

	return true;
}

function start() {
	for (var i = 0; i < 9; i++) {
		mat[i] = [];
		for (var j = 0; j < 9; j++)
			mat[i][j] = null;
	}

	var d = document.getElementById("game")
	d.innerHTML = ""
	for (var i = 0; i < 9; i++) {
		var c = document.createElement("DIV")

		for (var j = 0; j < 9; j++) {
			var a = document.createElement("INPUT")
			a.setAttribute("id", "" + j.toString() + '-' + i.toString())
			a.setAttribute("onkeypress", "return isNumberKey(event)")
			a.setAttribute("maxlength", "1")
			a.setAttribute("size", "1")

			a.style["text-align"] = "center"
			a.style["font-size"] = "16px"
			a.style.margin = "3px"

			var spat = "10px"
			if (j % 3 === 0)
				a.style.marginLeft = spat
			if (i % 3 === 0)
				a.style.marginTop = spat

			var si = Math.floor(i / 3);
			var sj = Math.floor(j / 3);
			if ((si + sj) % 2 == 0) {
				a.style["background-color"] = "#bfbfbf"
			} else {
				a.style["background-color"] = "#e6e6e6"

			}

			d.appendChild(a)
		}
		d.innerHTML += "</br>"
	}
}

function check() {
}