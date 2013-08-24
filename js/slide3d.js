var Slide3D = function(newIndex, x, y) {
	this.index = newIndex;
	this.width = 30;
	this.height = 15;
	this.pos = [x, y];
	this.prevPos = [undefined, undefined];
};