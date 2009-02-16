package fr.croixrouge.irp.services.radioService;

import java.util.HashMap;

public class RadioServiceImpl implements RadioService
{
  private final static HashMap<String, String> alphabetRadio = new HashMap<String,String>(){
    {
      this.put("A","ALPHA");
      this.put("B","BRAVO");
      this.put("C","CHARLIE");
      this.put("D","DELTA");
      this.put("E","ECHO");
      this.put("F","FOXTROT");
      this.put("G","GOLF");
      this.put("H","HOTEL");
      this.put("I","INDIA");
      this.put("J","JULIET");
      this.put("K","KILO");
      this.put("L","LIMA");
      this.put("M","MIKE");
      this.put("N","NOVEMBER");
      this.put("O","OSCAR");
      this.put("P","PAPA");
      this.put("Q","QUEBEC");
      this.put("R","ROMEO");
      this.put("S","SIERRA");
      this.put("T","TANGO");
      this.put("U","UNIFORM");
      this.put("V","VICTOR");
      this.put("W","WHISKY");
      this.put("X","X-RAY");
      this.put("Y","YANKEE");
      this.put("Z","ZULU");
      this.put(" "," ");
  }};
  
  public String toRadio(String str)
  {
    str = str.replaceAll("é|è|ê|ë", "e");
    str = str.replaceAll("à|â|ä"  , "a");
    str = str.replaceAll("ç"      , "c");
    str = str.replaceAll("ù"      , "u");
    str = str.replaceAll("î|ï"    , "i");
    StringBuilder stringBuilder = new StringBuilder();
    
    
    String tmpString = null;
    for(int i = 0, count = str.length(); i< count ; i++)
    {
      tmpString = alphabetRadio.get((str.charAt(i)+"").toUpperCase());
      stringBuilder.append(tmpString==null?"":tmpString);
    }
      
    
    return stringBuilder.toString();
  }

}
