$(document).on('click', '.MenuA', function(){
    $('.MenuA').removeClass('active');//При клике сперва убираем класс со всех кнопок
    $(this).addClass('active');//Потом добавляем его на текущую кликнутую.
});
$(document).ready(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        $('#css').attr("href", "style/mainPhone.css");
    }
});
$(window).resize(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        $('#css').attr("href", "style/mainPhone.css");
    }else{
        $('#css').attr("href", "style/main.css");
    }
});
$(document).ready(function(){
    $("a").on('click', function(event) {

        if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
        }
    });
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 1){  
        $('#mainMenu').addClass("sticky");
    }
    else{
        $('#mainMenu').removeClass("sticky");
    }
});
$(document).ready(function(){
$("#SubmitEmail").on("click", function(e){
    var eB = false;
    var fB = false;
    var lB = false;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if($("#Email").val() == ""){
        $("#Email").addClass("wrong");
        eB = true;
    }else{
        $("#Email").removeClass("wrong");
    }
    if($("#FirstName").val() == ""){
        $("#FirstName").addClass("wrong");
        fB = true;
    }else{
        $("#FirstName").removeClass("wrong");
    }
    if($("#LastName").val() == ""){
        $("#LastName").addClass("wrong");
        lB = true;
    }else{
        $("#LastName").removeClass("wrong");
    }
    if(eB || fB || lB){
        e.preventDefault();
        $("#wrongP").css("display", "inline-flex");
        $("#wrongP").html("Required fields missing");
        return;
    }else{
        $("#wrongP").css("display", "none");
    }
    var email = $("#Email").val();
    if (regex.test(email)){
        $("#Email").removeClass("wrong");
        $("#wrongP").css("display", "none");
    } else {
        $("#Email").addClass("wrong");
        $("#wrongP").css("display", "inline-flex");
        $("#wrongP").html("Invalid email address");
        e.preventDefault();
    }
})});

function onScroll(){
    var scroll_top = $(document).scrollTop();
    var scroll_bottom = $(document).scrollTop() + $(window).height();
    $("#mainMenu a").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);
        if ((target.position().top <= scroll_top && target.position().top + 
        target.outerHeight() > scroll_top) || 
        (target.position().top >= scroll_top && target.position().top +$(this).outerHeight() < scroll_bottom)) {
            $('.MenuA').removeClass('active');
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
};

$(document).ready(function(){

    $(document).on("scroll", onScroll);
    
    $(".MainA").click(function(e){
        e.preventDefault();
    
        $(document).off("scroll");
        $("#mainMenu a.active").removeClass("active");
        $(this).addClass("active");
        $("#ContactUs").removeClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);
    
        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });
    
    })
});

idleTimer = null;
idleState = false;
idleWait = 10000; // ms

$(function ($) {
    $('#dialogSleep').dialog({
		autoOpen: false
	});
    $(document).ready(function () {
        $('*').bind('mousemove keydown scroll', function () {
            clearTimeout(idleTimer);
            if (idleState == true) {

                $("#dialogSleep").dialog("close");

            }

            idleState = false;
            idleTimer = setTimeout(function () {
                $("#dialogSleep").dialog("open");

                idleState = true;
            }, idleWait);
        });

        $("body").trigger("mousemove");

    });
});

function test_email(e) {
    var eB = false;
    var nB = false;
    if($("#formModal #Email").val() == ""){
        $("#formModal #Email").addClass("wrong");
        eB = true;
    }else{
        $("#formModal #Email").removeClass("wrong");
    }
    if($("#formModal #Name").val() == ""){
        $("#formModal #Name").addClass("wrong");
        nB = true;
    }else{
        $("#formModal #Name").removeClass("wrong");
    }

    if(eB || nB){
        $("#formModal #wrongP").css("display", "block");
        $("#formModal #wrongP").html("Required fields missing");
        return false;
    }else{
        $("#formModal #wrongP").css("display", "none");
    }

    var email = $("#formModal #Email").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
    if (regex.test(email)){
        $("#formModal #Email").removeClass("wrong");
        $("#formModal #wrongP").css("display", "none");
        return true;
    } else {
        $("#formModal #Email").addClass("wrong");
        $("#formModal #wrongP").css("display", "block");
        $("#formModal #wrongP").html("Invalid email address");
        return false;
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

$(async function ($) {
    await $(".modalDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Ok": async function () {
                if(test_email()){
                    $("#formModal").css("display", "none");
                    $("#Well").css("display", "block");
                    $(this).dialog("option", "buttons", {});
                    await sleep(2000);
                    $(this).dialog("close");
                };
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });
    $(document).ready(function() {
        $('#ContactUs').click(function(e) {
            e.preventDefault();
            $(".modalDialog").dialog("open");
        });
    });
});