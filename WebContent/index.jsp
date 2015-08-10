<%
	request.getSession().invalidate();
  try
  {
  	response.sendRedirect(request.getContextPath() + "/private/home.html");
  }
  catch(Exception e)
  {
  	e.printStackTrace();
  }
%>
