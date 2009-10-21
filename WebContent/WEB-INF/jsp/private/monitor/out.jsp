<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <title>Monitor - CRF - Régulation De Paris</title>
  
  <jwr:style src="/cssBundle/monitorOutput.css"/>
  
 
  <link rel="shortcut icon" href="../../img/famfamfam/application_side_list.png" type="image/png">
</head>
<body id="body" scroll="no">

<div id="loading-mask" class="ext-el-mask"></div>
<div id="loading-msg" class="ext-el-mask-msg x-mask-loading">
  <div>Chargement de la Régulation de la Croix Rouge de Paris</div>
</div>


<!-- north -->
<div id="north" class="x-layout-inactive-content">
  <div id="clock" style="float:left">
    <span id="clockDate">${currentDate}</span>
    <span id="clockTime">${currentTime}</span>
  </div>
  <div style="float:right;margin-right:5px"><img src="../../img/logo-crf-small.png" alt="Régulation de la Croix Rouge de Paris"/></div>
</div>
<jsp:include page="../versionAndChangelog.jsp"/>

<!-- center -->
<!-- listeDispositif -->
<div class="x-layout-inactive-content" id="center-dispositif">
  <div class="tab-content" id="center-dispositif-list">

  </div>
</div>

<!-- googleMap -->
<div class="x-layout-inactive-content" id="center-carte-paris">
  <div id="crfirp-googlemap-paris" class="tab-content" style="width:100%;height:100%;">

  </div>
</div>
<!-- StreetView -->
<div id="center-streetView" style="height:100%;width:100%;"></div>



<!-- center-circulation1 
<div class="x-layout-inactive-content" id="center-circulation1">
<iframe frameborder="0"  src="http://www.sytadin.fr/opencms/sites/sytadin/sys/raster_fs.jsp.html_430821966.html" style="width:100%;height:100%;"></iframe>
</div>
-->
<!-- center-circulation2 -->
<div class="x-layout-inactive-content" id="center-circulation2">
  <div id="center-circulation2-content" class="tab-content" style="width:100%;height:100%;">
     <img id="center-circulation2-img" src="http://www.sytadin.fr/tempsreel/parisint.gif" style="height:100%;"/>
  </div>
</div>


<!-- south -->
<div id="south" class="x-layout-inactive-content"> 

<table>
  <tr>
    <td>
      <div id="south-lieu-selector-div">
      </div>
    </td>
    <td>
      <div id="south-googleMap-control-div">
        <table>
          <tr>
            <td id="trafficActivateButton" class="type-lieu-unselected"    onClick="moDispositifCs.toggleTraffic();">
              Traffic
            </td>
          </tr>
          <tr>
            <td id="streetViewActivateButton" class="type-lieu-unselected" onClick="moDispositifCs.toggleStreetView();">
              <img src="../../img/monitorOutput/streetViewIcon.png" height="16" width="9" /> StreetView
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>
</table>
  
  
  
</div>

<div id="list-lieu-window" style="display:none;">
  <div class="x-window-header">Liste des Lieux</div>
  <div id="list-lieu-window-tabs">
  </div>
</div>

<div id="choose-hopital-window" style="display:none;">
  <div class="x-window-header">Choisissez un Hopital d'évacuation</div>
  <input id="choose-hopital-window-current-dispositif"   name="choose-hopital-window-current-dispositif"   type="hidden"/>
  <div id="choose-hopital-window-content">
    <div class="x-tab" id="choose-hopital-window-content-list"  title="Hopitaux">
    </div>
    <div class="x-tab" id="choose-hopital-window-content-input" title="Autre Destination"/>
<fieldset class="fieldset">
<legend class="legend">Evacuation vers une destination qui n'est pas un Hopital référencé</legend>

<span ext:qtip="Exemple : Clinique privée, Maison de retraite, domicile du patient"  style="width:80px;display:block;float:left;">Description </span>
  <input style="width:60%;"
         class="input"
          type="text"
            id="dispositifEvacAddressLabel"
          name="dispositifEvacAddressLabel"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
     maxlength="80"/>
<br/>
<span style="width:80px;display:block;float:left;">Rue</span> 
  <input style="width:60%;"
         class="input"
          type="text"
            id="dispositifEvacAddressRue"
          name="dispositifEvacAddressRue"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"/>
<br/>
<span style="width:80px;display:block;float:left;">Code Postal</span> 
  <input style="width:50px;"
         class="input"
          type="text"
            id="dispositifEvacAddressCodePostal"
          name="dispositifEvacAddressCodePostal"
     maxlength="5"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"
  />
Ville 
  <input style="width:60.0%;"
         class="input"
          type="text"
            id="dispositifEvacAddressVille"
          name="dispositifEvacAddressVille"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="moDispositifCs.updateAddress(this.id)"
  />
  <img id="dispositifEvacGoogleAdressCheckStatus" alt="pix" style="height:16px;width:16px;" src="../../img/pix.png" />
  <input type="hidden" id="dispositifEvacAddressCoordinateLat"  name="dispositifEvacAddressCoordinateLat" />
  <input type="hidden" id="dispositifEvacAddressCoordinateLong" name="dispositifEvacAddressCoordinateLong"/>
  <input type="button" 
           id="dispositifEvacAutreAddresseButton"   
         name="dispositifEvacAutreAddresseButton" 
        value="Evacuation vers une destination qui n'est pas un Hopital référencé" 
      onClick="moDispositifCs.chooseEvacDestinationButton()">
</fieldset>
    </div>    
  </div>
</div>

<div id="GoogleMapsDirection" style="display:none;">
  
</div>

<div id="clone-intevention-window" class="x-hidden">
  <div class="x-window-header">Duplication de l'intervention</div>
  <div id="clone-intevention-window-content">
    <fieldset>
      <legend>Identification de la 'nouvelle' victime</legend>
      
      
 Nom :
                <input style="width:40%;"
                        type="text"
                          id="cloneInterventionNomVictime"
                        name="cloneInterventionNomVictime"
                       value=""
                   maxlength="30"
                      onBlur="moDispositifCs.updateNomPrenomRadio();"/>
                      
 Prénom :
                <input style="width:40%;"
                        type="text"
                          id="cloneInterventionPrenomVictime"
                        name="cloneInterventionPrenomVictime"
                       value=""
                   maxlength="30"
                      onBlur="moDispositifCs.updateNomPrenomRadio();"/>                      
<br/>
Radio :
                <input style="width:96%;"
                        type="text"
                          id="cloneInterventionNomPrenomRadio"
                        name="cloneInterventionNomPrenomRadio"
                       value=""
                    readonly="readonly"/>
<br/>
Sexe :           <input type="radio"
                          id="cloneInterventionSexeVictimeFemme"
                        name="cloneInterventionSexeVictime"
                       value="false"
/>
                  Femme.
                 <input type="radio"
                          id="cloneInterventionSexeVictimeHomme"
                        name="cloneInterventionSexeVictime"
                       value="true"
/>
                 Homme.
&nbsp;&nbsp;&nbsp;&nbsp;                  
Age Approximatif : 

                <input style="width:35px;"
                        type="text"
                          id="cloneInterventionAgeVictime"
                        name="cloneInterventionAgeVictime"
                       value=""
                   maxlength="3"
/>                      
      
      
       
    </fieldset>
  </div>
  
</div>




<!-- Include JS -->
  <!-- google map -->
  <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=${googleMapsKey}" type="text/javascript"> </script>

  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath="../..";
    var iconPath = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/monitorOutput.js"/>
 
  <script type="text/javascript">
    Ext.onReady(init);
  </script>  
</body>
</html>