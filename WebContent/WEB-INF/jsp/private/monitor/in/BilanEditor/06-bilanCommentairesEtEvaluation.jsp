
<div id="bilan-commentsAndEval" class="x-hidden">
    <div class="x-window-header">Bilan - Commentaires &amp; Evaluations</div>
    <div id="bilan-commentsAndEval-tabs">
        <!-- Auto create tab 1 -->
        <div class="x-tab" title="Commentaires">
          
        <textarea id="bilan_bilan_commentaires"
                name="bilan_bilan_commentaires"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_commentaires')"></textarea>

        </div>
        <!-- Auto create tab 2 -->

        <div class="x-tab" title="Evalution CI">

        <textarea id="bilan_bilan_evaluation_ci"
                name="bilan_bilan_evaluation_ci"
               class="bilanTextArea"
             onFocus="crfIrpUtils.fieldEdit(this.id)"
              onBlur="miBilanCs.updateStringField(this.id, 'bilan_evaluation_ci')"></textarea>

        </div>
    </div>
</div>


<!-- Fenetre pour l'annulation de l'intervention -->

<div id="bilan-cancelIntervention" class="x-hidden">
    <div class="x-window-header">Annulation de l'Intervention</div>
    <div id="bilan-cancelIntervention-content">
      Motif de l'annulation:
           <select  id="bilan_motif_annulation"
                  name="bilan_motif_annulation"><option value=" "> </option></select><br/><br/>

      Commentaire sur l'annulation : <br/>
                  <textarea   id="bilan_annulation_commentaires"
                            name="bilan_annulation_commentaires"
                         onFocus="crfIrpUtils.fieldEdit(this.id)"
                          onBlur="miBilanCs.updateStringField(this.id, 'annulation_commentaires')"
                    ></textarea>
    </div>
</div>
