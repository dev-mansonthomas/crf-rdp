<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%
String contextPath = request.getContextPath();
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1"/>
  <title>Saisie - CRF - Informatisation de la R�gulation de Paris</title>

  <style type="text/css" media="all">
    @import "<%=contextPath%>/css/style.css";
    @import "<%=contextPath%>/css/autocomplete.css";
    @import "<%=contextPath%>/css/CrfUtils.css";
    
    @import "<%=contextPath%>/css/monitorInput/monitorInput.css";
    @import "<%=contextPath%>/css/monitorInput/toolbar.css";
    @import "<%=contextPath%>/css/monitorInput/CoRegulateurList.css";
    @import "<%=contextPath%>/css/monitorInput/Dispositif.css";
    @import "<%=contextPath%>/css/monitorInput/Intervention.css";
    
    @import "<%=contextPath%>/css/prototype-window/default.css";
    @import "<%=contextPath%>/css/prototype-window/alphacube2.css";
    @import "<%=contextPath%>/css/prototype-window/mac_os_x.css";

    @import "<%=contextPath%>/js/calendar/css/calendar-blue.css";    
    @import "<%=contextPath%>/css/calendarFix.css";
  </style>

  <script type="text/javascript">
   var contextPath="<%=contextPath%>";
  </script>
  <link rel="shortcut icon" href="<%=contextPath%>/img/famfamfam/table_edit.png" type="image/png">    
<!-- DWR Ajax -->
  <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorCommons.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInput.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorInputIntervention.js"> </script>
<!-- END of DWR Ajax -->

<!-- prototype framework -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype/prototype.js"> </script>

<!-- script.aculo.us effect library -->
  <script type="text/javascript" src="<%=contextPath%>/js/script.aculo.us/scriptaculous.js"> </script>

<!-- prototype-window -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype-window/window.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/prototype-window/debug.js"> </script>  

<!-- autocomplete (script.aculo.us & DWR) MiSt <msteiner@gazeta.pl> -->
  <script type="text/javascript" src="<%=contextPath%>/js/autocomplete.js"> </script>

<!-- Dynarch Calendar -->
  <script type="text/javascript" src="<%=contextPath%>/js/calendar/calendar.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/calendar/calendar-setup.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/calendar/lang/calendar-fr.js"> </script>
  
<!-- Shortcut -->
  <script type="text/javascript" src="<%=contextPath%>/js/shortcut/shortcuts.js"> </script>
  
<!-- google map -->  
  <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA5WgPOr7f6qTWKh4L_FtBlxRZToBgTL8795eWPGANN-eVsPt3iBRHbtkDa1gCbaK3_A9lx0TF9lV05g" type="text/javascript"> </script>

<!--business code -->
  <script type="text/javascript" src="<%=contextPath%>/js/googlemap/googleMap.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorInput/MonitorInputWM.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorInput/MonitorInput.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorInput/MonitorInputCoRegulateurList.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorInput/MonitorInputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorInput/MonitorInputIntervention.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/CustomEventPublishSubscribe.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/utils.js"> </script><!-- utils.js en dernier fait un appel a la m�thode init() qui doit etre d�finie avant -->


</head>
<body id="MonitorInputBody">

<div id="header">

</div>
<div id="regulationInformation">
<input type="hidden" id="regulationId" name="regulationId"  value=""/>
  <table>
    <tr>
      <th>Intitul�</th>
      <td id="label"></td>
      <th>Date de d�but</th>
      <td id="startDate"></td>
      <th>Status</th>
      <td id="open"></td>
    </tr>
    <tr>
      <th>R�gulateur</th>
      <td id="regulateur"></td>
      <th>Date de fin pr�vue</th>
      <td id="expectedEndDate"></td>
      <th>co-r�gulateurs</th>
      <td onClick="miCoRegulateurListCs.displayCoRegulateur();"><img src="<%=contextPath%>/img/monitorInput/user_edit.png" id="CoRegulateursListEdit" alt="Ajouter/Supprimer des co-R�gulateurs"/></td>
    </tr>
  </table>
</div>

<div id="CrfUtilsInfoWindowDiv">
  <input type="button" id="CrfUtilsInfoWindowClearButton" value="Clear" onClick="$('CrfUtilsInfoWindowContent').innerHTML='';"/>
  <div id="CrfUtilsInfoWindowContent">
  </div>
</div>

<div id="coRegulateurList" style="display:none;">
  <table>
    <thead>
      <tr>
        <th colspan="4" style="font-size:13px;">
          Liste Des Co-R�gulateurs
        </th>
      </tr>
      <tr>
        <th style="width:70px;">N&deg; NIVOL</th>
        <th>Nom Pr�nom</th>
        <th>Role</th>
        <th style="width:70px;">Suppression</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align:center;">
          Ajouter Un Co-R�gulateur
        </th>
      </tr>
      <tr>
        <td colspan="4">
          <table>
            <tr>
              <td>
                Nivol :
              </td>
              <td>
                <input type="text" id="CoRegulateurAdd_Nivol" name="CoRegulateurAdd_Nivol" size="35"/>
              </td>
              <td>
                Nom :
              </td>
              <td>
                <input type="text" id="CoRegulateurAdd_Nom" name="CoRegulateurAdd_Nom" size="35"/>
              </td>
            </tr>
            <tr>
              <td colspan="1" style="width:16px;">
                <img src="<%=contextPath%>/img/monitorInput/user_add.png" 
                      id="CoRegulateurCreate_Button" 
                     alt="Cr�er un utilisateur"
                 onClick="miCoRegulateurListCs.createCoregulateur()" 
                />
              </td>
              <td colspan="3">
                <input type="hidden" id="CoRegulateurAdd_Selected_id" name="CoRegulateurAdd_Selected_id"/>
                <input type="text" id="CoRegulateurAdd_Selected" name="CoRegulateurAdd_Selected" value="" size="70"/>
                <div id="CoRegulateurAdd_SelectList" class="auto_complete"></div> 
                <img src="<%=contextPath%>/img/monitorInput/user.png" 
                      id="CoRegulateurAdd_Button" 
                     alt="Ajouter un Co-R�gulateurs"
                 onClick="miCoRegulateurListCs.addCoregulateur()" 
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </tfoot>
    <tbody id="coRegulateurList_tbody">
      <tr>
        <td colspan="4">
          Aucun co-r�gulateur
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div id="createUser" style="display:none;">

  <table>
    <thead>
      <tr>
        <th id="createUser_title">
          <span>Cr�ation Rapide d'un utilisateur</span>
        </th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td>
        </td>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <td>
          NIVOL
        </td>
        <td>
          <input type="text" id="CreateUserNivol" name="CreateUserNivol"/>
        </td>
      </tr>
      <tr>
        <td>
          D�l�gation
        </td>
        <td>
          <input type="text" id="CreateUserDelegation_Id"       name="CreateUserDelegation_Id"  />
          <input type="text" id="CreateUserDelegation_autreNom" name="CreateUserDelegation"     />
          <div id="CreateUserDelegation_select"></div>
        </td>
      </tr>
      <tr>
        <td>
          Pr�nom
        </td>
        <td>
          <input type="text" id="CreateUserPrenom" name="CreateUserPrenom"/>
        </td>
        <td>
          Nom
        </td>
        <td>
          <input type="text" id="CreateUserNom" name="CreateUserNom"/>
        </td>
      </tr>
    </tbody>
  </table>
</div>

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
                D�but : 
                <input style="width:110px;" 
                        type="text" readonly 
                          id="DispositifDHDebut"  
                        name="DispositifDHDebut" 
                       value="" 
                     onFocus="crfIrpUtils.fieldEdit(this.id)" 
                    onChange="miDispositifCs.updateDispositifDateField(this.id, 'DH_debut')"
                /> 
                <img src="<%=contextPath%>/img/calendar.png" 
                     alt="Cliquez pour saisir un horaire du d�but de vacation"
                      id="DispositifDHDebut_button"
                   class="CrfCalendarButton"
             onmouseover="this.style.background='#0080FF';"
              onmouseout="this.style.background=''"
                />
              </td>
              <td style="width:50%;text-align:center;">
                Fin   : 
                <input style="width:110px;" 
                        type="text" readonly 
                          id="DispositifDHFin"    
                        name="DispositifDHFin"   
                       value="" 
                     onFocus="crfIrpUtils.fieldEdit(this.id)" 
                    onChange="miDispositifCs.updateDispositifDateField(this.id, 'DH_fin')"
                /> 
                <img src="<%=contextPath%>/img/calendar.png" 
                     alt="Cliquez pour saisir un horaire de fin de vacation"
                      id="DispositifDHFin_button"
                   class="CrfCalendarButton"
             onmouseover="this.style.background='#0080FF';"
              onmouseout="this.style.background=''"
                />
              </td>
            </tr>
          </table>          
        </fieldset>


        <!-- Ajout/Suppression D'�quipier--> 
        <fieldset> 
          <legend>Liste Des Equipiers Du Dispositif</legend>        
            <table id="DispositfEquipierTable" class="userList">
              <thead>
                <tr>
                  <th style="width:70px;">N&deg; NIVOL</th>
                  <th>Nom Pr�nom</th>
                  <th>Role</th>
                  <th style="width:70px;">Suppression</th>
                </tr>
              </thead>
              <tbody id="dispositifEquipierList_tbody">
                <tr>
                  <td colspan="4" style="text-align:center;">
                    Aucun �quipier
                  </td>
                </tr>
              </tbody>
            </table>
            <table id="DispositifEquipierAddIHM">
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
            </table>
          </fieldset>
         <!-- FIN Ajout/Suppression D'�quipier-->

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
              <th>D�fibrillateur</th>
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
                   
                <span title="D�fibrilateur Semi Automatique">DSA</span> 
                <input type="radio" 
                       name="DispositifDefibrilateurType" 
                      class="DispositifDefibrilateurRadio" 
                         id="DispositifDefibrilateurTypeDSA"   
                      value="DSA" onFocus="crfIrpUtils.fieldEdit('dsa_td')" 
                   onChange="miDispositifCs.updateDispositifRadioField('dsa_td')"/>
                   
                <span title="D�fibrilateur Enti�rement Automatique">DEA</span> 
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
                 
                <span title="2 jeux de patch non p�rim�, Rasoir, Carte M�moire, � l'heure">Oui</span> 
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
                <tr><td>Identit� M�decin  </td><td> <input type="text" id="DispositifIdentiteMedecin" name="DispositifIdentiteMedecin" onFocus="crfIrpUtils.fieldEdit(this.id)" onBlur="miDispositifCs.updateDispositifStringField(this.id, 'identite_medecin')"/></td></tr>
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

<div id="AutreDelegationEdit" style="display:none;width:350px;">
  
  <p>Vous avez choisi "<b>Autre (NA)</b>".</p>
  <p>
  Veuillez ne choisir cette option que si 
  le dispositif n'est pas mis � disposition par une d�l�gation francaise (Moyen �trang� par ex.).
  </p>
  <p>
    Pour un moyen du National, entrer : '00000'.
    Pour un moyen d�partemental, entrer : d�partement + '000' (ex: '75000')
    Si la d�l�gation n'existe pas, ajouter la.
  </p>


  <p>
  Entrer ci-dessous une description pour le moyen : 
  <input type="text" id="DispositifAutreDelegation"   name="DispositifAutreDelegation" maxlength="45"/>
  <input type="button" id="SetAutreDeleagtionButton"  value="Valider" onclick="miDispositifCs.dispositifSetAutreDelegation();"/>
  <input type="hidden" id="DispositifAutreDelegationIdToUpdate"   name="DispositifAutreDelegationIdToUpdate"/>  
  </p>  
</div>

<div id="InterventionTicket" style="display:none;">
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
                  Date/Heure de r�ception :
                    <input style="width:110px;" 
                            type="text" readonly 
                              id="interventionTicketDHReception"  
                            name="interventionTicketDHReception" 
                           value=""
                         onFocus="crfIrpUtils.fieldEdit(this.id)" 
                        onChange="miInterventionCs.updateInterventionDateField(this.id, 'DH_reception')"
                    /> 
                    <img src="<%=contextPath%>/img/calendar.png" 
                         alt="Cliquez pour saisir un horaire de r�ception de l'intervention"
                          id="interventionTicketDHReception_button"
                       class="CrfCalendarButton"
                 onmouseover="this.style.background='#0080FF';"
                  onmouseout="this.style.background=''"
                    />
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

            Compl�ment d'information : <br/>
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
                  Nom Pr�nom de la victime :
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
                Coordonn�es :
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
                  Compl�ment d'adresse : (Codes portes, interphone, etc...)
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
              <input type="button" id="AddInterventionCancel" value="Non, je me suis tromp�"  onclick="miInterventionCs.hideInterventionTicket();"/>
            </fieldset>
        </td>
      </tr>
    </tbody>
  </table>
</div>


<div id="toolbar">
  <center>
    <table>
      <tr>
        <td>
          <div id="dispositifAdd" onClick="miDispositifCs.displayAddDispositif()">
            <img src="<%=contextPath%>/img/monitorInput/dispositif_add.png" alt="Ajouter un Dispositif"><br/>
            Ajouter un Dispositif
          </div>
        </td>
        <td>
          <div id="InterventionAdd" onClick="miInterventionCs.addIntervention();">
            <img src="<%=contextPath%>/img/monitorInput/dispositif_add.png" alt="Ajouter une intervention"><br/>
            Ajouter une intervention
          </div>
        </td>
      </tr>
    </table>  
  </center>  
</div>
</body>
</html>