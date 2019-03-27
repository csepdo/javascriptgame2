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

@WebServlet(name = "javascriptGameWords", urlPatterns = {"/szavak"}, loadOnStartup = 3)
public class Words extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        readWordFiles wordList = new readWordFiles();
        ArrayList<String> wordsJ = wordList.getJWords();
        ArrayList<String> wordsLY = wordList.getLyWords();

        resp.setContentType("text/html; charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");

        TemplateEngine engine = TemplateEngineUtil.getTemplateEngine(req.getServletContext());
        WebContext context = new WebContext(req, resp, req.getServletContext());

        context.setVariable("recipient", "World");
        context.setVariable("wordsJ", wordsJ);
        context.setVariable("wordsLY", wordsLY);
        engine.process("/words.html", context, resp.getWriter());
    }
}

