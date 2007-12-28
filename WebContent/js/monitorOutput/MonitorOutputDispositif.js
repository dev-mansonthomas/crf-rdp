var MonitorOutputDispositifCs = Class.create();

MonitorOutputDispositifCs.prototype.initialize=function()
{
  MonitorOutputDispositif.initScriptSession();
  custumEventPS.subscribe("ListLoaded",this.loadAllDispositif);
};

MonitorOutputDispositifCs.prototype.loadAllDispositif=function()
{
  MonitorOutputDispositif.getAllDispositif(moDispositifCs.loadAllDispositifReturn);
};

MonitorOutputDispositifCs.prototype.loadAllDispositifReturn=function(dispositifList)
{
  for(i=0,count=dispositifList.length; i<count; i++)
    moDispositifCs.updateDispositif(dispositifList[i]);
};


MonitorOutputDispositifCs.prototype.editFicheInter=function(idDispositif, idInter)
{
  this.monitorInputWindow.monitorInputCs.testCrossWindow();
};

MonitorOutputDispositifCs.prototype.addDispositif=function()
{
  this.monitorInputWindow = monitorOutputCs.getMonitorInputRef();
  this.monitorInputWindow.miDispositifCs.displayAddDispositif();
};

MonitorOutputDispositifCs.prototype.updateDispositif = function (dispositif)
{
  //TODO : authoriser les autres types une fois que les templates auront été fait.
  if(dispositif.idTypeDispositif != null && dispositif.idTypeDispositif == 1)
  {
    if( $('dispositif_'+dispositif.idDispositif) == null)
    {/*Si le dispositif n'existe pas sur la page on le créé*/
      new Insertion.Bottom('center-dispositif-list',this.dispositifTemplates[dispositif.idTypeDispositif].evaluate({id:dispositif.idDispositif}));
      $('dispositif_'+dispositif.idDispositif).style.display="block";
    }
  
    DWRUtil.setValue('dispositif_indicatif_'+dispositif.idDispositif, dispositif.indicatifVehicule);
    DWRUtil.setValue('dispositif_etat_'     +dispositif.idDispositif, crfIrpUtils.getLabelFor('EtatsDispositif', dispositif.idEtatDispositif));
    DWRUtil.setValue('dispositif_etat_id_'  +dispositif.idDispositif, dispositif.idEtatDispositif);
  }
};

MonitorOutputDispositifCs.prototype.computeNextState=function(currentState)
{
};


MonitorOutputDispositifCs.prototype.dispositifTemplates = Array();
/*Samu*/
MonitorOutputDispositifCs.prototype.dispositifTemplates[1] = new Template('\
<input type="hidden" id="dispositif_current_inter_id_#{id}" name="dispositif_current_inter_id_#{id}" value=""/>\
<div        id="dispositif_#{id}"         class="samu_cadre" style="display:none;">\
  <div      id="dispositif_cadre_entete_#{id}"  class="samu_cadre_entete">\
    <table  id="dispositif_horaires_#{id}"      class="samu_horaires">\
      <tr   id="dispositif_hour_list_#{id}"     class="samu_hour_list">\
        <td id="dispositif_cadre_title_#{id}"   class="samu_cadre_title">\
          SAMU - <span id="dispositif_indicatif_#{id}">XXXXX</span>\
        </td>\
        <th id="dispositif_call_title_#{id}"       class="samu_hour_title">Appel SAMU</th>\
        <th id="dispositif_trans_title_#{id}"      class="samu_hour_title">Tr. ASM</th>\
        <th id="dispositif_leave_title_#{id}"      class="samu_hour_title">d&eacute;part ASM</th>\
        <th id="dispositif_present_title_#{id}"    class="samu_hour_title">ASM se pr&eacute;sente</th>\
        <th id="dispositif_primaire_title_#{id}"   class="samu_hour_title">Primaire</th>\
        <th id="dispositif_secondaire_title_#{id}" class="samu_hour_title">Secondaire</th>\
        <th id="dispositif_transport_title_#{id}"  class="samu_hour_title">Transport vers H</th>\
        <th id="dispositif_bilan_comp_title_#{id}" class="samu_hour_title">Bilan comp.</th>\
        <th id="dispositif_hospital_title_#{id}"   class="samu_hour_title">Arriv&eacute; H.</th>\
      </tr>\
      <tr>\
        <td id="dispositif_ci_#{id}" class="samu_ci">CI: Super CI\
          <div id="dispositif_equip_#{id}" class="samu_equip">\
            Chauffeur : Super Chauffeur<br/>\
            CFA : Super CFA<br/>\
            CFA : Super CFA<br/>\
            CFA : Super CFA\
          </div>\
        </td> \
        <td id="dispositif_call_#{id}"        class="samu_hour">88h88</td>\
        <td id="dispositif_trans_#{id}"       class="samu_hour">88h88</td>\
        <td id="dispositif_leave_#{id}"       class="samu_hour">88h88</td>\
        <td id="dispositif_present_#{id}"     class="samu_hour">88h88</td>\
        <td id="dispositif_primaire_#{id}"    class="samu_hour">88h88</td>\
        <td id="dispositif_secondaire_#{id}"  class="samu_hour">88h88</td>\
        <td id="dispositif_transport_#{id}"   class="samu_hour">88h88</td>\
        <td id="dispositif_bilan_comp_#{id}"  class="samu_hour">88h88</td>\
        <td id="dispositif_hospital_#{id}"    class="samu_hour">88h88</td>\
      </tr>\
    </table>\
  </div>  \
  <div   id="dispositif_buttons_#{id}" class="samu_buttons">\
    <div class="samu_etat">\
      <div class="label">\
        Etat <input type="hidden" id="dispositif_etat_id_#{id}" name="dispositif_etat_id_#{id}" value=""/>\
      </div>\
      <div id="dispositif_etat_#{id}">--------</div>\
    </div>\
    <div  class="samu_action">\
      <div class="label">\
        Action\
      </div>\
        <div id="dispositif_action_#{id}">--------</div>\
    </div>\
    <div id="dispositif_editerFiche_#{id}" class="samu_editerFiche" onClick="monitorOutputCs.editFicheInter();">\
      Editer fiche\
    </div>\
    <div class="samu_victime">\
      <div class="label">\
        victime\
      </div>\
      <div id="dispositif_victime_#{id}">no victim</div>\
    </div>\
    <div id="dispositif_address_#{id}" class="samu_address">\
    -------\
    </div>\
  </div>\
</div>\
<br/>\
');