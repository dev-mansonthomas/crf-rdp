<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><%
  String contextPath = request.getContextPath();
%>

  <div id="ApplicationInfos" style="position: absolute;left:280px;width:800px;top:32px;font-family:Georgia, Times New Roman,Georgia Times serif;font-size:12px;">
    <div id="Credits"    onclick="Ext.ux.Utils.CreditsAndChangeLog.displayCredits   ();" style="cursor:pointer;width:100px;float:left;text-decoration: underline;">Crédits</div>
    <div id="AppVersion" onclick="Ext.ux.Utils.CreditsAndChangeLog.displayChangeLog ();" style="cursor:pointer;width:210px;float:left;text-decoration: underline;">v ${applicationVersion}</div>
    <div id="AppEnv"  style="float:left;width:60px;">${environment}</div>
    <div id="UserId"   style="width:430px;float:left;"  >
      <img style="vertical-align:bottom;" src="<%=contextPath%>/img/famfamfam/user${currentUser.homme?'':'_female'}.png" alt="" ext:qtip="idUser: ${currentUser.idUser}. Role : ${currentUser.idRole}. - Délégation : ${currentUser.delegation.nom} - ${currentUser.delegation.departement}"/>
      
      ${currentUser.nivol} - 
      ${currentUser.nom}
      ${currentUser.prenom} - 
      
      <a href="../">
      <img src="<%=contextPath%>/img/famfamfam/door_in.png" alt="Déconnexion de l'applicaiton"/>
      se déconnecter</a>
    
    </div>
  </div>