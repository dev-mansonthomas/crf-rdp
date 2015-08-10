<!-- Bilan Panel -->
<div id="BilanPanel" style="display:none">

<!-- Bilan Editor-center -->
  <div id="BilanEditor"  style="display:none">

		<jsp:include page="./BilanEditor/01-bilanIdentite.jsp"/>
		
		<jsp:include page="./BilanEditor/02-bilanSecouristeInitial.jsp"/>
		
		<jsp:include page="./BilanEditor/03-bilanGestesEtObservations.jsp"/>
	
		<jsp:include page="./BilanEditor/04-bilanEvacuation.jsp"/>
    
  </div>
<!-- FIN BilanEditor-center -->
  
  <jsp:include page="./BilanEditor/05-bilanHelper.jsp"/>
  
</div>  
  
<jsp:include page="./BilanEditor/06-bilanCommentairesEtEvaluation.jsp"/>
  

<!-- Fin Bilan Editor -->