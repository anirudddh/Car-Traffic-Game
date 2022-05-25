$(function(){
    var road = $('#road');
    var line_1 = $('#line-1');
    var line_2 = $('#line-2');
    var line_3 = $('#line-3');
    var car_1 = $('#car1');
    var car_2 = $('#car2');
    var car_3 = $('#car3');
    var car_4 = $('#car4');
    var car_5 = $('#car5');
    var car_6 = $('#car6');
    var car = $('#car');
    var road_width = parseInt(768+'px');
    var road_left = parseInt(road.css('left'));
    var road_right = parseInt(road.css('right'));
    var road_height = parseInt(window.screen.height);
    var car_width = parseInt(car.width());
    var car_height = parseInt(84+'px');
    var line_height = parseInt(252+'px');
    var score = 0;
    var move_left = false;
    var move_right = false;
    var move_up = false;
    var move_down = false;
    var game_over = false;
    var car_speed = 3;
    var line_speed = 5;
    var left_speed = car_speed;
    var anim_id;
  //  var restart_div = $('#restart-div');
    var restart_btn = $('#restart');
    var score = 0;
    var sound =$('#carsound');
    var score_span = $('#score-value');
    var count_space = 0;
    // var change_car = $("#change-car")
    // var change_car_count = 0;
    anim_id = requestAnimationFrame(animation);
    // change_car.click(function() {
    //     change_car_count++;
    //     if(change_car_count%2==0){
    //         alert("1");
    //         document.getElementById("car").style.backgroundcolor="red";
    //         document.getElementById("car6").style.backgroundcolor="black";
    //     }
    //     else{
    //         alert("2");
    //         document.getElementById("car").style.backgroundcolor="black";
    //         document.getElementById("car6").style.backgroundcolor="red";
            
    //     }
    // });


    $(document).on('keydown',function(e){
        if(game_over===false && count_space%2==0){
            var key = e.keyCode
            if(key===37 && move_left===false){
                move_left=requestAnimationFrame(move_car_left);
            }
            else if(key===39 && move_right===false){
                move_right=requestAnimationFrame(move_car_right);
            }
            else if(key===38 && move_up===false){
                move_up=requestAnimationFrame(move_car_up);
            }
            else if(key===40 && move_down===false){
                move_down=requestAnimationFrame(move_car_down);
            }
        }
    })
    $(document).on('keyup',function(e){
        if(game_over===false){
            var key = e.keyCode
            if(key===37){
                cancelAnimationFrame(move_left);
                move_left=false;
            }
            else if(key===39){
                cancelAnimationFrame(move_right);
                move_right=false;
            }
            else if(key===38){
                cancelAnimationFrame(move_up);
                move_up=false;
            }
            else if(key===40){
                cancelAnimationFrame(move_down);
                move_down=false;
            }
            else if(key===32){
                count_space++;
                if(!(count_space%2==0)){
                    cancelAnimationFrame(anim_id);
                    cancelAnimationFrame(move_left);
                    cancelAnimationFrame(move_right);
                    cancelAnimationFrame(move_up);
                    cancelAnimationFrame(move_down);
                    document.getElementById("carsound").pause();
                }
                else{
                    anim_id = requestAnimationFrame(animation);
                }
            }
        }
    })
    restart_btn.click(function() {
        location.reload();
    });

    



    function move_car_left(){
        var main_car_left = parseInt(car.css('left'));
        if (game_over === false && main_car_left > 0) {
        car.css('left',main_car_left-left_speed);
        move_left = requestAnimationFrame(move_car_left);
        }
    }
    function move_car_up(){
        if(document.getElementById("carsound").volume <1){
            document.getElementById("carsound").volume += 0.0005;
            }
        var main_car_top = parseInt(car.css('top'));
        if (game_over === false && main_car_top > 0) {
        car.css('top',main_car_top-left_speed);
        move_up = requestAnimationFrame(move_car_up);
        }
    }
    function move_car_down(){
        if(document.getElementById("carsound").volume > 0.2){
        document.getElementById("carsound").volume -= 0.0005;
        }
        var main_car_top = parseInt(car.css('top'));
        if (game_over === false && main_car_top < 0.84*road_height) {
        car.css('top',main_car_top+left_speed);
        move_down = requestAnimationFrame(move_car_down);
        }
    }
    function move_car_right(){
        var main_car_left = parseInt(car.css('left'));
        if (game_over === false && main_car_left<0.89*road_width) {
        car.css('left',main_car_left+left_speed);
        move_right = requestAnimationFrame(move_car_right);
        }
    }
    
    function animation(){
        document.getElementById("carsound").play();
            document.getElementById("carsound").volume = 0.5;
        if(collision(car,car_1) || collision(car,car_2) || collision(car,car_3) || collision(car,car_4) || collision(car,car_5)){
            cancelAnimationFrame(anim_id);
            cancelAnimationFrame(move_left);
            cancelAnimationFrame(move_right);
            cancelAnimationFrame(move_up);
            cancelAnimationFrame(move_down);
            document.getElementById("carsound").pause();
            document.getElementById("road").style.visibility="hidden";
            restart_btn.slideDown();
            restart_btn.focus();
            return;
        }
        score++;
        document.getElementById("score-value").innerHTML=score;
        document.getElementById("speed").innerHTML=parseFloat(line_speed).toFixed(2);;
        if(score%400==0 && car_speed<11){
            car_speed+=1.2;
            line_speed+=1.2;
            left_speed=car_speed;
        }
        $(document).on('keydown',function(e){
            if(e===32){
                alert("1");
                count_space++;
                if(!(count_space%2==0)){
                    cancelAnimationFrame(anim_id);
                }
                else{
                    anim_id = requestAnimationFrame(animation);
                }
            }
        })
        // if(score%240==0 || score==1){
        //     document.getElementById("carsound").play();
        //     document.getElementById("carsound").volume = 0.5;
        // }
        move_car(car_1);
        move_car(car_2);
        move_car(car_3);
        move_car(car_4);
        move_car(car_5);
        move_line(line_1);
        move_line(line_2);
        move_line(line_3);
        anim_id = requestAnimationFrame(animation);
    }
    // function stop_the_game(){
    //     cancelAnimationFrame(anim_id);
    //     cancelAnimationFrame(move_left);
    //     cancelAnimationFrame(move_right);
    //     cancelAnimationFrame(move_up);
    //     cancelAnimationFrame(move_down);
    //     document.getElementById("carsound").pause();
    //     document.getElementById("road").style.visibilty="hidden";
    //     restart_btn.slideDown();
    //     restart_btn.focus();
    // }
    function move_car(cart){
        var car_top = parseInt(cart.css('top'));
        var car_left;
        if(car_top>road_height){
            car_top -=(1.08*road_height);
            car_left = parseInt(Math.random()*(0.89*road_width));
            cart.css('left',car_left);
        }
        cart.css('top',car_top+car_speed);
    }
    function move_line(line){
        var line_top = parseInt(line.css('top'));
        if(line_top>road_height){
            line_top -=(road_height+line_height);
        }
        line.css('top',line_top+line_speed);
    }
    // function collision(carn1,carn2){
    //     var collision = false;
    //     var x1 = parseInt(carn1.css('left'));
    //     var y1 = parseInt(carn1.css('top'));
    //     var x2 = parseInt(carn2.css('left'));
    //     var y2 = parseInt(carn2.css('top'));
    //     if(Math.abs(x1-x2)<0.08*road_width || Math.abs(y1-y2)<car_height){
    //         collision = true;
    //     }
    //     return collision;
    // }
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
    
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    })