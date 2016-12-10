package plsamaral.aoc2k6;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedList;
import java.util.function.Function;

import javax.xml.bind.DatatypeConverter;

public class Day5 {

    public static String getMd5Hex( String input ) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance( "MD5" );
        digest.update( input.getBytes() );
        return DatatypeConverter.printHexBinary( digest.digest() );
    }

    public static LinkedList<String> findZeroedMd5s( String input, Function<LinkedList<String>, Boolean> condition ) throws NoSuchAlgorithmException {
        LinkedList<String> zeroedList = new LinkedList<>();
        int i = 0;
        while ( zeroedList.isEmpty() || condition.apply( zeroedList ) ) {
            String zeroedMd5 = getMd5Hex( input + i++ );
            if ( zeroedMd5.startsWith( "00000" ) ) {
                zeroedList.add( zeroedMd5 );
            }
        }
        return zeroedList;
    }

    public static String findBasicPassword( String input ) throws NoSuchAlgorithmException {
        LinkedList<String> zeroedMd5s = findZeroedMd5s( input, p -> p.size() != 8 );
        StringBuilder builder = new StringBuilder();
        zeroedMd5s.forEach( p -> builder.append( p.charAt( 5 ) ) );
        return builder.toString();
    }

    public static String findComplexPassword( String input ) throws NoSuchAlgorithmException {
        LinkedList<String> zeroedMd5s = findZeroedMd5s( input, p -> {
            long found = p.stream().filter( s -> s.charAt( 5 ) == p.getLast().charAt( 5 ) ).count();
            if ( p.getLast().charAt( 5 ) > '7' || found > 1 ) {
                p.removeLast();
            }
            return p.size() != 8;
        } );
        StringBuilder builder = new StringBuilder( "00000000" );
        zeroedMd5s.forEach( p -> builder.setCharAt( Character.getNumericValue( p.charAt( 5 ) ), p.charAt( 6 ) ) );
        return builder.toString();
    }

    public static void main( String[] args ) throws NoSuchAlgorithmException {
        System.out.println( "Example 1: " + findBasicPassword( "abc" ) );
        System.out.println( "Puzzle 1: " + findBasicPassword( "ugkcyxxp" ) );
        System.out.println( "Example 2: " + findComplexPassword( "abc" ) );
        System.out.println( "Puzzle 1: " + findComplexPassword( "ugkcyxxp" ) );
    }

}
