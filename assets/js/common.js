$(function(){

// 왼쪽 nav 안에 작은 리스트 열고 닫기
    $('.nav_btn').on('click',function(){
        $(this).siblings('.nav_deps2').slideToggle(500).parent().siblings().children('.nav_deps2').slideUp(500);
        $(this).parent().toggleClass('active').siblings().removeClass('active');
        $(this).next('.nav_deps2').children('li:first-child').addClass('active').parents('li').siblings().find('li').removeClass('active');
    });

// 왼쪽 nav 안에 작은 리스크 각 페이지 이동 시 active 스타일
    $('.nav .nav_deps2 li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 상단 헤더 마이페이지
    $('.login_name').on('click', function(){
        $(this).toggleClass('active').next('.login_list').slideToggle();
    });

    // datepicker
    if ($("#datepicker_01, #datepicker_02").length > 0) {
        $("#datepicker_01, #datepicker_02").datepicker({
            language: 'ko',
            autoClose: true
        });
    }
    // datepicker multi
    if ($("#datepickerMultiple").length > 0) {
        $("#datepickerMultiple").datepicker({
            language: 'ko',
            autoClose: true,
            onSelect : function(formatDate, date, inst){
                if(formatDate.indexOf(" ~ ") > -1){
                    inst.hide();
                }
            }
        });
    }

    // close modal on click dimLayer
    $(document).on("click", "#mainDimLayer", function (e) {
        closeModal();
    });

    // 모달 닫기(공통)
    $(".close_modal").on("click", function () {
        closeModal();
    });

    // 모달 닫기(서브)
    // $(".modal_wrap").on("click", ".delete_modal", function () {
    //     $(this).closest(".modal_wrap").removeClass("active");
    //     $(".subDimLayer").remove();
    // });

    /* 공통 alert, confirm 관련 */
    // 공통 alert, confirm 모달 닫기(X버튼, 취소버튼)
    $(".modal_wrap").on("click", ".delete_modal", function () {
        action_popup.close(this);
    });
});

// addnDimLayer
function addnDimLayer() {
    var createDiv = "<div id='mainDimLayer'></div>";
    $("body").append(createDiv).addClass("fixed");
}

// closeModal
function closeModal() {
    $(".modal_wrap").removeClass("active");
    $("#mainDimLayer").remove();
    $("body").removeClass("fixed");
}

/**
 *  공통 alert, confirm 관련
 *  alert, confirm 대용 팝업 메소드 정의 <br/>
 *  timer : 애니메이션 동작 속도 <br/>
 *  alert : 경고창 <br/>
 *  confirm : 확인창 <br/>
 *  open : 팝업 열기 <br/>
 *  close : 팝업 닫기 <br/>
 **/
// alert and confirm common
var action_popup = {
    timer: 300,
    // confirm 모달
    confirm: function (txt, callback) {
        // 텍스트 없을경우(유효성 검증)
        if (txt == null || txt.trim() == "") {
            console.warn("confirm message is empty.");
            return;
            // 콜백 정의 검증
        } else if (callback == null || typeof callback != "function") {
            console.warn("callback is null or not function.");
            return;
            // 정상인 경우
        } else {
            $(".confirm .btn_ok").on("click", function () {
                $(this).unbind("click"); // 기존 모달 위에 띄울 경우 중복 확인 동작 방지
                callback(true);
                action_popup.close(this);
            });
            this.open("confirm", txt);
        }
    },

    // alert 모달
    alert: function (txt) {
        if (txt == null || txt.trim() == "") {
            console.warn("confirm message is empty.");
            return;
        } else {
            this.open("alert", txt);
        }
    },

    // alert or confirm 구분해서 열기
    open: function (type, txt) {
        var popup = $("." + type);
        popup.find(".modal_text").empty().append(txt);
        $("body").append("<div class='subDimLayer'></div>");
        $(".subDimLayer").css("height", $(document).height()).attr("target", type);
        popup.fadeIn(this.timer);
    },

    // alert or confirm 구분해서 닫기
    close: function (target) {
        var modal = $(target).closest(".modal_wrap");
        var dimLayer;
        if (modal.hasClass("confirm")) {
            dimLayer = $(".subDimLayer[target=confirm]");
        } else if (modal.hasClass("alert")) {
            dimLayer = $(".subDimLayer[target=alert]");
        } else {
            console.warn("close unknown target.");
            return;
        }
        modal.fadeOut(this.timer);
        $(".confirm .btn_ok").unbind("click");
        setTimeout(function () {
            dimLayer != null ? dimLayer.remove() : "";
        }, this.timer);
    },
};
