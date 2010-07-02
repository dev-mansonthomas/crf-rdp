<div id="BilanIdentite">
  <input type="hidden" id="bilan_id_intervention" name="bilan_id_intervention"/>
  <input type="hidden" id="bilan_id_dispositif"   name="bilan_id_dispositif"  />
  <input type="hidden" id="bilan_id_regulation"   name="bilan_id_regulation"  />

  <fieldset id="BilanIdentiteFielset">
    <legend>Victime</legend>

      <table>
        <tbody>
          <tr>
            <td>
              <div class="BilanFieldInputLabel">Nom :</div>
            </td>
            <td>
                <input  style="width:120px;"
                         type="text"
                           id="bilan_nom_victime"
                         name="bilan_nom_victime"
                        value=""
                    maxlength="60"
                      onFocus="crfIrpUtils.fieldEdit(this.id)"
                       onBlur="miBilanCs.updateStringField(this.id, 'nom_victime')"/>
            </td>
            <td>
              <div class="BilanFieldInputLabel">Prénom :</div>
            </td>
            <td>
                <input style="width:120px;"
                        type="text"
                          id="bilan_prenom_victime"
                        name="bilan_prenom_victime"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'prenom_victime')"/>
            </td>
          </tr>

          <tr>
            <td>

            </td>
            <td>

            </td>
            <td>
              <div class="BilanFieldInputLabel" ext:qtip="Nom de Jeune Fille">Nom JF :</div>
            </td>
            <td>

                <input style="width:120px;"
                        type="text"
                          id="bilan_nom_jf_victime"
                        name="bilan_nom_jf_victime"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'nom_jf_victime')"/>

            </td>
          </tr>
          <tr>
            <td><div class="BilanFieldInputLabel">Age approximatif :</div></td>
            <td>

                <input style="width:120px;"
                        type="text"
                          id="bilan_age_approx_victime"
                        name="bilan_age_approx_victime"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntegerField(this.id, 'age_approx_victime')"/>

            </td>
            <td><div class="BilanFieldInputLabel">Sexe :</div></td>
            <td id="BilanVictimeSexe">

                <input type="radio"
                   id="bilan_homme_victime_false"
                 name="bilan_homme_victime"
              onFocus="crfIrpUtils.fieldEdit(this.id)"
             onChange="miBilanCs.updateBooleanField(this.id, 'homme_victime', 'BilanVictimeSexe')"
                value="false"/>
           Femme.&nbsp;&nbsp;&nbsp;

                <input type="radio"
                   id="bilan_homme_victime_true"
                 name="bilan_homme_victime"
              onFocus="crfIrpUtils.fieldEdit(this.id)"
             onChange="miBilanCs.updateBooleanField(this.id, 'homme_victime', 'BilanVictimeSexe')"
                value="true"/>
           Homme.

            </td>
          </tr>

          <tr>
            <td>
              <div class="BilanFieldInputLabel">Date de Naissance :</div>
            </td>
            <td>
                <input style="width:75px;"
                        type="text"
                          id="bilan_date_naissance"
                        name="bilan_date_naissance"
                       value=""
                   maxlength="10"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateDateField(this.id, 'date_naissance')"/>

            </td>
            <td>
              <div class="BilanFieldInputLabel">Lieu de Naissance :</div>
            </td>
            <td>
                <input style="width:240px;"
                        type="text"
                          id="bilan_lieu_naissance"
                        name="bilan_lieu_naissance"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'lieu_naissance')"/>
            </td>
          </tr>

           <tr>
            <td>
              <div class="BilanFieldInputLabel">Adresse :</div>
            </td>
            <td>
                <input style="width:220px;"
                        type="text"
                          id="bilan_adresse_victime"
                        name="bilan_adresse_victime"
                       value=""
                   maxlength="80"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'adresse_victime')"/>
            </td>
            <td>
              <div class="BilanFieldInputLabel">Code Postal :</div>
            </td>
            <td>
                <input style="width:50px;"
                        type="text"
                          id="bilan_code_postal_victime"
                        name="bilan_code_postal_victime"
                       value=""
                   maxlength="20"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'code_postal_victime')"/>
            </td>
          </tr>


           <tr>
            <td>
              <div class="BilanFieldInputLabel">Ville :</div>
            </td>
            <td>
                <input style="width:190px;"
                        type="text"
                          id="bilan_ville_victime"
                        name="bilan_ville_victime"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'ville_victime')"/>
            </td>
            <td>
              <div class="BilanFieldInputLabel">Pays :</div>
            </td>
            <td>
              <input style="width:100px;"
                        type="text"
                          id="bilan_pays_victime"
                        name="bilan_pays_victime"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'pays_victime')"/>
                      
                      
              <input type="button" 
                    value="Domicile = Adresse Inter"
                  onclick="miBilanCs.setAdresseDomicilToAdressIntervention();"/>
            </td>
          </tr>
        </tbody>
      </table>
            </fieldset>
            <fieldset id="BilanIdentite2Fielset">
              <legend>Contact &amp; Effet Personnel</legend>
      <table>
        <tbody>
          <tr>
            <td>
              <div class="BilanFieldInputLabel">Personne à Prevenir :</div>
            </td>
            <td>
                 <input style="width:120px;"
                        type="text"
                          id="bilan_personne_a_prevenir"
                        name="bilan_personne_a_prevenir"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'personne_a_prevenir')"/>
            </td>
            <td>
              <div class="BilanFieldInputLabel">Tel :</div>
            </td>
            <td>
              <input style="width:120px;"
                        type="text"
                          id="bilan_tel_personne_a_prevenir"
                        name="bilan_tel_personne_a_prevenir"
                       value=""
                   maxlength="20"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'tel_personne_a_prevenir')"/>
            </td>
          </tr>

          <tr>
            <td>
              <div class="BilanFieldInputLabel">Effets ou objets remis :</div>
            </td>
            <td>
              <input style="width:300px;"
                        type="text"
                          id="bilan_effet_ou_objet_remis"
                        name="bilan_effet_ou_objet_remis"
                       value=""
                   maxlength="180"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'effet_ou_objet_remis')"/>
            </td>
            <td>
              <div class="BilanFieldInputLabel">à :</div>
            </td>
            <td>
              <input style="width:180px;"
                        type="text"
                          id="bilan_effet_ou_objet_remis_a"
                        name="bilan_effet_ou_objet_remis_a"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateStringField(this.id, 'effet_ou_objet_remis_a')"/>
            </td>
          </tr>

        </tbody>
      </table>

  </fieldset>
</div>