






function init()
{

      var searchEquipierComboBox = new Ext.ux.crfrdp.EquipierSearchCombo({
      id          : 'DispositifEquipierSearch', 
      searchType  : 1,/*dispositifEquipierSearch*/
      applyTo     : 'DispositifEquipierSearchInput',
      onSelect    : function(record)
      {
        alert('Etes vous sur de vouloir ajouter l\'équipier : <br/><br/>"<b>'+record.data.nom+' '+record.data.prenom+'</b>" <br/> N°"<b>'+record.data.numNivol+'</b>"<br/> délégation de "<b>'+crfIrpUtils.getLabelFor('Delegations', record.data['delegation.idDelegation'])+'</b>" <br/><br/>au dispositif ?');

      }
  });
  
  crfIrpUtils.getAllList();
  
  
}