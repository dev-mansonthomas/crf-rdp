<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
  String contextPath = request.getContextPath();
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
  <title>Saisie - CRF - Régulation De Paris</title>

  <jwr:style src="/cssBundle/monitorInput.css"/>

  <link rel="shortcut icon" href="../../img/famfamfam/table_edit.png" type="image/png">
  <script type="text/javascript">
  contextPath = '<%=contextPath%>';
  </script>
</head>
<body id="MonitorInputBody">

  <div id="north">
    <img src="../../img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
  </div>
<jsp:include page="../versionAndChangelog.jsp"/>

<div id="regulationInformation">
<input type="hidden" id="regulationId" name="regulationId"  value=""/>
  <table>
    <tr>
      <th>Intitulé</th>
      <td id="label"></td>
      <th>Date de début</th>
      <td id="startDate"></td>
      <th>Status</th>
      <td id="open"></td>
    </tr>
    <tr>
      <th>Régulateur</th>
      <td id="regulateur"></td>
      <th>Date de fin prévue</th>
      <td id="expectedEndDate"></td>
      <th>co-régulateurs</th>
      <td onClick="miCoRegulateurListCs.displayCoRegulateur();"><img src="../../img/monitorInput/user_edit.png" id="CoRegulateursListEdit" alt="Ajouter/Supprimer des co-Régulateurs"/></td>
    </tr>
  </table>
</div>
  <div id="center">

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
                <input style="width:90%;"
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
                          onBlur="miInterventionCs.updateAddress(this.id, 'code_postal')"
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
      <tr>
        <td>
            <fieldset id="interventionTicketEditButton">
              <legend>Action</legend>
              <input type="button" id="AddIntervention"       value="Terminer"  onclick="miInterventionCs.endOfEditionEvent       ();"/>
              <input type="button" id="AddInterventionDelete" value="Supprimer" onclick="miInterventionCs.deleteInterventionTicket(false);"/>
              <input type="button" id="AddInterventionClose"  value="Fermer"    onclick="miInterventionCs.hideInterventionTicket  ();" style="display:none;"/>
            </fieldset>
            <fieldset id="interventionTicketCancelButton" style="display:none;">
              <legend>Annulation de l'intervention</legend>
              <input type="button" id="AddInterventionDeleteConfirm" value="Annuler l'Intervention"  onclick="miInterventionCs.deleteInterventionTicket(true);"/>
              <input type="button" id="AddInterventionCancel"        value="Non, je me suis trompé"  onclick="miInterventionCs.hideInterventionTicket();"/>
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


<!-- Bilan Editor -->
<div id="BilanPanel" style="display:none">
  <div id="BilanEditor"  style="display:none">
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
          <input style="width:90px;"
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
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_reactive', 'bilanPupilleReactiveP');miBilanCs.pupilleCheckPupilleReactive(this.id);"/>
     Réactives
      </td>
      <td style="text-align:right;" id="bilanPupilleMyosisGaucheP" ext:qtip="Myosis: pupille de ma taille d'une tete d'aiguille en l'abscence de lumière">
     Myosis Gauche
     
     <input type="checkbox"
             id="bilan_pupille_myosis_gauche"
           name="bilan_pupille_myosis_gauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_myosis_gauche', 'bilanPupilleMyosisGaucheP');miBilanCs.pupilleCheckMyosisMydriase(this.id);"/>
     
      </td>
      <td id="bilanPupilleMyosisDroiteP">
          <input type="checkbox"
             id="bilan_pupille_myosis_droite"
           name="bilan_pupille_myosis_droite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_myosis_droite', 'bilanPupilleMyosisDroiteP');miBilanCs.pupilleCheckMyosisMydriase(this.id);"/>
        Droite
      </td>
    </tr>
    <tr>
      <td id="bilanPupilleNonReactiveP">
          <input type="checkbox"
             id="bilan_pupille_non_reactive"
           name="bilan_pupille_non_reactive"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_non_reactive', 'bilanPupilleNonReactiveP');miBilanCs.pupilleCheckPupilleReactive(this.id);"/>
     Non Réactives
      </td>
      <td style="text-align:right;" id="bilanPupilleMydriaseGaucheP" ext:qtip="Mydriase: pupille complétement dilaté en présence d'une source de lumière">
     Mydriase Gauche
          <input type="checkbox"
             id="bilan_pupille_mydriase_gauche"
           name="bilan_pupille_mydriase_gauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_mydriase_gauche', 'bilanPupilleMydriaseGaucheP');miBilanCs.pupilleCheckMyosisMydriase(this.id);"/>
     
      </td>
      <td id="bilanPupilleMydriaseDroiteP">
          <input type="checkbox"
             id="bilan_pupille_mydriase_droite"
           name="bilan_pupille_mydriase_droite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_mydriase_droite', 'bilanPupilleMydriaseDroiteP');miBilanCs.pupilleCheckMyosisMydriase(this.id);"/>
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
    <div id="BilanEvacuation">
    
    <table id="BilanEvacuationTable">
      <tr>
        <td id="bilanEvacLaisseSurPlaceP">
             <input type="checkbox"
           id="bilan_evac_laisse_sur_place"
         name="bilan_evac_laisse_sur_place"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_laisse_sur_place','bilanEvacLaisseSurPlaceP')"/>
             
          Laissé sur place
          
        </td>      
      
        <td id="bilanEvacRefusTransportP">
             <input type="checkbox"
           id="bilan_evac_refus_de_transport"
         name="bilan_evac_refus_de_transport"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_refus_de_transport','bilanEvacRefusTransportP')"/>
             
          Refus de transport
          
        </td>

        <td id="bilanEvacDechargeP">
             <input type="checkbox"
           id="bilan_evac_decharche"
         name="bilan_evac_decharche"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_decharche','bilanEvacDechargeP')"/>
             
          Décharge responsabilité
          
        </td>
      </tr>
      <tr>

        <td colspan="3" id="bilanEvacLaisseeSurPlaceDcdP">
             <input type="checkbox"
           id="bilan_evac_laisse_sur_place_decedee"
         name="bilan_evac_laisse_sur_place_decedee"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_laisse_sur_place_decedee','bilanEvacLaisseeSurPlaceDcdP')"/>
             
          Laissé sur place Décédé, à disposition de
          
             <input type="text"
           id="bilan_evac_laisse_sur_place_decedee_a_dispo_de"
         name="bilan_evac_laisse_sur_place_decedee_a_dispo_de"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="80"
        style="width:400px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_laisse_sur_place_decedee_a_dispo_de')"/>

        </td>
      </tr>

      <tr>
        <td colspan="3">
        &nbsp;
        </td>
      </tr>
      <tr>
        <th>
          Aggravation
        </th>
        <td colspan="2" id="bilanEvacAggravationP">
        

           <input type="radio"
           id="bilan_evac_aggravation_false"
         name="bilanEvacAggravation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation','bilanEvacAggravationP')"
        value="false"/> <strong>Non</strong>
          
  <input type="radio"
           id="bilan_evac_aggravation_true"
         name="bilanEvacAggravation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation','bilanEvacAggravationP')"
        value="true"/> <strong>Oui</strong>        
        
        &nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="checkbox"
           id="bilan_evac_aggravation_pendant_transport"
         name="bilan_evac_aggravation_pendant_transport"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation_pendant_transport','bilanEvacAggravationP')"/> Pendant transport&nbsp;&nbsp;
     
                  <input type="checkbox"
           id="bilan_evac_aggravation_arrive_a_destination"
         name="bilan_evac_aggravation_arrive_a_destination"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation_arrive_a_destination','bilanEvacAggravationP')"/> Arrivée à destination
        
        </td>
      </tr>
      <tr>
        <td>
          Ventilation
  <input type="text"
           id="bilan_evac_aggravation_ventilation"
         name="bilan_evac_aggravation_ventilation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_ventilation')"/>
     / <sub ext:qtip="Minute">min</sub>
     
     
        </td>
        <td>
          Circulation
  <input type="text"
           id="bilan_evac_aggravation_circulation"
         name="bilan_evac_aggravation_circulation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_circulation')"/>
     / <sub ext:qtip="Minute">min</sub>          
        </td>
        <td ext:qtip="Douleur de 0 à 4">
          Douleur
  <input type="text"
           id="bilan_evac_aggravation_douleur"
         name="bilan_evac_aggravation_douleur"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_douleur')"/>
     / <sub>4</sub>
        </td>
      </tr>
      <tr>
        <td>
          <strong>Conctact Régulation</strong>
  <input type="text"
           id="bilan_evac_aggravation_contact_regulation"
         name="bilan_evac_aggravation_contact_regulation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="5"
        style="width:35px;"
        value="  :  "
     onChange="miBilanCs.updateDateField(this.id, 'evac_aggravation_contact_regulation')"/>          
        </td>
        <td colspan="2">
        Nature de l'aggravation :
        <input type="text"
           id="bilan_evac_aggravation_nature"
         name="bilan_evac_aggravation_nature"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="100"
        style="width:300px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_aggravation_nature')"/>
         
        </td>
      </tr>
      <tr>
        <td colspan="3">
        &nbsp;
        </td>
      </tr>      
      <tr>
        <th>
          Transport
        </th>
        <td colspan="2" id="bilanEvacParP">
  <input type="radio"
           id="bilan_evac_par_1"
         name="bilanEvacPar"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
        value="1"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="C'est nous ;)">Croix Rouge</span>
&nbsp;&nbsp;
  <input type="radio"
           id="bilan_evac_par_2"
         name="bilanEvacPar"
        value="2"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="Service d'Aide Médicale Urgente">SAMU</span>    
     
        
  <input type="radio"
           id="bilan_evac_par_3"
         name="bilanEvacPar"
        value="3"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="Brigade des Sapeurs Pompiers">BSPP</span>
&nbsp;&nbsp;
  <input type="radio"
           id="bilan_evac_par_4"
         name="bilanEvacPar"
        value="4"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> Police   
        </td>
      </tr>
      <tr>
        <td>&nbsp;
        </td>
        <td colspan="2" id="bilanEvacParAutreP">
  <input type="radio"
           id="bilan_evac_par_5"
         name="bilanEvacPar"
        value="5"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par', 'bilanEvacParAutreP')"/> Autre       

        <input type="text"
           id="bilan_evac_par_autre"
         name="bilan_evac_par_autre"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="100"
        style="width:300px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_par_autre')"/>
              
        </td>
      </tr>
      <tr>
        <td>
          Hopital 
     <select  id="bilan_evac_hopital_destination"
            name="bilan_evac_hopital_destination"
         onFocus="crfIrpUtils.fieldEdit(this.id)"
        onChange="miBilanCs.updateIntegerField(this.id, 'evac_hopital_destination')">
          <option value="0">&nbsp;</option>
          </select>
<br/><br/>
ou Autre destination <br/>


<span style="width:80px;display:block;float:left;" ext:qtip="Exemple : Clinique privée, Maison de retraite, domicile du patient">Description </span>
  <input style="width:60%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_label"
          name="bilan_evac_autre_dest_label"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
      onChange="miBilanCs.updateStringField(this.id, 'evac_autre_dest_label')"
     maxlength="80"/>
<br/>
<span style="width:80px;display:block;float:left;" >Rue </span>
  <input style="width:60%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_rue"
          name="bilan_evac_autre_dest_rue"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id, 'evac_autre_dest_rue')"/>
<br/>
<span style="width:80px;display:block;float:left;" >Code Postal </span>
  <input style="width:50px;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_code_postal"
          name="bilan_evac_autre_dest_code_postal"
     maxlength="5"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id,'evac_autre_dest_code_postal')"
  />
Ville 
  <input style="width:60.0%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_ville"
          name="bilan_evac_autre_dest_ville"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id, 'evac_autre_dest_ville')"
  />
  <img id="bilanEvacGoogleAdressCheckStatus" alt="pix" style="height:16px;width:16px;" src="../../img/pix.png" />
  <input type="hidden" id="bilan_evac_autre_dest_google_coords_lat"  name="evac_autre_dest_google_coords_lat" />
  <input type="hidden" id="bilan_evac_autre_dest_google_coords_long" name="evac_autre_dest_google_coords_long"/>
          

        





        </td>
        <td>

         
        </td>
        <td>
          

        </td>
      </tr>      
    </table>    
    
    
    </div>
  </div>
  
  <!-- FIN BilanEditor -->
  <div id="BilanHelper">
    <fieldset>
      <legend>Identification</legend>
      <table class="BilanHelperFieldsetTable">
        <tr>
          <th ext:qtip="Identifiant de l'intervention">Id Inter. :</th>
          <td><span id="BilanHelper_id_intervention"      ></span></td>
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
</div>

<div id="bilan-commentsAndEval" class="x-hidden">
    <div class="x-window-header">Bilan - Commentaires &amp; Evaluations</div>
    <div id="bilan-commentsAndEval-tabs">
        <!-- Auto create tab 1 -->
        <div class="x-tab" title="Commentaires">
          
        <textarea id="bilan_bilan_commentaires"
                name="bilan_bilan_commentaires"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_commentaires')"></textarea>

        </div>
        <!-- Auto create tab 2 -->

        <div class="x-tab" title="Evalution CI">

        <textarea id="bilan_bilan_evaluation_ci"
                name="bilan_bilan_evaluation_ci"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_evaluation_ci')"></textarea>

        </div>
    </div>
</div>


<!-- Fenetre pour l'annulation de l'intervention -->

<div id="bilan-cancelIntervention" class="x-hidden">
    <div class="x-window-header">Annulation de l'Intervention</div>
    <div id="bilan-cancelIntervention-content">
      Motif de l'annulation:
           <select  id="bilan_motif_annulation"
                  name="bilan_motif_annulation"><option value=" "> </option></select><br/><br/>

      Commentaire sur l'annulation : <br/>
                  <textarea   id="bilan_annulation_commentaires"
                            name="bilan_annulation_commentaires"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miBilanCs.updateStringField(this.id, 'annulation_commentaires')"
                    ></textarea>
    </div>
</div>


<!-- Fin Bilan Editor -->

<!-- Dispositif Editor -->
    <div id="DispositifPanel">
      <div id="DispositifEditor">


<div id="DispositifEdit" style="display:none;width:600px;">
  <input type="hidden" id="dispositif_id_field"         name="dispositif_id_field"         value=""/>
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

        <fieldset>
          <legend>Materiel</legend>


<table id="DispositifO2Table" cellspacing="0" style="width:200px;float:left;">
  <tr>
    <th rowspan="2" style="font-size:14px;width:20px;">
      O<sub>2</sub>
    </th>
    <th class="DispositifO2TableRowTitle" ext:qtip="Volume en litre des bouteilles">V <sub>(l)</sub></th>
    <td><!-- B1 -->
<input type="text"
         id="DispositifB1V"
       name="DispositifB1V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B1_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
    </td>
    <td><!-- B2 -->
<input type="text"
         id="DispositifB2V"
       name="DispositifB2V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B2_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
    </td>
    <td><!-- B3 -->
<input type="text"
         id="DispositifB3V"
       name="DispositifB3V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B3_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
    </td>
    <td><!-- B4 -->
<input type="text"
         id="DispositifB4V"
       name="DispositifB4V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B4_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
    </td>
    <td><!-- B5 -->
<input type="text"
         id="DispositifB5V"
       name="DispositifB5V"
      class="DispositifO2Input"
    onFocus="crfIrpUtils.fieldEdit(this.id)"
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B5_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
    </td>
    <td id="DispositifVolumeTotal" style="width:30px;"><!-- Volume Total -->
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
    <td id="DispositifAutonomieTotal" style="width:30px;"><!-- Autonomie Total -->
    </td>
  </tr>
</table>


          <table id="DispositifDefibrilateurTable" style="width:49%;">
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
        </fieldset>


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
    <div id="RegulationPanel"></div>

  </div>
  <div id="south">
    <p></p>
  </div>

  <!-- google map -->
  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=${googleMapsKey}" type="text/javascript"> </script>

  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath="../..";
    var iconPath = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-3.1.1/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/monitorInput.js"/>

  <script type="text/javascript">
    Ext.onReady(init);
  </script>
</body>
</html>