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