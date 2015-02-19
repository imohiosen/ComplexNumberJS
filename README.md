# ComplexNumberJS
javascript simple Complex Numbers helper class

Z is a Javascript simple complex number helper class.

Z Constructor
Z constructor can accept Z objects, String, and regular number (javascript primitive or Number() objects).
Acceptable Strings can only contain "j", "<", "(", ")", ".", digits and whitespaces.

Constructor Usage Examples.
General syntax- var z = new Z(argument[, argument[, argument][, argument], ... ])

1. Creating a "zero" complex number (0+j0)-

        var zeroZ = new Z();

    or

        var zeroZ = new Z(0);

2. Creating a a complex number in Rectangular form (3 - j4)-
        var z = new Z(3,-4);/ with
    or
        var temp = new Z("3-j4");//with string
        var z = new Z(temp);// with an object of Z
    or
        var z = new Z(t);

3. Ecapsulating a javascript primitive number or Number() objects with the Z constructor;
        var z = new Z(180);// variable "z" is now 180 + j0 not 180 < 0

4. Creating a Z object as a sum of constructor-
        var z_par = new Z("j(-3)", "j3");// "z_par" equals 0 + j 0
        // falsy arguments values resolves to zero but logs warning.
        var z = new Z(undefined, 2, "-3.5j", "-2", z_par, null, "0+j3.5");//"z" equals 0 + j 0
5. Creating a Z object from an argument list containing polar form string of a complex number. Note that the argument must always be in degree (it just makes things easier for both of us)
        var z_par = new Z("1<180");// "z_par" equals 1 + j 0
        var z = new Z(null, "2",2, "-3.5j", "-2", z_par, "  0   +  j3.5", "1<180", );//"z" equals 0 + j 0, also notice the redundant whitespaces- the constructor still understands what you want


For string paramenters, the spaces can also be ommited

You can also use this library with node.js projects.