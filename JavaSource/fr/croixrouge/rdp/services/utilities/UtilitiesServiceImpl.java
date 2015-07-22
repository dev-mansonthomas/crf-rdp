package fr.croixrouge.rdp.services.utilities;

import com.Ostermiller.util.RandPass;


public class UtilitiesServiceImpl implements UtilitiesService
{
  public static final String dateSDF        = "dd/MM/yyyy";
  public static final String hourSDF        = "HH:mm:ss";
  public static final String dateTimeSDF    = "dd/MM/yyyy HH:ss";
  public static final String dateTimeMSSDF  = "dd/MM/yyyy HH:mm:ss.SSS";

  /** Alphabet pour la génération de password*/
  public static final char[] PRONONCABLE = {
      'A', 'E', 'H', 'I', 'L', 'O', 'U', 'Y',
      'a', 'e', 'h', 'i', 'l', 'o', 'u', 'y'
  };


  public static final char[] MYALPHABET = {
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
      'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z'
  };

  public static final char[] NUMBERS = {
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

  public static final char[] SPECIALCHARS = {
      '!', '$', '%', '(', '_', ')',
      '*', '+', ',', '-', '.', '/', ':',
      ';', '?', '@'};

  public String generatePassword()
  {
    RandPass randPass = new RandPass();
    randPass.setAlphabet(MYALPHABET);
    randPass.addRequirement(PRONONCABLE, 3);
    randPass.setMaxRepetition(2             );
    
    RandPass randPass2 = new RandPass();
    randPass2.setFirstAlphabet(SPECIALCHARS);
    randPass2.setLastAlphabet (NUMBERS);
    
    return randPass.getPass(5)+randPass2.getPass(4);
    
  }
  
}
