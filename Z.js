""
/**
 * Created by abraham on 2/17/15.
 */


Zsqrt = Math.sqrt;

Math.sqrt = function(parameter) {
    var z = Z(parameter);
    if (z)
        return z.sqrt();
    return Zsqrt(parameter);
};


function Z (a, b) {

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

    //INITIALIZATION PROCESSING
    if (typeof a === "number" && typeof b === "number") {
        Re = a;
        Im = b;
    } else if (typeof a === "string" && typeof b === "string") {
        Re = parseFloat(a);
        Im = parseFloat(b);
    } else if (a instanceof Z) {
        Re = a.getRe();
        Im = a.getIm();
        ZInRectForm = a.isInRectForm();
        argInRad = a.isOpInRad();
    }else{
    }

    this.isOpInRad = function () {
        return argInRad;
    };

    this.isInRectForm = function () {
        return ZInRectForm;
    };

    var processStr = function (a) {

    };

    var prcessStrNumArgMix;

    //this.getPolar = function () {};
    //this.getRect = function () {};
    this.doOpInPolForm = function () {
        ZInRectForm = false;
    };
    this.doOpInRectForm = function () {
        ZInRectForm = true;
    };
    this.toString = function () {
        return ZInRectForm? Re + " + j " +Im:  this.getAbs() + " < " + this.getArg();
    };
    this.valueOf = function () {
        return this.toString();
    };
    this.negate =  function () {
        Re = -Re;
        Im = -Im;
    };
    this.doInverse = function () {
        this.doPow(-1);
    };
    this.getAbs = function () {
        return Math.sqrt(Math.pow(Re, 2) + Math.pow(Im, 2));

    };
    this.getMod = function () {
        return this.getAbs();
    };
    this.getArg = function () {
        if ( (Re * Im) > 0)
            if( Re > 0) {
                return argInRad ? Math.atan(Im/Re) : Math.atan(Im/Re*180/Number.PI);
            } else {
                return argInRad ? Math.PI + Math.atan(Im/Re) : 180 + Math.atan(Im/Re*180/Number.PI);
            }
        else
        if (Re > 0)
            return argInRad ? 2  * Math.PI + Math.atan(Im/Re) : 360 + Math.atan(Im/Re*180/Number.PI);
        else
            return argInRad ? Math.PI + Math.atan(Im/Re) : 180 + Math.atan(Im/Re*180/Number.PI);

    };
    this.getRe = function () {
        return Re;
    };
    this.getIm = function () {
        return Im;
    };
    this.divideBy = function (that) {
        var mod = this.getAbs() / that.getAbs();
        var arg = this.getArg() - that.getArg();
        Re = mod * Math.cos(arg);
        Im = mod * Math.sin(arg);
    };
    this.multiplyBy = function (that) {
        var mod = this.getAbs() * that.getAbs();
        var arg = this.getArg() + that.getArg();
        Re = mod * Math.cos(arg);
        Im = mod * Math.sin(arg);

    };
    this.addTo = function (that) {
        Re = this.getRe() + that.getRe();
        Im = this.getIm() + that.getIm();
    };
    //Not Recommended
    this.differenceFrom = function (that) {
        var _Re = this.getRe() - that.getRe();
        var _Im = this.getIm() - that.getIm();
        return new Z(_Re, _Im);
    };
    this.doPow = function(power) {
        var mod = Math.pow(this.getAbs(), power);
        var arg = this.getArg() * power;
        Re = mod * Math.cos(arg);
        Im = mod * Math.sin(arg);
    };
    this.doSqrt = function () {
        this.doPow(0.5);
    };

};

Z.sqrt = function (z) {
    Z.pow(z, 0.5);
    return z;
};

Z.add = function (z1, z2) {
    var _Re = z1.getRe() + z2.getRe();
    var _Im = z1.getIm() + z2.getIm();
    return new Z(_Re, _Im);
};
Z.substract = function (z1, z2) {
    var _Re = z1.getRe() - z2.getRe();
    var _Im = z1.getIm() - z2.getIm();
    return new Z(_Re, _Im);
};

Z.divide = function (z1,z2) {
    var mod = z1.getAbs() / z2.getAbs();
    var arg = z1.getArg() - z2.getArg();
    return new Z(mod * Math.cos(arg), mod * Math.sin(arg));
};
Z.multiply = function (z1,z2) {
    var mod = z1.getAbs() * z2.getAbs();
    var arg = z1.getArg() + z2.getArg();
    return new Z(mod * Math.cos(arg), mod * Math.sin(arg));
};
Z.pow = function(z, power) {
    var mod = Math.pow(z.getAbs(), power);
    var arg = z.getArg() * power;
    return new Z(mod * Math.cos(arg), mod * Math.sin(arg));
};