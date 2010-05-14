  <div id="BilanHelper">
    <fieldset>
      <legend>Identification</legend>
      <table class="BilanHelperFieldsetTable">
        <tr>
          <th ext:qtip="Identifiant de l'intervention">Id Inter. :</th>
          <td><span id="BilanHelper_intervention_business_id" ></span> <sub id="BilanHelper_id_intervention" ext:qtip="Identifiant de l'intervention en base de données" style="color:silver;"></sub></td>
        </tr>

        <tr>
          <th>Victime     :</th>
          <td><span id="BilanHelper_nom_victime"          ></span></td>
        </tr>
        <tr>
          <th>Dispositif      :</th>
          <td><span id="BilanHelper_indicatif_dispositif"></span></td>
        </tr>
        <tr>
          <th ext:qtip="Etat de l'intervention">Etat Inter.     :</th>
          <td><span id="BilanHelper_id_etat"              ></span></td>
        </tr>
        <tr>
          <th ext:qtip="Référence de l'intervention d'origine">Ref. Inter. Ori.:</th>
          <td><span id="BilanHelper_ref_inter_ori"        ></span></td>
        </tr>
        <tr>
          <th ext:qtip="Référence Externe de l'intervention">Ref. Ext. Inter.:</th>
          <td><input type="text" 
                    style="width:100%;"
                       id="BilanHelper_evac_num_inter_banlieu"
                     name="BilanHelper_evac_num_inter_banlieu"
                maxlength="16"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                   onBlur="miBilanCs.updateStringField(this.id, 'evac_num_inter_banlieu')"/></td>
        </tr>
       </table>
       <input id="BilanHelper_openDispositif"     type="button" value="Voir le Dispositif"   onClick="miBilanCs.openDispositif    ();"/>
       <input id="BilanHelper_cancelIntervention" type="button" value="Annuler Intervention" onClick="miBilanCs.showCancelInterventionWin();"/>
    </fieldset>
    <fieldset>
      <legend>Ticket</legend>
      <table class="BilanHelperFieldsetTable">
        <tr>
          <th>Origine :</th>
          <td><span id="BilanHelper_id_origine"  ></span></td>
        </tr>
        <tr>
          <th>Motif   :</th>
          <td><span id="BilanHelper_id_motif"    ></span></td>
        </tr>
        <tr>
          <th>Date    :</th>
          <td><span id="BilanHelper_DH_reception"></span></td>
        </tr>
        <tr>
          <th>Rue    :</th>
          <td><span id="BilanHelper_rue"></span></td>
        </tr>
        <tr>
          <th ext:qtip="Code Postale">CP    :</th>
          <td><span id="BilanHelper_code_postal"></span></td>
        </tr>
        <tr>
          <th>Ville    :</th>
          <td><span id="BilanHelper_ville"></span></td>
        </tr>
      </table>
      <input type="hidden" id="BilanHelper_google_coords_lat"  value=""/>
      <input type="hidden" id="BilanHelper_google_coords_long" value=""/>
           
      <input id="BilanHelper_openTicket"  type="button" value="Voir le Ticket" onClick="miBilanCs.openTicket();"/> 
      <input id="BilanHelper_openAddress" type="button" value="Voir l'adresse" onClick="miBilanCs.openInterAddress();"/>
    </fieldset>
    <fieldset>
      <legend>Timing</legend>
      
      Date Inter. <div id="bilanDateHeureBase_div"></div> 
      <input type="hidden" id="bilanDateHeureBase_input" name="bilanDateHeureBase_input"/>
      
      <table id="BilanHelperTimingFieldsetTable" class="BilanHelperFieldsetTable">
        <tr>
          <th>Saisie :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_saisie"
                    name="bilan_DH_saisie"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_saisie', 'bilanDateHeureBase', null)"/>
            <span id="bilan_DH_saisie_j1"></span>
          </td>
        </tr>
        <tr>
          <th>Réception :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_reception"
                    name="bilan_DH_reception"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_reception', 'bilanDateHeureBase', 'bilan_DH_saisie')"/>
            <span id="bilan_DH_reception_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Départ :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_depart"
                    name="bilan_DH_depart"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_depart', 'bilanDateHeureBase', 'bilan_DH_reception')"/>
            <span id="bilan_DH_depart_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Sur Place :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_sur_place"
                    name="bilan_DH_sur_place"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_sur_place', 'bilanDateHeureBase', 'bilan_DH_depart')"/>
            <span id="bilan_DH_sur_place_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Primaire :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_bilan_primaire"
                    name="bilan_DH_bilan_primaire"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_bilan_primaire', 'bilanDateHeureBase', 'bilan_DH_sur_place')"/>
            <span id="bilan_DH_bilan_primaire_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Secondaire :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_bilan_secondaire"
                    name="bilan_DH_bilan_secondaire"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_bilan_secondaire', 'bilanDateHeureBase', 'bilan_DH_bilan_primaire')"/>
            <span id="bilan_DH_bilan_secondaire_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Quitte les lieux :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_quitte_les_lieux"
                    name="bilan_DH_quitte_les_lieux"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_quitte_les_lieux', 'bilanDateHeureBase', 'bilan_DH_bilan_secondaire')"/>
            <span id="bilan_DH_quitte_les_lieux_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Hopital :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_arrivee_hopital"
                    name="bilan_DH_arrivee_hopital"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_arrivee_hopital', 'bilanDateHeureBase', 'bilan_DH_quitte_les_lieux')"/>
            <span id="bilan_DH_arrivee_hopital_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th>Fin :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_fin_intervention"
                    name="bilan_DH_fin_intervention"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateTimeField(this.id, 'DH_fin_intervention', 'bilanDateHeureBase', 'bilan_DH_arrivee_hopital')"/>
            <span id="bilan_DH_fin_intervention_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th ext:qtip="Appel des Renforts Médicaux" style="border-top:1px solid grey;">Appel Renfort Med. :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_appel_renfort_medical"
                    name="bilan_DH_appel_renfort_medical"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateDateField(this.id, 'DH_appel_renfort_medical', 'bilanDateHeureBase', 'bilan_DH_bilan_primaire')"/><!-- je considère qu'on demande les renforts médicaux qu'après le primaire -->
            <span id="bilan_DH_appel_renfort_medical_j1" class="dateJplus1"></span>
          </td>
        </tr>
        <tr>
          <th ext:qtip="Arrivée des Renfort Médicaux">Arrivée Renfort Med. :</th>
          <td>
            <input style="width:35px;"
                    type="text"
                      id="bilan_DH_arrivee_renfort_medical"
                    name="bilan_DH_arrivee_renfort_medical"
                   value=""
               maxlength="5"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
                  onBlur="miBilanCs.updateDateField(this.id, 'DH_arrivee_renfort_medical', 'bilanDateHeureBase', 'bilan_DH_appel_renfort_medical')"/>
            <span id="bilan_DH_arrivee_renfort_medical_j1" class="dateJplus1"></span>
          </td>
        </tr>
      </table>
    </fieldset>
    <fieldset>
      <legend>Commentaires &amp; Evalution CI</legend>
      <input id="BilanHelper_openCommentsAndEvalCi" type="button" value="Edition" onClick="miBilanCs.openCommentsAndEvalCi();"/>
    </fieldset>
  </div>
