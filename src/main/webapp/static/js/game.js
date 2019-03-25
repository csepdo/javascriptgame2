let score = 0;


function collapsibleButtons() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}


function showCheckWord(status, side, word) {
    setTimeout(function() {word.classList.add('invisible')}, 1000)
    if (status === 'correct') {
        if (side === 'left') {
            changePicture('.owl', 'static/img/happy_owl.png');
            setTimeout(function () {
                changePicture('.owl', 'static/img/wise_owl.png');
            }, 1500)
        }
        else if (side === 'right') {
            changePicture('.parrot', 'static/img/happy_parrot.png');
            setTimeout(function () {
                changePicture('.parrot', 'static/img/greeting_parrot.png');
            }, 1500)
        }
        score++;
    }
    else if (status === 'incorrect') {
        if (side === 'left') {
            changePicture('.owl', 'static/img/sad_owl.png');
            setTimeout(function () {
                changePicture('.owl', 'static/img/wise_owl.png');
            }, 1500);
        }
        else if (side === 'right') {
            changePicture('.parrot', 'static/img/sad_parrot.png');
            setTimeout(function () {
                changePicture('.parrot', 'static/img/greeting_parrot.png');
            }, 1500)
        }
    }
    showScore()
}


function changePicture(element, url) {
    $(element).attr('src', url);
}


function checkWord(xhttp, word, side) {
    let word_list = xhttp.responseText;
    if (word_list.search(word.textContent) >= 0) {
        if (side === 'left') {
            showCheckWord('correct', 'left', word);
        }
        else if (side === 'right') {
            showCheckWord('correct', 'right', word);
        }
    } else {
        word.classList.add('missed');

        if (side === 'left') {
            showCheckWord('incorrect', 'left', word);
        }
        else if (side === 'right') {
            showCheckWord('incorrect', 'right', word);
        }
    }
}


function loadDoc(filename, word, side) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            checkWord(this, word, side)
        }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();
}


function dragAndDrop() {
    function $(id) {
        return document.getElementById(id);
    }
    dragula([$('drag-elements'), $('drop-target-left'), $('drop-target-right')], {
        revertOnSpill: true
    }).on('drop', function (el) {
        let word = el;
        let side;
        if (el.parentElement === $('drop-target-left')) {
            side = 'left';
            loadDoc('/static/data/LY.txt', word, side)
        }
        else if (el.parentElement === $('drop-target-right')) {
            side = 'right';
            loadDoc('/static/data/J.txt', word, side)
        }
    });
}


function showScore() {
    let score_place = document.getElementById('score');
    score_place.textContent = score;
}


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}


function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


collapsibleButtons();
dragAndDrop();
window.onscroll = function () {
    scrollFunction()
};