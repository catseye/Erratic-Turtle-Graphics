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
        this.setTheta(0.0);
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

    this.setThetaDeg = function(theta) {
        this.setTheta(theta * DEG);
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

    /* dtheta is in radians */
    this.rotateBy = function(dtheta) {
        var error = (Math.random() - 0.5) * this.rotateError;
        this.setTheta(this.theta + dtheta + error);
    };

    this.rotateByDeg = function(dtheta) {
        this.rotateBy(dtheta * DEG);
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

    this.drawItems = function(y, drawItem) {
        this.x = this.canvas.width * (1/8);
        this.y = y;
        this.setTheta(-90.0 * DEG);

        for (var i = 0; i < 7; i++) {
            drawItem(i);
            this.x += this.canvas.width * (1/8);
            this.y = y;
        }
    };

    this.drawLine = function(size) {
        for (var i = 0; i < 50; i++) {
            this.moveBy(size);
            this.rotateBy(-180.0 * DEG);
        }
    };

    this.drawBox = function(size) {
        for (var i = 0; i < 400; i++) {
            this.moveBy(size);
            this.rotateBy(-90.0 * DEG);
        }
    };

    this.drawCircle = function(size, reps) {
        for (var i = 0; i < 90 * reps; i++) {
            this.moveBy(size);
            this.rotateBy(-4.0 * DEG);
        }
    };

    this.drawLines = function() {
        var $this = this;
        this.drawItems(this.canvas.height * (1/2), function(n) {
            $this.rotateError = 0.01 * (n/7);
            $this.moveError = 2.0 * (n/7);
            $this.drawLine(150);
        });
    };

    this.drawBoxes = function() {
        var $this = this;
        this.drawItems(this.canvas.height * (2/3), function(n) {
            $this.rotateError = 0.01 * (n/7);
            $this.moveError = 2.0 * (n/7);
            $this.drawBox(50);
        });
    };

    this.drawCircles = function() {
        var $this = this;
        this.drawItems(this.canvas.height * (7/8), function(n) {
            $this.rotateError = 0.025 * (n/7);
            $this.moveError = 0.333 * (n/7);
            $this.drawCircle(1.0, 50);
        });
    };

    this.drawCircleChain = function(size) {
        this.x = this.canvas.width;
        this.y = this.canvas.height * (1/2);
        this.setTheta(-90.0 * DEG);

        var SEGS = 7;

        for (var n = 0; n <= SEGS; n++) {
            this.rotateError = 0.025 * (n/SEGS);
            this.moveError = 1.5 * (n/SEGS);

            this.drawCircle(2.0, 20.5);
            this.rotateBy(-180.0 * DEG);
        }
        for (var n = SEGS; n >= 0; n--) {
            this.rotateError = 0.025 * (n/SEGS);
            this.moveError = 1.5 * (n/SEGS);

            this.drawCircle(2.0, 20.5);
            this.rotateBy(-180.0 * DEG);
        }
    };
};
