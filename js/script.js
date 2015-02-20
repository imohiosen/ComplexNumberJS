/**
 * Created by Abraham on 2/19/15.
 */

var i = 0;
var j = 0;
var k = 0;

$(document).ready(function(){
    slide(presentation.name, presentation.startNote);

    $("#editor #next").prop('disabled', true);



    $("#slide .btn").click(function(){
        k=0;


        if (presentation.demo.length !== i)
            slide(presentation.demo[i].title,presentation.demo[i].body[j].descr);
        else{
            i=0;j=0;
            return
        }

        if(!presentation.demo[i].body[j].code){
            $("#editor #next").prop('disabled', true);

        }
        else
            $("#editor #next").prop('disabled', false);

        if(!(presentation.demo.length > i)){}
        if(presentation.demo[i].body.length > j) {
            j++;
            if (presentation.demo[i].body.length === j ) { i++; j=0;}
        }
    });

    $("#editor #next").click(function () {
        $("#slide .btn").prop('disabled', false);
        if (j > 0){

            $("#editor textarea").val(presentation.demo[i].body[j-1].code[k]);

            if(presentation.demo[i].body[j-1].code){
                if(presentation.demo[i].body[j-1].code.length > k) {
                    k++;
                    if (presentation.demo[i].body[j-1].code.length === k) { $(this).prop('disabled', true);k=0;}
                }
                else {
                    console.log("button should be disabled");
                }
            }
        } else {

            $("#editor textarea").val(presentation.demo[i-1].body[j].code[k]);


            if(presentation.demo[i-1].body[j].code){
                if(presentation.demo[i-1].body[j].code.length > k) {
                    k++;
                    if (presentation.demo[i-1].body[j].code.length === k) { $(this).prop('disabled', true);k=0;}
                }
                else {
                }
            }
        }
    });

    function slide(title, description) {
        $( "<h1>"+title +"</h1>").replaceAll( $("#slide h1") );
        $( "<p class='jumbotron ' style='padding: 10px'>"+description +"</p>").replaceAll( $("#slide .jumbotron") );

    };

});

