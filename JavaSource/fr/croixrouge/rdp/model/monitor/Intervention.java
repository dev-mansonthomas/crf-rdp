package fr.croixrouge.rdp.model.monitor;

import fr.croixrouge.rdp.services.utilities.UtilitiesServiceImpl;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Intervention implements Serializable
{
  private static final long serialVersionUID = -5368504331211025825L;

  public Intervention()
  {
    this.position                     = new Position        ();
    this.evacAutreDestinationPosition = new Position        ();
    this.dispositifTicket             = new DispositifTicket();
  }
  private Position          position                    ;
  private Position          evacAutreDestinationPosition;
  private DispositifTicket  dispositifTicket;
  
  private int     idIntervention                     ;
  private int     idDispositif                       ;
  private int     idRegulation                       ;
  private int     idOrigine                          ;
  private int     idMotif                            ;
  private int     idMotifAnnulation                  ;
  private int     idEtat                             ;
  private int     idRefNumInter                      ;
  private int     ageApproxVictime                   ;
  private int     ventilChiffre                      ;
  private int     ventilSaturationO2                 ;
  private int     circulPoulsChiffre                 ;
  private int     circulTensionRefBasse              ;
  private int     circulTensionRefHaute              ;
  private int     douleur                            ;
  private int     gestesDsaNbChocs                   ;
  private int     gestesInhalationO2LitreMin         ;
  private int     transportMedicaliseeDe             ;
  private int     evacHopitalDestination             ;
  private int     evacAggravationVentilation         ;
  private int     evacAggravationCirculation         ;
  private int     evacAggravationSaturationO2        ;
  private int     evacAggravationDouleur             ;
  private int     evacPar                            ;
  private int     glasgowTotal                       ;
  private int     glasgowOuvertureYeux               ;
  private int     glasgowReponseVerbale              ;
  private int     glasgowReponseMotrice              ;

  private float   circulTensionBasse                 ;
  private float   circulTensionHaute                 ;
  private float   gestesGlycemieGrammeLitre          ;
  private float   gestesTemperature                  ;

  private Date    dhSaisie                           ;
  private Date    dhReception                        ;
  private Date    dhDepart                           ;
  private Date    dhSurPlace                         ;
  private Date    dhBilanPrimaire                    ;
  private Date    dhBilanSecondaire                  ;
  private Date    dhQuitteLesLieux                   ;
  private Date    dhArriveeHopital                   ;
  private Date    dhFinIntervention                  ;
  private Date    dhAppelRenfortMedical              ;
  private Date    dhArriveeRenfortMedical            ;
  private Date    dateNaissance                      ;
  private Date    gestesGarrotHeurePose              ;
  private Date    evacAggravationContactRegulation   ;
  private Date    dhAnnulation                       ;

  private String  annulationCommentaires             ;
  private String  complementMotif                    ;
  private String  interventionBusinessId             ;
  private String  refNumInter                        ;
  private String  nomVictime                         ;
  private String  nomJfVictime                       ;
  private String  prenomVictime                      ;
  private String  lieuNaissance                      ;
  private String  adresseVictime                     ;
  private String  codePostalVictime                  ;
  private String  villeVictime                       ;
  private String  paysVictime                        ;
  private String  personneAPrevenir                  ;
  private String  telPersonneAPrevenir               ;
  private String  effetOuObjetRemis                  ;
  private String  effetOuObjetRemisA                 ;
  private String  nomContactSurPlace                 ;
  private String  coordonneesContact                 ;
  private String  batiment                           ;
  private String  etage                              ;
  private String  porte                              ;
  private String  complementAdresse                  ;
  private String  csPciDuree                         ;
  private String  ventilCommentaire                  ;
  private String  circulPoulsCommentaire             ;
  private String  gestesAutres                       ;
  private String  medecinCivilSurPlace               ;
  private String  evacLaisseSurPlaceDecedeeADispoDe  ;
  private String  evacNumInterBanlieu                ;
  private String  evacAggravationNature              ;
  private String  evacParAutre                       ;
  private String  bilanCirconstances                 ;
  private String  bilanDetresses                     ;
  private String  bilanAntecedents                   ;
  private String  bilanTraitements                   ;
  private String  bilanCommentaires                  ;
  private String  bilanEvaluationCi                  ;
  private String  evacAutreDestinationLabel          ;
  
  
  private boolean hommeVictime                       ;
  private boolean csComa                             ;
  private boolean csPci                              ;
  private boolean csPcSecondaire                     ;
  private boolean csAgitation                        ;
  private boolean csConvulsions                      ;
  private boolean ventilAbsence                      ;
  private boolean ventilSuperficielle                ;
  private boolean ventilRonflement                   ;
  private boolean ventilIrreguliere                  ;
  private boolean ventilTirage                       ;
  private boolean ventilPauses                       ;
  private boolean ventilSueurs                       ;
  private boolean ventilSifflement                   ;
  private boolean ventilCyanose                      ;
  private boolean circulPoulsNonPercu                ;
  private boolean circulPoulsIrregulier              ;
  private boolean circulPoulsFaible                  ;
  private boolean circulConjonctiveDecolorees        ;
  private boolean circulPaleurCutanees               ;
  private boolean circulMarbrure                     ;
  private boolean pupilleReactive                    ;
  private boolean pupilleNonReactive                 ;
  private boolean pupilleMyosisGauche                ;
  private boolean pupilleMyosisDroite                ;
  private boolean pupilleMydriaseGauche              ;
  private boolean pupilleMydriaseDroite              ;
  private boolean pupilleAsymetriques                ;
  private boolean gestesLva                          ;
  private boolean gestesMce                          ;
  private boolean gestesAllongee                     ;
  private boolean gestesPls                          ;
  private boolean gestesPansement                    ;
  private boolean gestesRefroidissement              ;
  private boolean gestesAspiration                   ;
  private boolean gestesDsa                          ;
  private boolean gestesDemiAssis                    ;
  private boolean gestesCollierCervical              ;
  private boolean gestesPointDeCompression           ;
  private boolean gestesProtectionThermique          ;
  private boolean gestesVa                           ;
  private boolean gestesJambesSurelevees             ;
  private boolean gestesAttelle                      ;
  private boolean gestesGarrot                       ;
  private boolean gestesImmobilisationGenerale       ;
  private boolean coordinateurBsppContacte           ;
  private boolean coordinateurSamuContacte           ;
  private boolean transportMedicaliseeAr             ;
  private boolean transportMedicaliseeUmh            ;
  private boolean policeSurPlace                     ;
  private boolean pompierSurPlace                    ;
  private boolean evacLaisseSurPlace                 ;
  private boolean evacLaisseSurPlaceDecedee          ;
  private boolean evacSansSuite                      ;
  private boolean evacRefusDeTransport               ;
  private boolean evacDecharche                      ;
  private boolean evacAggravation                    ;
  private boolean evacAggravationPendantTransport    ;
  private boolean evacAggravationArriveADestination  ;
  
  

  public int getIdIntervention()
  {
    return idIntervention;
  }

  public void setIdIntervention(int idIntervention)
  {
    this.idIntervention = idIntervention;
  }

  public int getIdDispositif()
  {
    return idDispositif;
  }

  public void setIdDispositif(int idDispositif)
  {
    this.idDispositif = idDispositif;
  }

  public int getIdRegulation()
  {
    return idRegulation;
  }

  public void setIdRegulation(int idRegulation)
  {
    this.idRegulation = idRegulation;
  }

  public int getIdOrigine()
  {
    return idOrigine;
  }

  public void setIdOrigine(int idOrigine)
  {
    this.idOrigine = idOrigine;
  }

  public int getIdMotif()
  {
    return idMotif;
  }

  public void setIdMotif(int idMotif)
  {
    this.idMotif = idMotif;
  }

  public int getIdEtat()
  {
    return idEtat;
  }

  public void setIdEtat(int idEtat)
  {
    this.idEtat = idEtat;
  }

  public int getIdRefNumInter()
  {
    return idRefNumInter;
  }

  public void setIdRefNumInter(int idRefNumInter)
  {
    this.idRefNumInter = idRefNumInter;
  }

  public int getAgeApproxVictime()
  {
    return ageApproxVictime;
  }

  public void setAgeApproxVictime(int ageApproxVictime)
  {
    this.ageApproxVictime = ageApproxVictime;
  }

  public int getVentilChiffre()
  {
    return ventilChiffre;
  }

  public void setVentilChiffre(int ventilChiffre)
  {
    this.ventilChiffre = ventilChiffre;
  }

  public int getVentilSaturationO2()
  {
    return ventilSaturationO2;
  }

  public void setVentilSaturationO2(int ventilSaturationO2)
  {
    this.ventilSaturationO2 = ventilSaturationO2;
  }

  public int getCirculPoulsChiffre()
  {
    return circulPoulsChiffre;
  }

  public void setCirculPoulsChiffre(int circulPoulsChiffre)
  {
    this.circulPoulsChiffre = circulPoulsChiffre;
  }

  public int getCirculTensionRefBasse()
  {
    return circulTensionRefBasse;
  }

  public void setCirculTensionRefBasse(int circulTensionRefBasse)
  {
    this.circulTensionRefBasse = circulTensionRefBasse;
  }

  public int getCirculTensionRefHaute()
  {
    return circulTensionRefHaute;
  }

  public void setCirculTensionRefHaute(int circulTensionRefHaute)
  {
    this.circulTensionRefHaute = circulTensionRefHaute;
  }

  public int getDouleur()
  {
    return douleur;
  }

  public void setDouleur(int douleur)
  {
    this.douleur = douleur;
  }

  public int getGestesDsaNbChocs()
  {
    return gestesDsaNbChocs;
  }

  public void setGestesDsaNbChocs(int gestesDsaNbChocs)
  {
    this.gestesDsaNbChocs = gestesDsaNbChocs;
  }

  public int getGestesInhalationO2LitreMin()
  {
    return gestesInhalationO2LitreMin;
  }

  public void setGestesInhalationO2LitreMin(int gestesInhalationO2LitreMin)
  {
    this.gestesInhalationO2LitreMin = gestesInhalationO2LitreMin;
  }

  public int getTransportMedicaliseeDe()
  {
    return transportMedicaliseeDe;
  }

  public void setTransportMedicaliseeDe(int transportMedicaliseeDe)
  {
    this.transportMedicaliseeDe = transportMedicaliseeDe;
  }

  public int getEvacHopitalDestination()
  {
    return evacHopitalDestination;
  }

  public void setEvacHopitalDestination(int evacHopitalDestination)
  {
    this.evacHopitalDestination = evacHopitalDestination;
  }

  public int getEvacAggravationVentilation()
  {
    return evacAggravationVentilation;
  }

  public void setEvacAggravationVentilation(int evacAggravationVentilation)
  {
    this.evacAggravationVentilation = evacAggravationVentilation;
  }

  public int getEvacAggravationCirculation()
  {
    return evacAggravationCirculation;
  }

  public void setEvacAggravationCirculation(int evacAggravationCirculation)
  {
    this.evacAggravationCirculation = evacAggravationCirculation;
  }

  public int getEvacAggravationDouleur()
  {
    return evacAggravationDouleur;
  }

  public void setEvacAggravationDouleur(int evacAggravationDouleur)
  {
    this.evacAggravationDouleur = evacAggravationDouleur;
  }

  public int getEvacPar()
  {
    return evacPar;
  }

  public void setEvacPar(int evacPar)
  {
    this.evacPar = evacPar;
  }

  public float getCirculTensionBasse()
  {
    return circulTensionBasse;
  }

  public void setCirculTensionBasse(float circulTensionBasse)
  {
    this.circulTensionBasse = circulTensionBasse;
  }

  public float getCirculTensionHaute()
  {
    return circulTensionHaute;
  }

  public void setCirculTensionHaute(float circulTensionHaute)
  {
    this.circulTensionHaute = circulTensionHaute;
  }

  public float getGestesGlycemieGrammeLitre()
  {
    return gestesGlycemieGrammeLitre;
  }

  public void setGestesGlycemieGrammeLitre(float gestesGlycemieGrammeLitre)
  {
    this.gestesGlycemieGrammeLitre = gestesGlycemieGrammeLitre;
  }

  public float getGestesTemperature()
  {
    return gestesTemperature;
  }

  public void setGestesTemperature(float gestesTemperature)
  {
    this.gestesTemperature = gestesTemperature;
  }

  public Date getDhSaisie()
  {
    return dhSaisie;
  }

  public void setDhSaisie(Date dhSaisie)
  {
    this.dhSaisie = dhSaisie;
  }

  public Date getDhReception()
  {
    return dhReception;
  }

  public void setDhReception(Date dhReception)
  {
    this.dhReception = dhReception;
  }

  public Date getDhDepart()
  {
    return dhDepart;
  }

  public void setDhDepart(Date dhDepart)
  {
    this.dhDepart = dhDepart;
  }

  public Date getDhSurPlace()
  {
    return dhSurPlace;
  }

  public void setDhSurPlace(Date dhSurPlace)
  {
    this.dhSurPlace = dhSurPlace;
  }

  public Date getDhBilanPrimaire()
  {
    return dhBilanPrimaire;
  }

  public void setDhBilanPrimaire(Date dhBilanPrimaire)
  {
    this.dhBilanPrimaire = dhBilanPrimaire;
  }

  public Date getDhBilanSecondaire()
  {
    return dhBilanSecondaire;
  }

  public void setDhBilanSecondaire(Date dhBilanSecondaire)
  {
    this.dhBilanSecondaire = dhBilanSecondaire;
  }

  public Date getDhQuitteLesLieux()
  {
    return dhQuitteLesLieux;
  }

  public void setDhQuitteLesLieux(Date dhQuitteLesLieux)
  {
    this.dhQuitteLesLieux = dhQuitteLesLieux;
  }

  public Date getDhArriveeHopital()
  {
    return dhArriveeHopital;
  }

  public void setDhArriveeHopital(Date dhArriveeHopital)
  {
    this.dhArriveeHopital = dhArriveeHopital;
  }

  public Date getDhFinIntervention()
  {
    return dhFinIntervention;
  }

  public void setDhFinIntervention(Date dhFinIntervention)
  {
    this.dhFinIntervention = dhFinIntervention;
  }

  public Date getDhAppelRenfortMedical()
  {
    return dhAppelRenfortMedical;
  }

  public void setDhAppelRenfortMedical(Date dhAppelRenfortMedical)
  {
    this.dhAppelRenfortMedical = dhAppelRenfortMedical;
  }

  public Date getDhArriveeRenfortMedical()
  {
    return dhArriveeRenfortMedical;
  }

  public void setDhArriveeRenfortMedical(Date dhArriveeRenfortMedical)
  {
    this.dhArriveeRenfortMedical = dhArriveeRenfortMedical;
  }

  public Date getDateNaissance()
  {
    return dateNaissance;
  }

  public void setDateNaissance(Date dateNaissance)
  {
    this.dateNaissance = dateNaissance;
  }

  public Date getGestesGarrotHeurePose()
  {
    return gestesGarrotHeurePose;
  }

  public void setGestesGarrotHeurePose(Date gestesGarrotHeurePose)
  {
    this.gestesGarrotHeurePose = gestesGarrotHeurePose;
  }

  public Date getEvacAggravationContactRegulation()
  {
    return evacAggravationContactRegulation;
  }

  public void setEvacAggravationContactRegulation(Date evacAggravationContactRegulation)
  {
    this.evacAggravationContactRegulation = evacAggravationContactRegulation;
  }

  public String getComplementMotif()
  {
    return complementMotif;
  }

  public void setComplementMotif(String complementMotif)
  {
    this.complementMotif = complementMotif;
  }

  public String getInterventionBusinessId()
  {
    return interventionBusinessId;
  }

  public void setInterventionBusinessId(String numInter)
  {
    this.interventionBusinessId = numInter;
  }

  public String getRefNumInter()
  {
    return refNumInter;
  }

  public void setRefNumInter(String refNumInter)
  {
    this.refNumInter = refNumInter;
  }

  public String getNomVictime()
  {
    return nomVictime;
  }

  public void setNomVictime(String nomVictime)
  {
    this.nomVictime = nomVictime;
  }

  public String getNomJfVictime()
  {
    return nomJfVictime;
  }

  public void setNomJfVictime(String nomJfVictime)
  {
    this.nomJfVictime = nomJfVictime;
  }

  public String getPrenomVictime()
  {
    return prenomVictime;
  }

  public void setPrenomVictime(String prenomVictime)
  {
    this.prenomVictime = prenomVictime;
  }

  public String getLieuNaissance()
  {
    return lieuNaissance;
  }

  public void setLieuNaissance(String lieuNaissance)
  {
    this.lieuNaissance = lieuNaissance;
  }

  public String getAdresseVictime()
  {
    return adresseVictime;
  }

  public void setAdresseVictime(String adresseVictime)
  {
    this.adresseVictime = adresseVictime;
  }

  public String getCodePostalVictime()
  {
    return codePostalVictime;
  }

  public void setCodePostalVictime(String codePostalVictime)
  {
    this.codePostalVictime = codePostalVictime;
  }

  public String getVilleVictime()
  {
    return villeVictime;
  }

  public void setVilleVictime(String villeVictime)
  {
    this.villeVictime = villeVictime;
  }

  public String getPaysVictime()
  {
    return paysVictime;
  }

  public void setPaysVictime(String paysVictime)
  {
    this.paysVictime = paysVictime;
  }

  public String getPersonneAPrevenir()
  {
    return personneAPrevenir;
  }

  public void setPersonneAPrevenir(String personneAPrevenir)
  {
    this.personneAPrevenir = personneAPrevenir;
  }

  public String getTelPersonneAPrevenir()
  {
    return telPersonneAPrevenir;
  }

  public void setTelPersonneAPrevenir(String telPersonneAPrevenir)
  {
    this.telPersonneAPrevenir = telPersonneAPrevenir;
  }

  public String getEffetOuObjetRemis()
  {
    return effetOuObjetRemis;
  }

  public void setEffetOuObjetRemis(String effetOuObjetRemis)
  {
    this.effetOuObjetRemis = effetOuObjetRemis;
  }

  public String getEffetOuObjetRemisA()
  {
    return effetOuObjetRemisA;
  }

  public void setEffetOuObjetRemisA(String effetOuObjetRemisA)
  {
    this.effetOuObjetRemisA = effetOuObjetRemisA;
  }

  public String getNomContactSurPlace()
  {
    return nomContactSurPlace;
  }

  public void setNomContactSurPlace(String nomContactSurPlace)
  {
    this.nomContactSurPlace = nomContactSurPlace;
  }

  public String getCoordonneesContact()
  {
    return coordonneesContact;
  }

  public void setCoordonneesContact(String coordonneesContact)
  {
    this.coordonneesContact = coordonneesContact;
  }

  public String getBatiment()
  {
    return batiment;
  }

  public void setBatiment(String batiment)
  {
    this.batiment = batiment;
  }

  public String getEtage()
  {
    return etage;
  }

  public void setEtage(String etage)
  {
    this.etage = etage;
  }

  public String getPorte()
  {
    return porte;
  }

  public void setPorte(String porte)
  {
    this.porte = porte;
  }

  public String getComplementAdresse()
  {
    return complementAdresse;
  }

  public void setComplementAdresse(String complementAdresse)
  {
    this.complementAdresse = complementAdresse;
  }

  public String getCsPciDuree()
  {
    return csPciDuree;
  }

  public void setCsPciDuree(String csPciDuree)
  {
    this.csPciDuree = csPciDuree;
  }

  public String getVentilCommentaire()
  {
    return ventilCommentaire;
  }

  public void setVentilCommentaire(String ventilCommentaire)
  {
    this.ventilCommentaire = ventilCommentaire;
  }

  public String getCirculPoulsCommentaire()
  {
    return circulPoulsCommentaire;
  }

  public void setCirculPoulsCommentaire(String circulPoulsCommentaire)
  {
    this.circulPoulsCommentaire = circulPoulsCommentaire;
  }

  public String getGestesAutres()
  {
    return gestesAutres;
  }

  public void setGestesAutres(String gestesAutres)
  {
    this.gestesAutres = gestesAutres;
  }

  public String getMedecinCivilSurPlace()
  {
    return medecinCivilSurPlace;
  }

  public void setMedecinCivilSurPlace(String medecinCivilSurPlace)
  {
    this.medecinCivilSurPlace = medecinCivilSurPlace;
  }

  public String getEvacLaisseSurPlaceDecedeeADispoDe()
  {
    return evacLaisseSurPlaceDecedeeADispoDe;
  }

  public void setEvacLaisseSurPlaceDecedeeADispoDe(String evacLaisseSurPlaceDecedeeADispoDe)
  {
    this.evacLaisseSurPlaceDecedeeADispoDe = evacLaisseSurPlaceDecedeeADispoDe;
  }

  public String getEvacNumInterBanlieu()
  {
    return evacNumInterBanlieu;
  }

  public void setEvacNumInterBanlieu(String evacNumInterBanlieu)
  {
    this.evacNumInterBanlieu = evacNumInterBanlieu;
  }

  public String getEvacAggravationNature()
  {
    return evacAggravationNature;
  }

  public void setEvacAggravationNature(String evacAggravationNature)
  {
    this.evacAggravationNature = evacAggravationNature;
  }

  public String getEvacParAutre()
  {
    return evacParAutre;
  }

  public void setEvacParAutre(String evacParAutre)
  {
    this.evacParAutre = evacParAutre;
  }

  public String getBilanCirconstances()
  {
    return bilanCirconstances;
  }

  public void setBilanCirconstances(String bilanCirconstances)
  {
    this.bilanCirconstances = bilanCirconstances;
  }

  public String getBilanDetresses()
  {
    return bilanDetresses;
  }

  public void setBilanDetresses(String bilanDetresses)
  {
    this.bilanDetresses = bilanDetresses;
  }

  public String getBilanAntecedents()
  {
    return bilanAntecedents;
  }

  public void setBilanAntecedents(String bilanAntecedents)
  {
    this.bilanAntecedents = bilanAntecedents;
  }

  public String getBilanCommentaires()
  {
    return bilanCommentaires;
  }

  public void setBilanCommentaires(String bilanCommentaires)
  {
    this.bilanCommentaires = bilanCommentaires;
  }

  public String getBilanEvaluationCi()
  {
    return bilanEvaluationCi;
  }

  public void setBilanEvaluationCi(String bilanEvaluationCi)
  {
    this.bilanEvaluationCi = bilanEvaluationCi;
  }

  public boolean isHommeVictime()
  {
    return hommeVictime;
  }

  public void setHommeVictime(boolean hommeVictime)
  {
    this.hommeVictime = hommeVictime;
  }

  public boolean isCsComa()
  {
    return csComa;
  }

  public void setCsComa(boolean csComa)
  {
    this.csComa = csComa;
  }

  public boolean isCsPci()
  {
    return csPci;
  }

  public void setCsPci(boolean csPci)
  {
    this.csPci = csPci;
  }

  public boolean isCsPcSecondaire()
  {
    return csPcSecondaire;
  }

  public void setCsPcSecondaire(boolean csPcSecondaire)
  {
    this.csPcSecondaire = csPcSecondaire;
  }

  public boolean isCsAgitation()
  {
    return csAgitation;
  }

  public void setCsAgitation(boolean csAgitation)
  {
    this.csAgitation = csAgitation;
  }

  public boolean isCsConvulsions()
  {
    return csConvulsions;
  }

  public void setCsConvulsions(boolean csConvulsions)
  {
    this.csConvulsions = csConvulsions;
  }

  public boolean isVentilAbsence()
  {
    return ventilAbsence;
  }

  public void setVentilAbsence(boolean ventilAbsence)
  {
    this.ventilAbsence = ventilAbsence;
  }

  public boolean isVentilSuperficielle()
  {
    return ventilSuperficielle;
  }

  public void setVentilSuperficielle(boolean ventilSuperficielle)
  {
    this.ventilSuperficielle = ventilSuperficielle;
  }

  public boolean isVentilRonflement()
  {
    return ventilRonflement;
  }

  public void setVentilRonflement(boolean ventilRonflement)
  {
    this.ventilRonflement = ventilRonflement;
  }

  public boolean isVentilIrreguliere()
  {
    return ventilIrreguliere;
  }

  public void setVentilIrreguliere(boolean ventilIrreguliere)
  {
    this.ventilIrreguliere = ventilIrreguliere;
  }

  public boolean isVentilTirage()
  {
    return ventilTirage;
  }

  public void setVentilTirage(boolean ventilTirage)
  {
    this.ventilTirage = ventilTirage;
  }

  public boolean isVentilPauses()
  {
    return ventilPauses;
  }

  public void setVentilPauses(boolean ventilPauses)
  {
    this.ventilPauses = ventilPauses;
  }

  public boolean isVentilSueurs()
  {
    return ventilSueurs;
  }

  public void setVentilSueurs(boolean ventilSueurs)
  {
    this.ventilSueurs = ventilSueurs;
  }

  public boolean isVentilSifflement()
  {
    return ventilSifflement;
  }

  public void setVentilSifflement(boolean ventilSifflement)
  {
    this.ventilSifflement = ventilSifflement;
  }

  public boolean isVentilCyanose()
  {
    return ventilCyanose;
  }

  public void setVentilCyanose(boolean ventilCyanose)
  {
    this.ventilCyanose = ventilCyanose;
  }

  public boolean isCirculPoulsNonPercu()
  {
    return circulPoulsNonPercu;
  }

  public void setCirculPoulsNonPercu(boolean circulPoulsNonPercu)
  {
    this.circulPoulsNonPercu = circulPoulsNonPercu;
  }

  public boolean isCirculPoulsIrregulier()
  {
    return circulPoulsIrregulier;
  }

  public void setCirculPoulsIrregulier(boolean circulPoulsIrregulier)
  {
    this.circulPoulsIrregulier = circulPoulsIrregulier;
  }

  public boolean isCirculPoulsFaible()
  {
    return circulPoulsFaible;
  }

  public void setCirculPoulsFaible(boolean circulPoulsFaible)
  {
    this.circulPoulsFaible = circulPoulsFaible;
  }

  public boolean isCirculConjonctiveDecolorees()
  {
    return circulConjonctiveDecolorees;
  }

  public void setCirculConjonctiveDecolorees(boolean circulConjonctiveDecolorees)
  {
    this.circulConjonctiveDecolorees = circulConjonctiveDecolorees;
  }

  public boolean isCirculPaleurCutanees()
  {
    return circulPaleurCutanees;
  }

  public void setCirculPaleurCutanees(boolean circulPaleurCutanees)
  {
    this.circulPaleurCutanees = circulPaleurCutanees;
  }

  public boolean isCirculMarbrure()
  {
    return circulMarbrure;
  }

  public void setCirculMarbrure(boolean circulMarbrure)
  {
    this.circulMarbrure = circulMarbrure;
  }

  public boolean isPupilleReactive()
  {
    return pupilleReactive;
  }

  public void setPupilleReactive(boolean pupilleReactive)
  {
    this.pupilleReactive = pupilleReactive;
  }

  public boolean isPupilleNonReactive()
  {
    return pupilleNonReactive;
  }

  public void setPupilleNonReactive(boolean pupilleNonReactive)
  {
    this.pupilleNonReactive = pupilleNonReactive;
  }

  public boolean isPupilleMyosisGauche()
  {
    return pupilleMyosisGauche;
  }

  public void setPupilleMyosisGauche(boolean pupilleMyosisGauche)
  {
    this.pupilleMyosisGauche = pupilleMyosisGauche;
  }

  public boolean isPupilleMyosisDroite()
  {
    return pupilleMyosisDroite;
  }

  public void setPupilleMyosisDroite(boolean pupilleMyosisDroite)
  {
    this.pupilleMyosisDroite = pupilleMyosisDroite;
  }

  public boolean isPupilleMydriaseGauche()
  {
    return pupilleMydriaseGauche;
  }

  public void setPupilleMydriaseGauche(boolean pupilleMydriaseGauche)
  {
    this.pupilleMydriaseGauche = pupilleMydriaseGauche;
  }

  public boolean isPupilleMydriaseDroite()
  {
    return pupilleMydriaseDroite;
  }

  public void setPupilleMydriaseDroite(boolean pupilleMydriaseDroite)
  {
    this.pupilleMydriaseDroite = pupilleMydriaseDroite;
  }

  public boolean isPupilleAsymetriques()
  {
    return pupilleAsymetriques;
  }

  public void setPupilleAsymetriques(boolean pupilleAsymetriques)
  {
    this.pupilleAsymetriques = pupilleAsymetriques;
  }

  public boolean isGestesLva()
  {
    return gestesLva;
  }

  public void setGestesLva(boolean gestesLva)
  {
    this.gestesLva = gestesLva;
  }

  public boolean isGestesMce()
  {
    return gestesMce;
  }

  public void setGestesMce(boolean gestesMce)
  {
    this.gestesMce = gestesMce;
  }

  public boolean isGestesAllongee()
  {
    return gestesAllongee;
  }

  public void setGestesAllongee(boolean gestesAllongee)
  {
    this.gestesAllongee = gestesAllongee;
  }

  public boolean isGestesPls()
  {
    return gestesPls;
  }

  public void setGestesPls(boolean gestesPls)
  {
    this.gestesPls = gestesPls;
  }

  public boolean isGestesPansement()
  {
    return gestesPansement;
  }

  public void setGestesPansement(boolean gestesPansement)
  {
    this.gestesPansement = gestesPansement;
  }

  public boolean isGestesRefroidissement()
  {
    return gestesRefroidissement;
  }

  public void setGestesRefroidissement(boolean gestesRefroidissement)
  {
    this.gestesRefroidissement = gestesRefroidissement;
  }

  public boolean isGestesAspiration()
  {
    return gestesAspiration;
  }

  public void setGestesAspiration(boolean gestesAspiration)
  {
    this.gestesAspiration = gestesAspiration;
  }

  public boolean isGestesDsa()
  {
    return gestesDsa;
  }

  public void setGestesDsa(boolean gestesDsa)
  {
    this.gestesDsa = gestesDsa;
  }

  public boolean isGestesDemiAssis()
  {
    return gestesDemiAssis;
  }

  public void setGestesDemiAssis(boolean gestesDemiAssis)
  {
    this.gestesDemiAssis = gestesDemiAssis;
  }

  public boolean isGestesCollierCervical()
  {
    return gestesCollierCervical;
  }

  public void setGestesCollierCervical(boolean gestesCollierCervical)
  {
    this.gestesCollierCervical = gestesCollierCervical;
  }

  public boolean isGestesPointDeCompression()
  {
    return gestesPointDeCompression;
  }

  public void setGestesPointDeCompression(boolean gestesPointDeCompression)
  {
    this.gestesPointDeCompression = gestesPointDeCompression;
  }

  public boolean isGestesProtectionThermique()
  {
    return gestesProtectionThermique;
  }

  public void setGestesProtectionThermique(boolean gestesProtectionThermique)
  {
    this.gestesProtectionThermique = gestesProtectionThermique;
  }

  public boolean isGestesVa()
  {
    return gestesVa;
  }

  public void setGestesVa(boolean gestesVa)
  {
    this.gestesVa = gestesVa;
  }

  public boolean isGestesJambesSurelevees()
  {
    return gestesJambesSurelevees;
  }

  public void setGestesJambesSurelevees(boolean gestesJambesSurelevees)
  {
    this.gestesJambesSurelevees = gestesJambesSurelevees;
  }

  public boolean isGestesAttelle()
  {
    return gestesAttelle;
  }

  public void setGestesAttelle(boolean gestesAttelle)
  {
    this.gestesAttelle = gestesAttelle;
  }

  public boolean isGestesGarrot()
  {
    return gestesGarrot;
  }

  public void setGestesGarrot(boolean gestesGarrot)
  {
    this.gestesGarrot = gestesGarrot;
  }

  public boolean isGestesImmobilisationGenerale()
  {
    return gestesImmobilisationGenerale;
  }

  public void setGestesImmobilisationGenerale(boolean gestesImmobilisationGenerale)
  {
    this.gestesImmobilisationGenerale = gestesImmobilisationGenerale;
  }

  public boolean isCoordinateurBsppContacte()
  {
    return coordinateurBsppContacte;
  }

  public void setCoordinateurBsppContacte(boolean coordinateurBsppContacte)
  {
    this.coordinateurBsppContacte = coordinateurBsppContacte;
  }

  public boolean isCoordinateurSamuContacte()
  {
    return coordinateurSamuContacte;
  }

  public void setCoordinateurSamuContacte(boolean coordinateurSamuContacte)
  {
    this.coordinateurSamuContacte = coordinateurSamuContacte;
  }

  public boolean isTransportMedicaliseeAr()
  {
    return transportMedicaliseeAr;
  }

  public void setTransportMedicaliseeAr(boolean transportMedicaliseeAr)
  {
    this.transportMedicaliseeAr = transportMedicaliseeAr;
  }

  public boolean isTransportMedicaliseeUmh()
  {
    return transportMedicaliseeUmh;
  }

  public void setTransportMedicaliseeUmh(boolean transportMedicaliseeUmh)
  {
    this.transportMedicaliseeUmh = transportMedicaliseeUmh;
  }

  public boolean isPoliceSurPlace()
  {
    return policeSurPlace;
  }

  public void setPoliceSurPlace(boolean policeSurPlace)
  {
    this.policeSurPlace = policeSurPlace;
  }

  public boolean isPompierSurPlace()
  {
    return pompierSurPlace;
  }

  public void setPompierSurPlace(boolean pompierSurPlace)
  {
    this.pompierSurPlace = pompierSurPlace;
  }

  public boolean isEvacLaisseSurPlace()
  {
    return evacLaisseSurPlace;
  }

  public void setEvacLaisseSurPlace(boolean evacLaisseSurPlace)
  {
    this.evacLaisseSurPlace = evacLaisseSurPlace;
  }

  public boolean isEvacLaisseSurPlaceDecedee()
  {
    return evacLaisseSurPlaceDecedee;
  }

  public void setEvacLaisseSurPlaceDecedee(boolean evacLaisseSurPlaceDecedee)
  {
    this.evacLaisseSurPlaceDecedee = evacLaisseSurPlaceDecedee;
  }

  public boolean isEvacRefusDeTransport()
  {
    return evacRefusDeTransport;
  }

  public void setEvacRefusDeTransport(boolean evacRefusDeTransport)
  {
    this.evacRefusDeTransport = evacRefusDeTransport;
  }

  public boolean isEvacDecharche()
  {
    return evacDecharche;
  }

  public void setEvacDecharche(boolean evacDecharche)
  {
    this.evacDecharche = evacDecharche;
  }

  public boolean isEvacAggravation()
  {
    return evacAggravation;
  }

  public void setEvacAggravation(boolean evacAggravation)
  {
    this.evacAggravation = evacAggravation;
  }

  public boolean isEvacAggravationPendantTransport()
  {
    return evacAggravationPendantTransport;
  }

  public void setEvacAggravationPendantTransport(boolean evacAggravationPendantTransport)
  {
    this.evacAggravationPendantTransport = evacAggravationPendantTransport;
  }

  public boolean isEvacAggravationArriveADestination()
  {
    return evacAggravationArriveADestination;
  }

  public void setEvacAggravationArriveADestination(boolean evacAggravationArriveADestination)
  {
    this.evacAggravationArriveADestination = evacAggravationArriveADestination;
  }

  public Position getPosition()
  {
    return position;
  }

  public void setPosition(Position position)
  {
    this.position = position;
  }

  public DispositifTicket getDispositifTicket()
  {
    return dispositifTicket;
  }

  public void setDispositifTicket(DispositifTicket dispositifTicket)
  {
    this.dispositifTicket = dispositifTicket;
  }

  public Position getEvacAutreDestinationPosition()
  {
    return evacAutreDestinationPosition;
  }

  public String getEvacAutreDestinationLabel()
  {
    return evacAutreDestinationLabel;
  }

  public void setEvacAutreDestinationPosition(Position evacAutreDestinationPosition)
  {
    this.evacAutreDestinationPosition = evacAutreDestinationPosition;
  }

  public void setEvacAutreDestinationLabel(String evacAutreDestinationLabel)
  {
    this.evacAutreDestinationLabel = evacAutreDestinationLabel;
  }

  public int getIdMotifAnnulation()
  {
    return idMotifAnnulation;
  }

  public void setIdMotifAnnulation(int idMotifAnnulation)
  {
    this.idMotifAnnulation = idMotifAnnulation;
  }

  public String getAnnulationCommentaires()
  {
    return annulationCommentaires;
  }

  public void setAnnulationCommentaires(String annulationCommentaires)
  {
    this.annulationCommentaires = annulationCommentaires;
  }

  public int getEvacAggravationSaturationO2()
  {
    return evacAggravationSaturationO2;
  }

  public void setEvacAggravationSaturationO2(int evacAggravationSaturationO2)
  {
    this.evacAggravationSaturationO2 = evacAggravationSaturationO2;
  }

  public int getGlasgowTotal()
  {
    return glasgowTotal;
  }

  public void setGlasgowTotal(int glasgowTotal)
  {
    this.glasgowTotal = glasgowTotal;
  }

  public int getGlasgowOuvertureYeux()
  {
    return glasgowOuvertureYeux;
  }

  public void setGlasgowOuvertureYeux(int glasgowOuvertureYeux)
  {
    this.glasgowOuvertureYeux = glasgowOuvertureYeux;
  }

  public int getGlasgowReponseVerbale()
  {
    return glasgowReponseVerbale;
  }

  public void setGlasgowReponseVerbale(int glasgowReponseVerbale)
  {
    this.glasgowReponseVerbale = glasgowReponseVerbale;
  }

  public int getGlasgowReponseMotrice()
  {
    return glasgowReponseMotrice;
  }

  public void setGlasgowReponseMotrice(int glasgowReponseMotrice)
  {
    this.glasgowReponseMotrice = glasgowReponseMotrice;
  }

  public String getBilanTraitements()
  {
    return bilanTraitements;
  }

  public void setBilanTraitements(String bilanTraitements)
  {
    this.bilanTraitements = bilanTraitements;
  }

  public boolean isEvacSansSuite()
  {
    return evacSansSuite;
  }

  public void setEvacSansSuite(boolean evacSansSuite)
  {
    this.evacSansSuite = evacSansSuite;
  }

  public Date getDhAnnulation()
  {
    return dhAnnulation;
  }

  public void setDhAnnulation(Date dhAnnulation)
  {
    this.dhAnnulation = dhAnnulation;
  }

  @Override
  public String toString()
  {
    
    SimpleDateFormat dateFormat = new SimpleDateFormat(UtilitiesServiceImpl.dateTimeMSSDF);
    
    StringBuilder builder = new StringBuilder();
    builder.append("Intervention [position=");
    builder.append(position);
    builder.append(", evacAutreDestinationPosition=");
    builder.append(evacAutreDestinationPosition);
    builder.append(", dispositifTicket=");
    builder.append(dispositifTicket);
    builder.append(", idIntervention=");
    builder.append(idIntervention);
    builder.append(", idDispositif=");
    builder.append(idDispositif);
    builder.append(", idRegulation=");
    builder.append(idRegulation);
    builder.append(", idOrigine=");
    builder.append(idOrigine);
    builder.append(", idMotif=");
    builder.append(idMotif);
    builder.append(", idMotifAnnulation=");
    builder.append(idMotifAnnulation);
    builder.append(", idEtat=");
    builder.append(idEtat);
    builder.append(", idRefNumInter=");
    builder.append(idRefNumInter);
    builder.append(", ageApproxVictime=");
    builder.append(ageApproxVictime);
    builder.append(", ventilChiffre=");
    builder.append(ventilChiffre);
    builder.append(", ventilSaturationO2=");
    builder.append(ventilSaturationO2);
    builder.append(", circulPoulsChiffre=");
    builder.append(circulPoulsChiffre);
    builder.append(", circulTensionRefBasse=");
    builder.append(circulTensionRefBasse);
    builder.append(", circulTensionRefHaute=");
    builder.append(circulTensionRefHaute);
    builder.append(", douleur=");
    builder.append(douleur);
    builder.append(", gestesDsaNbChocs=");
    builder.append(gestesDsaNbChocs);
    builder.append(", gestesInhalationO2LitreMin=");
    builder.append(gestesInhalationO2LitreMin);
    builder.append(", transportMedicaliseeDe=");
    builder.append(transportMedicaliseeDe);
    builder.append(", evacHopitalDestination=");
    builder.append(evacHopitalDestination);
    builder.append(", evacAggravationVentilation=");
    builder.append(evacAggravationVentilation);
    builder.append(", evacAggravationCirculation=");
    builder.append(evacAggravationCirculation);
    builder.append(", evacAggravationSaturationO2=");
    builder.append(evacAggravationSaturationO2);
    builder.append(", evacAggravationDouleur=");
    builder.append(evacAggravationDouleur);
    builder.append(", evacPar=");
    builder.append(evacPar);
    builder.append(", glasgowTotal=");
    builder.append(glasgowTotal);
    builder.append(", glasgowOuvertureYeux=");
    builder.append(glasgowOuvertureYeux);
    builder.append(", glasgowReponseVerbale=");
    builder.append(glasgowReponseVerbale);
    builder.append(", glasgowReponseMotrice=");
    builder.append(glasgowReponseMotrice);
    builder.append(", circulTensionBasse=");
    builder.append(circulTensionBasse);
    builder.append(", circulTensionHaute=");
    builder.append(circulTensionHaute);
    builder.append(", gestesGlycemieGrammeLitre=");
    builder.append(gestesGlycemieGrammeLitre);
    builder.append(", gestesTemperature=");
    builder.append(gestesTemperature);
    builder.append(", dhSaisie=");
    builder.append(dateFormat.format(dhSaisie));
    builder.append(", dhReception=");
    builder.append(dateFormat.format(dhReception));
    builder.append(", dhDepart=");
    builder.append(dateFormat.format(dhDepart));
    builder.append(", dhSurPlace=");
    builder.append(dateFormat.format(dhSurPlace));
    builder.append(", dhBilanPrimaire=");
    builder.append(dateFormat.format(dhBilanPrimaire));
    builder.append(", dhBilanSecondaire=");
    builder.append(dateFormat.format(dhBilanSecondaire));
    builder.append(", dhQuitteLesLieux=");
    builder.append(dateFormat.format(dhQuitteLesLieux));
    builder.append(", dhArriveeHopital=");
    builder.append(dateFormat.format(dhArriveeHopital));
    builder.append(", dhFinIntervention=");
    builder.append(dateFormat.format(dhFinIntervention));
    builder.append(", dhAppelRenfortMedical=");
    builder.append(dateFormat.format(dhAppelRenfortMedical));
    builder.append(", dhArriveeRenfortMedical=");
    builder.append(dateFormat.format(dhArriveeRenfortMedical));
    builder.append(", dateNaissance=");
    builder.append(dateFormat.format(dateNaissance));
    builder.append(", gestesGarrotHeurePose=");
    builder.append(dateFormat.format(gestesGarrotHeurePose));
    builder.append(", evacAggravationContactRegulation=");
    builder.append(dateFormat.format(evacAggravationContactRegulation));
    builder.append(", dhAnnulation=");
    builder.append(dateFormat.format(dhAnnulation));
    builder.append(", annulationCommentaires=");
    builder.append(annulationCommentaires);
    builder.append(", complementMotif=");
    builder.append(complementMotif);
    builder.append(", interventionBusinessId=");
    builder.append(interventionBusinessId);
    builder.append(", refNumInter=");
    builder.append(refNumInter);
    builder.append(", nomVictime=");
    builder.append(nomVictime);
    builder.append(", nomJfVictime=");
    builder.append(nomJfVictime);
    builder.append(", prenomVictime=");
    builder.append(prenomVictime);
    builder.append(", lieuNaissance=");
    builder.append(lieuNaissance);
    builder.append(", adresseVictime=");
    builder.append(adresseVictime);
    builder.append(", codePostalVictime=");
    builder.append(codePostalVictime);
    builder.append(", villeVictime=");
    builder.append(villeVictime);
    builder.append(", paysVictime=");
    builder.append(paysVictime);
    builder.append(", personneAPrevenir=");
    builder.append(personneAPrevenir);
    builder.append(", telPersonneAPrevenir=");
    builder.append(telPersonneAPrevenir);
    builder.append(", effetOuObjetRemis=");
    builder.append(effetOuObjetRemis);
    builder.append(", effetOuObjetRemisA=");
    builder.append(effetOuObjetRemisA);
    builder.append(", nomContactSurPlace=");
    builder.append(nomContactSurPlace);
    builder.append(", coordonneesContact=");
    builder.append(coordonneesContact);
    builder.append(", batiment=");
    builder.append(batiment);
    builder.append(", etage=");
    builder.append(etage);
    builder.append(", porte=");
    builder.append(porte);
    builder.append(", complementAdresse=");
    builder.append(complementAdresse);
    builder.append(", csPciDuree=");
    builder.append(csPciDuree);
    builder.append(", ventilCommentaire=");
    builder.append(ventilCommentaire);
    builder.append(", circulPoulsCommentaire=");
    builder.append(circulPoulsCommentaire);
    builder.append(", gestesAutres=");
    builder.append(gestesAutres);
    builder.append(", medecinCivilSurPlace=");
    builder.append(medecinCivilSurPlace);
    builder.append(", evacLaisseSurPlaceDecedeeADispoDe=");
    builder.append(evacLaisseSurPlaceDecedeeADispoDe);
    builder.append(", evacNumInterBanlieu=");
    builder.append(evacNumInterBanlieu);
    builder.append(", evacAggravationNature=");
    builder.append(evacAggravationNature);
    builder.append(", evacParAutre=");
    builder.append(evacParAutre);
    builder.append(", bilanCirconstances=");
    builder.append(bilanCirconstances);
    builder.append(", bilanDetresses=");
    builder.append(bilanDetresses);
    builder.append(", bilanAntecedents=");
    builder.append(bilanAntecedents);
    builder.append(", bilanTraitements=");
    builder.append(bilanTraitements);
    builder.append(", bilanCommentaires=");
    builder.append(bilanCommentaires);
    builder.append(", bilanEvaluationCi=");
    builder.append(bilanEvaluationCi);
    builder.append(", evacAutreDestinationLabel=");
    builder.append(evacAutreDestinationLabel);
    builder.append(", hommeVictime=");
    builder.append(hommeVictime);
    builder.append(", csComa=");
    builder.append(csComa);
    builder.append(", csPci=");
    builder.append(csPci);
    builder.append(", csPcSecondaire=");
    builder.append(csPcSecondaire);
    builder.append(", csAgitation=");
    builder.append(csAgitation);
    builder.append(", csConvulsions=");
    builder.append(csConvulsions);
    builder.append(", ventilAbsence=");
    builder.append(ventilAbsence);
    builder.append(", ventilSuperficielle=");
    builder.append(ventilSuperficielle);
    builder.append(", ventilRonflement=");
    builder.append(ventilRonflement);
    builder.append(", ventilIrreguliere=");
    builder.append(ventilIrreguliere);
    builder.append(", ventilTirage=");
    builder.append(ventilTirage);
    builder.append(", ventilPauses=");
    builder.append(ventilPauses);
    builder.append(", ventilSueurs=");
    builder.append(ventilSueurs);
    builder.append(", ventilSifflement=");
    builder.append(ventilSifflement);
    builder.append(", ventilCyanose=");
    builder.append(ventilCyanose);
    builder.append(", circulPoulsNonPercu=");
    builder.append(circulPoulsNonPercu);
    builder.append(", circulPoulsIrregulier=");
    builder.append(circulPoulsIrregulier);
    builder.append(", circulPoulsFaible=");
    builder.append(circulPoulsFaible);
    builder.append(", circulConjonctiveDecolorees=");
    builder.append(circulConjonctiveDecolorees);
    builder.append(", circulPaleurCutanees=");
    builder.append(circulPaleurCutanees);
    builder.append(", circulMarbrure=");
    builder.append(circulMarbrure);
    builder.append(", pupilleReactive=");
    builder.append(pupilleReactive);
    builder.append(", pupilleNonReactive=");
    builder.append(pupilleNonReactive);
    builder.append(", pupilleMyosisGauche=");
    builder.append(pupilleMyosisGauche);
    builder.append(", pupilleMyosisDroite=");
    builder.append(pupilleMyosisDroite);
    builder.append(", pupilleMydriaseGauche=");
    builder.append(pupilleMydriaseGauche);
    builder.append(", pupilleMydriaseDroite=");
    builder.append(pupilleMydriaseDroite);
    builder.append(", pupilleAsymetriques=");
    builder.append(pupilleAsymetriques);
    builder.append(", gestesLva=");
    builder.append(gestesLva);
    builder.append(", gestesMce=");
    builder.append(gestesMce);
    builder.append(", gestesAllongee=");
    builder.append(gestesAllongee);
    builder.append(", gestesPls=");
    builder.append(gestesPls);
    builder.append(", gestesPansement=");
    builder.append(gestesPansement);
    builder.append(", gestesRefroidissement=");
    builder.append(gestesRefroidissement);
    builder.append(", gestesAspiration=");
    builder.append(gestesAspiration);
    builder.append(", gestesDsa=");
    builder.append(gestesDsa);
    builder.append(", gestesDemiAssis=");
    builder.append(gestesDemiAssis);
    builder.append(", gestesCollierCervical=");
    builder.append(gestesCollierCervical);
    builder.append(", gestesPointDeCompression=");
    builder.append(gestesPointDeCompression);
    builder.append(", gestesProtectionThermique=");
    builder.append(gestesProtectionThermique);
    builder.append(", gestesVa=");
    builder.append(gestesVa);
    builder.append(", gestesJambesSurelevees=");
    builder.append(gestesJambesSurelevees);
    builder.append(", gestesAttelle=");
    builder.append(gestesAttelle);
    builder.append(", gestesGarrot=");
    builder.append(gestesGarrot);
    builder.append(", gestesImmobilisationGenerale=");
    builder.append(gestesImmobilisationGenerale);
    builder.append(", coordinateurBsppContacte=");
    builder.append(coordinateurBsppContacte);
    builder.append(", coordinateurSamuContacte=");
    builder.append(coordinateurSamuContacte);
    builder.append(", transportMedicaliseeAr=");
    builder.append(transportMedicaliseeAr);
    builder.append(", transportMedicaliseeUmh=");
    builder.append(transportMedicaliseeUmh);
    builder.append(", policeSurPlace=");
    builder.append(policeSurPlace);
    builder.append(", pompierSurPlace=");
    builder.append(pompierSurPlace);
    builder.append(", evacLaisseSurPlace=");
    builder.append(evacLaisseSurPlace);
    builder.append(", evacLaisseSurPlaceDecedee=");
    builder.append(evacLaisseSurPlaceDecedee);
    builder.append(", evacSansSuite=");
    builder.append(evacSansSuite);
    builder.append(", evacRefusDeTransport=");
    builder.append(evacRefusDeTransport);
    builder.append(", evacDecharche=");
    builder.append(evacDecharche);
    builder.append(", evacAggravation=");
    builder.append(evacAggravation);
    builder.append(", evacAggravationPendantTransport=");
    builder.append(evacAggravationPendantTransport);
    builder.append(", evacAggravationArriveADestination=");
    builder.append(evacAggravationArriveADestination);
    builder.append("]");
    return builder.toString();
  }
}
