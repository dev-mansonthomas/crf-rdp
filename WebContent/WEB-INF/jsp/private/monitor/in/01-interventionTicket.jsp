<!-- Intervention Editor -->
    <div id="InterventionPanel">
      <div id="InterventionEditor">


<div id="InterventionTicket" style="display:none">
  <table>
    <tbody>
      <tr>
        <td>
          <fieldset>
            <legend>Identification</legend>
            <table>
              <tr>
                <td>
                  <input type="hidden" name="interventionTicketId" id="interventionTicketId" value=""/>

                  Origine :
                  <select id="interventionTicketOrigine"
                        name="interventionTicketOrigine"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                    onChange="miInterventionCs.updateInterventionIntegerField(this.id, 'id_origine')"><option value=" "> </option></select>
                </td>
                <td>
                  Date/Heure de réception :
</td>
<td>
                  <div id="interventionTicketDHReception_div"></div>

                </td>
              </tr>
            </table>
            <div id="InterventionTicketBusinessIdDiv" style="display:none;">
            
            Identifiant Intervention : 
            
            <span id="InterventionTicketBusinessId"></span>
            <sub  id="InterventionTicket_id_intervention" ext:qtip="Identifiant de l'intervention en base de données" style="color:silver;"></sub>
            
            </div>
          </fieldset>
        </td>
      </tr>
      <tr>
        <td>
          <fieldset>
            <legend>Motif</legend>

            Motif :
            <select id="interventionTicketMotif"
                  name="interventionTicketMotif"
               onFocus="crfIrpUtils.fieldEdit(this.id)"
              onChange="miInterventionCs.updateInterventionIntegerField(this.id, 'id_motif')"><option value=" "> </option></select>

            Complément d'information : <br/>
                  <textarea   id="interventionTicketComplementMotif"
                            name="interventionTicketComplementMotif"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateInterventionStringField(this.id, 'complement_motif')"
                    ></textarea>

          </fieldset>
        </td>
      </tr>
      <tr>
        <td>
          <fieldset>
            <legend>Adresse &amp; Contact</legend>
            <table>
            <tr>
              <td>
                  <span class="fieldsetSubtitle">Victime</span> <br/>
                  
 Nom :
                <input style="width:33%;"
                        type="text"
                          id="interventionNomVictime"
                        name="interventionNomVictime"
                       value=""
                   maxlength="30"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionStringField(this.id, 'nom_victime');miInterventionCs.updateNomPrenomRadio();"/>
                      
 Prénom :
                <input style="width:33%;"
                        type="text"
                          id="interventionPrenomVictime"
                        name="interventionPrenomVictime"
                       value=""
                   maxlength="30"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionStringField(this.id, 'prenom_victime');miInterventionCs.updateNomPrenomRadio();"/>                      
<br/>
Radio :
                <input style="width:90%;font-size:11px;height:16px;margin-top:2px;margin-bottom:2px;"
                        type="text"
                          id="interventionNomPrenomRadio"
                        name="interventionNomPrenomRadio"
                       value=""
                    readonly="readonly"/>
<br/>
Sexe :           <input type="radio"
                          id="interventionSexeVictimeFemme"
                        name="interventionSexeVictime"
                       value="false"
                    onChange="miInterventionCs.updateInterventionBooleanField(this.id, 'homme_victime')"/>
                  Femme.
                 <input type="radio"
                          id="interventionSexeVictimeHomme"
                        name="interventionSexeVictime"
                       value="true"
                    onChange="miInterventionCs.updateInterventionBooleanField(this.id, 'homme_victime')"/>
                 Homme.
&nbsp;&nbsp;&nbsp;&nbsp;                  
Age Approximatif : 

                <input style="width:35px;"
                        type="text"
                          id="interventionAgeVictime"
                        name="interventionAgeVictime"
                       value=""
                   maxlength="3"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionIntegerField(this.id, 'age_approx_victime')"/>                      

              </td>
            </tr>
            <tr>
              <td>&nbsp;
              </td>
            </tr>
            <tr>
                <td>
                  <span class="fieldsetSubtitle">Contact Sur Place</span> <br/> Nom :
                <input style="width:30%;"
                        type="text"
                          id="interventionNomContactSurPlace"
                        name="interventionNomContactSurPlace"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionStringField(this.id, 'nom_contact_sur_place')"/>
                Coordonnées :
                <input style="width:30%;"
                        type="text"
                          id="interventionCoordonneesContactSurPlace"
                        name="interventionCoordonneesContactSurPlace"
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionStringField(this.id, 'coordonnees_contact')"/>
                </td>
              </tr>
              <tr>
                <td>&nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <span class="fieldsetSubtitle">Adresse</span><br/>
                  Rue :
                <input style="width:93%;"
                        type="text"
                          id="interventionTicketRue"
                        name="interventionTicketRue"
                       value=""
                   maxlength="80"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateAddress(this.id, 'rue')"/>
                </td>
              </tr>
              <tr>
                <td>
                  Code Postal :
                    <input style="width:50px;"
                            type="text"
                              id="interventionTicketCodePostal"
                            name="interventionTicketCodePostal"
                       maxlength="5"
                           value=""
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="crfIrpUtils.checkZipCodeAndSave(miInterventionCs.updateAddress, this.id, 'code_postal');"
                    />
                  Ville :
                    <input style="width:61.7%;"
                            type="text"
                              id="interventionTicketVille"
                            name="interventionTicketVille"
                           value=""
                       maxlength="80"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateAddress(this.id, 'ville')"
                    />
                    <img id="googleAdressCheckStatus" src="../../img/pix.png" alt="pix" style="height:16px;width:16px;"/>
                    <input type="hidden" id="interventionTicketCoordinateLat"  name="interventionTicketCoordinateLat" />
                    <input type="hidden" id="interventionTicketCoordinateLong" name="interventionTicketCoordinateLong"/>

                </td>
              </tr>
              <tr>
                <td>
                  Bat. :
                    <input style="width:25%;"
                            type="text"
                              id="interventionTicketBatiment"
                            name="interventionTicketBatiment"
                           value=""
                       maxlength="30"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateInterventionStringField(this.id, 'batiment')"
                    />
                  Etage :
                    <input style="width:25%;"
                            type="text"
                              id="interventionTicketEtage"
                            name="interventionTicketEtage"
                           value=""
                       maxlength="30"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateInterventionStringField(this.id, 'etage')"
                    />
                  Porte :
                    <input style="width:25%;"
                            type="text"
                              id="interventionTicketPorte"
                            name="interventionTicketPorte"
                           value=""
                       maxlength="30"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateInterventionStringField(this.id, 'porte')"
                    />
                </td>
              </tr>
              <tr>
                <td>&nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <span class="fieldsetSubtitle">Complément d'adresse :</span> (Codes portes, interphone, etc...)
                  <textarea   id="interventionTicketComplementAdresse"
                            name="interventionTicketComplementAdresse"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miInterventionCs.updateInterventionStringField(this.id, 'complement_adresse')"
                    ></textarea>
                </td>
              </tr>
            </table>
          </fieldset>
        </td>
      </tr>
    </tbody>
  </table>
</div>


  </div><!-- FIN InterventionEditor -->
  <div id="InterventionList">
    <div id="InterventionListEncoursEdition">
    </div>
    <div id="InterventionListUnaffected">
    </div>
    <div id="InterventionListOthers">
    </div>
  </div>
</div>
<!-- Fin Intervention Editor -->