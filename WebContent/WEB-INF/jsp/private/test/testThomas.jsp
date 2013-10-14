<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
  <title>Saisie - CRF - Régulation De Paris</title>

  <jwr:style src="/cssBundle/testThomas.css"/>

  <link rel="shortcut icon" href="../../img/famfamfam/table_edit.png" type="image/png">
 
 <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA5WgPOr7f6qTWKh4L_FtBlxRZToBgTL8795eWPGANN-eVsPt3iBRHbtkDa1gCbaK3_A9lx0TF9lV05g" type="text/javascript"> </script>
 
</head>
<body id="MonitorInputBody">

        <fieldset>
          <legend>Liste Des Equipiers Du Dispositif</legend>
<!-- The box wrap markup embedded instead of using Element.boxWrap() -->
<div style="width:850px;">
    <div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>
    <div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">
        <h3 style="margin-bottom:5px;">Recherche d'un Hopital</h3>
        <table style="width:100%">
          <tr>
            <td><input type="text" name="SearchLieuxInput"     id="SearchLieuxInput"      style="width:100%"/></td>
          </tr>
        </table>
        <div style="padding-top:4px;">
            Recherche par nom, ville, addresse, code postal.
        </div>

    </div></div></div>
    <div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>
</div>
       
</fieldset>

<!-- JS -->
  <jwr:script src="/jsBundle/extJs.js"/>
  <script type="text/javascript">
    var contextPath="../..";
    var iconPath = '../img/famfamfam/';
    Ext.BLANK_IMAGE_URL = contextPath+'/js/ext-3.4.0/resources/images/default/s.gif';
  </script>
  <jwr:script src="/jsBundle/baseApp.js"/>
  <jwr:script src="/jsBundle/testThomas.js"/>

  <script type="text/javascript">
    Ext.onReady(init);
  </script>
</body>
</html>