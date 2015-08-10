
<div id="list-lieu-window" style="display:none;">
  <div class="x-window-header">Liste des Lieux</div>
  <div id="list-lieu-window-tabs">
  </div>
</div>

<div id="choose-hopital-window" style="display:none;">
  <div class="x-window-header">Choisissez un Hopital d'évacuation</div>
  <input id="choose-hopital-window-current-dispositif"   name="choose-hopital-window-current-dispositif"   type="hidden"/>
  <div id="choose-hopital-window-content">
    <div class="x-tab" id="choose-hopital-window-content-list"  title="Hopitaux">
    
    
<!-- The box wrap markup embedded instead of using Element.boxWrap() -->
<div style="width:850px;">
    <div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>
    <div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">
        <h3 style="margin-bottom:5px;">Recherche d'un Hopital</h3>
        <table style="width:100%">
          <tr>
            <td><input type="text" name="SearchHopitalInput"     id="SearchHopitalInput"      style="width:100%"/></td>
          </tr>
        </table>
        <div style="padding-top:4px;">
            Recherche par nom, ville, addresse, code postal.
        </div>

    </div></div></div>
    <div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>
</div>    
    
    
    
    </div>
    <div class="x-tab" id="choose-hopital-window-content-input" title="Autre Destination"/>
    
<fieldset class="fieldset">
  <legend>Sans évacuation</legend>

<input type="button" 
           id="dispositifEvacLaisseSurPlace"   
         name="dispositifEvacLaisseSurPlace" 
        value="Laissé sur Place (NON décédé)" 
      onClick="moDispositifCs.laisseSurPlaceButton(false)"
        style="padding:4px;margin:5px 30px 5px 30px;"/>
        
<input type="button" 
           id="dispositifEvacLaisseSurPlace"   
         name="dispositifEvacLaisseSurPlace" 
        value="Laissé sur Place Décédé" 
      onClick="moDispositifCs.laisseSurPlaceButton(true)"
        style="padding:4px;margin:5px 30px 5px 30px;"/>
        
        
  <br/><br/>      
  <label>Note : pour un Sans Suite, éditer l'intervention et annuler l'intervention avec le motif Sans Suite.</label>

</fieldset>    
    
<fieldset class="fieldset">
<legend class="legend">Evacuation vers une destination qui n'est pas un Hopital référencé</legend>

<span ext:qtip="Exemple : Clinique privée, Maison de retraite, domicile du patient"  style="width:80px;display:block;float:left;">Description </span>
  <input style="width:60%;"
         class="input"
          type="text"
            id="dispositifEvacAddressLabel"
          name="dispositifEvacAddressLabel"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
     maxlength="80"/>
<br/>
<span style="width:80px;display:block;float:left;">Rue</span> 
  <input style="width:60%;"
         class="input"
          type="text"
            id="dispositifEvacAddressRue"
          name="dispositifEvacAddressRue"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"/>
<br/>
<span style="width:80px;display:block;float:left;">Code Postal</span> 
  <input style="width:50px;"
         class="input"
          type="text"
            id="dispositifEvacAddressCodePostal"
          name="dispositifEvacAddressCodePostal"
     maxlength="5"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"
  />
Ville 
  <input style="width:60.0%;"
         class="input"
          type="text"
            id="dispositifEvacAddressVille"
          name="dispositifEvacAddressVille"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"
  />
  <img id="dispositifEvacGoogleAdressCheckStatus" alt="pix" style="height:16px;width:16px;" src="../../img/pix.png" />
  <input type="hidden" id="dispositifEvacAddressCoordinateLat"  name="dispositifEvacAddressCoordinateLat" />
  <input type="hidden" id="dispositifEvacAddressCoordinateLong" name="dispositifEvacAddressCoordinateLong"/>
  <input type="button" 
           id="dispositifEvacAutreAddresseButton"   
         name="dispositifEvacAutreAddresseButton" 
        value="Evacuation vers une destination qui n'est pas un Hopital référencé" 
      onClick="moDispositifCs.chooseEvacDestinationButton()"
        style="padding:4px;margin:5px 0px 5px 30px;"/>
</fieldset>
    </div>    
  </div>
</div>


<div id="confirm-laisse-sur-place-window" style="display:none;">
  <div class="x-window-header">Confirmation du Laissé Sur Place (non Décédé)</div>
  <div id="confirm-laisse-sur-place-window-content" class="x-hide-display" style="background-color:#FFFFFF;padding:15px;height:100%;">
  
  <input type="hidden" id="confirm-laisse-sur-place-window-decedee" name="confirm-laisse-sur-place-window-decedee" value=""/>
  <div id="confirm-laisse-sur-place-window-content-lsp">
  
    
	  <input type="checkbox"
	           id="confirm-laisse-sur-place-window-decharche"
	         name="confirm-laisse-sur-place-window-decharche"/> <!--      onChange="miBilanCs.updateBooleanField(this.id, 'evac_decharche','bilanEvacDechargeP') -->
	             
	  <span>        Décharge de responsabilité</span>
	    
   </div>
   <div id="confirm-laisse-sur-place-window-content-dcd">
     Laissé à disposition de : 
  <input type="text"
           id="confirm-laisse-sur-place-window-decedee_a_dispo_de"
         name="confirm-laisse-sur-place-window-decedee_a_dispo_de"
    maxlength="80" style="width:450px;"/>
   </div>
  </div>
</div>



<div id="GoogleMapsDirection" style="display:none;">
  
</div>

<div id="clone-intevention-window" class="x-hidden">
  <div class="x-window-header">Duplication de l'intervention</div>
  <div id="clone-intevention-window-content">
    <fieldset>
      <legend>Identification de la 'nouvelle' victime</legend>
      
      
 Nom :
                <input style="width:40%;"
                        type="text"
                          id="cloneInterventionNomVictime"
                        name="cloneInterventionNomVictime"
                       value=""
                   maxlength="30"
                      onBlur="moDispositifCs.updateNomPrenomRadio();"/>
                      
 Prénom :
                <input style="width:40%;"
                        type="text"
                          id="cloneInterventionPrenomVictime"
                        name="cloneInterventionPrenomVictime"
                       value=""
                   maxlength="30"
                      onBlur="moDispositifCs.updateNomPrenomRadio();"/>                      
<br/>
Radio :
                <input style="width:96%;"
                        type="text"
                          id="cloneInterventionNomPrenomRadio"
                        name="cloneInterventionNomPrenomRadio"
                       value=""
                    readonly="readonly"/>
<br/>
Sexe :           <input type="radio"
                          id="cloneInterventionSexeVictimeFemme"
                        name="cloneInterventionSexeVictime"
                       value="false"
/>
                  Femme.
                 <input type="radio"
                          id="cloneInterventionSexeVictimeHomme"
                        name="cloneInterventionSexeVictime"
                       value="true"
/>
                 Homme.
&nbsp;&nbsp;&nbsp;&nbsp;                  
Age Approximatif : 

                <input style="width:35px;"
                        type="text"
                          id="cloneInterventionAgeVictime"
                        name="cloneInterventionAgeVictime"
                       value=""
                   maxlength="3"
/>                      
      
      
       
    </fieldset>
  </div>
  
</div>
