package com.codecool.javascriptgame;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class readWordFiles {

    private ArrayList<String> jWords = new ArrayList<>();
    private ArrayList<String> lyWords = new ArrayList<>();
    private ArrayList<String> allWordsReplaced = new ArrayList<>();

    private void readWords(String filePath, ArrayList<String> wordList) {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String sCurrentLine;
            while ((sCurrentLine = br.readLine()) != null) {
                wordList.add(sCurrentLine);
            }
        } catch (
                IOException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<String> getJWords() {
        readWords("src/main/webapp/static/data/J.txt", jWords);
        return jWords;
    }

    public ArrayList<String> getLyWords() {
        readWords("src/main/webapp/static/data/LY.txt", lyWords);
        return lyWords;
    }

    public ArrayList<String> getAllWordsReplaced() {
        readWords("src/main/webapp/static/data/all_words.txt", allWordsReplaced);
        return allWordsReplaced;
    }
}
