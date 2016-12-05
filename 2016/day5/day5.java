package plsamaral.aoc2k6;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Function;

import javax.xml.bind.DatatypeConverter;

public class Day5 {

    public static String getMd5Hex( String input ) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance( "MD5" );
        digest.update( input.getBytes() );
        byte[] md5 = digest.digest();
        return DatatypeConverter.printHexBinary( md5 );
    }

    public static List<String> findZeroedMd5s( String input, Function<List<String>, Boolean> condition ) throws NoSuchAlgorithmException {
        LinkedList<String> zeroedList = new LinkedList<>();
        int i = 0;
        while ( condition.apply( zeroedList ) ) {
            String zeroedMd5 = getMd5Hex( input + i );
            if ( zeroedMd5.startsWith( "00000" ) ) {
                zeroedList.add( zeroedMd5 );
                System.out.println( "Found " + zeroedList.size() );
            }
            i++;
        }
        return zeroedList;
    }

    public static String findBasicPassword( String input ) throws NoSuchAlgorithmException {
        List<String> zeroedMd5s = findZeroedMd5s( input, p -> p.size() != 8 );
        StringBuilder builder = new StringBuilder();
        zeroedMd5s.forEach( p -> builder.append( p.charAt( 5 ) ) );
        return builder.toString();
    }

    public static String findComplexPassword( String input ) throws NoSuchAlgorithmException {
        List<String> zeroedMd5s = findZeroedMd5s( input, p -> {
            if ( !p.isEmpty() ) {
                char currChar = p.get( p.size() - 1 ).charAt( 5 );
                long found = p.stream().filter( s -> s.charAt( 5 ) == currChar ).count();
                if ( p.get( p.size() - 1 ).charAt( 5 ) > '7' || found > 1 ) {
                    p.remove( p.size() - 1 );
                }
            }
            return p.size() != 8;
        } );
        StringBuilder builder = new StringBuilder( "00000000" );
        zeroedMd5s
            .forEach( p -> builder.setCharAt( Integer.valueOf( String.valueOf( p.charAt( 5 ) ) ), p.charAt( 6 ) ) );
        return builder.toString();
    }

    public static void main( String[] args ) throws NoSuchAlgorithmException {
        System.out.println( "Example 1: " + findBasicPassword( "abc" ) );
        System.out.println( "Puzzle 1: " + findBasicPassword( "ugkcyxxp" ) );
        System.out.println( "Example 2: " + findComplexPassword( "abc" ) );
        System.out.println( "Puzzle 1: " + findComplexPassword( "ugkcyxxp" ) );
    }

}
