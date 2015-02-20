var presentation = {
    "name": "ComplexNumberJS",
    "startNote": "Z is a Javascript simple complex number helper class. It works with node.js as well as on all browser with js implementation.",
    "demo": [
        {
            "title": "Z Constructor",
            "body": [
                {
                    "descr": "Z constructor can accept Z objects, String, and regular number (javascript primitive number or Number() objects). Acceptable Strings can only contain , digits and whitespaces."
                }
            ]
        },
        {
            "title": "Constructor Usage Examples",
            "body": [
                {
                    "descr": "General syntax",
                    "code": [
                        "var z = new Z(argument[, argument[, argument][, argument], ... ]);"
                    ]
                },
                {
                    "descr": "1. Creating a 'zero' complex number (0+j0)",
                    "code": [
                        "var zeroZ = new Z();",
                        "var zeroZ = new Z(0);"

                    ]
                },
                {
                    "descr": "2. Creating a a complex number in Rectangular form (3 - j4)",
                    "code": [
                        "var temp = new Z('3-j4');//with string",
                        "var z = new Z(temp);// with an object of Z"
                    ]
                },
                {
                    "descr": "3. Encapsulating a javascript primitive number or Number() objects with the Z constructor;",
                    "code": [
                        "var z = new Z(180);// variable 'z' is now 180 + j0 not 180 < 0"
                    ]
                },
                {
                    "descr": "4. Creating a Z object as a sum of constructor",
                    "code": [
                        "var z_par = new Z('j(-3)', 'j3');// 'z_par' equals 0 + j 0"
                    ]
                },
                {
                    "descr": "5. Creating a Z object from an argument list containing polar form string of a complex number. Note that the argument must always be in degree (it just makes things easier for both of us)",
                    "code": [
                        "var z_par = new Z('1<180');// 'z_par' equals 1 + j 0",
                        "var z = new Z(null, '2',2, '-3.5j', '-2', z_par, '  0   +  j3.5', '1<180', );//'z' equals 0 + j 0, also notice the redundant whitespaces- the constructor still understands what you want"
                    ]
                },
                {
                    "descr": "6. Performing addition operations in strings. Note that you can only do this in rectangular form",
                    "code": [
                        "var z_par = new Z('    -j1 + 2 + j4 -2 +(-0 + j(-3))');// 'z_par' equals 0 + j 0",
                        "var z = new Z('    -j1 + 1 + j4 -2 +(-0 + j(-3))', '2',2, '-3.5j', '-2', z_par, '  0   +  j3.5', '1<180', );//'z' equals 0 + j 0, and yes! you can send in any number of arguments",
                        "//NOTE!!! in polar form this functionality fails, try it out so you can recognize the error",
                        "var z_par1 = new Z('1<180 180< 0');     // Really! what are you trying to do?",
                        "var z_par2 = new Z('1<  180 <');        //We only did our best to process what we discussed so far",
                        "var z_par3 = new Z('<  180');           //Come on! Computers are stupid, remember?",
                        "var z_par4 = new Z('180<  ');           //I mean I'll will get confused myself",
                        "var z_par5 = new Z('<180');             //Now I think you are trying to be malicious"
                    ]

                },
                {
                    "descr": "-Note For this version don't do any sort of multiplication in the constructor string parameter. This functionality may be handled in future versions"
                },
                {
                    "descr": "This is just basis of this library's awesomeness. Read on to see more"
                }




            ]
        },
        {
            "title": "Math Class Extension",
            "body": [
                {
                    "descr": "After this library is loaded your Math class definition would have experienced a little update. Don't worry, every behaviour remains unaltered even the behaviour of Math.sqrt(positiveRealNumber), i.e. it returns a real number and not one encapsulated in a Z object You will now be able to find the square root of what I like to call the ancestor of all complex numbers, -1, as well as its decendants, objects of Z;",
                    "code": [
                        "var z = Math.sqrt(-1);\nif (z instanceof Z)\n\tconsole.log('Yaay! it returned a complex number object. see ' + z.toString());\nelse\n\tconsole.log('This will never print. Ah aha ...');\n",
                        "z = Math.sqrt(z);\nif (z instanceof Z)\n\tconsole.log('Yippee! still returned a complex number object. see ' + z.toString());\nelse\n\tconsole.log('This will never print. Ah aha ...');\n\t//If I was so sure, why type it? Remember when programming you ca never be absolutely sure",
                        "z = Math.sqrt(4);//'z' is now 2\nif (z instanceof Z)\n\tconsole.log('Aww! Somethings wrong, expected a primitive number and not a Z instance');\nelse\n\tconsole.log('I told you not worry, I've got you covered.');"
                    ]
                }


            ]
        },
        {
            "title": "Error Handling",
            "body": [
                {
                    "descr": "Hmm, I can hear Z.js screaming 'Test me, make me fail. I wanted my developer(s) to make me better'."

                }
            ]
        },
        {
            "title": "Z non-static methods",
            "body": [
                {
                    "descr": "Every method you would logically expect to return nothing returns 'this' (this currently referenced object). The parameter ARG could any thing that would pass as Z's constructor acceptable arguments- ie Z objects, String, and regular number (javascript primitive number or Number() objects)",
                    "code": [
                        "console.log(new Z());// to see a list of Z's non-static methods"
                    ]



                }
            ]
        },
        {
            "title": "Z static methods",
            "body": [
                {
                    "descr": "The parameter ARG could any thing that would pass as Z's constructor acceptable arguments- ie Z objects, String, and regular number (javascript primitive number or Number() objects)",
                    "code": [
                        "console.log(Z);// to see a list of Z's static methods"
                    ]



                }
            ]
        },
        {
            "title": "Doing Difference",
            "body": [
                {
                    "descr": "To perform the difference operation, simply negate z2 and addTo to z1",
                    "code": [
                        "var z1 = new Z('2+3j');",
                        "var z2 = new Z(-2, '-3j');",
                        "console.log(z1.addTo(z2.negate()).toString());",
                        "//Now z1 equals 0+j0",
                        "//and z1 equals 2+j3"
                    ]
                },
                {
                    "descr": "or just use",
                    "code": [
                        "var z = Z.substract('2+3j', new Z(-2,-3));",
                        "//Now z equals 0+j0"
                    ]
                }
            ]
        },
        {
            "title": "We care for masochist too",
            "body": [
                {
                    "descr": "We provided all y'all with a variable that you could also use instead of Z.\nSay hello to 'ComplexNumber()'",
                    "code": [
                        "var z = new ComplexNumber('Hello');// that's not what I mean",
                        "var z = new ComplexNumber();// 'z' equals 0+j0"
                    ]

                },
                {
                    "descr": "The other usages of Z also follows. A small caveat is in order- 'ComplexNumber()' can't be used with node.js"

                }
            ]
        },
        {
            "title": "A word (mostly likely more) of caution",
            "body": [
                {
                    "descr": "Please do endeavour to always use Z's state checkers",
                    "code": [

                        "//assuming z is a Z instance",
                        "z.isInRectForm();",
                        "z.isOpInRad();"
                    ]

                },
                {
                    "descr": "to ensure you'd be processing Z instances instates you'd be aware of. You don't want to be working in degrees and get angles in radians. Believe me, i've been there."

                }
            ]
        }
    ],
    "endNote": "Now, go forth and enjoy these bytes of awesomeness!"
};