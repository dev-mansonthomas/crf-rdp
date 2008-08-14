
Ext.namespace('Ext.ux.MonitorInput', 'Ext.ux.MonitorInput.BilanEditor');

// create application
Ext.ux.MonitorInput.BilanEditor = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    var fieldList;
    var commentsAndEvalCiWindow;
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      dropZonesIds:'',
      // public methods
      init: function() {
        crfIrpUtils.setupCalendar('bilanDateHeureBase', 
          function(event)
          {
            Ext.get('bilanDateHeureBase_input').dom.setValue(Ext.get(event.id).getValue());
          }
        );
        
        
      },
      editBilan:function(idIntervention, ongletToOpen)
      {
        if(!ongletToOpen)
          ongletToOpen = "none";
        
        var callMetaData = {
          callback:miBilanCs.editBilanReturn,
          args:{
                ongletToOpen  : ongletToOpen
          }
        };
        MonitorInputBilan.getIntervention(idIntervention, callMetaData);
        
      },
      editBilanReturn:function(intervention, callMetatData)
      {
        // CODE A METTRE A LA FIN DE LA METHODE
        var centerRegion = Ext.getCmp('monitorInputCenterRegion');
        var currentPanel = centerRegion.getActiveTab();

        if(currentPanel.id != 'monitorInputBilanPanel')
          centerRegion.activate('monitorInputBilanPanel');
        
        var ongletToOpen = callMetatData.ongletToOpen;
        if(ongletToOpen == "BilanSecouristInitial")
          Ext.getCmp('monitorInputBilanEditorCenterPanelBilanSecouristeInitial').expand();
        else
          Ext.getCmp('monitorInputBilanEditorCenterPanelIdentite').expand();

          // CODE A METTRE A LA FIN DE LA METHODE

  Ext.get("bilan_id_intervention"                          ).dom.setValue(intervention.idIntervention                   );
  Ext.get("BilanHelper_id_intervention"                    ).update      (intervention.idIntervention                   );
  
  Ext.get("bilan_id_dispositif"                            ).dom.setValue(intervention.idDispositif                     );
  Ext.get("bilan_id_regulation"                            ).dom.setValue(intervention.idRegulation                     );
  Ext.get("BilanHelper_id_origine"                         ).update      (crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine));
  Ext.get("BilanHelper_id_motif"                           ).update      (crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  ));
  Ext.get("BilanHelper_id_etat"                            ).update      (crfIrpUtils.getLabelFor('EtatsIntervention'   , intervention.idEtat   ));
  if(intervention.idRefNumInter!=0)
    Ext.get("BilanHelper_ref_inter_ori"                      ).update      (intervention.idRefNumInter                    );
  Ext.get("BilanHelper_indicatif_dispositif"               ).update      (intervention.dispositifTicket.indicatifVehicule);
  
  
  Ext.get("bilan_douleur_"+intervention.douleur            ).dom.checked = true;
  
  if(intervention.ageApproxVictime!=0)
    Ext.get("bilan_age_approx_victime"                       ).dom.setValue(intervention.ageApproxVictime                 );

  if(intervention.ventilChiffre!=0)
    Ext.get("bilan_ventil_chiffre"                           ).dom.setValue(intervention.ventilChiffre                    );
  
  if(intervention.ventilSaturationO2!=0)
    Ext.get("bilan_ventil_saturation_o2"                     ).dom.setValue(intervention.ventilSaturationO2               );
  
  if(intervention.circulPoulsChiffre!=0)
    Ext.get("bilan_circul_pouls_chiffre"                     ).dom.setValue(intervention.circulPoulsChiffre               );
  if(intervention.circulTensionRefBasse!=0)
    Ext.get("bilan_circul_tension_ref_basse"                 ).dom.setValue(intervention.circulTensionRefBasse            );
  if(intervention.circulTensionRefHaute!=0)
    Ext.get("bilan_circul_tension_ref_haute"                 ).dom.setValue(intervention.circulTensionRefHaute            );
  
  
  
  if(intervention.gestesDsaNbChocs!=0)
    Ext.get("bilan_gestes_dsa_nb_chocs"                      ).dom.setValue(intervention.gestesDsaNbChocs                 );
  if(intervention.gestesInhalationO2LitreMin!=0)
    Ext.get("bilan_gestes_inhalation_o2_litre_min"           ).dom.setValue(intervention.gestesInhalationO2LitreMin       );
  if(intervention.evacAggravationVentilation!=0)
    Ext.get("bilan_evac_aggravation_ventilation"             ).dom.setValue(intervention.evacAggravationVentilation       );
  if(intervention.evacAggravationCirculation!=0)
    Ext.get("bilan_evac_aggravation_circulation"             ).dom.setValue(intervention.evacAggravationCirculation       );
  if(intervention.evacAggravationDouleur!=0)
    Ext.get("bilan_evac_aggravation_douleur"                 ).dom.setValue(intervention.evacAggravationDouleur           );
  
  if(intervention.evacPar != 0)
    Ext.get("bilan_evac_par_"+intervention.evacPar         ).dom.checked=true;
    
  Ext.get("bilan_transport_medicalisee_de"                 ).dom.setValue(intervention.transportMedicaliseeDe           );
  Ext.get("bilan_evac_hopital_destination"                 ).dom.setValue(intervention.evacHopitalDestination           );

  if(intervention.circulTensionBasse != 0)
    Ext.get("bilan_circul_tension_basse"                     ).dom.setValue(intervention.circulTensionBasse               );
  if(intervention.circulTensionHaute != 0)
    Ext.get("bilan_circul_tension_haute"                     ).dom.setValue(intervention.circulTensionHaute               );
  if(intervention.gestesGlycemieGrammeLitre != 0)
    Ext.get("bilan_gestes_glycemie_gramme_litre"             ).dom.setValue(intervention.gestesGlycemieGrammeLitre        );
  if(intervention.gestesTemperature != 0)
    Ext.get("bilan_gestes_temperature"                       ).dom.setValue(intervention.gestesTemperature                );

  Ext.get("BilanHelper_google_coords_lat"                  ).dom.setValue(intervention.position.googleCoordsLat         );
  Ext.get("BilanHelper_google_coords_long"                 ).dom.setValue(intervention.position.googleCoordsLong        );
  Ext.get("BilanHelper_rue"                                ).update      (intervention.position.rue                     );
  Ext.get("BilanHelper_code_postal"                        ).update      (intervention.position.codePostal              );
  Ext.get("BilanHelper_ville"                              ).update      (intervention.position.ville                   );



  Ext.get("bilan_DH_saisie"                                ).dom.setValue(crfIrpUtils.getTime(intervention.dhSaisie                         ));
  Ext.get("bilan_DH_reception"                             ).dom.setValue(crfIrpUtils.getTime(intervention.dhReception                      ));
  Ext.get("bilan_DH_depart"                                ).dom.setValue(crfIrpUtils.getTime(intervention.dhDepart                         ));
  Ext.get("bilan_DH_sur_place"                             ).dom.setValue(crfIrpUtils.getTime(intervention.dhSurPlace                       ));
  Ext.get("bilan_DH_bilan_primaire"                        ).dom.setValue(crfIrpUtils.getTime(intervention.dhBilanPrimaire                  ));
  Ext.get("bilan_DH_bilan_secondaire"                      ).dom.setValue(crfIrpUtils.getTime(intervention.dhBilanSecondaire                ));
  Ext.get("bilan_DH_quitte_les_lieux"                      ).dom.setValue(crfIrpUtils.getTime(intervention.dhQuitteLesLieux                 ));
  Ext.get("bilan_DH_arrivee_hopital"                       ).dom.setValue(crfIrpUtils.getTime(intervention.dhArriveeHopital                 ));
  Ext.get("bilan_DH_fin_intervention"                      ).dom.setValue(crfIrpUtils.getTime(intervention.dhFinIntervention                ));
  Ext.get("bilan_DH_appel_renfort_medical"                 ).dom.setValue(crfIrpUtils.getTime(intervention.dhAppelRenfortMedical            ));
  Ext.get("bilan_DH_arrivee_renfort_medical"               ).dom.setValue(crfIrpUtils.getTime(intervention.dhArriveeRenfortMedical          ));
  

  Ext.get("bilan_date_naissance"                           ).dom.setValue(intervention.dateNaissance);
    
  Ext.get("bilan_gestes_garrot_heure_pose"                 ).dom.setValue(crfIrpUtils.getTime(intervention.gestesGarrotHeurePose            ));
  Ext.get("bilan_evac_aggravation_contact_regulation"      ).dom.setValue(crfIrpUtils.getTime(intervention.evacAggravationContactRegulation ));


// Ext.get("bilan_complement_motif"                         ).dom.setValue(intervention.complementMotif                  ); 
// Ext.get("bilan_num_inter"                                ).dom.setValue(intervention.numInter                         ); 
// Ext.get("bilan_ref_num_inter"                            ).dom.setValue(intervention.refNumInter                      ); 
  Ext.get("bilan_nom_victime"                              ).dom.setValue(intervention.nomVictime                       ); 
  Ext.get("bilan_nom_jf_victime"                           ).dom.setValue(intervention.nomJfVictime                     ); 
  Ext.get("bilan_prenom_victime"                           ).dom.setValue(intervention.prenomVictime                    ); 
  Ext.get("bilan_lieu_naissance"                           ).dom.setValue(intervention.lieuNaissance                    ); 
  Ext.get("bilan_adresse_victime"                          ).dom.setValue(intervention.adresseVictime                   ); 
  Ext.get("bilan_code_postal_victime"                      ).dom.setValue(intervention.codePostalVictime                ); 
  Ext.get("bilan_ville_victime"                            ).dom.setValue(intervention.villeVictime                     ); 
  Ext.get("bilan_pays_victime"                             ).dom.setValue(intervention.paysVictime                      ); 
  Ext.get("bilan_personne_a_prevenir"                      ).dom.setValue(intervention.personneAPrevenir                ); 
  Ext.get("bilan_tel_personne_a_prevenir"                  ).dom.setValue(intervention.telPersonneAPrevenir             ); 
  Ext.get("bilan_effet_ou_objet_remis"                     ).dom.setValue(intervention.effetOuObjetRemis                ); 
  Ext.get("bilan_effet_ou_objet_remis_a"                   ).dom.setValue(intervention.effetOuObjetRemisA               ); 
  //Ext.get("bilan_nom_contact_sur_place"                    ).dom.setValue(intervention.nomContactSurPlace               ); 
  //Ext.get("bilan_coordonnees_contact"                      ).dom.setValue(intervention.coordonneesContact               ); 
  //Ext.get("bilan_batiment"                                 ).dom.setValue(intervention.batiment                         ); 
  //Ext.get("bilan_etage"                                    ).dom.setValue(intervention.etage                            ); 
  //Ext.get("bilan_porte"                                    ).dom.setValue(intervention.porte                            ); 
  //Ext.get("bilan_complement_adresse"                       ).dom.setValue(intervention.complementAdresse                ); 
  Ext.get("bilan_cs_pci_duree"                             ).dom.setValue(intervention.csPciDuree                       ); 
  Ext.get("bilan_ventil_commentaire"                       ).dom.setValue(intervention.ventilCommentaire                ); 
  Ext.get("bilan_circul_pouls_commentaire"                 ).dom.setValue(intervention.circulPoulsCommentaire           ); 
  Ext.get("bilan_gestes_autres"                            ).dom.setValue(intervention.gestesAutres                     ); 
  Ext.get("bilan_medecin_civil_sur_place"                  ).dom.setValue(intervention.medecinCivilSurPlace             ); 
  Ext.get("bilan_evac_laisse_sur_place_decedee_a_dispo_de" ).dom.setValue(intervention.evacLaisseSurPlaceDecedeeADispoDe); 
  Ext.get("BilanHelper_evac_num_inter_banlieu"             ).update(intervention.evacNumInterBanlieu              ); 
  Ext.get("bilan_evac_autre_destination"                   ).dom.setValue(intervention.evacAutreDestination             ); 
  Ext.get("bilan_evac_aggravation_nature"                  ).dom.setValue(intervention.evacAggravationNature            ); 
  Ext.get("bilan_evac_par_autre"                           ).dom.setValue(intervention.evacParAutre                     ); 
                                                                                                                        
  Ext.get("bilan_bilan_circonstances"                      ).dom.setValue(intervention.bilanCirconstances               ); 
  Ext.get("bilan_bilan_detresses"                          ).dom.setValue(intervention.bilanDetresses                   ); 
  Ext.get("bilan_bilan_antecedents"                        ).dom.setValue(intervention.bilanAntecedents                 ); 
  Ext.get("bilan_bilan_commentaires"                       ).dom.setValue(intervention.bilanCommentaires                ); 
  Ext.get("bilan_bilan_evaluation_ci"                      ).dom.setValue(intervention.bilanEvaluationCi                ); 
                                                                                                                        
  Ext.get("bilan_homme_victime_"+intervention.hommeVictime ).dom.checked=true;
  Ext.get("bilan_cs_coma"                                  ).dom.checked=intervention.csComa                           ;
  Ext.get("bilan_cs_pci"                                   ).dom.checked=intervention.csPci                            ;
  Ext.get("bilan_cs_pc_secondaire"                         ).dom.checked=intervention.csPcSecondaire                   ;
  Ext.get("bilan_cs_agitation"                             ).dom.checked=intervention.csAgitation                      ;
  Ext.get("bilan_cs_convulsions"                           ).dom.checked=intervention.csConvulsions                    ;
  Ext.get("bilan_ventil_absence"                           ).dom.checked=intervention.ventilAbsence                    ;
  Ext.get("bilan_ventil_superficielle"                     ).dom.checked=intervention.ventilSuperficielle              ;
  Ext.get("bilan_ventil_ronflement"                        ).dom.checked=intervention.ventilRonflement                 ;
  Ext.get("bilan_ventil_irreguliere"                       ).dom.checked=intervention.ventilIrreguliere                ;
  Ext.get("bilan_ventil_tirage"                            ).dom.checked=intervention.ventilTirage                     ;
  Ext.get("bilan_ventil_pauses"                            ).dom.checked=intervention.ventilPauses                     ;
  Ext.get("bilan_ventil_sueurs"                            ).dom.checked=intervention.ventilSueurs                     ;
  Ext.get("bilan_ventil_sifflement"                        ).dom.checked=intervention.ventilSifflement                 ;
  Ext.get("bilan_ventil_cyanose"                           ).dom.checked=intervention.ventilCyanose                    ;
  Ext.get("bilan_circul_pouls_non_percu"                   ).dom.checked=intervention.circulPoulsNonPercu              ;
  Ext.get("bilan_circul_pouls_irregulier"                  ).dom.checked=intervention.circulPoulsIrregulier            ;
  Ext.get("bilan_circul_pouls_faible"                      ).dom.checked=intervention.circulPoulsFaible                ;
  Ext.get("bilan_circul_conjonctive_decolorees"            ).dom.checked=intervention.circulConjonctiveDecolorees      ;
  Ext.get("bilan_circul_paleur_cutanees"                   ).dom.checked=intervention.circulPaleurCutanees             ;
  Ext.get("bilan_circul_marbrure"                          ).dom.checked=intervention.circulMarbrure                   ;
  Ext.get("bilan_pupille_reactive"                         ).dom.checked=intervention.pupilleReactive                  ;
  Ext.get("bilan_pupille_non_reactive"                     ).dom.checked=intervention.pupilleNonReactive               ;
  Ext.get("bilan_pupille_myosis_gauche"                    ).dom.checked=intervention.pupilleMyosisGauche              ;
  Ext.get("bilan_pupille_myosis_droite"                    ).dom.checked=intervention.pupilleMyosisDroite              ;
  Ext.get("bilan_pupille_mydriase_gauche"                  ).dom.checked=intervention.pupilleMydriaseGauche            ;
  Ext.get("bilan_pupille_mydriase_droite"                  ).dom.checked=intervention.pupilleMydriaseDroite            ;
  Ext.get("bilan_pupille_asymetriques"                     ).dom.checked=intervention.pupilleAsymetriques              ;
  Ext.get("bilan_gestes_lva"                               ).dom.checked=intervention.gestesLva                        ;
  Ext.get("bilan_gestes_mce"                               ).dom.checked=intervention.gestesMce                        ;
  Ext.get("bilan_gestes_allongee"                          ).dom.checked=intervention.gestesAllongee                   ;
  Ext.get("bilan_gestes_pls"                               ).dom.checked=intervention.gestesPls                        ;
  Ext.get("bilan_gestes_pansement"                         ).dom.checked=intervention.gestesPansement                  ;
  Ext.get("bilan_gestes_refroidissement"                   ).dom.checked=intervention.gestesRefroidissement            ;
  Ext.get("bilan_gestes_aspiration"                        ).dom.checked=intervention.gestesAspiration                 ;
  Ext.get("bilan_gestes_dsa"                               ).dom.checked=intervention.gestesDsa                        ;
  Ext.get("bilan_gestes_demi_assis"                        ).dom.checked=intervention.gestesDemiAssis                  ;
  Ext.get("bilan_gestes_collier_cervical"                  ).dom.checked=intervention.gestesCollierCervical            ;
  Ext.get("bilan_gestes_point_de_compression"              ).dom.checked=intervention.gestesPointDeCompression         ;
  Ext.get("bilan_gestes_protection_thermique"              ).dom.checked=intervention.gestesProtectionThermique        ;
  Ext.get("bilan_gestes_va"                                ).dom.checked=intervention.gestesVa                         ;
  Ext.get("bilan_gestes_jambes_surelevees"                 ).dom.checked=intervention.gestesJambesSurelevees           ;
  Ext.get("bilan_gestes_attelle"                           ).dom.checked=intervention.gestesAttelle                    ;
  Ext.get("bilan_gestes_garrot"                            ).dom.checked=intervention.gestesGarrot                     ;
  Ext.get("bilan_gestes_immobilisation_generale"           ).dom.checked=intervention.gestesImmobilisationGenerale     ;
  Ext.get("bilan_coordinateur_bspp_contacte"               ).dom.checked=intervention.coordinateurBsppContacte         ;
  Ext.get("bilan_coordinateur_samu_contacte"               ).dom.checked=intervention.coordinateurSamuContacte         ;
  Ext.get("bilan_transport_medicalisee_ar"                 ).dom.checked=intervention.transportMedicaliseeAr           ;
  Ext.get("bilan_transport_medicalisee_umh"                ).dom.checked=intervention.transportMedicaliseeUmh          ;
  Ext.get("bilan_police_sur_place"                         ).dom.checked=intervention.policeSurPlace                   ;
  Ext.get("bilan_pompier_sur_place"                        ).dom.checked=intervention.pompierSurPlace                  ;
  Ext.get("bilan_evac_laisse_sur_place"                    ).dom.checked=intervention.evacLaisseSurPlace               ;
  Ext.get("bilan_evac_laisse_sur_place_decedee"            ).dom.checked=intervention.evacLaisseSurPlaceDecedee        ;
  Ext.get("bilan_evac_refus_de_transport"                  ).dom.checked=intervention.evacRefusDeTransport             ;
  Ext.get("bilan_evac_decharche"                           ).dom.checked=intervention.evacDecharche                    ;
  Ext.get("bilan_evac_aggravation_"+intervention.evacAggravation).dom.checked=true;
  Ext.get("bilan_evac_aggravation_pendant_transport"       ).dom.checked=intervention.evacAggravationPendantTransport  ;
  Ext.get("bilan_evac_aggravation_arrive_a_destination"    ).dom.checked=intervention.evacAggravationArriveADestination;

      },
      resetBilanForm:function()
      {
      
      },
      openTicket:function()
      {
        var interventionId = Ext.get('bilan_id_intervention').getValue();
        if(interventionId == '' || interventionId == 0)
        {
          crfIrpUtils.error('BilanHelper_openTicket', 'Identifiant de l\'intervention non trouvé.');
          return;
        }
        miInterventionCs.editInterventionTicket(interventionId);
      },
      openDispositif:function()
      {
        var idDispositif = Ext.get('bilan_id_dispositif').getValue();
        if(idDispositif == '' || idDispositif == 0)
        {
          crfIrpUtils.error('BilanHelper_openDispositif', 'Identifiant du dispositif non trouvé.');
          return;
        }
        miDispositifCs.editDispositif(idDispositif);
      },
      openInterAddress:function()
      {
        var googleCoordsLat  = Ext.get('BilanHelper_google_coords_lat' ).getValue();
        var googleCoordsLong = Ext.get('BilanHelper_google_coords_long').getValue();
        
        if(googleCoordsLat == '' || googleCoordsLong == '' || (googleCoordsLat == 0 && googleCoordsLong == 0))
        {
          crfIrpUtils.error('BilanHelper_openAddress', 'Coordonnées Google Maps non disponible');
          return;
        }

        alert('Afficher carte centree sur adresse inter '+googleCoordsLat+';'+googleCoordsLong);
      },      
      openCommentsAndEvalCi:function()
      {
        if(!this.commentsAndEvalCiWindow)
        {
         this.commentsAndEvalCiWindow = new Ext.Window({
                el         : 'bilan-commentsAndEval',
                layout     : 'fit',
                width      : 500,
                height     : 300,
                closeAction: 'hide',
                plain      : true,
                items      : new Ext.TabPanel({
                    el            : 'bilan-commentsAndEval-tabs',
                    autoTabs      : true,
                    activeTab     : 0,
                    deferredRender: false,
                    border        : false
                }),

                buttons: [{
                    text: 'Close',
                    handler: function(){
                        miBilanCs.closeCommentsAndEvalCi();
                    }
                }]
            });
          Ext.get('bilan_bilan_commentaires' ).setStyle({height:'100%'});
          Ext.get('bilan_bilan_evaluation_ci').setStyle({height:'100%'});
        }
        this.commentsAndEvalCiWindow.show(this);

      },
      closeCommentsAndEvalCi:function()
      {
        if(this.commentsAndEvalCiWindow)
        {
          this.commentsAndEvalCiWindow.hide();
        }
      },
      pupilleCheckMyosisMydriase:function(fieldId)
      {
        if(fieldId=='bilan_pupille_myosis_gauche' && Ext.get('bilan_pupille_myosis_gauche').dom.checked)
          Ext.get('bilan_pupille_mydriase_gauche').dom.checked=false;
        else if(fieldId=='bilan_pupille_myosis_droite' && Ext.get('bilan_pupille_myosis_droite').dom.checked)
          Ext.get('bilan_pupille_mydriase_droite').dom.checked=false;
        else if(fieldId=='bilan_pupille_mydriase_gauche' && Ext.get('bilan_pupille_mydriase_gauche').dom.checked)
          Ext.get('bilan_pupille_myosis_gauche').dom.checked=false;
        else if(fieldId=='bilan_pupille_mydriase_droite' && Ext.get('bilan_pupille_mydriase_droite').dom.checked)
          Ext.get('bilan_pupille_myosis_droite').dom.checked=false;
      },
      pupilleCheckPupilleReactive:function(fieldId)
      {
        if(fieldId=='bilan_pupille_reactive' && Ext.get('bilan_pupille_reactive').dom.checked)
          Ext.get('bilan_pupille_non_reactive').dom.checked=false;
        else if(fieldId=='bilan_pupille_non_reactive' && Ext.get('bilan_pupille_non_reactive').dom.checked)
          Ext.get('bilan_pupille_reactive').dom.checked=false;
      },
      mecialiseParCheck:function(fieldId)
      {
        if(fieldId=='bilan_transport_medicalisee_ar' && Ext.get('bilan_transport_medicalisee_ar').dom.checked)
          Ext.get('bilan_transport_medicalisee_umh').dom.checked=false;
        else if(fieldId=='bilan_transport_medicalisee_umh' && Ext.get('bilan_transport_medicalisee_umh').dom.checked)
          Ext.get('bilan_transport_medicalisee_ar').dom.checked=false;
      },
      updateStringField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateStringField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateDateField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateDateField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateBooleanField:function(fieldId, fieldName, objectIdForGraphicalEffect){

        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateBooleanField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateIntegerField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && ($(fieldId).type=='radio' || fieldValue != $(fieldId).oldValue))
        {
          MonitorInputBilan.updateIntegerField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      },
      updateFloatField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          MonitorInputBilan.updateFloatField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              fieldValue,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(objectIdForGraphicalEffect);
      }
    };

}(); // end of app
