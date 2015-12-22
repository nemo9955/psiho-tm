/**
 * Created on Dec 21, 2015
 * 
 * @author: Mogoi Adrian
 */

var mat = new Sudoku();

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
	mat.setVal(x, y, n)

	for (var j = 0; j < 9; j++) {
		for (var i = 0; i < 9; i++) {
			var a = document.getElementById("" + i + "-" + j)
			if(a.readOnly === true)
				continue
			a.style.color = (mat.checkVal(i, j, mat.getVal(i, j)) ? "black" : "red")
		}
	}
	
	if(mat.gameFinished())
		document.getElementById("menu").innerHTML = "FINISHED !"

}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (!(charCode >= 49 && charCode <= 57) || evt.srcElement.readOnly === true)
		return false;
	var s = evt.srcElement.id.split("-");
	// console.log(evt)
	var x = parseInt(s[0])
	var y = parseInt(s[1])

	add(x, y, (evt.which - 48))

	return true;
}

function start() {

	mat.newGame()

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

			if (mat.getVal(j, i) !== 0) {
				a.setAttribute("readonly", "true")
				a.setAttribute("value", "" + mat.getVal(j, i))
				a.style.color="blue"
			}
			a.style["text-align"] = "center"
			a.style["font-size"] = "20px"
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