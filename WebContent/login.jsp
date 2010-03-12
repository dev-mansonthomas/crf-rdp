<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
	boolean error = (request.getParameter("error") != null);
  String contextPath = request.getContextPath();
%>
<html>
	<head>
	  <title>Croix Rouge Française - Régulation de Paris - Login</title>
    <jwr:style src="/cssBundle/login.css"/>
	</head>
	<body>
    <div id="RegulationParis">
      <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
      <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
    </div>

<%
if(error)
{
%>
  <font color="red">Utilisateur inconnu ou mot de passe invalide !</font>
<% 
}
%>

    <div id="footer">
       Copyright © 2010 - Croix Rouge Française
    </div>
    <jwr:script src="/jsBundle/extJs.js"/>
    <jwr:script src="/jsBundle/login.js"/> 
	</body>
</html>