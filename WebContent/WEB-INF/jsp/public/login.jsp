<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
    boolean error = (request.getParameter("error") != null);
    String contextPath = request.getContextPath();
    String jUserName=request.getParameter("j_username");
    String jPassword=request.getParameter("j_password");

    if(jUserName == null)
    {
        jUserName = "";
    }
    if(jPassword == null)
    {
        jPassword = "";
    }

%>
<html>
	<head>
	  <title>Croix Rouge Française - Régulation de Paris - Login</title>
    <link rel="icon" href="<%=contextPath%>/img/favicon-crf.png" type="image/png"/> 
    <jwr:style src="/cssBundle/login.css"/>   
    <script type="text/javascript">
    var logoUrl     = 'img/login/${environmentCode}.png';
    </script> 
	</head>
	<body>
    <div id="RegulationParis">
      <img src="<%=contextPath%>/img/RegulationParis.png" class="imgLoginLeft"  alt="Informatisation de la Régulation de Paris"/>
      <img src="<%=contextPath%>/img/logo-crf-small.png"  class="imgLoginRight" alt="Croix Rouge Francaise"/>
    </div>

<script type="text/javascript">
var loginError   =false;
var userName='';
</script>



    <form method="POST" action="j_security_check">
        username : <input id="j_username" name="j_username" value="<%=jUserName%>" type="TEXT"/><br/>
        password : <input id="j_password" name="j_password" value="<%=jPassword %>" type="password"/><br/>
        <input type="submit" value="Login"/>
    </form>

<%
if(error)
{
%>
<script type="text/javascript">
loginError = true;
userName='<%=request.getParameter("j_username") %>';
</script>
  <div id="errorMessage" style="display:none;">
    <img   src="img/login/error.gif" alt="login error"/>
  
    <div style="vertical-align:top;padding-top:10px;">Utilisateur inconnu ou mot de passe invalide !</div>
   </div>
<% 
}
%>

    <div id="footer">
       Copyright © 2015 - Croix Rouge Française
    </div>
    <!--jwr:script src="/jsBundle/extJs.js"/-->
    <jwr:script src="/jsBundle/login.js"/> 
    <script type="text/javascript">
    //  Ext.onReady(init);
    </script>
	</body>
</html>
