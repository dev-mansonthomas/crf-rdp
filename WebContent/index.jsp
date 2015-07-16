<%
	request.getSession().invalidate();
  try
  {
  	response.sendRedirect(request.getContextPath() + "/private/swagger/index.html");
  }
  catch(Exception e)
  {
  	e.printStackTrace();
  }
%>
