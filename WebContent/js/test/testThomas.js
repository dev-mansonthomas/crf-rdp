






function init()
{

      var searchLieuxComboBox = new Ext.ux.crfrdp.LieuxSearchCombo({
      id          : 'SearchLieux', 
      searchType  : 1,/*dispositifEquipierSearch*/
      applyTo     : 'SearchLieuxInput',
      onSelect    : function(record)
      {
        alert('Etes vous sur de vouloir choisir le lieu : <br/><br/>"<b>'+record.data.nom+'</b>" <br/> <b>'+record.data.addresse+' - '+record.data.codePostal+' - '+record.data.ville+'</b>" ?');

      }
  });
  
  crfIrpUtils.getAllList();
  
  
}