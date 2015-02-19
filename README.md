# ComplexNumberJS

Z is a Javascript simple complex number helper class. It works with node.js as well as on all browser with js implementation.

Z Constructor
-------------

Z constructor can accept Z objects, String, and regular number (javascript primitive number or Number() objects).
Acceptable Strings can only contain "j", "<", "(", ")", ".", digits and whitespaces.

Constructor Usage Examples
---------------------------

General syntax

    var z = new Z(argument[, argument[, argument][, argument], ... ]);

1. Creating a "zero" complex number (0+j0)-

        var zeroZ = new Z();

    or

        var zeroZ = new Z(0);

2. Creating a a complex number in Rectangular form (3 - j4)-

        var z = new Z(3,-4);// with numbers as parameters

    or

        var temp = new Z("3-j4");//with string
        var z = new Z(temp);// with an object of Z

3. Encapsulating a javascript primitive number or Number() objects with the Z constructor;

        var z = new Z(180);// variable "z" is now 180 + j0 not 180 < 0

4. Creating a Z object as a sum of constructor-

        var z_par = new Z("j(-3)", "j3");// "z_par" equals 0 + j 0
        //falsy arguments values resolves to zero but logs warning.
        var z = new Z(undefined, 2, "-3.5j", "-2", z_par, null, "0+j3.5");//"z" equals 0 + j 0

5. Creating a Z object from an argument list containing polar form string of a complex number. Note that the argument must always be in degree (it just makes things easier for both of us)

        var z_par = new Z("1<180");// "z_par" equals 1 + j 0
        var z = new Z(null, "2",2, "-3.5j", "-2", z_par, "  0   +  j3.5", "1<180", );//"z" equals 0 + j 0, also notice the redundant whitespaces- the constructor still understands what you want

6. Performing addition operations in strings. Note that you can only do this in rectangular form-

        var z_par = new Z("    -j1 + 2 + j4 -2 +(-0 + j(-3))");// "z_par" equals 0 + j 0
        var z = new Z("    -j1 + 2 + j4 -2 +(-0 + j(-3))", "2",2, "-3.5j", "-2", z_par, "  0   +  j3.5", "1<180", );//"z" equals 0 + j 0, and yes! you can send in any number of arguments
        //NOTE!!! in polar form this functionality fails, try it out so you can recognize the error
        var z_par1 = new Z("1<180 180< 0");     // Really! what are you trying to do?
        var z_par2 = new Z("1<  180 <");        //We only did our best to process what we discussed so far
        var z_par3 = new Z("<  180");           //Come on! Computers are stupid, remember?
        var z_par4 = new Z("180<  ");           //I mean I'll will get confused myself
        var z_par5 = new Z("<180");             //Now I think you are trying to be malicious

    -Note For this version don't do any sort of multiplication in the constructor string parameter. This functionality may be handled in future versions


    This is just basis of this library's awesomeness. Read on to see more

Math Class Extension
--------------------

After this library is loaded your Math class definition would have experienced a little update. Don't worry, every behaviour remains unaltered even the behaviour of Math.sqrt(positiveRealNumber), i.e. it returns a real number and not one encapsulated in a Z object
You will now be able to find the square root of what I like to call the ancestor of all complex numbers, -1, as well as its decendants, objects of Z;

        var z = Math.sqrt(-1);

        if (z instanceof Z)
            console.log("Yaay! it returned a complex number object. see " + z.toString());
        else
            console.log("This will never print. Ah aha ...");

        z = Math.sqrt(z);

        if (z instanceof Z)
            console.log("Yippee! still returned a complex number object. see " + z.toString());
        else
            console.log("This will never print. Ah aha ...");
            //If I was so sure, why type it? Remember when programming you ca never be absolutely sure

        z = Math.sqrt(4);//"z" is now 2

        if (z instanceof Z)
            console.log("Aww! Somethings wrong, expected a primitive number and not a Z instance");
        else
            console.log("I told you not worry, I've got you covered.");


Error Handling
--------------

Hmm, I can hear Z.js screaming "Test me, make me fail. I wanted my developer(s) to make me better".

Z non-static methods
-------------------
Every method you would logically expect to return nothing returns "this" (this currently referenced object).
The parameter ARG could any thing that would pass as Z's constructor acceptable arguments- ie Z objects, String, and regular number (javascript primitive number or Number() objects)

        console.log(new Z());// to see a list of Z's non-static methods

| Name | Return type | Parameter list |
|------|-------------|----------------|
| isOpInRad | boolean | - |
| isInRectForm | boolean | - |
| doOpInPolForm | Z | - |
| doOpInRectForm | Z | - |
| doRepInRad | Z | - |
| toString | string | - |
| negate | Z | - |
| doInverse | Z | - |
| getAbs | number | - |
| getMod | number | - |
| getArg | number | - |
| getRe | number | - |
| getIm | number | - |
| multiplyBy | Z | ARG |
| divideBy | Z | ARG |
| addTo | Z | ARG |
| doPow | Z | number |
| doSqrt | Z | number |

All of the above stated Z method returning objects of type Z actually returns "this".

Z static methods
---------------
The parameter ARG could any thing that would pass as Z's constructor acceptable arguments- ie Z objects, String, and regular number (javascript primitive number or Number() objects)

        console.log(Z);// to see a list of Z's static methods

| Name | Return type | Parameter list |
|------|-------------|----------------|
| multiply | Z | ARG, ARG |
| divide | Z | ARG, ARG |
| add | Z | ARG, ARG |
| substract | Z | ARG, ARG |
| formatArg | number | number |
| sum | Z | ARG[, ARG[, ARG ...]] |
| doPow | Z | ARG, number |
| doSqrt | Z | ARG |


Doing Difference
----------------
To perform the difference operation, simply negate z2 and addTo to z1

        var z1 = new Z("2+3j");
        var z2 = new Z(-2, "-3j");
        console.log(z1.addTo(z2.negate()).toString());
        //Now z1 equals 0+j0
        //and z1 equals 2+j3

or just use

        var z = Z.substract("2+3j", new Z(-2,-3));
        //Now z equals 0+j0


We care for masochist too
-------------------------
We provided all y'all with a variable that you could also use instead of Z.

Say hello to "ComplexNumber()"

        var z = new ComplexNumber("Hello");// that's not what I mean
        var z = new ComplexNumber();// "z" equals 0+j0

The other usages of Z also follows. A small caveat is in order- "ComplexNumber()" can't be used with node.js

A word (mostly likely more) of caution
--------------------------------------

Please do endeavour to always use

        //assuming z is a Z instance
        z.isInRectForm();
        z.isOpInRad();

 to ensure you'd be processing Z instances instates you'd be aware of. You don't want to be working in degrees and get angles in radians. Believe me, i've been there..g,


Now, go forth and enjoy these bytes of awesomeness!
