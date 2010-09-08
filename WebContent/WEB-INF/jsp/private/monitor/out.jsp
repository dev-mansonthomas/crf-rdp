<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
  String contextPath = request.getContextPath();
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <title>Monitor - CRF - Régulation De Paris</title>
  <link rel="icon" href="<%=contextPath%>/img/favicon-crf.png" type="image/png"/> 
  <jwr:style src="/cssBundle/monitorOutput.css"/>
  <link rel="shortcut icon" href="../../img/famfamfam/application_side_list.png" type="image/png">
</head>

<body id="body" scroll="no">

<div id="loading-mask" class="ext-el-mask"></div>
<div id="loading-msg" class="ext-el-mask-msg x-mask-loading">
  <div>Chargement de la Régulation de la Croix Rouge de Paris</div>
</div>

<jsp:include page="./out/01-north.jsp"/>

<jsp:include page="./out/02-center.jsp"/>

<jsp:include page="./out/03-south.jsp"/>

<jsp:include page="./out/04-windows.jsp"/>

<!-- Include JS -->
  <!-- google map -->
  <script src="http://maps.google.com/maps?file=api&amp;v=2.x&amp;key=${googleMapsKey}" type="text/javascript"> </script>

  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath="../..";
    var iconPath = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-3.1.1/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/monitorOutput.js"/>
 
  <script type="text/javascript">
    Ext.onReady(init);
  </script>  
</body>
</html>