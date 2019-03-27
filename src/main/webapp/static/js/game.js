let score = 0;
let wordsLY;
let wordsJ;

window.onload = getLists;

function getLists() {
    loadDocLY('static/data/LY_replaced.txt')
    loadDocJ('static/data/J_replaced.txt');
}

function loadDocLY(url) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            wordsLY = xhttp.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadDocJ(url) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            wordsJ = xhttp.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

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

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function showCheckWord(status, side, word) {
    setTimeout(function () {
        word.classList.add('invisible')
    }, 1000)
    if (status === 'correct') {
        if (side === 'left') {
            changePicture('.owl', 'static/img/happy_owl.png');
            setTimeout(function () {
                changePicture('.owl', 'static/img/wise_owl.png');
            }, 1500)
        } else if (side === 'right') {
            changePicture('.parrot', 'static/img/happy_parrot.png');
            setTimeout(function () {
                changePicture('.parrot', 'static/img/greeting_parrot.png');
            }, 1500)
        }
        score++;
    } else if (status === 'incorrect') {
        if (side === 'left') {
            changePicture('.owl', 'static/img/sad_owl.png');
            setTimeout(function () {
                changePicture('.owl', 'static/img/wise_owl.png');
            }, 1500);
        } else if (side === 'right') {
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

function checkWord(word_list, word, side) {
    if (word_list.search(word.textContent) >= 0) {
        if (side === 'left') {
            showCheckWord('correct', 'left', word);
        } else if (side === 'right') {
            showCheckWord('correct', 'right', word);
        }
    } else {
        word.classList.add('missed');
        if (side === 'left') {
            showCheckWord('incorrect', 'left', word);
        } else if (side === 'right') {
            showCheckWord('incorrect', 'right', word);
        }
    }
}

function dragAndDrop() {
    function $(id) {
        return document.getElementById(id);
    }

    dragula([$('drag-elements'), $('drop-target-left'), $('drop-target-right')], {
        revertOnSpill: true
    }).on('drop', function (el) {
        let word = el;
        if (el.parentElement === $('drop-target-left')) {
            checkWord(wordsLY, word, 'left')
        } else if (el.parentElement === $('drop-target-right')) {
            checkWord(wordsJ, word, 'right')
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