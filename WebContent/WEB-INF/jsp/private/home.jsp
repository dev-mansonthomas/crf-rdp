<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://jawr.net/tags" prefix="jwr"%><%@ taglib
  uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
  String contextPath = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Accueil de la Régulation de la Croix Rouge de Paris</title>
<link rel="icon" href="<%=contextPath%>/img/favicon-crf.png" type="image/png"/> 
<jwr:style src="/cssBundle/home.css" />
</head>
<body>
<div id="north" style="vertical-align: bottom;"><img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"
  alt="Informatisation de la Régulation de Paris" /> <img src="<%=contextPath%>/img/logo-crf-small.png" class="imgLoginRight" alt="Croix Rouge Francaise" /></div>

<jsp:include page="versionAndChangelog.jsp" />

<div id="center">
  <div id="RegulationList"></div>
</div>

<div id="lieuPanel">
  <div id="LieuSearch">
    <div id="LieuSearchForm">
    </div>
    <div id="LieuSearchGrid">
    </div>
  </div>
  <div id="LieuEdit">
    <div id="LieuGoogleMap">
    </div>
    <div id="LieuEditor">
    </div>
  </div>  
</div>

<div id="edit-user-window" style="display:none;">
  <div class="x-window-header">Edition d'un Utilisateur</div>
  <div id="edit-user-window-tabs">
    <div id="edit-user-window-user-details" class="x-tab" title="Détails de l'utilisateur">
      <fieldset>
        <legend><input type="checkbox" id="edit-user-active-user" name="edit-user-active-user" onChange="EquipiersGestion.editUserStatus();"/> Utilisateur <b>Actif</b> de l'application ?</legend>
        <input type="hidden" id="edit-user-userId" name="edit-user-userId"/>
        
        <div id="edit-user-interface" style="display:none;">
          <div style="text-align:center;margin-top:15px;margin-bottom:15px;">
            <input type="button" id="edit-user-generate-password" value="Générer un nouveau mot de passe" onClick="EquipiersGestion.generateNewPassword();"/>
            
            <div id="edit-user-generated-password"></div>
          </div>
          <div id="edit-user-generate-password-confirmation-message"></div>
          <fieldset>
            <legend>Roles dans l'application</legend>
            <table id="edit-user-role-list">
              <tr><td><i>Chargement en cours</i></td></tr>
            </table>
          </fieldset> 
        </div>
        <div id="edit-user-not-user" style="text-align:center;font-style:italic;">
          L'équipier n'est pas un utilisateur de l'application "Régulation De Paris".
        </div>       
      </fieldset>
    
    </div>
    <div id="edit-user-window-user-logs"    class="x-tab" title="Activité de l'utilisateur">
    </div>
  </div>
</div>



<div id="south">
  <p>N° de Déclaration à la CNIL : ${applicationDeclarationCnil}</p>

  <c:if test="${environmentCode=='DEV'}">
    <a href="test/testThomas.html">Page de Test Thomas</a>
  </c:if>
</div>

<!-- google maps -->
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=${googleMapsKey}" type="text/javascript"> </script>


<jwr:script src="/jsBundle/extJs.js" />
<script type="text/javascript">
  var contextPath     = "<%=contextPath%>";
  var iconPath        = '../img/famfamfam/';
  Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-3.4.0/resources/images/default/s.gif';
</script>
<jwr:script src="/jsBundle/baseApp.js" />
<jwr:script src="/jsBundle/home.js" />

</body>
</html>