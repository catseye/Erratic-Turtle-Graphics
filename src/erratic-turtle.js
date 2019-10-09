var TWO_PI = Math.PI * 2;
var DEG = TWO_PI / 360.0;

var ErraticTurtle = function() {
    this.init = function(cfg) {
        this.canvas = cfg.canvas;
        this.ctx = this.canvas.getContext('2d');
        return this;
    };

    this.reset = function() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.setTheta(270 * DEG);
        this.ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        this.ctx.lineWidth = 1;

        this.rotateError = 0.0;
        this.moveError = 0.0;
    };

    /* theta is in radians */
    this.setTheta = function(theta) {
        this.theta = theta;
        this.dx = Math.cos(theta);
        this.dy = Math.sin(theta);
    };

    this.setXYProportional = function(xp, yp) {
        this.x = this.canvas.width * xp;
        this.y = this.canvas.height * yp;
    };

    this.shiftXYProportional = function(dxp, dyp) {
        this.x += this.canvas.width * dxp;
        this.y += this.canvas.height * dyp;
    };

    this.setErrorRates = function(rerr, merr) {
        this.rotateError = rerr;
        this.moveError = merr;
    };

    this.shiftErrorRates = function(drerr, dmerr) {
        this.rotateError += drerr;
        this.moveError += dmerr;
    };

    /* dtheta is in degrees */
    this.rotateBy = function(dtheta) {
        var error = (Math.random() - 0.5) * this.rotateError;
        this.setTheta(this.theta + (dtheta * DEG) + error);
    };
    
    this.moveBy = function(units) {
        var error = (Math.random() - 0.5) * this.moveError;

        var nx = this.x + this.dx * (units + error);
        var ny = this.y + this.dy * (units + error);

        var ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        this.x = nx;
        this.y = ny;
    };
};
