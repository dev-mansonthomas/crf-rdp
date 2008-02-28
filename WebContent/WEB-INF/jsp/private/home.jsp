<%@ page contentType="text/html; charset=ISO-8859-1"
%><%
  String contextPath = request.getContextPath();
%>
<html>
  <head>
    <title>Accueil de la Régulation de la Croix Rouge de Paris</title>
    <style type="text/css" media="all">
      @import "<%=contextPath%>/js/extjs-2/resources/css/ext-all.css";
      @import "<%=contextPath%>/js/extjs-2/resources/css/xtheme-gray.css";
      @import "<%=contextPath%>/css/home/home.css";
    </style>
        
    <!-- extJS -->  
    <script type="text/javascript" src="<%=contextPath%>/js/extjs-2/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/extjs-2/ext-all.js"></script>
  
    <script type="text/javascript">
     var contextPath="<%=contextPath%>";
     var iconPath = '../img/famfamfam/';
     Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
    </script>

    <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/DwrProxy.js"> </script>
    <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/RowExpander.js"> </script>
    
    <!-- DWR Ajax -->
    <script type="text/javascript" src="<%=contextPath%>/dwr/interface/Homepage.js"> </script>
    <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"> </script>
    <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"> </script>
    <!-- FIN DWR Ajax -->

    <script type="text/javascript" src="<%=contextPath%>/js/home/home.js"></script>

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
    
  </body>
</html>