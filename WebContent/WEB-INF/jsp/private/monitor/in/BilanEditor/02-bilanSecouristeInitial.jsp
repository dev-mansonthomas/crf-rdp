<div id="BilanBilanSecouristeInitial">

      <fieldset id="BilanSecouristeInitialCirconstanceFielset">
        <legend>Circonstances</legend>

        <textarea id="bilan_bilan_circonstances"
                name="bilan_bilan_circonstances"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_circonstances')"></textarea>

      </fieldset>

      <fieldset id="BilanBlessureSigneDetresseFielset">
        <legend>Blessures et Signes de Détresse</legend>

        <textarea id="bilan_bilan_detresses"
                name="bilan_bilan_detresses"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_detresses')"></textarea>

      </fieldset>

      <fieldset id="BilanAntecedentsFielset">
        <legend>Antécédents et Traitements Suivis</legend>

        <textarea id="bilan_bilan_antecedents"
                name="bilan_bilan_antecedents"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_antecedents')"></textarea>
      </fieldset>


    <table id="BilanSecouristeInitialTable">
      <thead>
        <tr>
          <th style="width:29%;">
            Conscience
          </th>
          <th style="width:35%;">
            Ventilation
          </th>
          <th style="width:35%;">
            Circulation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p id="bilanCsComaP">
              <input type="checkbox"
                       id="bilan_cs_coma"
                     name="bilan_cs_coma"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_coma', 'bilanCsComaP')"/>
               Coma
            </p>
            <p id="bilanCsPciP" ext:qtip="PCI : Perte de Connaissance Initiale">
              <input type="checkbox"
                       id="bilan_cs_pci"
                     name="bilan_cs_pci"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_pci', 'bilanCsPciP')"/>
               PCI, Durée :
               <input style="width:60px;"
                  type="text"
                    id="bilan_cs_pci_duree"
                  name="bilan_cs_pci_duree"
                 value=""
             maxlength="10"
               onFocus="crfIrpUtils.fieldEdit(this.id)"
                onBlur="miBilanCs.updateStringField(this.id, 'cs_pci_duree')"/>
            </p>
            <p id="bilanCsPcSecondaireP" ext:qtip="PC : Perte de Connaissance">
              <input type="checkbox"
                       id="bilan_cs_pc_secondaire"
                     name="bilan_cs_pc_secondaire"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_pc_secondaire', 'bilanCsPcSecondaireP')"/>
               PC secondaire
            </p>
            <p id="bilanCsAgitationP">
              <input type="checkbox"
                       id="bilan_cs_agitation"
                     name="bilan_cs_agitation"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_agitation', 'bilanCsAgitationP')"/>
               Agitation
            </p>
            <p id="bilanCsConvulsionsP">
              <input type="checkbox"
                       id="bilan_cs_convulsions"
                     name="bilan_cs_convulsions"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_convulsions', 'bilanCsConvulsionsP')"/>
               Convulsions
            </p>
          </td>
          <td>
            <p id="bilanVentilAbscenceP">
              <input type="checkbox"
                       id="bilan_ventil_absence"
                     name="bilan_ventil_absence"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_absence', 'bilanVentilAbscenceP')"/>
               Absence de ventilation
            </p>
            <p>
              Fréquence
              <input style="width:30px;"
                        type="text"
                          id="bilan_ventil_chiffre"
                        name="bilan_ventil_chiffre"
                       value=""
                   maxlength="3"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntegerField(this.id, 'ventil_chiffre')"/>
              <span  ext:qtip="Observation">Obs</span>
              <input style="width:120px;"
                        type="text"
                          id="bilan_ventil_commentaire"
                        name="bilan_ventil_commentaire"
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'ventil_commentaire')"/>
            </p>
<table style="width:100%;">
  <tr>
    <td>
            <p id="bilanVentilSuperficielleP">
              <input type="checkbox"
                       id="bilan_ventil_superficielle"
                     name="bilan_ventil_superficielle"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_superficielle', 'bilanVentilSuperficielleP')"/>
               Superficielle
            </p>
            <p id="bilanVentilIrregulierreP">
              <input type="checkbox"
                       id="bilan_ventil_irreguliere"
                     name="bilan_ventil_irreguliere"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_irreguliere', 'bilanVentilIrregulierreP')"/>
               Irrégulière
            </p>
            <p id="bilanVentilPausesP">
              <input type="checkbox"
                       id="bilan_ventil_pauses"
                     name="bilan_ventil_pauses"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_pauses', 'bilanVentilPausesP')"/>
               Pauses
            </p>
            <p id="bilanVentilSifflementP">
              <input type="checkbox"
                       id="bilan_ventil_sifflement"
                     name="bilan_ventil_sifflement"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_sifflement', 'bilanVentilSifflementP')"/>
               Sifflements
            </p>
    </td>
    <td>
            <p id="bilanVentilRonflementP">
              <input type="checkbox"
                       id="bilan_ventil_ronflement"
                     name="bilan_ventil_ronflement"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_ronflement', 'bilanVentilRonflementP')"/>
               Ronflements
            </p>
            <p id="bilanVentilTirageP">
              <input type="checkbox"
                       id="bilan_ventil_tirage"
                     name="bilan_ventil_tirage"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_tirage', 'bilanVentilTirageP')"/>
               Tirage
            </p>
            <p id="bilanVentilSueursP">
              <input type="checkbox"
                       id="bilan_ventil_sueurs"
                     name="bilan_ventil_sueurs"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_sueurs', 'bilanVentilSueursP')"/>
               Sueurs
            </p>
            <p id="bilanVentilCyanoseP">
              <input type="checkbox"
                       id="bilan_ventil_cyanose"
                     name="bilan_ventil_cyanose"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_cyanose', 'bilanVentilCyanoseP')"/>
               Cyanose
            </p>
    </td>
  </tr>
</table>
<p>
              Saturation O<sub>2</sub>
              <input style="width:120px;"
                        type="text"
                          id="bilan_ventil_saturation_o2"
                        name="bilan_ventil_saturation_o2"
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntegerField(this.id, 'ventil_saturation_o2')"/> <sub>/100</sub>
</p>

          </td>
          <td>
            <p id="bilanCirculAbscenceP">
              <input type="checkbox"
                       id="bilan_circul_pouls_non_percu"
                     name="bilan_circul_pouls_non_percu"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_non_percu', 'bilanCirculAbscenceP')"/>
               Absence de circulation
            </p>
            <p id="bilanCirculChiffreP">
              Fréquence
              <input style="width:30px;"
                        type="text"
                          id="bilan_circul_pouls_chiffre"
                        name="bilan_circul_pouls_chiffre"
                       value=""
                   maxlength="3"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntegerField(this.id, 'circul_pouls_chiffre', 'bilanCirculChiffreP')"/>
              <span  ext:qtip="Observation">Obs</span>
              <input style="width:120px;"
                        type="text"
                          id="bilan_circul_pouls_commentaire"
                        name="bilan_circul_pouls_commentaire"
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'circul_pouls_commentaire')"/>
            </p>
<table style="width:100%;">
  <tr>
    <td>
            <p id="bilanCirculIrregulierP">
              <input type="checkbox"
                       id="bilan_circul_pouls_irregulier"
                     name="bilan_circul_pouls_irregulier"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_irregulier', 'bilanCirculIrregulierP')"/>
               Irrégulier
            </p>
            <p id="bilanCirculConjonctivesDecoloreesP">
              <input type="checkbox"
                       id="bilan_circul_conjonctive_decolorees"
                     name="bilan_circul_conjonctive_decolorees"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_conjonctive_decolorees', 'bilanCirculConjonctivesDecoloreesP')"/>
               <span ext:qtip="Conjonctive">Conjonct.</span> <sub>décolorées</sub>
            </p> 
            <p id="bilanCirculMarbrureP">
              <input type="checkbox"
                       id="bilan_circul_marbrure"
                     name="bilan_circul_marbrure"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_marbrure', 'bilanCirculMarbrureP')"/>
               Marbrure
            </p>
    </td>
    <td>
            <p id="bilanCirculFaibleP">
              <input type="checkbox"
                       id="bilan_circul_pouls_faible"
                     name="bilan_circul_pouls_faible"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_faible', 'bilanCirculFaibleP')"/>
               Faible
            </p>
            <p id="bilanCirculPaleurP">
              <input type="checkbox"
                       id="bilan_circul_paleur_cutanees"
                     name="bilan_circul_paleur_cutanees"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_paleur_cutanees', 'bilanCirculPaleurP')"/>
               Paleurs <sub>Cutanées</sub>
            </p>
    </td>
  </tr>
</table>
<table style="width:100%;">
  <tr>
    <td style="width:95px;">Tension</td>
    <td>
              <input style="width:30px;"
                        type="text"
                          id="bilan_circul_tension_basse"
                        name="bilan_circul_tension_basse"
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_basse')"/>
                      /
              <input style="width:30px;"
                        type="text"
                          id="bilan_circul_tension_haute"
                        name="bilan_circul_tension_haute"
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_haute')"/>
    
    </td>
  </tr>
  <tr>
    <td ext:qtip="Tension de Référence">Tension de réf.</td>
    <td>
       <input style="width:30px;"
                            type="text"
                              id="bilan_circul_tension_ref_basse"
                            name="bilan_circul_tension_ref_basse"
                           value=""
                       maxlength="16"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miBilanCs.updateIntegerField(this.id, 'circul_tension_ref_basse')"/>
                          /
                  <input style="width:30px;"
                            type="text"
                              id="bilan_circul_tension_ref_haute"
                            name="bilan_circul_tension_ref_haute"
                           value=""
                       maxlength="16"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miBilanCs.updateIntegerField(this.id, 'circul_tension_ref_haute')"/>
    </td>
  </tr>
</table>
          </td>
        </tr>
        <tr>
          <th colspan="2">
            Pupilles
          </th>
          <th>
            Douleur
          </th>
        </tr>
        <tr>
          <td colspan="2">
<!-- pupille -->

  <table style="width:100%;">
    <tr>
      <td id="bilanPupilleReactiveP">
          <input type="checkbox"
             id="bilan_pupille_reactive"
           name="bilan_pupille_reactive"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckPupilleReactive(this.id);"/>
     Réactives
      </td>
      <td style="text-align:right;" id="bilanPupilleMyosisGaucheP" ext:qtip="Myosis: pupille de ma taille d'une tete d'aiguille en l'abscence de lumière">
     Myosis Gauche
     
     <input type="checkbox"
             id="bilan_pupille_myosis_gauche"
           name="bilan_pupille_myosis_gauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckMyosisMydriaseGauche(this.id);"/>
     
      </td>
      <td id="bilanPupilleMyosisDroiteP">
          <input type="checkbox"
             id="bilan_pupille_myosis_droite"
           name="bilan_pupille_myosis_droite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckMyosisMydriaseDroite(this.id);"/>
        Droite
      </td>
    </tr>
    <tr>
      <td id="bilanPupilleNonReactiveP">
          <input type="checkbox"
             id="bilan_pupille_non_reactive"
           name="bilan_pupille_non_reactive"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckPupilleReactive(this.id);"/>
     Non Réactives
      </td>
      <td style="text-align:right;" id="bilanPupilleMydriaseGaucheP" ext:qtip="Mydriase: pupille complétement dilaté en présence d'une source de lumière">
     Mydriase Gauche
          <input type="checkbox"
             id="bilan_pupille_mydriase_gauche"
           name="bilan_pupille_mydriase_gauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckMyosisMydriaseGauche(this.id);"/>
     
      </td>
      <td id="bilanPupilleMydriaseDroiteP">
          <input type="checkbox"
             id="bilan_pupille_mydriase_droite"
           name="bilan_pupille_mydriase_droite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.pupilleCheckMyosisMydriaseDroite(this.id);"/>
       Droite
      </td>
    </tr>
    <tr>
      <td colspan="3" id="bilanPupilleAssymetriqueP">
          <input type="checkbox"
             id="bilan_pupille_asymetriques"
           name="bilan_pupille_asymetriques"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_asymetriques', 'bilanPupilleAssymetriqueP')"/>
     Assymétriques      
      </td>
    </tr>
  </table>

          </td>
          <td id="bilanDouleurP">
<!-- douleur -->
          <input type="radio"
             id="bilan_douleur_0"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntegerField(this.id, 'douleur', 'bilanDouleurP')"
          value="0"/>
     0.&nbsp;&nbsp;&nbsp;

          <input type="radio"
             id="bilan_douleur_1"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntegerField(this.id, 'douleur', 'bilanDouleurP')"
          value="1"/>
     1.&nbsp;&nbsp;&nbsp;

               <input type="radio"
             id="bilan_douleur_2"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntegerField(this.id, 'douleur', 'bilanDouleurP')"
          value="2"/>
     2.&nbsp;&nbsp;&nbsp;

          <input type="radio"
             id="bilan_douleur_3"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntegerField(this.id, 'douleur', 'bilanDouleurP')"
          value="3"/>
     3.&nbsp;&nbsp;&nbsp;

          <input type="radio"
             id="bilan_douleur_4"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntegerField(this.id, 'douleur', 'bilanDouleurP')"
          value="4"/>
     4.
          </td>
        </tr>
      </tbody>
    </table>

    </div>