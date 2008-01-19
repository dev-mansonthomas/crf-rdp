<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%
String contextPath = request.getContextPath();
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
  <title>Monitor - CRF - Informatisation de la Régulation de Paris</title>
  
  <style type="text/css" media="all">
  	@import "<%=contextPath%>/css/monitorOutput/samu.css";
    @import "<%=contextPath%>/css/monitorOutput/intervention.css";
    
    @import "<%=contextPath%>/js/extjs/resources/css/ext-all.css";
    @import "<%=contextPath%>/js/extAccordion/accordion.css";
    @import "<%=contextPath%>/js/extjs/resources/css/xtheme-default.css";
  </style>
  
  <script type="text/javascript">
   var contextPath="<%=contextPath%>";
  </script>
  
  <link rel="shortcut icon" href="<%=contextPath%>/img/famfamfam/application_side_list.png" type="image/png">  

  <script type="text/javascript" src="<%=contextPath%>/js/extjs/adapter/yui/yui-utilities.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs/adapter/yui/ext-yui-adapter.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs/ext-all.js"></script>
  
  <script type="text/javascript" src="<%=contextPath%>/js/extAccordion/Ext.ux.InfoPanel.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extAccordion/Ext.ux.InfoPanel.GoogleSearch.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extAccordion/Ext.ux.Accordion.js"></script>

<!-- DWR Ajax --> 

  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorCommons.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/Monitor.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorOutputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorOutputIntervention.js"> </script>  
  
  <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"> </script>

<!-- END of DWR Ajax -->  

<!-- prototype framework -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype/prototype.js"> </script>

<!-- script.aculo.us effect library -->
  <script type="text/javascript" src="<%=contextPath%>/js/script.aculo.us/scriptaculous.js"> </script>

<!-- prototype-window -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype-window/window.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/prototype-window/debug.js"> </script>  

<!-- Shortcut -->
  <script type="text/javascript" src="<%=contextPath%>/js/shortcut/shortcuts.js"> </script>

<!-- google map -->  
  <script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA5WgPOr7f6qTWKh4L_FtBlxRZToBgTL8795eWPGANN-eVsPt3iBRHbtkDa1gCbaK3_A9lx0TF9lV05g"> </script>

<!--business code -->
  <script type="text/javascript" src="<%=contextPath%>/js/googlemap/googleMap.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorOutput/MonitorOutput.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorOutput/MonitorOutputIntervention.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitorOutput/MonitorOutputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/CustomEventPublishSubscribe.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/utils.js"> </script><!-- utils.js en dernier fait un appel a la méthode init() qui doit etre définie avant -->
  
</head>
<body id="body" scroll="no">

<div id="loading-mask" class="ext-el-mask"></div>
<div id="loading-msg" class="ext-el-mask-msg x-mask-loading">
	<div>Chargement de la Régulation de la Croix Rouge de Paris</div>
</div>


<!-- north -->
<div id="north" class="x-layout-inactive-content">
	<div id="clock" style="float:left"></div>
	<div style="float:right;margin-right:5px"><img src="<%=contextPath%>/img/RegulationParis.png" alt="Régulation de la Croix Rouge de Paris"/></div>
</div>

<!-- west -->
<div id="west" class="x-layout-inactive-content">
	<!-- global toolbar container -->
	<div id="acc-tb-global"></div>

	<!-- west-body container -->
	<div id="west-body">

	</div>
</div>


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

<!-- accordions -->
<div class="x-layout-inactive-content" id="center-accordions">
	<div class="tab-content">

	</div>
</div>

<!-- panels -->
<div class="x-layout-inactive-content" id="panels-tab">
	<div class="tab-content">

	</div>
</div>



<!-- south -->
<div id="south" class="x-layout-inactive-content"> 
  
</div>
<!-- showGrid javascript variable -->
<script type="text/javascript">var showGrid=false;</script>
<script type="text/javascript" src="<%=contextPath%>/js/monitorOutput/accordion.js"></script> 
</body>
</html>