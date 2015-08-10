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





<div id="south">
  <p>N° de Déclaration à la CNIL : ${applicationDeclarationCnil}</p>

  <c:if test="${environmentCode=='DEV'}">
    <a href="test/testThomas.html">Page de Test Thomas</a>&nbsp;&nbsp;
    <a href="test/testRest.html">Page de Test REST Thomas</a>&nbsp;&nbsp;
    <a href="swagger/index.html">swagger</a>
  </c:if>
</div>



<script type="text/javascript">
  var contextPath     = "<%=contextPath%>";
  var iconPath        = '../img/famfamfam/';
</script>

</body>
</html>
