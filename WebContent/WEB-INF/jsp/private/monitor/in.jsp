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
  <link rel="icon" href="<%=contextPath%>/img/favicon-crf.png" type="image/png"/> 
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

<jsp:include page="./in/01-interventionTicket.jsp"/>
<jsp:include page="./in/02-bilanEditor.jsp"/>
<jsp:include page="./in/03-dispositifEditor.jsp"/>


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
    Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-3.4.0/resources/images/default/s.gif';

    var idInterventionToOpen = ${idInterventionToOpen==null?0:idInterventionToOpen};
    <%//pour ne pas réouvrir l'inter la prochaine fois
      session.removeAttribute("idInterventionToOpen");
    %>
    
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/monitorInput.js"/>

  <script type="text/javascript">
    Ext.onReady(init);
  </script>
</body>
</html>