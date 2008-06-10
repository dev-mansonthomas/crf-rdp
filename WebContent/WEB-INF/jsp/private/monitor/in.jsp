<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%
String contextPath = request.getContextPath();
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"/>
  <title>Saisie - CRF - Informatisation de la Régulation de Paris</title>

  <style type="text/css" media="all">
    @import "<%=contextPath%>/css/style.css";
    @import "<%=contextPath%>/css/autocomplete.css";
    @import "<%=contextPath%>/css/CrfUtils.css";
    
    @import "<%=contextPath%>/css/monitorInput/monitorInput.css";
    @import "<%=contextPath%>/css/monitorInput/toolbar.css";
    @import "<%=contextPath%>/css/monitorInput/CoRegulateurList.css";
    @import "<%=contextPath%>/css/monitorInput/Dispositif.css";
    @import "<%=contextPath%>/css/monitorInput/Intervention.css";
    @import "<%=contextPath%>/css/monitorInput/Bilan.css";

    @import "<%=contextPath%>/js/calendar/css/calendar-blue.css";    
    @import "<%=contextPath%>/css/calendarFix.css";
    
    @import "<%=contextPath%>/js/extjs-2/resources/css/ext-all.css";
    @import "<%=contextPath%>/js/extjs-2/resources/css/xtheme-gray.css";
  </style>

  <link rel="shortcut icon" href="<%=contextPath%>/img/famfamfam/table_edit.png" type="image/png">
  
<!-- ExtJS 2.0 -->
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-2/adapter/ext/ext-base.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-2/ext-all-debug.js"></script>

  <script type="text/javascript">
   var contextPath="<%=contextPath%>";
   var iconPath = '../img/famfamfam/';
   Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
  </script>  
  
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/DwrProxy.js"> </script>
      
<!-- DWR Ajax -->
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorCommons.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInput.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInputIntervention.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInputBilan.js"> </script>
  
<!-- END of DWR Ajax -->

<!-- prototype framework -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype/prototype.js"> </script>
<!-- script.aculo.us effect library -->
  <script type="text/javascript" src="<%=contextPath%>/js/script.aculo.us/scriptaculous.js"> </script>

<!-- autocomplete (script.aculo.us & DWR) MiSt <msteiner@gazeta.pl> -->
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/utils/autocomplete.js"> </script>

<!-- google map -->  
  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA5WgPOr7f6qTWKh4L_FtBlxRZToBgTL8795eWPGANN-eVsPt3iBRHbtkDa1gCbaK3_A9lx0TF9lV05g" type="text/javascript"> </script>


<!--business code -->
  <script type="text/javascript" src="<%=contextPath%>/js/googlemap/googleMap.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/input/MonitorInputBilan.js"> </script>  
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/input/MonitorInputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/input/MonitorInputIntervention.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/input/MonitorInput.js"> </script>


  <script type="text/javascript" src="<%=contextPath%>/js/monitor/utils/pagebus.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/utils/utils.js"> </script>
    
<script type="text/javascript">
  Ext.onReady(init);
</script>
</head>
<body id="MonitorInputBody">

  <div id="north">
    <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
  </div>
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
      <td onClick="miCoRegulateurListCs.displayCoRegulateur();"><img src="<%=contextPath%>/img/monitorInput/user_edit.png" id="CoRegulateursListEdit" alt="Ajouter/Supprimer des co-Régulateurs"/></td>
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
                    onChange="miInterventionCs.updateInterventionIntField(this.id, 'id_origine')"><option value=" "> </option></select>
                </td>
                <td>
                  Date/Heure de réception :

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
              onChange="miInterventionCs.updateInterventionIntField(this.id, 'id_motif')"><option value=" "> </option></select>

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
                  Nom Prénom de la victime :
                <input style="width:53%;" 
                        type="text"
                          id="interventionNomVictime" 
                        name="interventionNomVictime" 
                       value=""
                   maxlength="60"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miInterventionCs.updateInterventionStringField(this.id, 'nom_victime')"/>
              </td>
            </tr>
            <tr>
              <td>&nbsp;
              </td>
            </tr>
            <tr> 
                <td>
                  Contact Sur Place <br/> Nom :
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
                    <img id="googleAdressCheckStatus" src="<%=contextPath%>/img/pix.png" alt="pix" style="height:16px;width:16px;">
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
                  Complément d'adresse : (Codes portes, interphone, etc...)
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
              <input type="button" id="AddIntervention"       value="Annuler l'Intervention"  onclick="miInterventionCs.deleteInterventionTicket(true);"/>
              <input type="button" id="AddInterventionCancel" value="Non, je me suis trompé"  onclick="miInterventionCs.hideInterventionTicket();"/>
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
<div id="BilanPanel">
  <div id="BilanEditor">
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
          <input style="width:120px;" 
                  type="text"
                    id="bilanNomVictime" 
                   name="bilanNomVictime" 
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
                    id="bilanPrenomVictime" 
                  name="bilanPrenomVictime" 
                 value=""
             maxlength="60"
               onFocus="crfIrpUtils.fieldEdit(this.id)"
                onBlur="miBilanCs.updateStringField(this.id, 'prenom_victime')"/>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="BilanFieldInputLabel">Nom JF :</div>
      </td>
      <td>
          <input style="width:120px;" 
                  type="text"
                    id="bilanNomJFVictime" 
                  name="bilanNomJFVictime" 
                 value=""
             maxlength="60"
               onFocus="crfIrpUtils.fieldEdit(this.id)"
                onBlur="miBilanCs.updateStringField(this.id, 'nom_jf_victime')"/>
      
      </td>
      <td>

      </td>
      <td>
      </td>
    </tr>    

    <tr>
      <td>
        <div class="BilanFieldInputLabel">Date de Naissance :</div>
      </td>
      <td>
          <input style="width:75px;" 
                  type="text"
                    id="bilanDateNaissance" 
                  name="bilanDateNaissance" 
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
                    id="bilanLieuNaissance" 
                  name="bilanLieuNaissance" 
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
          <input style="width:120px;" 
                  type="text"
                    id="bilanAdresseVictime" 
                  name="bilanAdresseVictime" 
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
                    id="bilanCodePostalVictime" 
                  name="bilanCodePostalVictime" 
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
                    id="bilanVilleVictime" 
                  name="bilanVilleVictime" 
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
                    id="bilanPaysVictime" 
                  name="bilanPaysVictime" 
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
                    id="bilanPersonneAPrevenir" 
                  name="bilanPersonneAPrevenir" 
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
                    id="bilanTelPersonneAPrevenir" 
                  name="bilanTelPersonneAPrevenir" 
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
                    id="bilanEffetsOuObjetsRemis" 
                  name="bilanEffetsOuObjetsRemis" 
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
                    id="bilanEffetsOuObjetsRemisA" 
                  name="bilanEffetsOuObjetsRemisA" 
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

        <textarea id="bilanCirconstances"
                name="bilanCirconstances"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_circonstances')"/></textarea>
        
      </fieldset>

      <fieldset id="BilanBlessureSigneDetresseFielset"> 
        <legend>Blessures et Signes de Détresse</legend>

        <textarea id="bilanBlessureDetresse"
                name="bilanBlessureDetresse"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_detresses')"/></textarea>
        
      </fieldset>
      
      <fieldset id="BilanAntecedentsFielset"> 
        <legend>Antécédents et Traitements Suivis</legend>

        <textarea id="bilanAntecedent"
                name="bilanAntecedent"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_antecedents')"/></textarea>
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
            <p>
              <input type="checkbox"
                       id="bilanCsComa"
                     name="bilanCsComa"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_coma')"/>
               Coma
            </p>
            <p>
              <input type="checkbox"
                       id="bilanCsPci"
                     name="bilanCsPci"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_pci')"/>
               PCI, Durée : 
               <input style="width:60px;" 
                  type="text"
                    id="bilanCsPciDuree" 
                  name="bilanCsPciDuree" 
                 value=""
             maxlength="10"
               onFocus="crfIrpUtils.fieldEdit(this.id)"
                onBlur="miBilanCs.updateStringField(this.id, 'cs_pci_duree')"/>
            </p>
            <p>
              <input type="checkbox"
                       id="bilanCsPcSecondaire"
                     name="bilanCsPcSecondaire"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_pc_secondaire')"/>
               PC secondaire
            </p>
            <p>
              <input type="checkbox"
                       id="bilanCsAgitation"
                     name="bilanCsAgitation"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_agitation')"/>
               Agitation
            </p>
            <p>
              <input type="checkbox"
                       id="bilanCsConvulsions"
                     name="bilanCsConvulsions"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'cs_convulsions')"/>
               Convulsions
            </p>
          </td>
          <td>
            <p>
              <input type="checkbox"
                       id="bilanVentilAbscence"
                     name="bilanVentilAbscence"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_absence')"/>
               Absence de ventilation
            </p>          
            <p>
              Fréquence
              <input style="width:30px;" 
                        type="text"
                          id="bilanVentilChiffre" 
                        name="bilanVentilChiffre" 
                       value=""
                   maxlength="3"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntField(this.id, 'ventil_chiffre')"/>
              Obs
              <input style="width:120px;" 
                        type="text"
                          id="bilanVentilCommentaire" 
                        name="bilanVentilCommentaire" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntField(this.id, 'ventil_commentaire')"/>                      
            </p>
<table style="width:100%;">
  <tr>
    <td>
            <p>
              <input type="checkbox"
                       id="bilanVentilSuperficielle"
                     name="bilanVentilSuperficielle"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_superficielle')"/>
               Superficielle
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilIrregulierre"
                     name="bilanVentilIrregulierre"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_irreguliere')"/>
               Irrégulière
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilPauses"
                     name="bilanVentilPauses"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_pauses')"/>
               Pauses
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilSifflement"
                     name="bilanVentilSifflement"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_sifflement')"/>
               Sifflements
            </p>     
    </td>
    <td>
            <p>
              <input type="checkbox"
                       id="bilanVentilRonflement"
                     name="bilanVentilRonflement"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_ronflement')"/>
               Ronflements
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilTirage"
                     name="bilanVentilTirage"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_tirage')"/>
               Tirage
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilSueurs"
                     name="bilanVentilSueurs"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_sueurs')"/>
               Sueurs
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanVentilCyanose"
                     name="bilanVentilCyanose"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'ventil_cyanose')"/>
               Cyanose
            </p>     
    </td>
  </tr>
</table>
<p>
              Saturation O<sub>2</sub>
              <input style="width:120px;" 
                        type="text"
                          id="bilanVentilSat02" 
                        name="bilanVentilSat02" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntField(this.id, 'ventil_saturation_o2')"/>    
</p>
            
          </td>
          <td>
              <input type="checkbox"
                       id="bilanCirculAbscence"
                     name="bilanCirculAbscence"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_non_percu')"/>
               Absence de ventilation
            </p>          
            <p>
              Fréquence
              <input style="width:30px;" 
                        type="text"
                          id="bilanCirculChiffre" 
                        name="bilanCirculChiffre" 
                       value=""
                   maxlength="3"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntField(this.id, 'circul_pouls_chiffre')"/>
              Obs
              <input style="width:120px;" 
                        type="text"
                          id="bilanCirculCommentaire" 
                        name="bilanCirculCommentaire" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateIntField(this.id, 'circul_pouls_commentaire')"/>                      
            </p>
<table style="width:100%;">
  <tr>
    <td>
            <p>
              <input type="checkbox"
                       id="bilanCirculIrregulier"
                     name="bilanCirculIrregulier"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_irregulier')"/>
               Irrégulier
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanCirculConjonctivesDecolorees"
                     name="bilanCirculConjonctivesDecolorees"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_conjonctive_decolorees')"/>
               Conjonct. <sub>décolorées</sub>
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanCirculMarbrure"
                     name="bilanCirculMarbrure"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_marbrure')"/>
               Marbrure
            </p> 
    </td>
    <td>
            <p>
              <input type="checkbox"
                       id="bilanCirculFaible"
                     name="bilanCirculFaible"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_pouls_faible')"/>
               Faible
            </p> 
            <p>
              <input type="checkbox"
                       id="bilanCirculPaleur"
                     name="bilanCirculPaleur"
                  onFocus="crfIrpUtils.fieldEdit(this.id)"
                 onChange="miBilanCs.updateBooleanField(this.id, 'circul_paleur_cutanees')"/>
               Paleurs <sub>Cutanées</sub>
            </p> 
    </td>
  </tr>
</table>
<p>
              Tension
              <input style="width:30px;" 
                        type="text"
                          id="bilanCirculTensionBasse" 
                        name="bilanCirculTensionBasse" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_basse')"/>
                      /
              <input style="width:30px;" 
                        type="text"
                          id="bilanCirculTensionHaute" 
                        name="bilanCirculTensionHaute" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_haute')"/>                          
</p> 
<p>
              Tension de ref.
              <input style="width:30px;" 
                        type="text"
                          id="bilanCirculTensionRefBasse" 
                        name="bilanCirculTensionRefBasse" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_ref_basse')"/>
                      /
              <input style="width:30px;" 
                        type="text"
                          id="bilanCirculTensionRefHaute" 
                        name="bilanCirculTensionRefHaute" 
                       value=""
                   maxlength="16"
                     onFocus="crfIrpUtils.fieldEdit(this.id)"
                      onBlur="miBilanCs.updateFloatField(this.id, 'circul_tension_ref_haute')"/>                          
</p>         
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
      <td>
          <input type="checkbox"
             id="bilanPupilleReactive"
           name="bilanPupilleReactive"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_reactive')"/>
     Réactives
      </td>
      <td>
          <input type="checkbox"
             id="bilanPupilleMyosisGauche"
           name="bilanPupilleMyosisGauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_myosis_gauche')"/>
     Myosis Gauche      
      </td>
      <td>
          <input type="checkbox"
             id="bilanPupilleMyosisDroite"
           name="bilanPupilleMyosisDroite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_myosis_droite')"/>
     Myosis Droite
      </td>
    </tr>
    <tr>
      <td>
          <input type="checkbox"
             id="bilanPupilleNonReactive"
           name="bilanPupilleNonReactive"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_non_reactive')"/>
     Non Réactives
      </td>
      <td>
          <input type="checkbox"
             id="bilanPupilleMydriaseGauche"
           name="bilanPupilleMydriaseGauche"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_mydriase_gauche')"/>
     Mydriase Gauche 
      </td>
      <td>
          <input type="checkbox"
             id="bilanPupilleMydriaseDroite"
           name="bilanPupilleMydriaseDroite"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_mydriase_droite')"/>
     Mydriase Droite
      </td>
    </tr>
  </table>
          <input type="checkbox"
             id="bilanPupilleAssymetrique"
           name="bilanPupilleAssymetrique"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateBooleanField(this.id, 'pupille_asymetriques')"/>
     Assymétriques
          </td>
          <td>
<!-- douleur -->
          <input type="radio"
             id="bilanDouleur0"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntField(this.id, 'douleur')"
          value="0"/>
     0.&nbsp;&nbsp;&nbsp;

          <input type="radio"
             id="bilanDouleur1"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntField(this.id, 'douleur')"
          value="1"/>
     1.&nbsp;&nbsp;&nbsp;
     
               <input type="radio"
             id="bilanDouleur2"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntField(this.id, 'douleur')"
          value="2"/>
     2.&nbsp;&nbsp;&nbsp;
     
          <input type="radio"
             id="bilanDouleur3"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntField(this.id, 'douleur')"
          value="3"/>
     3.&nbsp;&nbsp;&nbsp;
     
          <input type="radio"
             id="bilanDouleur4"
           name="bilanDouleur"
        onFocus="crfIrpUtils.fieldEdit(this.id)"
       onChange="miBilanCs.updateIntField(this.id, 'douleur')"
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
          <td colspan="2">
          </td>
        </tr>
      </tbody>
    </table>

    
    </div>
    <div id="BilanEvacuation">
    </div>
  </div><!-- FIN BilanEditor -->
  <div id="BilanHelper">
  </div>
</div>
<!-- Fin Bilan Editor -->

<!-- Dispositif Editor -->
    <div id="DispositifPanel">
      <div id="DispositifEditor">


<div id="DispositifEdit" style="width:460px;display:none;">
  <input type="hidden" id="dispositif_id_field" name="dispositif_id_field" value=""/>
  <table>
    <thead>
      <tr>
        <th id="dispositif_title">
          <span id="dispositif_title_indicatif">Nouveau Dispositif</span> <span id="dispositif_id_span"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        <fieldset> 
          <legend>Identification</legend>
          <table>
            <tr> 
              <td style="width:135px;">Type :<br/> <select id="DispositifType" name="DispositifType" onFocus="crfIrpUtils.fieldEdit(this.id)" onChange="miDispositifCs.updateDispositifIntField(this.id, 'id_type_dispositif')"><option value=" "> </option></select></td>
              <td>Indicatif :<br/> <input type="text" id="DispositifIndicatif"  name="DispositifIndicatif"  value="" onFocus="crfIrpUtils.fieldEdit(this.id)" onChange="miDispositifCs.updateDispositifStringField(this.id, 'indicatif_vehicule')"/></td>
              <td>
                Delegation :<br/> 
                <input type="text"    id="DispositifDelegation"           name="DispositifDelegation" onFocus="crfIrpUtils.fieldEdit(this.id)" />
                <div id="DispositifDelegation_SelectList" class="auto_complete"></div> 
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
                Début : 
                
                <div id="DispositifDHDebut_div"></div>
              </td>
              <td style="width:50%;text-align:center;">
                Fin   :
                
                <div id="DispositifDHFin_div"></div>
              </td>
            </tr>
          </table>          
        </fieldset>


        <!-- Ajout/Suppression D'équipier--> 
        <fieldset> 
          <legend>Liste Des Equipiers Du Dispositif</legend>        
            <table id="DispositfEquipierTable" class="userList">
              <thead>
                <tr>
                  <th style="width:70px;">N&deg; NIVOL</th>
                  <th>Nom Prénom</th>
                  <th>Role</th>
                  <th style="width:70px;">Suppression</th>
                </tr>
              </thead>
              <tbody id="dispositifEquipierList_tbody">
                <tr>
                  <td colspan="4" style="text-align:center;">
                    Aucun équipier
                  </td>
                </tr>
              </tbody>
            </table>
            <table id="DispositifEquipierAddIHM">
              <tbody id="DispositifEquipierAddIHM_tBody">
                <tr>
                  <th  id="DispositifEquipierAddIHMHeader">
                    Ajouter Un Equipier
                  </th>
                </tr>
                <tr>
                  <td style="text-align:center;"  id="DispositifEquipierAddIHMInput">
                    <div id="DispositifEquipierRoleToChoose">
  
                      <select name="DispositifEquipierToAddRole" id="DispositifEquipierToAddRole"></select>&nbsp;&nbsp;&nbsp;Nivol&nbsp;:&nbsp;<input type="text" 
                               id="DispositifEquipierAdd_Nivol" 
                             name="DispositifEquipierAdd_Nivol" 
                             size="38" 
                          onFocus="miDispositifCs.displayCurrentEquipierRoleToAdd($('DispositifEquipierRoleToChoose').equipierRankToChoose);crfIrpUtils.fieldEdit(this.id);" />
                    </div>
                    <table>
                      <tr>
                        <td>
                          &nbsp;Recherche par Nom&nbsp;:&nbsp;
                        </td>
                        <td>
                          <input type="text" 
                                  id="DispositifEquipierAdd_Nom" 
                                name="DispositifEquipierAdd_Nom" 
                                size="35" 
                             onFocus="miDispositifCs.displayCurrentEquipierRoleToAdd($('DispositifEquipierRoleToChoose').equipierRankToChoose);crfIrpUtils.fieldEdit(this.id)" />
                             <div id="DispositifEquipierAdd_SelectList" class="auto_complete" style="width:250px;"></div> 
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
         <!-- FIN Ajout/Suppression D'équipier-->

        <fieldset> 
          <legend>Materiel</legend>
          

<table id="DispositifO2Table" cellspacing="0" style="width:200px;float:left;">
  <tr>
    <th rowspan="2" style="font-size:14px;width:20px;">
      O<sub>2</sub>
    </th>
    <th class="DispositifO2TableRowTitle">V <sub>(l)</sub></th>
    <td><!-- B1 -->
<input type="text" 
         id="DispositifB1V" 
       name="DispositifB1V" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B1_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB1V', "/3|5|15/.test(#{value})", "5");</script>
    
    </td>
    <td><!-- B2 -->
<input type="text" 
         id="DispositifB2V" 
       name="DispositifB2V" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B2_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB2V', "/3|5|15/.test(#{value})", "5");</script>
    </td>
    <td><!-- B3 -->
<input type="text" 
         id="DispositifB3V" 
       name="DispositifB3V" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B3_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB3V', "/3|5|15/.test(#{value})", "5");</script>
    </td>
    <td><!-- B4 -->
<input type="text" 
         id="DispositifB4V" 
       name="DispositifB4V" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B4_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB4V', "/3|5|15/.test(#{value})", "5");</script>
    </td>
    <td><!-- B5 -->
<input type="text" 
         id="DispositifB5V" 
       name="DispositifB5V" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifIntField(this.id, 'O2_B5_volume');miDispositifCs.updateVolumeAndAutonomie();"
/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB5V', "/3|5|15/.test(#{value})", "5");</script>
    </td>
    <td id="DispositifVolumeTotal" style="width:30px;"><!-- Volume Total -->
    </td>
  </tr>
  <tr>
   <th class="DispositifO2TableRowTitle">P <sub>(b)</sub></th>
    <td><!-- B1 -->

<input type="text" 
         id="DispositifB1P" 
       name="DispositifB1P" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B1_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB1P', "#{value}>=20 && #{value}<=200", "200");</script>

    </td>
    <td><!-- B2 -->
<input type="text" 
         id="DispositifB2P" 
       name="DispositifB2P" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B2_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB2P', "#{value}>=20 && #{value}<=200", "200");</script>

    </td>
    <td><!-- B3 -->
<input type="text" 
         id="DispositifB3P" 
       name="DispositifB3P" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B3_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB3P', "#{value}>=20 && #{value}<=200", "200");</script>

    </td>
    <td><!-- B4 -->
<input type="text" 
         id="DispositifB4P" 
       name="DispositifB4P" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B4_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB4P', "#{value}>=20 && #{value}<=200", "200");</script>

    </td>
    <td><!-- B5 -->
<input type="text" 
         id="DispositifB5P" 
       name="DispositifB5P" 
      class="DispositifO2Input" 
    onFocus="crfIrpUtils.fieldEdit(this.id)" 
     onBlur="miDispositifCs.updateDispositifFloatField(this.id, 'O2_B5_pression');miDispositifCs.updateVolumeAndAutonomie();"/>
<script type="text/javascript">crfIrpUtils.setFieldValidation('DispositifB5P', "#{value}>=20 && #{value}<=200", "200");</script>

    </td>
    <td id="DispositifAutonomieTotal" style="width:30px;"><!-- Autonomie Total -->
    </td>

  </tr>
</table>

          
          <table id="DispositifDefibrilateurTable">
            <tr> 
              <th>Défibrillateur</th>
              <td id="dsa_td">
                <input type="hidden" id="dsa_td_value" name="dsa_td_value" value=""/> 

                <span title="Pas de DSA sur la mission">Aucun</span> 
                <input type="radio" 
                       name="DispositifDefibrilateurType" 
                      class="DispositifDefibrilateurRadio" 
                         id="DispositifDefibrilateurTypeAUCUN" 
                      value="NO"  
                    onFocus="crfIrpUtils.fieldEdit('dsa_td')" 
                   onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>
                   
                <span title="Défibrilateur Semi Automatique">DSA</span> 
                <input type="radio" 
                       name="DispositifDefibrilateurType" 
                      class="DispositifDefibrilateurRadio" 
                         id="DispositifDefibrilateurTypeDSA"   
                      value="DSA" onFocus="crfIrpUtils.fieldEdit('dsa_td')" 
                   onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>
                   
                <span title="Défibrilateur Entièrement Automatique">DEA</span> 
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
                 
                <span title="2 jeux de patch non périmé, Rasoir, Carte Mémoire, à l'heure">Oui</span> 
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
                 onFocus="crfIrpUtils.fieldEdit(this.id)" 
                onChange="miDispositifCs.updateDispositifIntField(this.id, 'id_etat_dispositif')">
                <option value=" "> </option>
              </select>
            </fieldset>
            <fieldset> 
              <legend>Action</legend>
              <input type="button" id="AddDispositif"       value="Terminer"  onclick="miDispositifCs.endOfEditionEvent();"/>
              <input type="button" id="AddDispositifCancel" value="Supprimer" onclick="miDispositifCs.deleteDispositif ();"/>
            </fieldset>
          </td>
        </tr>
      </table>
        </td>
      </tr>
    </tbody>
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
    <p>south - generally for informational stuff, also could be for status bar</p>
  </div>

  <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"> </script>
</body>
</html>