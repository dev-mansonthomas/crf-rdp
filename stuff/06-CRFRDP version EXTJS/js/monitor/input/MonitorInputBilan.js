
Ext.namespace('Ext.ux.MonitorInput', 'Ext.ux.MonitorInput.BilanEditor');

// create application
Ext.ux.MonitorInput.BilanEditor = function() {
    // do NOT access DOM from here; elements don't exist yet

    // private variables
    var fieldList;
    var commentsAndEvalCiWindow;
    var cancelInterventionWindow;
    // private functions
    
    // public space
    return {
      // public properties, e.g. strings to translate
      dropZonesIds:'',
      // public methods
      init: function() {
        
        PageBus.subscribe("listLieu.loaded"     ,  this, this.initHospitalList           , null, null);
        PageBus.subscribe("listLieu.loaded"     ,  this, this.initMotifAnnulationList    , null, null);
        
        crfIrpUtils.setupCalendar('bilanDateHeureBase', 'bilanDateHeureBase'+'_div','bilanDateHeureBase'+'_div',
          function(event)
          {
            Ext.get('bilanDateHeureBase_input').dom.setValue(Ext.get(event.id).getValue());
          },
          'd/m/Y'
        );
      
        try
        {
          crfIrpUtils.setupCalendar("bilan_gestes_garrot_heure_pose","bilan_gestes_garrot_heure_pose_div","bilan_gestes_garrot_heure_pose_div", function(event){
            miBilanCs.updateBilanDateTimeField(event.id, 'gestes_garrot_heure_pose');
         });  
        }
        catch(e)
        {
          if(consoleEnabled)
          {
            console.log("Error on init bilan_gestes_garrot_heure_pose", e);
          }          
        }
        
        try
        {
          crfIrpUtils.setupCalendar("bilan_evac_aggravation_contact_regulation","bilan_evac_aggravation_contact_regulation_div","bilan_evac_aggravation_contact_regulation_div", function(event){
            miBilanCs.updateBilanDateTimeField(event.id, 'evac_aggravation_contact_regulation');
         });  
        }
        catch(e)
        {
          if(consoleEnabled)
          {
            console.log("Error on init bilan_evac_aggravation_contact_regulation", e);
          }          
        }
        
        
        
      },
      initHospitalList:function()
      {

        var searchHoptial = new Ext.ux.crfrdp.LieuxSearchCombo({
          id          : 'SearchHoptial', 
          searchType  : 1,/*dispositifEquipierSearch*/
          applyTo     : 'SearchHopitalInput',
          width       : 540,
          listWidth   : 540,
          onSelect    : function(record)
          {
            
            Ext.Msg.confirm("Etes vous sur de vouloir choisir cet Hopital ?",
                "Etes vous sur de vouloir chosir l'hopital '"+record.data.nom+"' situé à '"+record.data.addresse+" - "+record.data.codePostal+" - "+record.data.ville+"' ?",
                function(btn){
                  if(btn == 'yes')
                  {
                    
                    Ext.get('bilan_evac_hopital_destination'      ).dom.value=record.data.idLieu;
                    Ext.get('bilan_evac_hopital_destination_label').dom.value=crfIrpUtils.getLabelForLieu(record.data.idLieu);
                    
                    miBilanCs.updateIntegerField('bilan_evac_hopital_destination', 'evac_hopital_destination');
                    
                    
                    Ext.getCmp('SearchHoptial').clearValue();
                  }
                });
          }
        });
        
        var searchMoyenEvac = new Ext.ux.crfrdp.LieuxSearchCombo({
          id          : 'SearchMoyenEvac', 
          searchType  : 1,/*dispositifEquipierSearch*/
          applyTo     : 'SearchMoyenEvacInput',
          width       : 540,
          listWidth   : 540,
          onSelect    : function(record)
          {
            
            Ext.Msg.confirm("Etes vous sur de vouloir choisir cet Hopital ?",
                "Etes vous sur de vouloir chosir le moyen d'évacutation de '"+record.data.nom+"' situé à '"+record.data.addresse+" - "+record.data.codePostal+" - "+record.data.ville+"' ?",
                function(btn){
                  if(btn == 'yes')
                  {
                    
                    Ext.get('bilan_transport_medicalisee_de'      ).dom.value=record.data.idLieu;
                    Ext.get('bilan_transport_medicalisee_de_label').dom.value=crfIrpUtils.getLabelForLieu(record.data.idLieu);
                    
                    miBilanCs.updateIntegerField('bilan_transport_medicalisee_de', 'transport_medicalisee_de');
                    
                     
                    Ext.getCmp('SearchMoyenEvac').clearValue();
                  }
                });
          }
        });

        
      },
      initMotifAnnulationList:function()
      {
        dwr.util.removeAllOptions('bilan_motif_annulation');
        dwr.util.addOptions('bilan_motif_annulation',
                            crfIrpUtils.allList['MotifsAnnulation'],
                            'id',
                            'label');
              
      },
      showCancelInterventionWin:function()
      {
        if(!this.cancelInterventionWindow)
        {
          this.cancelInterventionWindow = new Ext.Window({
                el         : 'bilan-cancelIntervention',
                contentEl  : 'bilan-cancelIntervention-content',
                layout     : 'fit',
                width      : 500,
                height     : 300,
                closeAction: 'hide',
                plain      : true,
                buttons: [{
                    text: 'Fermer la fenêtre',
                    handler: function(){
                        miBilanCs.closeCancelInterventionWin();
                    }
                },{
                    text: 'Annuler l\'intervention',
                    handler: function(){
                        miBilanCs.cancelIntervention();
                    }
                }]
            });
        }
        this.cancelInterventionWindow.show('BilanHelper_cancelIntervention');
      },
      closeCancelInterventionWin:function()
      {
        if(this.cancelInterventionWindow)
        {
          this.cancelInterventionWindow.hide();
        } 
      },
      cancelIntervention:function() 
      {
        if($('bilan_motif_annulation').value == 0)
        {
          Ext.Msg.alert('Motif annulation obligatoire', 'Veuillez choisir un motif d\'annulation.');
          return;
        }
        
        MonitorInputBilan.cancelIntervention( $('bilan_id_intervention' ).value, 
                                              $('bilan_id_dispositif'   ).value,
                                              $('bilan_motif_annulation').value,
                                              function(){
          miBilanCs.closeCancelInterventionWin();
        });

      },
      /** si ongletToOpen == 'BilanSecouristInitial' alors l'onglet du bilan qui sera ouvert sera celui du bilan secouriste initial,
       * sinon, l'identité de la victime sera affiché*/
      editBilan:function(idIntervention, ongletToOpen)
      {
        window.focus();
        
        if(!ongletToOpen)
          ongletToOpen = "none";
        
        var callMetaData = {
          callback:miBilanCs.editBilanReturn,
          arg:{
                ongletToOpen  : ongletToOpen
          }
        };
        
        var centerRegion = Ext.getCmp('monitorInputCenterRegion');
        var currentPanel = centerRegion.getActiveTab();
        if(currentPanel.id != 'monitorInputBilanPanel')
          centerRegion.activate('monitorInputBilanPanel');
        
        MonitorInputBilan.getIntervention(idIntervention, callMetaData);
        
      },
      editBilanReturn:function(intervention, callMetatData)
      {

        Ext.get("bilan_id_intervention"                          ).dom.setValue(intervention.idIntervention                   );
        Ext.get("bilan_id_dispositif"                            ).dom.setValue(intervention.idDispositif                     );
        Ext.get("bilan_id_regulation"                            ).dom.setValue(intervention.idRegulation                     );
        
        Ext.get("BilanHelper_intervention_business_id"           ).update	     (crfIrpUtils.formatInterventionBusinessId(intervention.interventionBusinessId));
        Ext.get("BilanHelper_id_intervention"                    ).update      ('('+intervention.idIntervention+')'           );
        Ext.get("BilanHelper_nom_victime"                        ).update      (intervention.nomVictime  +" "+intervention.prenomVictime);
        Ext.get("BilanHelper_id_origine"                         ).update      (crfIrpUtils.getLabelFor('OriginesIntervention', intervention.idOrigine));
        Ext.get("BilanHelper_id_motif"                           ).update      (crfIrpUtils.getLabelFor('MotifsIntervention'  , intervention.idMotif  ));
        Ext.get("BilanHelper_id_etat"                            ).update      (crfIrpUtils.getLabelFor('EtatsIntervention'   , intervention.idEtat   ));
        
        if(intervention.idEtat == 11)//intervention annulée
        {
          Ext.get("BilanHelper_id_etat"                          ).addClass   ("InterventionAnnulee");
        }
        else
        {
          Ext.get("BilanHelper_id_etat"                          ).removeClass("InterventionAnnulee");  
        }
          
        
        if(intervention.idRefNumInter!=0)
          Ext.get("BilanHelper_ref_inter_ori"                    ).update      (intervention.idRefNumInter                    );
        else
          Ext.get("BilanHelper_ref_inter_ori"                    ).update      ("");
          
        Ext.get("BilanHelper_indicatif_dispositif"               ).update      (intervention.dispositifTicket.indicatifVehicule);
        
        
        Ext.get("bilan_douleur_"+intervention.douleur            ).dom.checked = true;
        
        if(intervention.ageApproxVictime!=0)
          Ext.get("bilan_age_approx_victime"                     ).dom.setValue(intervention.ageApproxVictime                 );
        else
          Ext.get("bilan_age_approx_victime"                     ).dom.setValue("");
          
        if(intervention.ventilChiffre!=0)
          Ext.get("bilan_ventil_chiffre"                         ).dom.setValue(intervention.ventilChiffre                    );
        else
          Ext.get("bilan_ventil_chiffre"                         ).dom.setValue("");
          
        if(intervention.ventilSaturationO2!=0)
          Ext.get("bilan_ventil_saturation_o2"                   ).dom.setValue(intervention.ventilSaturationO2               );
        else
          Ext.get("bilan_ventil_saturation_o2"                   ).dom.setValue("");
        
        if(intervention.circulPoulsChiffre!=0)
          Ext.get("bilan_circul_pouls_chiffre"                   ).dom.setValue(intervention.circulPoulsChiffre               );
        else
          Ext.get("bilan_circul_pouls_chiffre"                   ).dom.setValue("");
          
        if(intervention.circulTensionRefBasse!=0)
          Ext.get("bilan_circul_tension_ref_basse"               ).dom.setValue(intervention.circulTensionRefBasse            );
        else
          Ext.get("bilan_circul_tension_ref_basse"               ).dom.setValue("");
          
        if(intervention.circulTensionRefHaute!=0)
          Ext.get("bilan_circul_tension_ref_haute"               ).dom.setValue(intervention.circulTensionRefHaute            );
        else
          Ext.get("bilan_circul_tension_ref_haute"               ).dom.setValue("");
        
        
        
        if(intervention.gestesDsaNbChocs!=0)
          Ext.get("bilan_gestes_dsa_nb_chocs"                    ).dom.setValue(intervention.gestesDsaNbChocs                 );
        else
          Ext.get("bilan_gestes_dsa_nb_chocs"                    ).dom.setValue("");
          
        if(intervention.gestesInhalationO2LitreMin!=0)
          Ext.get("bilan_gestes_inhalation_o2_litre_min"         ).dom.setValue(intervention.gestesInhalationO2LitreMin       );
        else
          Ext.get("bilan_gestes_inhalation_o2_litre_min"         ).dom.setValue("");
          
        if(intervention.evacAggravationVentilation!=0)
          Ext.get("bilan_evac_aggravation_ventilation"           ).dom.setValue(intervention.evacAggravationVentilation       );
        else
          Ext.get("bilan_evac_aggravation_ventilation"           ).dom.setValue("");
          
        if(intervention.evacAggravationCirculation!=0)
          Ext.get("bilan_evac_aggravation_circulation"           ).dom.setValue(intervention.evacAggravationCirculation       );
        else
          Ext.get("bilan_evac_aggravation_circulation"           ).dom.setValue("");
          
        if(intervention.evacAggravationDouleur!=0)
          Ext.get("bilan_evac_aggravation_douleur"               ).dom.setValue(intervention.evacAggravationDouleur           );
        else
          Ext.get("bilan_evac_aggravation_douleur"               ).dom.setValue("");
        
        if(intervention.evacPar != 0)
          Ext.get("bilan_evac_par_"+intervention.evacPar         ).dom.checked=true;
         
        Ext.get("bilan_transport_medicalisee_de"                 ).dom.setValue(intervention.transportMedicaliseeDe           );
        
        
        if( (intervention.transportMedicaliseeAr || intervention.transportMedicaliseeUmh) && intervention.transportMedicaliseeDe != '' && intervention.transportMedicaliseeDe > 0 )
        {
          
          var label = '';
          
          if(intervention.transportMedicaliseeAr)
          {
            label = crfIrpUtils.getLabelForLieu(intervention.transportMedicaliseeDe);  
          }
          else
          {
            label = crfIrpUtils.getLabelForLieu(intervention.transportMedicaliseeDe); 
          }
          
          
          
          Ext.get("bilan_transport_medicalisee_de_label"           ).dom.setValue(label);  
        }
        
        
        Ext.get("bilan_evac_hopital_destination"                 ).dom.setValue(intervention.evacHopitalDestination           );
        
        if( intervention.evacHopitalDestination != '' && intervention.evacHopitalDestination > 0)
        {
          Ext.get("bilan_evac_hopital_destination_label" ).dom.setValue(crfIrpUtils.getLabelForLieu(intervention.evacHopitalDestination));  
        }
        
        
        
        
        if(intervention.circulTensionBasse != 0)
          Ext.get("bilan_circul_tension_basse"                   ).dom.setValue(intervention.circulTensionBasse               );
        else
          Ext.get("bilan_circul_tension_basse"                   ).dom.setValue("");
          
        if(intervention.circulTensionHaute != 0)
          Ext.get("bilan_circul_tension_haute"                   ).dom.setValue(intervention.circulTensionHaute               );
        else
          Ext.get("bilan_circul_tension_haute"                   ).dom.setValue("");
          
        if(intervention.gestesGlycemieGrammeLitre != 0)
          Ext.get("bilan_gestes_glycemie_gramme_litre"           ).dom.setValue(intervention.gestesGlycemieGrammeLitre        );
        else
          Ext.get("bilan_gestes_glycemie_gramme_litre"           ).dom.setValue("");
          
        if(intervention.gestesTemperature != 0)
          Ext.get("bilan_gestes_temperature"                     ).dom.setValue(intervention.gestesTemperature                );
        else
          Ext.get("bilan_gestes_temperature"                     ).dom.setValue("");
      
        Ext.get("BilanHelper_google_coords_lat"                  ).dom.setValue(intervention.position.googleCoordsLat         );
        Ext.get("BilanHelper_google_coords_long"                 ).dom.setValue(intervention.position.googleCoordsLong        );
        Ext.get("BilanHelper_rue"                                ).update      (intervention.position.rue                     );
        Ext.get("BilanHelper_code_postal"                        ).update      (intervention.position.codePostal              );
        Ext.get("BilanHelper_ville"                              ).update      (intervention.position.ville                   );
      
      
        Ext.getCmp('bilanDateHeureBase').setValue(intervention.dhSaisie                         );
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
        
      
        
        miBilanCs.setDayDelta("bilan_DH_saisie"                  , null                            );
        miBilanCs.setDayDelta("bilan_DH_reception"               , "bilan_DH_saisie"               );
        miBilanCs.setDayDelta("bilan_DH_depart"                  , "bilan_DH_reception"            );
        miBilanCs.setDayDelta("bilan_DH_bilan_primaire"          , "bilan_DH_depart"               );
        miBilanCs.setDayDelta("bilan_DH_bilan_secondaire"        , "bilan_DH_bilan_primaire"       );
        miBilanCs.setDayDelta("bilan_DH_quitte_les_lieux"        , "bilan_DH_bilan_secondaire"     );
        miBilanCs.setDayDelta("bilan_DH_arrivee_hopital"         , "bilan_DH_quitte_les_lieux"     );
        miBilanCs.setDayDelta("bilan_DH_fin_intervention"        , "bilan_DH_arrivee_hopital"      );
        miBilanCs.setDayDelta("bilan_DH_appel_renfort_medical"   , "bilan_DH_bilan_primaire"       );
        miBilanCs.setDayDelta("bilan_DH_arrivee_renfort_medical" , "bilan_DH_appel_renfort_medical");
        
        
        
        
        Ext.get("bilan_date_naissance"                           ).dom.setValue(crfIrpUtils.getDate(intervention.dateNaissance));
          
        //Ext.get("bilan_gestes_garrot_heure_pose"                 ).dom.setValue(crfIrpUtils.getTime(intervention.gestesGarrotHeurePose            ));
        //Ext.get("bilan_evac_aggravation_contact_regulation"      ).dom.setValue(crfIrpUtils.getTime(intervention.evacAggravationContactRegulation ));
        
        
        dwr.util.setValue('bilan_gestes_garrot_heure_pose'             , crfIrpUtils.getFullDate(intervention.gestesGarrotHeurePose));
        dwr.util.setValue('bilan_evac_aggravation_contact_regulation'  , crfIrpUtils.getFullDate(intervention.evacAggravationContactRegulation));
      
      
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
        Ext.get("BilanHelper_evac_num_inter_banlieu"             ).dom.setValue(intervention.evacNumInterBanlieu              );  
        Ext.get("bilan_evac_aggravation_nature"                  ).dom.setValue(intervention.evacAggravationNature            ); 
        Ext.get("bilan_evac_par_autre"                           ).dom.setValue(intervention.evacParAutre                     ); 
      
        
        Ext.get("bilan_evac_autre_dest_label"                    ).dom.setValue(intervention.evacAutreDestinationLabel                    );
        Ext.get("bilan_evac_autre_dest_rue"                      ).dom.setValue(intervention.evacAutreDestinationPosition.rue             );
        Ext.get("bilan_evac_autre_dest_code_postal"              ).dom.setValue(intervention.evacAutreDestinationPosition.codePostal      );
        Ext.get("bilan_evac_autre_dest_ville"                    ).dom.setValue(intervention.evacAutreDestinationPosition.ville           );
        Ext.get("bilan_evac_autre_dest_google_coords_lat"        ).dom.setValue(intervention.evacAutreDestinationPosition.googleCoordsLat );
        Ext.get("bilan_evac_autre_dest_google_coords_long"       ).dom.setValue(intervention.evacAutreDestinationPosition.googleCoordsLong);
        
        
        if(intervention.evacAutreDestinationPosition.googleCoordsLat != 0)
          Ext.get('bilanEvacGoogleAdressCheckStatus').dom.src=contextPath+"/img/famfamfam/accept.png";
        else
          Ext.get('bilanEvacGoogleAdressCheckStatus').dom.src=contextPath+"/img/pix.png"
        
        
        Ext.get("bilan_bilan_circonstances"                      ).dom.setValue(intervention.bilanCirconstances               ); 
        Ext.get("bilan_bilan_detresses"                          ).dom.setValue(intervention.bilanDetresses                   ); 
        Ext.get("bilan_bilan_antecedents"                        ).dom.setValue(intervention.bilanAntecedents                 );
        Ext.get("bilan_bilan_traitements"                        ).dom.setValue(intervention.bilanTraitements                 );
        
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
        Ext.get("bilan_evac_sans_suite"                          ).dom.checked=intervention.evacSansSuite                    ;
        
        Ext.get("bilan_evac_aggravation_"+intervention.evacAggravation).dom.checked=true;
        
        Ext.get("bilan_evac_aggravation_pendant_transport"       ).dom.checked=intervention.evacAggravationPendantTransport  ;
        Ext.get("bilan_evac_aggravation_arrive_a_destination"    ).dom.checked=intervention.evacAggravationArriveADestination;
        
        //Fenetre Annulation
        Ext.get("bilan_motif_annulation"       ).dom.setValue(intervention.idMotifAnnulation);
        Ext.get("bilan_annulation_commentaires").dom.setValue(intervention.annulationCommentaires);
        
        
        
        
          
        var ongletToOpen = callMetatData.ongletToOpen;
        if(ongletToOpen == "BilanSecouristInitial")
          Ext.getCmp('monitorInputBilanEditorCenterPanelBilanSecouristeInitial').expand();
        else
          Ext.getCmp('monitorInputBilanEditorCenterPanelIdentite').expand();
        
        try
        {
          Ext.getCmp('monitorInputBilanEditorCenterPanel').expand(true);
          Ext.getCmp('monitorInputBilanHelperEastPanel'  ).expand(true);
          
          
          window.focus();  
        }
        catch(e)
        {
          if(consoleEnabled)
          {
            console.log("Error on exand", e);
          }
        }

      },
      resetBilanForm:function()
      {
      
      },
      setAdresseDomicilToAdressIntervention:function()
      {
        Ext.get("bilan_adresse_victime"    ).dom.setValue(Ext.get("BilanHelper_rue"         ).dom.innerHTML);
        Ext.get("bilan_code_postal_victime").dom.setValue(Ext.get("BilanHelper_code_postal" ).dom.innerHTML);
        Ext.get("bilan_ville_victime"      ).dom.setValue(Ext.get("BilanHelper_ville"       ).dom.innerHTML);
        Ext.get("bilan_pays_victime"       ).dom.setValue("France");
        
        miBilanCs.updateStringField("bilan_adresse_victime"     , 'adresse_victime'     );
        miBilanCs.updateStringField("bilan_code_postal_victime" , 'code_postal_victime' );        
        miBilanCs.updateStringField("bilan_ville_victime"       , 'ville_victime'       );        
        miBilanCs.updateStringField("bilan_pays_victime"        , 'pays_victime'        );
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
        this.commentsAndEvalCiWindow.show('BilanHelper_openCommentsAndEvalCi');

      },
      closeCommentsAndEvalCi:function()
      {
        if(this.commentsAndEvalCiWindow)
        {
          this.commentsAndEvalCiWindow.hide();
        }
      },
      pupilleCheckMyosisMydriaseGauche:function(fieldId)
      {
        if(fieldId=='bilan_pupille_myosis_gauche' && Ext.get('bilan_pupille_myosis_gauche').dom.checked)
          Ext.get('bilan_pupille_mydriase_gauche').dom.checked=false;
        else if(fieldId=='bilan_pupille_mydriase_gauche' && Ext.get('bilan_pupille_mydriase_gauche').dom.checked)
          Ext.get('bilan_pupille_myosis_gauche').dom.checked=false;
          

        crfIrpUtils.fieldSaving('bilanPupilleMyosisGaucheP'  );
        crfIrpUtils.fieldSaving('bilanPupilleMydriaseGaucheP');
        

        MonitorInputBilan.updateDoubleBooleanField(
                                              $('bilan_id_intervention').value,
                                              'pupille_myosis_gauche'                             ,
                                              Ext.get('bilan_pupille_myosis_gauche').dom.checked  ,
                                              'pupille_mydriase_gauche'                           ,
                                              Ext.get('bilan_pupille_mydriase_gauche').dom.checked,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleMyosisGaucheP'   );
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleMydriaseGaucheP' );
                                              });        
          
          
          
      },
      pupilleCheckMyosisMydriaseDroite:function(fieldId)
      {
        if(fieldId=='bilan_pupille_myosis_droite' && Ext.get('bilan_pupille_myosis_droite').dom.checked)
          Ext.get('bilan_pupille_mydriase_droite').dom.checked=false;
        else if(fieldId=='bilan_pupille_mydriase_droite' && Ext.get('bilan_pupille_mydriase_droite').dom.checked)
          Ext.get('bilan_pupille_myosis_droite').dom.checked=false;
          
          
        crfIrpUtils.fieldSaving('bilanPupilleMyosisDroiteP'  );
        crfIrpUtils.fieldSaving('bilanPupilleMydriaseDroiteP');
        

        MonitorInputBilan.updateDoubleBooleanField(
                                              $('bilan_id_intervention').value,
                                              'pupille_myosis_droite'                             ,
                                              Ext.get('bilan_pupille_myosis_droite'  ).dom.checked,
                                              'pupille_mydriase_droite'                           ,
                                              Ext.get('bilan_pupille_mydriase_droite').dom.checked,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleMyosisDroiteP'   );
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleMydriaseDroiteP');
                                              });        
         
          
          
      },
      pupilleCheckPupilleReactive:function(fieldId)
      {
        if(fieldId=='bilan_pupille_reactive' && Ext.get('bilan_pupille_reactive').dom.checked)
          Ext.get('bilan_pupille_non_reactive').dom.checked=false;
        else if(fieldId=='bilan_pupille_non_reactive' && Ext.get('bilan_pupille_non_reactive').dom.checked)
          Ext.get('bilan_pupille_reactive').dom.checked=false;

          

        crfIrpUtils.fieldSaving('bilanPupilleReactiveP'   );
        crfIrpUtils.fieldSaving('bilanPupilleNonReactiveP');
        

        MonitorInputBilan.updateDoubleBooleanField(
                                              $('bilan_id_intervention').value,
                                              'pupille_reactive'                               ,
                                              Ext.get('bilan_pupille_reactive'    ).dom.checked,
                                              'pupille_non_reactive'                           ,
                                              Ext.get('bilan_pupille_non_reactive').dom.checked,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleReactiveP'   );
                                                crfIrpUtils.defaultBackgroundColorForField('bilanPupilleNonReactiveP');
                                              });        
      },
      medicaliseParCheck:function(fieldId)
      {
        if(fieldId=='bilan_transport_medicalisee_ar' && Ext.get('bilan_transport_medicalisee_ar').dom.checked)
          Ext.get('bilan_transport_medicalisee_umh').dom.checked=false;
        else if(fieldId=='bilan_transport_medicalisee_umh' && Ext.get('bilan_transport_medicalisee_umh').dom.checked)
          Ext.get('bilan_transport_medicalisee_ar').dom.checked=false;

        crfIrpUtils.fieldSaving('bilanRenfortMedicaliseeArP');

        

        MonitorInputBilan.updateDoubleBooleanField(
                                              $('bilan_id_intervention').value,
                                              'transport_medicalisee_ar'                                ,
                                              Ext.get('bilan_transport_medicalisee_ar'    ).dom.checked ,
                                              'transport_medicalisee_umh'                               ,
                                              Ext.get('bilan_transport_medicalisee_umh').dom.checked    ,
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField('bilanRenfortMedicaliseeArP');
                                                
                                                if(Ext.get('bilan_transport_medicalisee_ar').dom.checked)
                                                {
                                                  Ext.getCmp('SearchMoyenEvac').updateSearchType(2);
                                                  Ext.get('searchARouUMHDiv').show();
                                                  Ext.get('searchARouUMHDivTitle').update("Recherche d'un Centre de Secours");
                                                }
                                                else if(Ext.get('bilan_transport_medicalisee_umh').dom.checked)
                                                {
                                                  Ext.getCmp('SearchMoyenEvac').updateSearchType(1);
                                                  Ext.get('searchARouUMHDiv').show();
                                                  Ext.get('searchARouUMHDivTitle').update("Recherche d'un Hopital");
                                                }
                                                else
                                                {
                                                  Ext.getCmp('SearchMoyenEvac').updateSearchType(0);
                                                  Ext.get('searchARouUMHDiv').hide();
                                                }
                                              }); 
          
      },

      /************************Gestion*de*l'adresse*****************************************/
      
      updateAddress:function(fieldId, fieldName)
      {
        var rue       =$('bilan_evac_autre_dest_rue'        );
        var codePostal=$('bilan_evac_autre_dest_code_postal');
        var ville     =$('bilan_evac_autre_dest_ville'      );
       
        rue       .value=rue       .value.strip();
        codePostal.value=codePostal.value.strip();
        ville     .value=ville     .value.strip();
      
        
        if(fieldId == 'bilan_evac_autre_dest_code_postal' && !crfIrpUtils.checkZipCode(codePostal.value) && codePostal.value!= '')
        {
          crfIrpUtils.checkZipCodeError(fieldId);
        }
        
        miBilanCs.updateStringField(fieldId, fieldName);
        
        if( ( rue       .value != '' && 
              codePostal.value != '' &&
              ville     .value != ''
            ) 
          &&
          (
              rue       .oldValue != rue       .value ||
              codePostal.oldValue != codePostal.value ||
              ville     .oldValue != ville     .value   
          )
        )
      
        {// valeur non vide et non différente de la précédente valeur
          googleMapAdressResolver.findCoordinatesForAddress(  rue       .value +', '+
                                                              codePostal.value +', '+
                                                              ville     .value,
                                                              miBilanCs.updateAddressReturn,
                                                              miBilanCs.updateAddressErrorReturn);
        }
      },
      updateAddressReturn:function(place)
      {
        var coordinates = place.Point.coordinates;
        //ATTENTION, visiblement, les coordonnées google sont fournies dans l'ordre (Longitude,Latitude) alors qu'ils sont utilisé partout ailleurs dans l'ordre (Latitude,Longitude)
        $('bilan_evac_autre_dest_google_coords_lat' ).value=coordinates[1];
        $('bilan_evac_autre_dest_google_coords_long').value=coordinates[0];
      
        MonitorInputBilan.updateGoogleCoordinates(coordinates[1], coordinates[0], $('bilan_id_intervention').value, miBilanCs.updateAddressSaveReturn);
      
        $('bilanEvacGoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/cog.png";
      },
      updateAddressSaveReturn:function()
      {
        $('bilanEvacGoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/accept.png";
      },
      updateAddressErrorReturn:function(response)
      {
        var icon = response.Status.code=='GoogleMapsUnavailable'?'disconnect':'exclamation';
        $('bilanEvacGoogleAdressCheckStatus').src=contextPath+"/img/famfamfam/"+icon+".png";
      },     
      setDayDelta:function(idField, idPreviousField)
      {
        this.clearDeltaStr(idField);
        
        if( idPreviousField == null || $(idPreviousField).value ==''|| $(idField).value=='')
          return;
          
        if(crfIrpUtils.compareTime($(idPreviousField).value,$(idField).value))
          this.setDayDeltaStr(idField);

      },
      setDayDeltaStr:function(fieldId)
      {
        $(fieldId+'_j1').innerHTML='+1j';
      },
      clearDeltaStr:function(fieldId)
      {
        $(fieldId+'_j1').innerHTML='';
      },
      /************************Méthode D'update******************************/
      updateStringField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = $(fieldId).value;
        if(fieldValue != $(fieldId).oldValue)
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
      /*
       * Utilisez pour corriger le timing de l'intervention (départ, arriver sur place etc...
       * */
      updateTimeField:function(fieldId, fieldName, baseDateCmpId, previousDateFieldId){

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(fieldId);
        fieldValue = $(fieldId).value;
        
        if(crfIrpUtils.checkTimeFormat(fieldValue))
        {
          $(fieldId).value=$(fieldId).oldValue;
          return;
        }
        
        
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          var baseDateStrValue = null;
          
          if(previousDateFieldId != null)
          {
            var previousValue = $(previousDateFieldId).value;
            if(crfIrpUtils.compareTime(previousValue, fieldValue))
            {
              baseDateStrValue = crfIrpUtils.getDate(Ext.getCmp(baseDateCmpId).getValue().add(Date.day,1));
              this.setDayDeltaStr(fieldId);
            }
            else
              baseDateStrValue = crfIrpUtils.getDate(Ext.getCmp(baseDateCmpId).getValue());
          }
          else
            baseDateStrValue = crfIrpUtils.getDate(Ext.getCmp(baseDateCmpId).getValue());
          
          
          fieldValue = baseDateStrValue+' '+fieldValue;
          MonitorInputBilan.updateDateField(
                                              $('bilan_id_intervention').value,
                                              fieldName,
                                              crfIrpUtils.parseDateTime(fieldValue),
                                              function()
                                              {
                                                crfIrpUtils.defaultBackgroundColorForField(fieldId);
                                              });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(fieldId);
      },

      //passer la valeur "null" en tant que string permet de remettre a zéro la valeur dans la base de données (chaine vide n'étant pas sauvegarder pour éviter du traffic inutile)
      //pour date du pose de garot, de contact de la régulation
      updateBilanDateTimeField:function(fieldId, fieldName, isDate)//3eme parametre ne sera pas rempli pour les datetime
      {
        crfIrpUtils.checkField (fieldId+"_div");
        crfIrpUtils.fieldSaving(fieldId+"_div");
        
        var fieldValue = $(fieldId).value;
        if(fieldValue!='' && fieldValue != $(fieldId).oldValue)
        {
          var value = null;
          
          if(fieldValue !='null')
          {
            value = isDate?
                      crfIrpUtils.parseDate    (fieldValue):
                      crfIrpUtils.parseDateTime(fieldValue); 
          }
          else
          {
            $(fieldId).value='';
          }
          
          MonitorInputBilan.updateDateField(
                                                    $('bilan_id_intervention').value, 
                                                    fieldName, 
                                                    value, 
                                                    function()
                                                    {
                                                      crfIrpUtils.defaultBackgroundColorForField(fieldId+"_div");
                                                    });
        }
        else
          crfIrpUtils.defaultBackgroundColorForField(fieldId+"_div");
      },
      updateDateField:function(fieldId, fieldName, objectIdForGraphicalEffect){
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        fieldValue = crfIrpUtils.parseDate($(fieldId).value);
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
      updateBooleanField:function(fieldId, fieldName, objectIdForGraphicalEffect, fieldValue){        
        if(!objectIdForGraphicalEffect)
          objectIdForGraphicalEffect = fieldId;

        crfIrpUtils.checkField (fieldId);
        crfIrpUtils.fieldSaving(objectIdForGraphicalEffect);
        
        if($(fieldId).type=="checkbox")
        {
          fieldValue = $(fieldId).checked;
        }
        else if($(fieldId).type=="radio")
          fieldValue = fieldValue;
        else
          fieldValue = $(fieldId).value;
        
        //pour les checkbox, onFocus n'est pas déclenché quand on décoche la checkbox, du coup, oldValue n'est pas mise a jour.
        //de toute facon, pour une checkbox, si la valeur change, il faut la sauvegarder
        if($(fieldId).type=="checkbox" || fieldValue!=='' && fieldValue != $(fieldId).oldValue)
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

        Ext.getDom(fieldId).value= Ext.getDom(fieldId).value.replace(",",".");
        
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
