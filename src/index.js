const lineEng = {
    "1호선": "--line1", "2호선": "--line2",
    "3호선": "--line3", "4호선": "--line4",
    "5호선": "--line5", "6호선": "--line6",
    "7호선": "--line7", "8호선": "--line8",
    "9호선": "--line9", "인천1호선": "--lineIC1",
    "인천2호선": "--lineIC2", "수인분당선": "--lineSB",
    "신분당": "--lineSBD", "경의중앙선": "--lineKJ",
    "공항철도": "--lineAP", "경춘선": "--lineGC",
    "의정부경전철": "--lineEJB", "용인경전철": "--lineYI",
    "경강선": "--lineGG", "우이신설경전철": "--lineUI",
    "서해선": "--lineSH", "김포도시철도": "--lineKP"
};

const lineText = {
    "1호선": "1", "2호선": "2",
    "3호선": "3", "4호선": "4",
    "5호선": "5", "6호선": "6",
    "7호선": "7", "8호선": "8",
    "9호선": "9", "인천1호선": "1",
    "인천2호선": "2", "수인분당선": "분당",
    "신분당": "신분당", "경의중앙선": "경의",
    "공항철도": "공항", "경춘선": "경춘",
    "의정부경전철": "의정", "용인경전철": "용인",
    "경강선": "경강", "우이신설경전철": "우이",
    "서해선": "서해", "김포도시철도": "김포"
};

$(document).ready(function() {
    
    var maxStationNum = 4;
    //let vh = window.innerHeight;
    //document.getElementById('mapWrapper').style.setProperty('height', `${vh}px`);
    //var StInfo = document.getElementById('StInfo');
    //StInfo.style.visibility = 'hidden';
    //$('#stationInfo').addClass('hiddenContent');
    //document.getElementById('stationInfo').classList.add('hiddenContent');


    $("#search").click(function() {
        location.href = "search-station.html";
    });

    $("area").click(function() {
        var lines = $(this).attr('class');
        var lineArr = lines.split(' ');
        var stName = $(this).attr('title');

        $('.station-namebox > span').html(stName);

        if(!document.querySelector('#stationInfo').classList.contains('showContent')) {
            $('#stationInfo').toggleClass('showContent');
        }
        

        //역 별로 호선 Button 배치
        resetActiveClass(maxStationNum, lineArr.length);
        resetButtonColor(maxStationNum);
        setButtonColor();
        fillButtonColor(1);

        //button 클릭시 active 상태 추가/삭제 + 색 변경
        var btns = document.getElementsByClassName("line-toggle-button");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                var thisBNum = this.getAttribute('id')[1];
                removeButtonColor(current[0].getAttribute('id')[1]);

                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                fillButtonColor(thisBNum);
                sendLineParam(lineArr[thisBNum - 1]);
            });
        }
        
        sendLineParam(lineArr[0]);

        

        function resetActiveClass(maxNum, arrLength) {
            $('#b1').addClass("active");
            for(var i = 2; i <= maxNum; i++) {
                var bId = 'b'.concat(String(i));
                var el = document.getElementById(bId);
                if ($(el).hasClass('active') == true) {
                    el.className = el.className.replace(" active", "");
                    console.log('remove active');
                }
            }
        }

        function resetButtonColor(maxNum) {
            for(var i = 1; i <= maxNum; i++) {
                var bId = 'b'.concat(String(i));
                $('#' + bId).css("border-color", "white");
                $(`li:nth-child(${i}) >> span`).html(" ");
            }
        }

        function setButtonColor() {
            for (var i = 1; i <= lineArr.length; i++) {
            var bId = 'b'.concat(String(i));

                var lineName = lineArr[i - 1];
                $('#' + bId).css("border-color", `var(${lineEng[lineName]})`);
                
                $(`li:nth-child(${i}) >> span`).html(lineText[lineName]);
                $(`li:nth-child(${i}) >> span`).css("color", `var(${lineEng[lineName]})`);
                
                console.log( parseInt(lineText[lineName]));
                if ($.isNumeric(lineName) == false) { // 한글의 경우 font-size 를 줄임(ex.신분당)
                    $('#' + bId).css('font-size', '0.9em');
                }
        };
        }

        //active된 버튼의 색을 채움
        function fillButtonColor(n) {
            var bId = '#b'.concat(n); //몇번째 버튼인지
            $(bId).css("backgroundColor", `var(${lineEng[lineArr[n-1]]})`);
            $(`${bId} > span`).css("color", 'white');
            $('.station-info').css("backgroundColor", `var(${lineEng[lineArr[n-1]]})`);
        }

        //active가 remove된 버튼의 색을 지움
        function removeButtonColor(n) {
            var bId = '#b'.concat(n);
            $(bId).css("backgroundColor", 'white');
            $(`${bId} > span`).css("color", `var(${lineEng[lineArr[n-1]]})`);
        }

        //호선 정보 get방식으로 전송
        function sendLineParam(lineName) {
            var Parms = '?name=' + stName + "&line="+ lineName;

            $.ajax({
                url:'/info' + Parms,
                type: 'get',
                dataType: 'text',
                success: function(data){
                    console.log('success-' + lineName);
                },
                error:function(e){  
                    console.log(e.responseText);  
                } 
            });
        }
    });
});        

document.addEventListener("DOMContentLoaded", (e) => {
    panzoom('#map', { bound: 'outer' });
});

$("area").on('click', function() {
    var StInfo = document.getElementById('StInfo');
    var maxStationNum = 4;

    $("#header").load("header.html");//header.html include



    $("#search").click(function() {
        location.href = "search-station.html";
    });

    $("area").click(function() {
        var lines = $(this).attr('class');
        var lineArr = lines.split(' ');
        var stName = $(this).attr('title');

        //console.log(stName);
        //var nStation = this.nextElementSibling;
        //var nName = $(nStation).attr('title');
        //var pStation = this.previousElementSibling;
        //var pName = $(pStation).attr('title');

        //$('.fStation-name > span').html(pName);
        $('.station-namebox > span').html(stName);
        //$('.nStation-name > span').html(nName);

        //역 별로 호선 Button 배치
        resetActiveClass(maxStationNum, lineArr.length);
        resetButtonColor(maxStationNum);
        setButtonColor();
        fillButtonColor(1);

        console.log('b');
        //button 클릭시 active 상태 추가/삭제 + 색 변경
        var btns = document.getElementsByClassName("line-toggle-button");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                var thisBNum = this.getAttribute('id')[1];
                removeButtonColor(current[0].getAttribute('id')[1]);

                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                fillButtonColor(thisBNum);
                sendLineParam(lineArr[thisBNum - 1]);
            });
        }

        sendLineParam(lineArr[0]);


        function resetActiveClass(maxNum, arrLength) {
            $('#b1').addClass("active");
            for(var i = 2; i <= maxNum; i++) {
                var bId = 'b'.concat(String(i));
                var el = document.getElementById(bId);
                if ($(el).hasClass('active') == true) {
                    el.className = el.className.replace(" active", "");
                    console.log('remove active');
                }
            }
        }

        function resetButtonColor(maxNum) {
            for(var i = 1; i <= maxNum; i++) {
                var bId = 'b'.concat(String(i));
                $('#' + bId).css("border-color", "white");
                $(`li:nth-child(${i}) >> span`).html(" ");
            }
        }

        function setButtonColor() {
            for (var i = 1; i <= lineArr.length; i++) {
            var bId = 'b'.concat(String(i));

                var lineName = lineArr[i - 1];
                $('#' + bId).css("border-color", `var(${lineEng[lineName]})`);

                $(`li:nth-child(${i}) >> span`).html(lineText[lineName]);
                $(`li:nth-child(${i}) >> span`).css("color", `var(${lineEng[lineName]})`);


                if ($.isNumeric(lineName) == false) { // 한글의 경우 font-size 를 줄임(ex.신분당)
                    $('#' + bId).css('font-size', '0.9em');
                }
        };
        }

        //active된 버튼의 색을 채움
        function fillButtonColor(n) {
            var bId = '#b'.concat(n); //몇번째 버튼인지
            $(bId).css("backgroundColor", `var(${lineEng[lineArr[n-1]]})`);
            $(`${bId} > span`).css("color", 'white');
            $('.station-info').css("backgroundColor", `var(${lineEng[lineArr[n-1]]})`);
        }

        //active가 remove된 버튼의 색을 지움
        function removeButtonColor(n) {
            var bId = '#b'.concat(n);
            $(bId).css("backgroundColor", 'white');
            $(`${bId} > span`).css("color", `var(${lineEng[lineArr[n-1]]})`);
        }

        //호선 정보 get방식으로 전송
        function sendLineParam(lineName) {
            Parms = '?name=' + stName + "&line="+ lineName;

            $.ajax({
                url:'/info' + Parms,
                type: 'get',
                dataType: 'text',
                success: function(data){
                    console.log('success-' + lineName);
                },
                error:function(e){
                    console.log(e.responseText);
                }
            });
        }
    });
});