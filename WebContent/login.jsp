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
    <form action="j_security_check" method="post">
  
    <div id="loginForm">
      <div class="label">Login   </div><input type="text"      id="j_username" name="j_username" value=""  size="15"/><br/>
      <div class="label">Password</div><input type="password"  id="j_password" name="j_password" value=""    size="15"/><br/>
                                       <input type="submit"    id="submit"     name="submit"     value="valider" class="formButton"/>
    </div>
<%
if(error)
{
%>
  <font color="red">Utilisateur inconnu ou mot de passe invalide !</font>
<% 
}
%>
                  
                  
		</form>
    
    <div id="footer">
       Copyright © 2009 - Croix Rouge Française
    </div>
    <jwr:script src="/jsBundle/baseLogin.js"/> 
	</body>
</html>