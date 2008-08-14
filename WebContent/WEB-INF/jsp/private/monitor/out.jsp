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
    @import "<%=contextPath%>/css/monitorOutput/intervention.css";
    @import "<%=contextPath%>/css/monitorOutput/monitor.css";
    @import "<%=contextPath%>/js/extjs-2/resources/css/ext-all.css";
    @import "<%=contextPath%>/js/extjs-2/resources/css/xtheme-gray.css";
  </style>
  
 
  <link rel="shortcut icon" href="<%=contextPath%>/img/famfamfam/application_side_list.png" type="image/png">  

<!-- ExtJS 2.0 -->
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-2.1/adapter/ext/ext-base.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-2.1/ext-all-debug.js"></script>

  <script type="text/javascript">
   var contextPath="<%=contextPath%>";
   var iconPath = '../img/famfamfam/';
   Ext.BLANK_IMAGE_URL = contextPath+'/js/extjs-2/resources/images/default/s.gif';
  </script>
  
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/DwrProxy.js"   > </script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/RowExpander.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/extjs-ux/Ext.ux.GMapPanel.js"> </script>
      
<!-- DWR Ajax --> 
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorCommons.js"           > </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/Monitor.js"                  > </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorOutputDispositif.js"  > </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/interface/MonitorOutputIntervention.js"> </script>  
 
<!-- END of DWR Ajax -->  

<!-- prototype framework -->
  <script type="text/javascript" src="<%=contextPath%>/js/prototype/prototype.js"> </script>

<!-- script.aculo.us effect library -->
  <script type="text/javascript" src="<%=contextPath%>/js/script.aculo.us/scriptaculous.js"> </script>

<!-- google map -->  
  <script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=ABQIAAAA5WgPOr7f6qTWKh4L_FtBlxRZToBgTL8795eWPGANN-eVsPt3iBRHbtkDa1gCbaK3_A9lx0TF9lV05g"> </script>

<!--business code -->
  <script type="text/javascript" src="<%=contextPath%>/js/googlemap/googleMap.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/output/MonitorOutput.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/output/MonitorOutputDragAndDropHandler.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/output/MonitorOutputIntervention.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/output/MonitorOutputDispositif.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/utils/pagebus.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/js/monitor/utils/utils.js"> </script><!-- utils.js en dernier fait un appel a la méthode init() qui doit etre définie avant -->
 
<script type="text/javascript">
  Ext.onReady(init);
</script>
</head>
<body id="body" scroll="no">

<div id="loading-mask" class="ext-el-mask"></div>
<div id="loading-msg" class="ext-el-mask-msg x-mask-loading">
  <div>Chargement de la Régulation de la Croix Rouge de Paris</div>
</div>


<!-- north -->
<div id="north" class="x-layout-inactive-content">
  <div id="clock" style="float:left"></div>
  <div style="float:right;margin-right:5px"><img src="<%=contextPath%>/img/logo-crf-small.png" alt="Régulation de la Croix Rouge de Paris"/></div>
</div>

<!-- west -->
<div id="west" class="x-layout-inactive-content">
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

<!-- south -->
<div id="south" class="x-layout-inactive-content"> 
  
</div>

<div id="list-lieu-window" style="display:none;">
  <div class="x-window-header">Liste des Lieux</div>
  <div id="list-lieu-window-tabs">
  </div>
</div>

  <script type="text/javascript" src="<%=contextPath%>/dwr/engine.js"> </script>
  <script type="text/javascript" src="<%=contextPath%>/dwr/util.js"> </script>
</body>
</html>