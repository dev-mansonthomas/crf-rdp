
<!-- Dispositif Editor -->
    <div id="DispositifPanel">
      <div id="DispositifEditor">


<div id="DispositifEdit" style="display:none;width:600px;">
  <input type="hidden" id="dispositif_id_field"         name="dispositif_id_field"         value=""/>
  <input type="hidden" id="dispositifActif"             name="dispositifActif"             value=""/>
  <input type="hidden" id="dispositifCurrentInterId"    name="dispositifCurrentInterId"    value=""/>
  <input type="hidden" id="dispositif_isCreation_field" name="dispositif_isCreation_field" value=""/>

        <div id="dispositif_title">
          <span id="dispositif_title_indicatif">Nouveau Dispositif</span> <span id="dispositif_id_span"></span>
        </div>

        <fieldset  id="DispositifIdentification">
          <legend>Identification</legend>
          <table>
            <tr>
              <td style="width:135px;">Type :<br/> <select id="DispositifType" name="DispositifType" onFocus="crfIrpUtils.fieldEdit(this.id)" onChange="miDispositifCs.updateDispositifIntField(this.id, 'id_type_dispositif');miDispositifCs.setRoles(this.value);"><option value=" "> </option></select></td>
              <td style="width:200px;">Indicatif :<br/> <input type="text" id="DispositifIndicatif"  name="DispositifIndicatif"  value="" onFocus="crfIrpUtils.fieldEdit(this.id)" onChange="miDispositifCs.updateDispositifStringField(this.id, 'indicatif_vehicule')"/></td>
              <td>
                Delegation :<br/>
                <input type="text"    id="DispositifDelegation"           name="DispositifDelegation" />
                <input type="hidden"  id="DispositifDelegation_id"        name="DispositifDelegation_id"/>
                <input type="hidden"  id="DispositifDelegation_autreNom"  name="DispositifDelegation_autreNom"/>
              </td>
            </tr>
          </table>

        </fieldset>


        <fieldset>
          <legend>Horaire</legend>
          <table>
            <tr>
              <td style="width:50%;text-align:center;">
                <div id="DispositifDHDebut_divLabel">Début : </div>
                <div id="DispositifDHDebut_div"></div>
              </td>
              <td style="width:50%;text-align:center;">
                <div id="DispositifDHFin_divLabel">Fin   : </div>
                <div id="DispositifDHFin_div"></div>
              </td>
            </tr>
          </table>
        </fieldset>


        <!-- Ajout/Suppression D'équipier-->
        <fieldset>
          <legend>Liste Des Equipiers Du Dispositif</legend>
            
<!-- The box wrap markup embedded instead of using Element.boxWrap() -->
<div style="width:550px;">
    <div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>
    <div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">
        <h3 style="margin-bottom:5px;">Ajouter un équipier au Dispositif</h3>
        <table style="width:100%">
          <tr>
            <td style="width:200px;"><input type="text" size="10" name="DispositifEquipierSearchRoleInput" id="DispositifEquipierSearchRoleInput"  /></td>
            <td><input type="text" size="40" name="DispositifEquipierSearchInput"     id="DispositifEquipierSearchInput"      /></td>
          </tr>
        </table>
        <div style="padding-top:4px;">
            Recherche par Nivol ou Nom, sélectionnez un Role avant d'effectuer une recherche
        </div>

    </div></div></div>
    <div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>
</div>
       
            <div id="DispositifEquipierList">
             
            </div>
            
          </fieldset>
         <!-- FIN Ajout/Suppression D'équipier-->

        <fieldset style="width:698px;">
          <legend>Materiel</legend>


<table id="DispositifO2Table" cellspacing="0" style="width:300px;float:left;margin-right:5px;">
  <tr>
    <th rowspan="2" style="font-size:14px;width:20px;">
      O<sub>2</sub>
    </th>
    <th class="DispositifO2TableRowTitle" ext:qtip="Volume en litre des bouteilles">V <sub>(l)</sub></th>
    <td><!-- B1 -->
      <select
         id="DispositifB1V"
       name="DispositifB1V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B1_volume');miDispositifCs.updateVolumeAndAutonomie();"
      >
        <option value=""></option>
        <option value="5">5  </option>
        <option value="15">15  </option>
      </select>
    </td>
    <td><!-- B2 -->
      <select
         id="DispositifB2V"
       name="DispositifB2V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B2_volume');miDispositifCs.updateVolumeAndAutonomie();"
      >
        <option value=""></option>
        <option value="5">5  </option>
        <option value="15">15  </option>
      </select>
    </td>
    <td><!-- B3 -->
      <select
         id="DispositifB3V"
       name="DispositifB3V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B3_volume');miDispositifCs.updateVolumeAndAutonomie();"
      >
        <option value=""></option>
        <option value="5">5  </option>
        <option value="15">15  </option>
      </select>
    </td>
    <td><!-- B4 -->
      <select
         id="DispositifB4V"
       name="DispositifB4V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B4_volume');miDispositifCs.updateVolumeAndAutonomie();"
      >
        <option value=""></option>
        <option value="5">5  </option>
        <option value="15">15  </option>
      </select>
    </td>
    <td><!-- B5 -->
      <select
         id="DispositifB5V"
       name="DispositifB5V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B5_volume');miDispositifCs.updateVolumeAndAutonomie();"
      >
        <option value=""></option>
        <option value="5">5  </option>
        <option value="15">15  </option>
      </select>
    </td>
    <td id="DispositifVolumeTotal" style="width:50px;"><!-- Volume Total -->
    </td>
  </tr>
  <tr>
   <th class="DispositifO2TableRowTitle"  ext:qtip="Pression en bar des bouteilles">P <sub>(b)</sub></th>
    <td><!-- B1 -->

<input type="text"
         id="DispositifB1P"
       name="DispositifB1P"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B1_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
    </td>
    <td><!-- B2 -->
<input type="text"
         id="DispositifB2P"
       name="DispositifB2P"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B2_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
    </td>
    <td><!-- B3 -->
<input type="text"
         id="DispositifB3P"
       name="DispositifB3P"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B3_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
    </td>
    <td><!-- B4 -->
<input type="text"
         id="DispositifB4P"
       name="DispositifB4P"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B4_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
    </td>
    <td><!-- B5 -->
<input type="text"
         id="DispositifB5P"
       name="DispositifB5P"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B5_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
    </td>
    <td id="DispositifAutonomieTotal" style="width:50px;"><!-- Autonomie Total -->
    </td>
  </tr>
</table>


<table id="DispositifDefibrilateurTable" style="width:200px;float:left;margin-right:5px;">
  <tr>
    <th>Défibrillateur</th>
    <td id="dsa_td">
      <input type="hidden" id="dsa_td_value" name="dsa_td_value" value=""/>

      <span ext:qtip="Pas de DSA sur la mission ou DSA non fonctionnel">Aucun</span>
      <input type="radio"
             name="DispositifDefibrilateurType"
            class="DispositifDefibrilateurRadio"
               id="DispositifDefibrilateurTypeAUCUN"
            value="NO"
          onFocus="crfIrpUtils.fieldEdit('dsa_td')"
         onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>

      <span ext:qtip="Défibrilateur Semi Automatique">DSA</span>
      <input type="radio"
             name="DispositifDefibrilateurType"
            class="DispositifDefibrilateurRadio"
               id="DispositifDefibrilateurTypeDSA"
            value="DSA" onFocus="crfIrpUtils.fieldEdit('dsa_td')"
         onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>

      <span ext:qtip="Défibrilateur Entièrement Automatique">DEA</span>
      <input type="radio"
             name="DispositifDefibrilateurType"
            class="DispositifDefibrilateurRadio"
               id="DispositifDefibrilateurTypeDEA"
            value="DEA"
          onFocus="crfIrpUtils.fieldEdit('dsa_td')"
         onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>
    </td>
   </tr>
   <tr>
    <th>Complet</th>
    <td id="dsa_complet_td">
      <input type="hidden" id="dsa_complet_td_value" name="dsa_complet_td_value" value=""/>

      <span ext:qtip="2 jeux de patch non périmé, Rasoir, Carte Mémoire, à l'heure">Oui</span>
      <input type="radio"
             name="DispositifDefibrilateurComplet"
            class="DispositifDefibrilateurRadio"
               id="DispositifDefibrilateurCompletOui"
            value="true"
          onFocus="crfIrpUtils.fieldEdit('dsa_complet_td')"
         onChange="miDispositifCs.updateDispositifRadioField('dsa_complet_td')"/>

      <span title="Un composant manquant">Non</span>
      <input type="radio"
             name="DispositifDefibrilateurComplet"
            class="DispositifDefibrilateurRadio"
               id="DispositifDefibrilateurCompletNon"
            value="false"
          onFocus="crfIrpUtils.fieldEdit('dsa_complet_td')"
         onChange="miDispositifCs.updateDispositifRadioField('dsa_complet_td')"/>
    </td>
  </tr>
</table>


                <div id="DispositifDHFin_divLabel">Fin   : </div>
                


<!-- patch -->
<table id="DispositifPatchTable" style="width:180px;">
  <tr>
    <th>Date Adulte 1</th>
    <td>
      <div id="DispositifDatePatchAdulte1_div"></div>
    </td>
   </tr>
   <tr>
    <th>Date Adulte 2</th>
    <td>
      <div id="DispositifDatePatchAdulte2_div"></div>
    </td>
  </tr>
  <tr>
    <th  ext:qtip="Sur les WELCH ALLYN, on utilise des patchs adultes avec un adaptateur qui réduit l'intensité des chocs">Date Enfant</th>
    <td>
      <div id="DispositifDatePatchEnfant_div"></div>
    </td>
  </tr>
  
</table>



        </fieldset><!-- fieldset : O2, DSA, patch -->


        <fieldset>
          <legend>Etat</legend>

          <table id="DispositifHoraire">
            <tr>
              <td id="horaire_dispo_label"      class="heureLabel"> Dispo       </td>
              <td id="horaire_parti_label"      class="heureLabel"> Parti       </td>
              <td id="horaire_surPlace_label"   class="heureLabel"> Sur Place   </td>
              <td id="horaire_primaire_label"   class="heureLabel"> Primaire    </td>
              <td id="horaire_secondaire_label" class="heureLabel"> Secondaire  </td>
              <td id="horaire_transport_label"  class="heureLabel"> Transport   </td>
              <td id="horaire_hopital_label"    class="heureLabel"> Hopital     </td>
              <td id="horaire_base_label"       class="heureLabel"> Base        </td>
            </tr>
            <tr>
              <td><input type="text" class="heureInput" id="horaire_dispo_value"      name="horaire_dispo_value"     /></td>
              <td><input type="text" class="heureInput" id="horaire_parti_value"      name="horaire_parti_value"     /></td>
              <td><input type="text" class="heureInput" id="horaire_surPlace_value"   name="horaire_surPlace_value"  /></td>
              <td><input type="text" class="heureInput" id="horaire_primaire_value"   name="horaire_primaire_value"  /></td>
              <td><input type="text" class="heureInput" id="horaire_secondaire_value" name="horaire_secondaire_value"/></td>
              <td><input type="text" class="heureInput" id="horaire_transport_value"  name="horaire_transport_value" /></td>
              <td><input type="text" class="heureInput" id="horaire_hopital_value"    name="horaire_hopital_value"   /></td>
              <td><input type="text" class="heureInput" id="horaire_base_value"       name="horaire_base_value"      /></td>
            </tr>
          </table>

        </fieldset>
        <fieldset>
          <legend>Localisation</legend>
<span class="fieldsetSubtitle"  ext:qtip="Adresse actuelle de l'ASM en stationnement ou adresse de destination de l'ASM en déplacement">Adresse Actuelle/Cible</span><br/>
                  Rue :
                <input style="width:93%;"
                        type="text"
                          id="dispositifCurrentAddressRue"
                        name="dispositifCurrentAddressRue"
                       value=""
                   maxlength="80"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miDispositifCs.updateAddress(this.id, 'current_addresse_rue', true)"/>
<br/>
                  Code Postal :
                    <input style="width:50px;"
                            type="text"
                              id="dispositifCurrentAddressCodePostal"
                            name="dispositifCurrentAddressCodePostal"
                       maxlength="5"
                           value=""
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miDispositifCs.updateAddress(this.id, 'current_addresse_code_postal', true)"
                    />
                  Ville :
                    <input style="width:60.0%;"
                            type="text"
                              id="dispositifCurrentAddressVille"
                            name="dispositifCurrentAddressVille"
                           value=""
                       maxlength="80"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miDispositifCs.updateAddress(this.id, 'current_addresse_ville', true)"
                    />
                    <img id="dispositifCurrentGoogleAdressCheckStatus" src="../../img/pix.png" alt="pix" style="height:16px;width:16px;"/>
                    <input type="hidden" id="dispositifCurrentAddressCoordinateLat"  name="dispositifCurrentAddressCoordinateLat" />
                    <input type="hidden" id="dispositifCurrentAddressCoordinateLong" name="dispositifCurrentAddressCoordinateLong"/>
<br/>       
<span class="fieldsetSubtitle"  ext:qtip="Adresse de départ de l'ASM en déplacement">Adresse Précédente</span><br/>
                  Rue :
                <input style="width:93%;"
                        type="text"
                          id="dispositifPreviousAddressRue"
                        name="dispositifPreviousAddressRue"
                       value=""
                   maxlength="80"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miDispositifCs.updateAddress(this.id, 'previous_addresse_rue', false)"/>
<br/>
                  Code Postal :
                    <input style="width:50px;"
                            type="text"
                              id="dispositifPreviousAddressCodePostal"
                            name="dispositifPreviousAddressPostal"
                       maxlength="5"
                           value=""
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miDispositifCs.updateAddress(this.id, 'previous_addresse_code_postal', false)"
                    />
                  Ville :
                    <input style="width:60.0%;"
                            type="text"
                              id="dispositifPreviousAddressVille"
                            name="dispositifPreviousAddressVille"
                           value=""
                       maxlength="80"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miDispositifCs.updateAddress(this.id, 'previous_addresse_ville', false)"
                    />
                    <img id="dispositifPreviousGoogleAdressCheckStatus" src="../../img/pix.png" alt="pix" style="height:16px;width:16px;"/>
                    <input type="hidden" id="dispositifPreviousAddressCoordinateLat"  name="dispositifPreviousAddressCoordinateLat" />
                    <input type="hidden" id="dispositifPreviousAddressCoordinateLong" name="dispositifPreviousAddressCoordinateLong"/>
         
        </fieldset>
      <table style="width:100%;">
        <tr>
          <td style="width:50%;vertical-align:top;">
            <fieldset>
              <legend>Contact</legend>
              <table>
                <tr><td>Selectif Radio    </td><td> <input type="text" id="DispositifSelectifRadio"   name="DispositifSelectifRadio"   onFocus="crfIrpUtils.fieldEdit(this.id)" onBlur="miDispositifCs.updateDispositifStringField(this.id, 'contact_radio'   )"/></td></tr>
                <tr><td>Tel 1             </td><td> <input type="text" id="DispositifTel1"            name="DispositifTel1"            onFocus="crfIrpUtils.fieldEdit(this.id)" onBlur="miDispositifCs.updateDispositifStringField(this.id, 'contact_tel1'    )"/></td></tr>
                <tr><td>Tel 2             </td><td> <input type="text" id="DispositifTel2"            name="DispositifTel2"            onFocus="crfIrpUtils.fieldEdit(this.id)" onBlur="miDispositifCs.updateDispositifStringField(this.id, 'contact_tel2'    )"/></td></tr>
                <tr><td>Identité Médecin  </td><td> <input type="text" id="DispositifIdentiteMedecin" name="DispositifIdentiteMedecin" onFocus="crfIrpUtils.fieldEdit(this.id)" onBlur="miDispositifCs.updateDispositifStringField(this.id, 'identite_medecin')"/></td></tr>
              </table>
            </fieldset>
          </td>
          <td style="width:50%;vertical-align:top;text-align:center;">
            <fieldset>
              <legend>Statut</legend>
              <select id="DispositifStatus"
                    name="DispositifStatus"
                 onFocus="crfIrpUtils.fieldEdit(this.id);"
                onChange="miDispositifCs.updateDispositifEtat(this.id, 'id_etat_dispositif');"
               >
                <option value=" "> </option>
              </select>
            </fieldset>
<!--             <fieldset>
              <legend>Action</legend>
              <input type="button" id="AddDispositif"       value="Terminer"  onclick="miDispositifCs.endOfEditionEvent();"/>
              <input type="button" id="AddDispositifCancel" value="Supprimer" onclick="miDispositifCs.deleteDispositif ();"/>
            </fieldset> -->
          </td>
        </tr>
      </table>
</div>
<!-- Fin Dispositif Edit -->
</div><!-- Fin DispositifEditor -->


      <div id="DispositifList">
        <div id="DispositifListCurrent">
        </div>
        <div id="DispositifListEncoursEdition">
        </div>
      </div>



    </div><!-- Fin Dispositif Center Panel -->