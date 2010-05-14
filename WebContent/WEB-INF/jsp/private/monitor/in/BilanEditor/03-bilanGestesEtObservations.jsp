<div id="BilanGestEtObservation">

    <table id="BilanGestEtObservationTable">
      <tbody>
        <tr>
          <th colspan="3">Gestes et Observations</th>
        </tr>
        <tr>
          <td colspan="3">
<table style="width:100%">
  <tbody>
    <tr>
      <td style="valign:top;">

<p id="bilanGesteLvaP" ext:qtip="LVA : Libération des Voies Aériennes">
  <input type="checkbox"
           id="bilan_gestes_lva"
         name="bilan_gestes_lva"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_lva', 'bilanGesteLvaP')"/>
   LVA
</p>
<p id="bilanGesteAspirationP">
  <input type="checkbox"
           id="bilan_gestes_aspiration"
         name="bilan_gestes_aspiration"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_aspiration', 'bilanGesteAspirationP')"/>
   Aspiration
</p>
<p id="bilanGesteVaP" ext:qtip="VA : Ventilation Artificielle">
  <input type="checkbox"
           id="bilan_gestes_va"
         name="bilan_gestes_va"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_va', 'bilanGesteVaP')"/>
   VA
</p>
      </td>
      <td style="valign:top;">
<p id="bilanGesteMceP" ext:qtip="MCE : Massage Cardiaque Externalisé">
  <input type="checkbox"
           id="bilan_gestes_mce"
         name="bilan_gestes_mce"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_mce', 'bilanGesteMceP')"/>
   MCE
</p>
<p id="bilanGesteDsaP" ext:qtip="Défibrilateur Semi Automatique">
  <input type="checkbox"
           id="bilan_gestes_dsa"
         name="bilan_gestes_dsa"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_dsa', 'bilanGesteDsaP')"/>
   DSA
</p>
<p style="padding-left:20px;">
  Nb de chocs
<input style="width:30px;"
          type="text"
            id="bilan_gestes_dsa_nb_chocs"
          name="bilan_gestes_dsa_nb_chocs"
         value=""
     maxlength="3"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateIntegerField(this.id, 'gestes_dsa_nb_chocs')"/>
</p>
      </td>
      <td style="valign:top;">
<p id="bilanGesteAllongeeP">
  <input type="checkbox"
           id="bilan_gestes_allongee"
         name="bilan_gestes_allongee"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_allongee', 'bilanGesteAllongeeP')"/>
   Allongée
</p>
<p id="bilanGesteDemiAssisP">
  <input type="checkbox"
           id="bilan_gestes_demi_assis"
         name="bilan_gestes_demi_assis"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_demi_assis', 'bilanGesteDemiAssisP')"/>
   &#189; Assis
</p>
<p id="bilanGesteJambesSureleveesP">
  <input type="checkbox"
           id="bilan_gestes_jambes_surelevees"
         name="bilan_gestes_jambes_surelevees"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_jambes_surelevees', 'bilanGesteJambesSureleveesP')"/>
   Jambes surélevées
</p>
      </td>
      <td style="valign:top;">
<p id="bilanGestePlsP" ext:qtip="Position Latérale de Sécurité">
  <input type="checkbox"
           id="bilan_gestes_pls"
         name="bilan_gestes_pls"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_pls', 'bilanGestePlsP')"/>
   PLS
</p>
<p id="bilanGesteCollierCervicalP">
  <input type="checkbox"
           id="bilan_gestes_collier_cervical"
         name="bilan_gestes_collier_cervical"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_collier_cervical', 'bilanGesteCollierCervicalP')"/>
   Colier Cervical
</p>
<p id="bilanGesteAttelleP">
  <input type="checkbox"
           id="bilan_gestes_attelle"
         name="bilan_gestes_attelle"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_attelle', 'bilanGesteAttelleP')"/>
   Attelle
</p>
<p id="bilanGesteImmoGeneraleP">
  <input type="checkbox"
           id="bilan_gestes_immobilisation_generale"
         name="bilan_gestes_immobilisation_generale"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_immobilisation_generale', 'bilanGesteImmoGeneraleP')"/>
   Immobil&deg; Générale
</p>
      </td>
      <td style="valign:top;">
<p id="bilanGestePansementP">
  <input type="checkbox"
           id="bilan_gestes_pansement"
         name="bilan_gestes_pansement"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_pansement', 'bilanGestePansementP')"/>
   Pansement
</p>
<p id="bilanGestePointDeCompressionP">
  <input type="checkbox"
           id="bilan_gestes_point_de_compression"
         name="bilan_gestes_point_de_compression"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_point_de_compression', 'bilanGestePointDeCompressionP')"/>
   Point de compression
</p>
<p id="bilanGesteGarrotP">
  <input type="checkbox"
           id="bilan_gestes_garrot"
         name="bilan_gestes_garrot"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_garrot', 'bilanGesteGarrotP')"/>
   Garrot
</p>
<p style="padding-left:15px;">
  Heure de pose
  <input style="width:35px;"
          type="text"
            id="bilan_gestes_garrot_heure_pose"
          name="bilan_gestes_garrot_heure_pose"
         value=""
     maxlength="5"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateDateField(this.id, 'gestes_garrot_heure_pose')"/>
</p>
      </td>
      <td style="valign:top;">
<p id="bilanGesteRefroidissementP">
  <input type="checkbox"
           id="bilan_gestes_refroidissement"
         name="bilan_gestes_refroidissement"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_refroidissement', 'bilanGesteRefroidissementP')"/>
   Refroidissement
</p>
<p id="bilanGesteProtectionThermiqueP">
  <input type="checkbox"
           id="bilan_gestes_protection_thermique"
         name="bilan_gestes_protection_thermique"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'gestes_protection_thermique','bilanGesteProtectionThermiqueP')"/>
   Protection Thermique
</p>

      </td>
    </tr>
    <tr>
      <td colspan="6" style="text-align:center;">
Autres gestes
  <input style="width:500px;"
          type="text"
            id="bilan_gestes_autres"
          name="bilan_gestes_autres"
         value=""
     maxlength="200"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateStringField(this.id, 'gestes_autres')"/>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="text-align:center;">
Inhalation O<sub>2</sub>
  <input style="width:30px;"
          type="text"
            id="bilan_gestes_inhalation_o2_litre_min"
          name="bilan_gestes_inhalation_o2_litre_min"
         value=""
     maxlength="2"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateIntegerField(this.id, 'gestes_inhalation_o2_litre_min')"/> l<sub>/min</sub>
      </td>
      <td colspan="2" style="text-align:center;">
Glycémie <input style="width:30px;"
          type="text"
            id="bilan_gestes_glycemie_gramme_litre"
          name="bilan_gestes_glycemie_gramme_litre"
         value=""
     maxlength="2"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateFloatField(this.id, 'gestes_glycemie_gramme_litre')"/> g<sub>/litre</sub>
      </td>
      <td colspan="2" style="text-align:center;">
Température <input style="width:30px;"
          type="text"
            id="bilan_gestes_temperature"
          name="bilan_gestes_temperature"
         value=""
     maxlength="2"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateFloatField(this.id, 'gestes_temperature')"/> &deg;C
      </td>
    </tr>
  </tbody>
</table>
          </td>
        </tr>
        <tr>
          <th colspan="3">Contacts &amp; Renforts</th>
        </tr>
        <tr>
          <td colspan="3" style="text-align:center;" id="bilanGesteCoordinateurBsppContacteP">

  <input type="checkbox"
           id="bilan_coordinateur_bspp_contacte"
         name="bilan_coordinateur_bspp_contacte"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'coordinateur_bspp_contacte','bilanGesteCoordinateurBsppContacteP')"/>
   Coordinateur BSPP contacté
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="checkbox"
           id="bilan_coordinateur_samu_contacte"
         name="bilan_coordinateur_samu_contacte"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'coordinateur_samu_contacte','bilanGesteCoordinateurBsppContacteP')"/>
   Coordinateur SAMU contacté

          </td>
        </tr>

        <tr>
          <td colspan="3">
          &nbsp;
          </td>
        </tr>

                  
        
        <tr>
          <td colspan="1" id="bilanRenfortMedicaliseeArP">
Médicalisé par   &nbsp;&nbsp;<input type="checkbox"
           id="bilan_transport_medicalisee_ar"
         name="bilan_transport_medicalisee_ar"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'transport_medicalisee_ar','bilanRenfortMedicaliseeArP');miBilanCs.medicaliseParCheck(this.id);"/> <span ext:qtip="Ambulance de Réanimation">AR</span>&nbsp;&nbsp;&nbsp;&nbsp;
     &nbsp;&nbsp;&nbsp;
       <input type="checkbox"
           id="bilan_transport_medicalisee_umh"
         name="bilan_transport_medicalisee_umh"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'transport_medicalisee_umh','bilanRenfortMedicaliseeArP');miBilanCs.medicaliseParCheck(this.id);"/> <span ext:qtip="Unité Médical Hospitalière">UMH</span>
     &nbsp;&nbsp;&nbsp;&nbsp;de

   <select  id="bilan_transport_medicalisee_de"
          name="bilan_transport_medicalisee_de"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
      onChange="miBilanCs.updateIntegerField(this.id, 'transport_medicalisee_de')">
        <option value="0">&nbsp;</option>
        </select>
         </td>
         <td>
           <p id="bilanRenfortMedecinCivilSurPlaceP">
            Médecin civil sur place : 
             <input type="text"
                      id="bilan_medecin_civil_sur_place"
                    name="bilan_medecin_civil_sur_place"
                 onFocus="crfIrpUtils.fieldEdit(this.id)"
               maxlength="50"
                   style="width:300px;"
                onChange="miBilanCs.updateStringField(this.id, 'medecin_civil_sur_place')"/>
            </p>
          </td>         
          <td>
<p id="bilanRenfortPoliceSurPlaceP">
             <input type="checkbox"
           id="bilan_police_sur_place"
         name="bilan_police_sur_place"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'police_sur_place','bilanRenfortPoliceSurPlaceP')"/> Police sur Place
</p>
<p id="bilanRenfortPompierSurPlaceP">
             <input type="checkbox"
           id="bilan_pompier_sur_place"
         name="bilan_pompier_sur_place"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'pompier_sur_place','bilanRenfortPompierSurPlaceP')"/> Pompier sur Place
</p>
          </td>
        </tr>

      </tbody>
    </table>


    </div>