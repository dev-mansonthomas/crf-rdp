<%
	boolean error = (request.getParameter("error") != null);
  String contextPath = request.getContextPath();
%>
<html>
	<head>
	  <title>Croix Rouge Française - Régulation de Paris - Login</title>
    <style type="text/css" media="all">
      @import "<%=contextPath%>/css/login.css";
    </style>
    
    <!-- prototype framework -->
    <script type="text/javascript" src="<%=contextPath%>/js/prototype/prototype.js"> </script>

    <!-- script.aculo.us effect library -->
    <script type="text/javascript" src="<%=contextPath%>/js/script.aculo.us/scriptaculous.js"> </script>
	</head>
	<body>
    <div id="RegulationParis">
      <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
      <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
    </div>
    <form action="j_security_check" method="post">
  
    <div id="loginForm">
      <div class="label">Login   </div><input type="text"      id="j_username" name="j_username" value="75233A"  size="15"/><br/>
      <div class="label">Password</div><input type="password"  id="j_password" name="j_password" value="TEST"    size="15"/><br/>
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
       Copyright © 2006 Croix Rouge Française
    </div>
	</body>
</html>