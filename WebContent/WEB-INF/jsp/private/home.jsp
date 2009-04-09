<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
  String contextPath = request.getContextPath();
%>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Accueil de la Régulation de la Croix Rouge de Paris</title>
    <jwr:style src="/cssBundle/home.css"/>
  </head>
  <body>
  <div id="north"  style="vertical-align: bottom;">
    <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
    <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
  </div>
  <div id="AppVersion" style="position: absolute;left:275px;">version ${applicationVersion}</div>
  <div id="UserId"     style="position: absolute;left:500px;">
  <img src="../img/famfamfam/user${currentUser.homme?'':'_female'}.png" alt="" ext:qtip="idUser: ${currentUser.idUser}. Role : ${currentUser.idRole}. - Délégation : ${currentUser.delegation.nom} - ${currentUser.delegation.departement}"/>
  
  ${currentUser.nivol} - 
  ${currentUser.nom}
  ${currentUser.prenom} - 
  
  <a href="../">
  <img src="../img/famfamfam/door_in.png" alt="Déconnexion de l'applicaiton"/>
  se déconnecter</a>
  
  </div>
  
  <div id="center">
    <div id="RegulationList"></div>
  </div>
  <div id="equipier">

<input id="filter" type="text" value=""/>

    <div id="RegulationList-test">
    </div>
  </div>
  <div id="south">
    <p></p>
  </div>


  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath     = "<%=contextPath%>";
    var iconPath        = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/home.js"/>

  </body>
</html>