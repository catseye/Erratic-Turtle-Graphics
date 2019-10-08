/*
 * Small command language for Erratic Turtle Graphics.
 */

var Scanner = function() {
    this.init = function(cfg) {
        this.text = undefined;
        this.token = undefined;
        this.type = undefined;
        this.error = undefined;
        this.table = cfg.table;
        this.whitespacePattern = cfg.whitespacePattern || "^[ \\t\\n\\r]*";
        return this;
    };

    this.reset = function(text) {
        this.text = text;
        this.token = undefined;
        this.type = undefined;
        this.error = undefined;
        this.scan();
    };

    this.scanPattern = function(pattern, type) {
        var re = new RegExp(pattern);
        var match = re.exec(this.text);
        if (match === null) return false;
        this.type = type;
        this.token = match[1];
        this.text = this.text.substr(match[0].length);
        return true;
    };

    this.scan = function() {
        this.scanPattern(this.whitespacePattern, "whitespace");
        if (this.text.length === 0) {
            this.token = null;
            this.type = "EOF";
            return;
        }
        for (var i = 0; i < this.table.length; i++) {
            var type = this.table[i][0];
            var pattern = this.table[i][1];
            if (this.scanPattern(pattern, type)) return;
        }
        if (this.scanPattern("^([\\s\\S])", "unknown character")) return;
        // should never get here
    };
    
    this.expect = function(token) {
        if (this.token === token) {
            this.scan();
        } else {
            this.error = "expected '" + token + "' but found '" + this.token + "'";
        }
    };
    
    this.on = function(token) {
        return this.token === token;
    };
    
    this.onType = function(type) {
        return this.type === type;
    };
    
    this.checkType = function(type) {
        if (this.type !== type) {
            this.error = "expected " + type + " but found " + this.type + " (" + this.token + ")"
        }
    };
    
    this.expectType = function(type) {
        this.checkType(type);
        this.scan();
    };
    
    this.consume = function(token) {
        if (this.on(token)) {
            this.scan();
            return true;
        } else {
            return false;
        }
    };
};


var Parser = function() {
    this.scanner = undefined;

    this.init = function(text) {
        this.scanner = (new Scanner()).init({
          table: [
            ['paren',  "^(\\[|\\])"],
            ['atom',   "^([a-zA-Z]\\w*)"],
            ['number', "^(\\-?\\d+\\.?\\d*)"]
          ]
        });
        this.scanner.reset(text);
        return this;
    };

    /*
     * Instrs ::= {Instr}.
     */
    this.parseInstrs = function() {
        var instrs = [];
        while (this.scanner.token !== "]" && this.scanner.type !== "EOF") {
            var instr = this.parseInstr();
            instrs.push(instr);
        }
        return instrs;
    };

    /*
     * Instr ::= "fd" Number | "rt" Number | "lt" Number
     *         | "setxyp" Number Number | "shiftxyp" Number Number
     *         | "repeat" Number "[" Instrs "]".
     */
    this.parseInstr = function() {
        if (this.scanner.consume('fd')) {
            var val = this.scanner.token;
            this.scanner.expectType('number');
            return ["fd", parseFloat(val)];
        } else if (this.scanner.consume('rt')) {
            var val = this.scanner.token;
            this.scanner.expectType('number');
            return ["rt", parseFloat(val)];
        } else if (this.scanner.consume('lt')) {
            var val = this.scanner.token;
            this.scanner.expectType('number');
            return ["lt", parseFloat(val)];
        } else if (this.scanner.consume('setxyp')) {
            var xval = this.scanner.token;
            this.scanner.expectType('number');
            var yval = this.scanner.token;
            this.scanner.expectType('number');
            return ["setxyp", parseFloat(xval), parseFloat(yval)];
        } else if (this.scanner.consume('shiftxyp')) {
            var xval = this.scanner.token;
            this.scanner.expectType('number');
            var yval = this.scanner.token;
            this.scanner.expectType('number');
            return ["shiftxyp", parseFloat(xval), parseFloat(yval)];
        } else if (this.scanner.consume('repeat')) {
            var val = this.scanner.token;
            this.scanner.expectType('number');
            this.scanner.expect("[");
            var instrs = this.parseInstrs();
            this.scanner.expect("]");
            return ["repeat", parseFloat(val), instrs];
        } else {
            /* TODO: register some kind of error */
            var t = this.scanner.token;
            this.scanner.scan();
            return ["err", t];
        }
    };
};


function interpretInstrs(instrs, turtle) {
  var i = 0;
  while (i < instrs.length) {
    var instr = instrs[i];
    interpretInstr(instr, turtle);
    i += 1;
  }
}

function interpretInstr(instr, turtle) {
  switch (instr[0]) {
    case "fd":
      turtle.moveBy(instr[1]);
      break;
    case "rt":
      turtle.rotateByDeg(instr[1]);
      break;
    case "lt":
      turtle.rotateByDeg(-1 * instr[1]);
      break;
    case "setxyp":
      turtle.setXYProportional(instr[1], instr[2]);
      break;
    case "shiftxyp":
      turtle.shiftXYProportional(instr[1], instr[2]);
      break;
    case "repeat":
      for (var k = 0; k < instr[1]; k++) {
        interpretInstrs(instr[2], turtle);
      }
      break;
    default:
      //console.log("unrecognized", instr[0]);
      break;
  }
}
