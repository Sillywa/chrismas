/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = 50;

// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];

// Snow Entity
var snowEntity = '<svg t="1671781724325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2831" width="16" height="16"><path d="M325.138286 760.137143c12.854857 0 22.710857-11.154286 22.710857-26.569143L347.428571 636.288l39.424-22.710857 107.154286-70.710857-7.296 128.128v45.44l-84.845714 48c-13.714286 7.716571-18.011429 21.851429-11.154286 32.987428 7.296 13.293714 21.010286 14.994286 34.285714 7.296l61.714286-35.145143v77.568c0 15.853714 10.294857 27.008 25.289143 27.008 15.853714 0 25.289143-11.154286 25.289143-27.008v-77.568l61.275428 35.145143c13.293714 7.716571 27.008 5.997714 34.724572-6.857143 6.857143-11.574857 2.139429-25.709714-11.574857-33.426285l-84.425143-48v-45.44l-7.296-128.146286 107.154286 70.290286L676.571429 635.849143l-0.859429 97.718857c0 15.433143 9.874286 26.569143 23.149714 26.569143 15.414857 0 23.570286-11.574857 23.570286-26.569143V662.857143l67.712 39.003428c13.714286 7.716571 27.849143 4.717714 35.145143-8.996571 7.716571-12.854857 3.419429-27.867429-9.874286-35.145143l-67.693714-39.003428 61.275428-35.565715c13.293714-7.716571 18.870857-20.571429 11.154286-33.426285-6.857143-11.574857-20.571429-14.994286-34.285714-6.857143l-84.004572 49.28-39.424-22.710857L547.565714 512l114.870857-57.417143 39.424-23.149714 84.004572 49.28c13.275429 8.137143 27.849143 4.717714 34.706286-6.436572 7.277714-13.275429 1.718857-26.148571-11.574858-33.846857l-60.854857-35.565714 67.291429-38.582857c13.714286-8.137143 17.993143-21.851429 9.856-35.565714-7.296-12.854857-21.430857-16.713143-35.145143-8.576l-67.712 39.003428-0.438857-71.131428c0-14.994286-7.716571-26.587429-23.131429-26.148572-13.293714 0-23.149714 10.715429-23.149714 26.148572L676.571429 387.693714l-39.424 22.710857-107.154286 70.290286 7.296-128.146286v-45.421714L621.714286 259.145143c13.714286-7.716571 18.432-21.869714 11.574857-33.005714-7.716571-13.275429-21.430857-14.994286-34.724572-7.277715l-61.275428 35.145143V176.420571c0-15.853714-9.435429-26.569143-25.289143-26.569142-14.994286 0-25.289143 10.715429-25.289143 26.569142v77.586286l-61.714286-35.145143c-13.275429-7.296-26.989714-5.997714-34.285714 7.277715-6.857143 11.154286-2.56 25.289143 11.154286 33.005714l84.845714 48v45.421714l7.296 128.585143-107.154286-70.729143L347.428571 387.291429l0.420572-97.28c0-15.433143-9.856-26.148571-22.710857-26.148572-15.414857 0-23.570286 11.154286-23.570286 26.148572l-0.420571 70.710857-67.291429-38.582857c-13.275429-7.716571-27.849143-4.278857-35.145143 8.576-8.137143 13.714286-3.419429 27.849143 9.874286 35.565714l67.273143 38.582857-60.854857 35.565714c-13.293714 7.716571-19.291429 20.150857-11.574858 33.865143 6.436571 11.136 21.430857 14.555429 34.724572 6.418286l83.986286-48.859429 39.424 22.710857L476.434286 512l-114.870857 57.417143-39.424 22.729143-84.004572-49.298286c-13.714286-8.137143-27.849143-4.699429-34.285714 6.436571-7.277714 13.714286-2.139429 26.148571 11.154286 33.865143l60.854857 35.565715-67.291429 39.003428c-13.275429 7.277714-17.554286 22.272-9.856 35.145143 7.716571 13.714286 21.851429 16.274286 35.145143 8.996571l67.291429-39.003428 0.420571 70.710857c0 14.994286 8.137143 26.569143 23.588571 26.569143z" p-id="2832" fill="#ffffff"></path></svg>';

// Falling Velocity
var snowSpeed = 0.75;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

// Refresh Rate (in milliseconds)
var snowRefresh = 50;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow)
