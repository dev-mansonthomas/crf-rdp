<%
	request.getSession().invalidate();
	try
  {
  	response.sendRedirect(request.getContextPath() + "/faces/pages/private/Accueil.jsp");
  }
  catch(Exception e)
  {
  	e.printStackTrace();
  }
%>