<div id="BilanEvacuation">
    
    <table id="BilanEvacuationTable">
      <tr>
        <td id="bilanEvacLaisseSurPlaceP">
             <input type="checkbox"
           id="bilan_evac_laisse_sur_place"
         name="bilan_evac_laisse_sur_place"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_laisse_sur_place','bilanEvacLaisseSurPlaceP')"/>
             
          Laissé sur place
          
        </td>      
      
        <td id="bilanEvacRefusTransportP">
             <input type="checkbox"
           id="bilan_evac_refus_de_transport"
         name="bilan_evac_refus_de_transport"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_refus_de_transport','bilanEvacRefusTransportP')"/>
             
          Refus de transport
          
        </td>

        <td id="bilanEvacDechargeP">
             <input type="checkbox"
           id="bilan_evac_decharche"
         name="bilan_evac_decharche"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_decharche','bilanEvacDechargeP')"/>
             
          Décharge de responsabilité
          
        </td>
      </tr>
      <tr>

        <td colspan="3" id="bilanEvacLaisseeSurPlaceDcdP">
             <input type="checkbox"
           id="bilan_evac_laisse_sur_place_decedee"
         name="bilan_evac_laisse_sur_place_decedee"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_laisse_sur_place_decedee','bilanEvacLaisseeSurPlaceDcdP')"/>
             
          Laissé sur place Décédé, à disposition de
          
             <input type="text"
           id="bilan_evac_laisse_sur_place_decedee_a_dispo_de"
         name="bilan_evac_laisse_sur_place_decedee_a_dispo_de"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="80"
        style="width:400px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_laisse_sur_place_decedee_a_dispo_de')"/>

        </td>
      </tr>
      
      <tr>
        <td colspan="4" id="bilanEvacSansSuite">
             <input type="checkbox"
           id="bilan_evac_sans_suite"
         name="bilan_evac_sans_suite"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_sans_suite','bilanEvacSansSuite')"/>
             
          Sans Suite
        </td>
      </tr>

      <tr>
        <td colspan="3">
        &nbsp;
        </td>
      </tr>
      <tr>
        <th>
          Aggravation
        </th>
        <td colspan="2" id="bilanEvacAggravationP">
        

           <input type="radio"
           id="bilan_evac_aggravation_false"
         name="bilanEvacAggravation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation','bilanEvacAggravationP', false)"
        value="false"/> <strong>Non</strong>
          
  <input type="radio"
           id="bilan_evac_aggravation_true"
         name="bilanEvacAggravation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation','bilanEvacAggravationP', true)"
        value="true"/> <strong>Oui</strong>        
        
        &nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="checkbox"
           id="bilan_evac_aggravation_pendant_transport"
         name="bilan_evac_aggravation_pendant_transport"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation_pendant_transport','bilanEvacAggravationP')"/> Pendant transport&nbsp;&nbsp;
     
                  <input type="checkbox"
           id="bilan_evac_aggravation_arrive_a_destination"
         name="bilan_evac_aggravation_arrive_a_destination"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateBooleanField(this.id, 'evac_aggravation_arrive_a_destination','bilanEvacAggravationP')"/> Arrivée à destination
        
        </td>
      </tr>
      <tr>
        <td>
          Ventilation
  <input type="text"
           id="bilan_evac_aggravation_ventilation"
         name="bilan_evac_aggravation_ventilation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_ventilation')"/>
     / <sub ext:qtip="Minute">min</sub>
     
     
        </td>
        <td>
          Circulation
  <input type="text"
           id="bilan_evac_aggravation_circulation"
         name="bilan_evac_aggravation_circulation"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_circulation')"/>
     / <sub ext:qtip="Minute">min</sub>          
        </td>
        <td ext:qtip="Douleur de 0 à 4">
          Douleur
  <input type="text"
           id="bilan_evac_aggravation_douleur"
         name="bilan_evac_aggravation_douleur"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="2"
        style="width:30px;"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_aggravation_douleur')"/>
     / <sub>4</sub>
        </td>
      </tr>
      <tr>
        <td>
  <div id="bilan_evac_aggravation_contact_regulation_divLabel">Conctact Régulation: </div>
  <div id="bilan_evac_aggravation_contact_regulation_div"></div>

        
        </td>
        <td colspan="2">
        Nature de l'aggravation :
        <input type="text"
           id="bilan_evac_aggravation_nature"
         name="bilan_evac_aggravation_nature"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="100"
        style="width:300px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_aggravation_nature')"/>
         
        </td>
      </tr>
      <tr>
        <td colspan="3">
        &nbsp;
        </td>
      </tr>      
      <tr>
        <th>
          Transport
        </th>
        <td colspan="2" id="bilanEvacParP">
  <input type="radio"
           id="bilan_evac_par_1"
         name="bilanEvacPar"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
        value="1"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="C'est nous ;)">Croix Rouge</span>
&nbsp;&nbsp;
  <input type="radio"
           id="bilan_evac_par_2"
         name="bilanEvacPar"
        value="2"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="Service d'Aide Médicale Urgente">SAMU</span>    
     
        
  <input type="radio"
           id="bilan_evac_par_3"
         name="bilanEvacPar"
        value="3"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> <span ext:qtip="Brigade des Sapeurs Pompiers">BSPP</span>
&nbsp;&nbsp;
  <input type="radio"
           id="bilan_evac_par_4"
         name="bilanEvacPar"
        value="4"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par','bilanEvacParP')"/> Police   
        </td>
      </tr>
      <tr>
        <td>&nbsp;
        </td>
        <td colspan="2" id="bilanEvacParAutreP">
  <input type="radio"
           id="bilan_evac_par_5"
         name="bilanEvacPar"
        value="5"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
     onChange="miBilanCs.updateIntegerField(this.id, 'evac_par', 'bilanEvacParAutreP')"/> Autre       

        <input type="text"
           id="bilan_evac_par_autre"
         name="bilan_evac_par_autre"
      onFocus="crfIrpUtils.fieldEdit(this.id)"
    maxlength="100"
        style="width:300px;"
     onChange="miBilanCs.updateStringField(this.id, 'evac_par_autre')"/>
              
        </td>
      </tr>
      <tr>
        <td>
          Hopital 
     <input   id="bilan_evac_hopital_destination"
            name="bilan_evac_hopital_destination"
            type="hidden"
          />
          
     <input   id="bilan_evac_hopital_destination_label"
            name="bilan_evac_hopital_destination_label"
            type="input"
        readonly="readonly"
           style="width:70%;"
          /> 
          
<!-- The box wrap markup embedded instead of using Element.boxWrap() -->
<div style="width:570px;">
    <div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>
    <div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">
        <h3 style="margin-bottom:5px;">Recherche d'un Hopital</h3>
        <table style="width:100%">
          <tr>
            <td><input type="text" name="SearchHopitalInput"     id="SearchHopitalInput"      style="width:100%"/></td>
          </tr>
        </table>
        <div style="padding-top:4px;">
            Recherche par nom, ville, addresse, code postal.
        </div>

    </div></div></div>
    <div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>
</div>    



 
        </td>
        <td>
         
        </td>
        <td>

        </td>
      </tr>      
    </table>               
          
ou Autre destination <br/>


<table style="width:100%">
<tr>
  <td style="width:80px;" ext:qtip="Exemple : Clinique privée, Maison de retraite, domicile du patient">Description</td>
  <td>
<input style="width:60%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_label"
          name="bilan_evac_autre_dest_label"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
      onChange="miBilanCs.updateStringField(this.id, 'evac_autre_dest_label')"
     maxlength="80"/>  
  </td>
</tr>
<tr>
	<td>Rue</td>
	<td>
	 <input style="width:60%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_rue"
          name="bilan_evac_autre_dest_rue"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id, 'evac_autre_dest_rue')"/>
	</td>
</tr>
<tr>
  <td>Code Postal</td>
  <td>
  <input style="width:50px;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_code_postal"
          name="bilan_evac_autre_dest_code_postal"
     maxlength="5"
         value=""
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id,'evac_autre_dest_code_postal')"
  />
  </td>
</tr>
<tr>
  <td>Ville</td>
  <td>
  
  <input style="width:60.0%;"
         class="input"
          type="text"
            id="bilan_evac_autre_dest_ville"
          name="bilan_evac_autre_dest_ville"
         value=""
     maxlength="80"
       onFocus="crfIrpUtils.fieldEdit(this.id)"
        onBlur="miBilanCs.updateAddress(this.id, 'evac_autre_dest_ville')"
  />
  <img id="bilanEvacGoogleAdressCheckStatus" alt="pix" style="height:16px;width:16px;" src="../../img/pix.png" />
  <input type="hidden" id="bilan_evac_autre_dest_google_coords_lat"  name="evac_autre_dest_google_coords_lat" />
  <input type="hidden" id="bilan_evac_autre_dest_google_coords_long" name="evac_autre_dest_google_coords_long"/>

  
  </td>
</tr>
</table>

   
    
    </div>
    