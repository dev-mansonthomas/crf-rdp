var jquery =  jQuery.noConflict();
jquery(document).ready(function() {
	//Mise en forme au chargement de la page
	Miseenformefiche();
});

function Miseenformefiche()	{
	//Ajout du fond gris au tr impair de premier niveau de chaque tableau de type tabType01
	jquery("table.tabType01>tbody").each(function() {
		jquery(this).children("tr:even").addClass("bkg01");
	});
	
	//Ajout du fond blanc au tr pair de premier niveau de chaque tableau de type tabType01
	jquery("table.tabType01>tbody").each(function() {
		jquery(this).children("tr:odd").addClass("bkg02");
	});

	//Mise en place du blanc sur premiere colonne des tableau avec code - message
	jquery(".SeparateTab>tbody>tr").each(function() {
		jquery(this).children("td:first").addClass("bkg02");
	});
	
	//On masque l'ensemble des tableau avec la classe Depliant
	jquery(".Depliant").css("display","none");
	
	//Affichage de la div en relation avec le bouton "zone ci-dessous" lors du clic
	jquery(".LienDepliant").click(function(){
		var lien = jquery(this).attr('href');
		jquery(".Depliant" + lien).css("display","block");
		return false;
	});
	
	//Ajout du fond gris au tr impair de premier niveau de chaque tableau de type tabTypeTarifs
	jquery("table.tabTypeTarifs>tbody").each(function() {
		jquery(this).children("tr:even").addClass("bkg01");
	});
	
	//Ajout du fond blanc au tr pair de premier niveau de chaque tableau de type tabTypeTarifs
	jquery("table.tabTypeTarifs>tbody").each(function() {
		jquery(this).children("tr:odd").addClass("bkg02");
	});
	
	//Construction de l'iframe des api test en js
	//en cas d'existence d'une div 
	var apiframetext = jquery(".apitest").text();
	if (apiframetext.length){
		jquery(".apitest").css("display","block");
		var apiframe = "<iframe "+ jquery(".apitest").text()+"></iframe>";
		jquery(".apitest").html(apiframe);
	}
};
