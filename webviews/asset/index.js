var game = {
	num: 0,
	counts: 0,
	score: 0,
	step: 0,
	arr: [],
	arr1: [],
	done: false,
	init: function() {
		this.add()
		this.add()
	},
	add: function() {
		var x = false,
			y = false
		Math.random() > 0.5 ? this.num = 2 : this.num = 4
		var Lindex = Math.floor(Math.random() * 4),
			Rindex = Math.floor(Math.random() * 4),
			dom = document.getElementsByClassName('line' + Lindex)[0].getElementsByTagName('li')[Rindex]
		if (dom.innerHTML == '') {
			dom.innerHTML = '<div class="full style' + this.num + ' new "><span>' + this.num + '</span></div>';
		} else {
			this.count()
			if (this.counts == 0) {
				//判断横向是否有值相同
				outerloop0: for (var i = 0; i < 4; i++) {
					for (var j = 0; j < this.arr[i].length - 1; j++) {
						if (this.arr[i][j] == this.arr[i][j + 1]) {
							x = true
							break outerloop0;
						}
					}
				}
				//判断纵向是否有值相同
				outerloop1: for (var i = 0; i < 4; i++) {
					for (var j = 0; j < this.arr1[i].length - 1; j++) {
						if (this.arr1[i][j] == this.arr1[i][j + 1]) {
							y = true
							break outerloop1
						}
					}
				}
				if (!x && !y) {
					if (this.done == false) {
						if (callnet != null) {
							callnet(this.score)
						}
						document.getElementById('mask').style = "";
						this.done = true;
					}
				} else if (x) {
					if (arguments[0].keyCode == 37 || arguments[0].keyCode == 39) {
						this.step++
					}
				} else if (y) {
					if (arguments[0].keyCode == 38 || arguments[0].keyCode == 40) {
						this.step++
					}
				}
			}
			else {
				this.add()
			}
		}
	},
	left: function() {
		//数组值合并
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < this.arr[i].length - 1; j++) {
				if (this.arr[i][j] == this.arr[i][j + 1]) {
					this.score += this.arr[i][j] * 2
					this.arr[i][j] += this.arr[i][j]
					this.arr[i].splice(j + 1, 1)
				}
			}
		}
		//赋值给dom
		for (var i = 0; i < 4; i++) {
			len = this.arr[i].length
			for (var m = 0; m < 4; m++) {
				if (this.arr[i][m] == null) {
					document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[m].innerHTML = '';
				}
			}
			for (var j = 0; j < len; j++) {
				let temps = document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[j].innerHTML;
				let tempnum = temps.slice(temps.indexOf('span>') + 5, temps.lastIndexOf('</span'));
				if (this.arr[i][j] != parseInt(tempnum)) {
					document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[j].innerHTML =
						'<div class="full style' + this.arr[i][j] + '"><span>' + this.arr[i][j] + '</span></div>';
				}
			}
		}
		if (this.counts != 0) this.step++
	},
	right: function() {
		//数组值合并
		for (var i = 0; i < 4; i++) {
			for (var j = this.arr[i].length - 1; j > 0; j--) {
				if (this.arr[i][j] == this.arr[i][j - 1]) {
					this.score += this.arr[i][j - 1] * 2
					this.arr[i][j] += this.arr[i][j]
					this.arr[i].splice(j - 1, 1)
				}
			}
		}
		//赋值给dom
		for (var i = 0; i < 4; i++) {
			len = this.arr[i].length
			for (var m = 0; m < 4; m++) {
				if (this.arr[i][this.arr[i].length - (4 - m)] == null) {
					document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[m].innerHTML = '';
				}
			}
			for (var j = 0; j < len; j++) {
				let temps = document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[3 - j].innerHTML;
				let tempnum = temps.slice(temps.indexOf('span>') + 5, temps.lastIndexOf('</span'));
				if (this.arr[i][len - 1 - j] != parseInt(tempnum)) {
					document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[3 - j].innerHTML =
						'<div class="full style' + this.arr[i][len - 1 - j] + '"><span>' + this.arr[i][len - 1 - j] + '</span></div>';
				}
			}
		}
		if (this.counts != 0) this.step++
		this.log(this.arr)
	},
	up: function() {
		//数组值合并
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < this.arr1[i].length - 1; j++) {
				if (this.arr1[i][j] == this.arr1[i][j + 1]) {
					this.score += this.arr1[i][j] * 2
					this.arr1[i][j] += this.arr1[i][j]
					this.arr1[i].splice(j + 1, 1)
				}
			}
		}
		//赋值给dom
		for (var i = 0; i < 4; i++) {
			len = this.arr1[i].length
			for (var m = 0; m < 4; m++) {
				if (this.arr1[i][m] == null) {
					document.getElementsByClassName('line' + m)[0].getElementsByTagName('li')[i].innerHTML = ''
				}
			}
			for (var j = 0; j < len; j++) {
				let temps = document.getElementsByClassName('line' + j)[0].getElementsByTagName('li')[i].innerHTML;
				let tempnum = temps.slice(temps.indexOf('span>') + 5, temps.lastIndexOf('</span'));
				if (this.arr1[i][j] != parseInt(tempnum)) {
					document.getElementsByClassName('line' + j)[0].getElementsByTagName('li')[i].innerHTML =
						'<div class="full style' + this.arr1[i][j] + '"><span>' + this.arr1[i][j] + '</span></div>';
				}
			}
		}
		if (this.counts != 0) this.step++
	},
	down: function() {
		//数组值合并
		for (var i = 0; i < 4; i++) {
			for (var j = this.arr1[i].length - 1; j > 0; j--) {
				if (this.arr1[i][j] == this.arr1[i][j - 1]) {
					this.score += this.arr1[i][j - 1] * 2
					this.arr1[i][j] += this.arr1[i][j]
					this.arr1[i].splice(j - 1, 1)
				}
			}
		}
		//赋值给dom
		for (var i = 0; i < 4; i++) {
			len = this.arr1[i].length
			for (var m = 0; m < 4; m++) {
				if (this.arr1[i][3 - m] == null) {
					document.getElementsByClassName('line' + m)[0].getElementsByTagName('li')[i].innerHTML = '';
				}
			}
			for (var j = 0; j < len; j++) {
				let temps = document.getElementsByClassName('line' + (4 - len + j))[0].getElementsByTagName('li')[i].innerHTML;
				let tempnum = temps.slice(temps.indexOf('span>') + 5, temps.lastIndexOf('</span'));
				if (this.arr1[i][j] != parseInt(tempnum)) {
					document.getElementsByClassName('line' + (4 - len + j))[0].getElementsByTagName('li')[i].innerHTML =
						'<div class="full style' + this.arr1[i][j] + '"><span>' + this.arr1[i][j] + '</span></div>';
				}
			}
		}
		if (this.counts != 0) this.step++
	},
	count: function() {
		var inner,
			inner1,
			m = 0,
			n = 0
		this.counts = 0
		//横向数组，用于左右操作
		for (var i = 0; i < 4; i++) {
			this.arr[i] = []
			m = 0
			for (var j = 0; j < 4; j++) {
				inner = document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[j].innerHTML
				if (inner) {
					this.arr[i][m] = Number(inner.slice(inner.indexOf('span>') + 5, inner.lastIndexOf('</span')))
					m++
				} else {
					this.counts++
				}
			}
		}
		this.log(this.arr)
		//纵向数组用于上下操作
		for (var x = 0; x < 4; x++) {
			this.arr1[x] = []
		}
		for (var x = 0; x < 4; x++) {
			n = 0
			for (var y = 0; y < 4; y++) {
				inner1 = document.getElementsByClassName('line' + y)[0].getElementsByTagName('li')[x].innerHTML
				if (inner1) {
					this.arr1[x][n] = Number(inner1.slice(inner1.indexOf('span>') + 5, inner1.lastIndexOf('</span')))
					n++
				}
			}
		}
	},
	log: function(x) {},
	update: function() {
		document.getElementById('score').innerHTML = this.score;
		document.getElementById('step').innerHTML = this.step;
	}
}
window.onload = function() {
	game.init();
}

function reinit() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			document.getElementsByClassName('line' + i)[0].getElementsByTagName('li')[j].innerHTML = "";
		}
	}
	game.num = 0;
	game.counts = 0;
	game.score = 0;
	game.step = 0;
	game.arr = [];
	game.arr1 = [];
	game.done = false;
	game.init();
	document.getElementById('mask').style = "display: none;";
}
document.onkeydown = function(e) {
	game.count()
	e = e || window.event
	switch (e.keyCode) {
		case 37:
			game.left()
			game.add(e)
			game.update()
			break
		case 38:
			game.up()
			game.add(e)
			game.update()
			break
		case 39:
			game.right()
			game.add(e)
			game.update()
			break
		case 40:
			game.down()
			game.add(e)
			game.update()
			break
		default:
			break
	}
}
var temp = null;
var safe = true;
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
	if (temp) {
		if (safe == false) {
			return;
		}
		let x = e.touches[0].screenX - temp[0];
		let y = e.touches[0].screenY - temp[1];
		if (x > 40 || x < -40 || y > 40 || y < -40) {
			game.count();
		}
		if (x > 40) {
			game.right();
		} else if (x < -40) {
			game.left()
		} else if (y > 40) {
			game.down()
		} else if (y < -40) {
			game.up()
		}
		if (x > 40 || x < -40 || y > 40 || y < -40) {
			game.add(e);
			game.update();
			safe = false;
		}
	} else {
		temp = [e.touches[0].screenX, e.touches[0].screenY];
	}

}, {
	passive: false
});
document.addEventListener('touchstart', function(e) {
	e.preventDefault();
	temp = null;
	safe = true;
}, {
	passive: false
});
document.addEventListener('touchstart', function(e) {
	if(game.done == true){
		if(confirm('确认是否重新开始？'))reinit();
	}
})