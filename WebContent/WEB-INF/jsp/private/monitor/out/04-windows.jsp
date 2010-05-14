
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
    </div>
    <div class="x-tab" id="choose-hopital-window-content-input" title="Autre Destination"/>
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
      onClick="moDispositifCs.chooseEvacDestinationButton()">
</fieldset>
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

