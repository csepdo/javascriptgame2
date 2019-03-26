package com.codecool.javascriptgame;

import com.codecool.javascriptgame.config.TemplateEngineUtil;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

@WebServlet(name = "javascriptGameGame", urlPatterns = {"/jatek"}, loadOnStartup = 2)
public class Game extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        int numberOfWords = (req.getParameter("szavak") != null)? Integer.parseInt(req.getParameter("szavak")) : 10;
        readWordFiles wordList = new readWordFiles();
        ArrayList<String> selectedWords = getCurrentWords(numberOfWords, wordList);

        setEncoding(resp);

//        Map params = new HashMap<>();
//        params.put("category", productCategoryDataStore.find(1));
//        params.put("products", productDataStore.getBy(productCategoryDataStore.find(1)));

        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
        WebContext context = new WebContext(req, resp, req.getServletContext());
//        context.setVariables(params);
        context.setVariable("recipient", "World");
        context.setVariable("words", selectedWords);
        engine.process("/game.html", context, resp.getWriter());
    }

    private void setEncoding(HttpServletResponse resp) {
        resp.setContentType("text/html; charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
    }

    private ArrayList<String> getCurrentWords(int numberOfWords, readWordFiles wordList) {
        ArrayList<String> selectedWords = new ArrayList<>();
        ArrayList<String> currentList = wordList.getAllWordsReplaced();
        Collections.shuffle(currentList);
        for (int i=0; i <= numberOfWords; i++) {
            String word = currentList.get(i);
            selectedWords.add(word);
        }
        return selectedWords;
    }
}
