<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
  String contextPath = request.getContextPath();
%>
<html>
  <head>
    <title>Accueil de la Régulation de la Croix Rouge de Paris</title>
    <jwr:style src="/cssBundle/home.css"/>
  </head>
  <body>

  <div id="north">
    <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
    <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
  </div>
  <div id="center">

    <div id="RegulationList"></div>


  </div>
  <div id="south">
    <p>south - generally for informational stuff, also could be for status bar</p>
  </div>


  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath="<%=contextPath%>";
    var iconPath = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/home.js"/>

  </body>
</html>