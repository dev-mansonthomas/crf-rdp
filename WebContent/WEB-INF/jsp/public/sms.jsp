<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"
%><html>

  <head>
    <title>SMS reciever</title>
  </head>
  <body>
<%
  String status = "";
//TODO n'afficher l'erreur qu'en cas d'erreur
%>
    ${status} 
    <pre>${msg}</pre>
    SMS : <pre>${SMS}</pre>
  
  </body>
</html>