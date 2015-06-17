<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%><%@ taglib uri="http://jawr.net/tags" prefix="jwr" 
%><!doctype html>
<html lang="en" ng-app="phonecatApp">
<head>
  <meta charset="utf-8">
  <title>Google Phone Gallery</title>
  <link rel="stylesheet" href="../../angular/bower_components/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="../../angular/css/app.css">
  <link rel="stylesheet" href="../../angular/css/animations.css">

  <script src="../../angular/bower_components/jquery/dist/jquery.js"></script>
  <script src="../../angular/bower_components/angular/angular.js"></script>
  <script src="../../angular/bower_components/angular-animate/angular-animate.js"></script>
  <script src="../../angular/bower_components/angular-route/angular-route.js"></script>
  <script src="../../angular/bower_components/angular-resource/angular-resource.js"></script>
  <script src="../../angular/js/app.js"></script>
  <script src="../../angular/js/animations.js"></script>
  <script src="../../angular/js/controllers.js"></script>
  <script src="../../angular/js/filters.js"></script>
  <script src="../../angular/js/services.js"></script>
</head>
<body>

  <div class="view-container">
    <div ng-view class="view-frame"></div>
  </div>

</body>
</html>
