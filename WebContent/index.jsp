<%
	request.getSession().invalidate();
	try
  {
  	response.sendRedirect(request.getContextPath() + "/private/Homepage.html");
  }
  catch(Exception e)
  {
  	e.printStackTrace();
  }
%>