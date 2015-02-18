
Zsqrt = Math.sqrt;

Math.sqrt = function(parameter) {
    var z = new Z(parameter);
    if (z && !(parameter >= 0 )){
        z.doSqrt(z);
        return z;
    }
    return Zsqrt(parameter);
};


var Z = function (a, b) {

    /*
     This construction accepts Strings of the formats - "Mod < Arg", "Re + jIm",
     and process accordingly
     */

    //FIELD DECLARATION - ALL FIELDS ARE CURRENTLY ARE PRIVATE
    //ACCESS WITH set AND/OR get METHODS
    var Re = 0;
    var Im = 0;
    var ZInRectForm = true;
    var argInRad = true;


    var processPar = function(){
        if(!b){
            if (typeof a === "string") {
                var args = a.match(/\s*-?\d+\s*\.?\d*/g);
                if(a.match(/-? \d+/g))
                    throw new Error("Unable to parse ComplexNumber: Remove whitespace character from between sign and number?");
                if (args.length <= 2) {
                    var temp1, temp2;
                    try{
                        temp1 = a.match(/j/gi).length !== 1;
                    }catch (e){
                        if (e instanceof TypeError ) temp1 = false;
                        else throw e;
                    }
                    try{
                        temp2 = a.match(/</gi).length !== 1;
                    }catch (e){
                        if (e instanceof TypeError ) temp2 = false;
                        else throw e;
                    }
                    if ((temp1||temp2))
                        throw new Error(
                            "Unable to parse ComplexNumber: Why more that one 'j'?\n" +
                            "For addition of Z objects use this syntax :\n" +
                            "Z.add(new Z('j Im'), new Z(0,Im)) or\n" +
                            "Z.sum(new Z(null,Im) , [new Z(0,Im)], ['4j', new Z(3)], Math.sqrt(-1))\n"

                        );

                    else if (!a.match(/j/gi) && args.length === 1) {
                        Re = parseFloat(args[0]);
                        Im = 0;
                    } else if ((!a.match(/j/gi) && !a.match(/</gi)) && args.length >= 1) {
                        throw new Error("Unable to parse ComplexNumber: Please don't be malicious or use the built-in functionality for simple operations");

                    } else if (a.match(/j/gi) && args.length === 1) {
                        Re = 0;
                        Im = parseFloat(args[0]);
                    } else if (a.match(/</gi) && args.length === 2) {
                        //arg must be  in degrees
                        Re = parseFloat(args[0]) * Math.cos(parseFloat(args[1]) / 180 * Math.PI);
                        Im = parseFloat(args[0]) * Math.sin(parseFloat(args[1]) / 180 * Math.PI);
                        argInRad = false;
                        ZInRectForm = false;
                    } else if (Math.abs(a.search(args[0]) - a.search("j")) > Math.abs(a.search(args[1]) - a.search("j"))) {
                        Re = parseFloat(args[0]);
                        Im = parseFloat(args[1]);
                    } else {
                        Re = parseFloat(args[1]);
                        Im = parseFloat(args[0]);
                    }
                } else {
                    throw new Error("Unable to parse ComplexNumber: Too many Re and/or Im");
                }
            } else if (typeof a === "number") {
                Re = a;
                Im = 0;
            } else if (a instanceof Z) {
                Re = a.getRe();
                Im = a.getIm();
                ZInRectForm = a.isInRectForm();
                argInRad = a.isOpInRad();
            } else {
                throw new Error("Unable to construct ComplexNumber object: Constructor takes either strings or number(see Documentation). \n--->created object in BAD state");
            }
        } else {
            if (typeof a === "number" && typeof b === "number") {
                Re = a;
                Im = b;
            } else if (typeof a === "string" && typeof b === "string") {
                Re = parseFloat(a);
                Im = parseFloat(b);
            } else if (!a){
                Re = 0;
                Im = b;

            } else {
                throw new Error("Unable to construct ComplexNumber object: Constructor takes either strings or numbers (see Documentation) \nobject in BAD state");
            }
        }
        //INITIALIZATION PROCESSING
    };

    processPar();

    this.isOpInRad = function () {
        return argInRad;
    };

    this.isInRectForm = function () {
        return ZInRectForm;
    };

    this.doOpInPolForm = function () {
        ZInRectForm = false;
        return this
    };
    this.doOpInRectForm = function () {
        ZInRectForm = true;
        return this;
    };
    this.doRepInRad = function () {
        argInRad = true;
        return this;
    };
    this.doRepInDeg = function () {
        argInRad = false;
        return this;
    };
    this.toString = function () {
        return ZInRectForm? Re + " " + (Im<0?"-":"+") + " j" +Math.abs(Im):  this.getAbs() + " < " + this.getArg();
    };
    this.valueOf = function () {
        return this.toString();
    };
    this.negate =  function () {
        Re = -Re;
        Im = -Im;
        return this;
    };
    this.doInverse = function () {
        this.doPow(-1);
        return this;
    };
    this.getAbs = function () {
        return Zsqrt(Math.pow(Re, 2) + Math.pow(Im, 2));

    };
    this.getMod = function () {
        return this.getAbs();
    };
    this.getArg = function () {
        if ( (Re * Im) > 0)
            if( Re > 0) {
                return argInRad ? (Math.atan(Im/Re)) : (Math.atan(Im/Re)*180/Math.PI);
            } else {
                return argInRad ? (Math.PI + Math.atan(Im/Re)) : (180 + Math.atan(Im/Re)*180/Math.PI);
            }
        else
        if (Re > 0)
            return argInRad ? (2  * Math.PI + Math.atan(Im/Re)) : (360 + Math.atan(Im/Re)*180/Math.PI);
        else
            return argInRad ? (Math.PI + Math.atan(Im/Re)) : 180 + (Math.atan(Im/Re)*180/Math.PI);

    };
    this.getRe = function () {
        return Re;
    };
    this.getIm = function () {
        return Im;
    };
    this.divideBy = function (that) {
        that = new Z(that);
        this.multiplyBy(that.doInverse());
        return this;
    };
    this.multiplyBy = function (that) {
        that = new Z(that);
        var temp = that.isOpInRad();
        this.doOpInPolForm();
        this.doRepInRad();
        that.doOpInPolForm();
        that.doRepInRad();
        var mod = this.getAbs() * that.getAbs();
        var arg = Z.formatArg(this.getArg() + that.getArg());
        Re = mod * Math.cos(arg);
        Im = mod * Math.sin(arg);
        if (!temp) that.doRepInDeg();
        return this;
    };
    this.addTo = function (that) {
        that = new Z(that);
        Re = this.getRe() + that.getRe();
        Im = this.getIm() + that.getIm();
        return this;
    };
    this.doPow = function(power) {
        var z = Z.pow(this, power);
        Re = z.getAbs() * Math.cos(z.getArg());
        Im = z.getAbs() * Math.sin(z.getArg());
        return this;
    };
    this.doSqrt = function () {
        this.doPow(0.5);
        return this;
    };

};

Z.sqrt = function (z) {
    return Z.pow(new Z(z), 0.5);;
};
Z.add = function (z1, z2) {
    return (new Z(z1)).addTo(new Z(z2));
};
Z.substract = function (z1, z2) {
    return (new Z(z1)).addTo((new Z(z2)).negate());
};
Z.divide = function (z1,z2) {
    return (new Z(z1)).divideBy(new Z(z2));
};
Z.multiply = function (z1,z2) {
    return (new Z(z1)).multiplyBy(new Z(z2));
};
Z.pow = function(z, power) {
    if (typeof power !== "number")
        throw new Error("Sorry, you can only raise to the power of real numbers");
    z = new Z(z);
    var mod = Math.pow(z.getAbs(), power);
    var arg = Z.formatArg(z.getArg() * power);
    return (new Z(mod * Math.cos(arg), mod * Math.sin(arg))).doOpInPolForm();
};
Z.formatArg = function(arg) {
    if (arg<0) arg+= 2 * Math.PI;
    if (arg> (2*Math.PI)) arg %= (2*Math.PI);
    return arg;
};
Z.sum = function() {
    var z = new Z(0,0);
    for (prop in arguments)
        if (arguments[prop] instanceof Array)
            for (key in arguments[prop]){
                z.addTo(new Z(arguments[prop][key]));
                console.log("in");
            }
        else
            z.addTo(new Z(arguments[prop]));
    return z;
};

var ComplexNumber = Z;

try{
    module.exports = Z;
    console.log("Complex Number Class Loaded");
} catch (e) {
    console.log(e.message);
    console.log("Don't worry! Complex Number Class Loaded");
} finally {
    console.log("...enjoy the awesomeness.");
}
