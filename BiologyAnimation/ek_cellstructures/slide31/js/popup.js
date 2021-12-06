var hint1 = "Blank 1 corresponds to a small dense spherical structure in the nucleus of a cell during interphase which is visibly darker than the rest of the nucleus.<br> For more info, follow the <a href = 'https://en.wikipedia.org/wiki/Nucleolus' target='_blank'>link</a>";
var hint2 = "Blank 2 corresponds to a minute particle consisting of RNA and associated proteins found in large numbers in the cytoplasm of living cells.<br>For more info, follow the <a href = 'https://en.wikipedia.org/wiki/Ribosomes' target='_blank'>link</a>";
var hint3 = "Blank 3 corresponds to the material of which the chromosomes of organisms other than bacteria (i.e., eukaryotes) are composed.<br>For more info, follow the <a href = 'https://en.wikipedia.org/wiki/Chromatin' target='_blank'>link</a>";
var hint4 = "Blank 4 corresponds to a molecule which is composed of two polynucleotide chains that coil around each other to form a double helix carrying genetic instructions for the development, functioning, growth and reproduction of all known organisms and many viruses.<br>For more info, follow the <a href = 'https://en.wikipedia.org/wiki/DNA' target='_blank'>link</a>";
var hint5 = "Blank 5 corresponds to large biomolecules and macromolecules that comprise one or more long chains of amino acid residues.<br>For more info, follow the <a href = 'https://en.wikipedia.org/wiki/Protein' target='_blank'>link</a>";

var hints_but = [hint1, hint2, hint3, hint4, hint5];

$(document).ready(function () {
    var x = document.getElementsByClassName("trigger_popup_fricc");

    $(".trigger_popup_fricc").click(function(){
        var str=this.id;
        document.getElementById("hint_content").innerHTML = hints_but[parseInt(str)-1];
       $('.hover_bkgr_fricc').show();
    });
    
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc1').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});