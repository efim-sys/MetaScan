const c = document.getElementById("result")
const ctx = c.getContext("2d")
let logo = new Image()
logo.src = "post-ru-logo.webp"

let barcode = new Image()

let code = "1234567890"

let bar_type = "code128"

let font_size = 150

const font_ratio = 2

const code_input = document.getElementById("code")
const type_input = document.getElementById("bar_type")
const logo_input = document.getElementById("logo_type")

function draw() {
	JsBarcode(barcode, code, {
		height: 300,
		width: 8,
		displayValue: false,
		format: bar_type
	})
		
}

function printCanvas() {
	let win=window.open();
	win.document.write("<br><img style='width: 1000; height: 120' src='"+c.toDataURL()+"'/>");
	win.print();
	win.location.reload();
}

barcode.addEventListener("load", function() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, c.width, c.height)
	ctx.drawImage(logo, c.width - logo.width, 28)
	ctx.drawImage(barcode, 0, 20)
	let text_limit_left = barcode.width + 50
	let text_limit_right = c.width - logo.width - 50
	let text_area = text_limit_right - text_limit_left
	font_size = (text_area / code.length) * font_ratio
	if(font_size > 150) font_size = 150
	let text_width = (code.length * font_size) / font_ratio
	let text_left = text_limit_left + (text_area - text_width) / 2
	ctx.fillStyle = "gray"
	ctx.font = font_size + "px Ubuntu Mono"
	ctx.fillText(code, text_left, c.height/2+font_size/4)
})


logo.addEventListener("load", draw)
code_input.addEventListener("change", function() {
	code = code_input.value
	draw()
})
type_input.addEventListener("change", function() {
	
	bar_type = type_input.value
	draw()
})
logo_input.addEventListener("change", function() {
	logo.src = logo_input.value
})
