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
    <span style="margin-left:275px;">version ${applicationVersion}</span>
    <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
  </div>
  <div id="center">
    <div id="RegulationList"></div>
  </div>
  <div id="equipier">
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