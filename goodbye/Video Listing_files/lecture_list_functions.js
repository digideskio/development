// lecture_list_functions.js?view_url=%s

(function() {
	window.GET = get_js_query_parameters();
})();

var current_dialog = null;
var current_dialog_saved_width, current_dialog_saved_height, current_dialog_saved_position;

function view_close() {
	current_dialog.dialog('close');
	view_clear_iframe();
}

function view_clear_iframe() {
	// Clear out lecture iframe (so the video doesn't continue playing)
	$('#lecture_iframe').attr('src', 'about:blank');
}

function view_lecture(lecture_id) {
	var url, properties;

	url = window.GET['view_url'] + '?lecture_id=' + lecture_id;

	properties = {
					modal: true,
					title: '',
					dialogClass: 'no-close',
					resizable: false,
					close: view_clear_iframe
				};

	if (current_dialog === null) {
		// Initialise dialog for the first time
		current_dialog = $('<div></div>');
	//	current_dialog.append($('<iframe></iframe>').attr('id', 'lecture_iframe').attr('src', url).attr('width', '100%').attr('height', '100%').attr('frameborder', 0));
		properties.width = 1000;
		properties.height = 600;
	}

	current_dialog = $(current_dialog).dialog(properties);
	//$('#lecture_iframe').attr('src', url);

}


// Full scren
var savedScrollTop = 0;
var enterFullScreen = function(){
//  $('.topbar, #banner-top, .container-fluid').hide();
//  $('iframe').addClass('fullscreen');
//  $('#fancybox-wrap, #fancybox-outer, #fancybox-content').addClass('fs-block');
    $('.fancybox-bg, #fancybox-close').hide();
    $('#fancybox-wrap, #fancybox-outer, #fancybox-content').addClass('fullscreen-block');
    $('html, body').css('overflow', 'hidden');
    savedScrollTop = $(window).scrollTop();
    $(window).scrollTop(0);
};
var exitFullScreen = function(){
//  $('.topbar, #banner-top, .container-fluid').show();
//  $('iframe').removeClass('fullscreen');
    $('.fancybox-bg, #fancybox-close').show();
    $('#fancybox-wrap, #fancybox-outer, #fancybox-content').removeClass('fullscreen-block');
    $('html, body').css('overflow', 'auto');
    $(window).scrollTop(savedScrollTop);
};

// An array containing the ordered list of the lectures (by lecture ID).  This
// is used to traverse back and forth through lectures when the next and
// previous buttons are pressed in the player pop-up.
var lectureOrder = [];

// A mapping of lecture IDs to the anchor elements representing the
// corresponding lecture.  The anchor elements hold the information necessary
// to pop up the fancybox lecture viewer.
var lectureAnchors = {};

// The title of the page when the full lecture list is displayed.  We capture
// this so that we can restore it when returning back to the list view.
var listTitle = '';

////////
//
// pushLecture
//
// Pushes the display of a lecture onto the browser history stack.  This is
// called when the user clicks on a lecture link or clicks the next or previous
// button in the viewew.
//
////////

function pushLecture(lectureId) {
    var stateUrl = lectureId;
    History.pushState(null, null, stateUrl);
}

////////
//
// viewPrevLecture
//
// Called when the user clicks the previous button in the lecture viewer.
//
////////

function viewPrevLecture(lectureId) {
    var i = lectureOrder.indexOf(lectureId);
    if (i === -1) {
        // This should never happen, as we should always know about the
        // current lecture.
        throw 'unknown lectureId \'' + lectureId + '\'';
    }
    if (i === 0) {
        // At the start of lectures, so do nothing.
        return;
    } else {
        var prevLectureId = lectureOrder[i - 1];
        pushLecture(prevLectureId);
    }
}

////////
//
// viewNextLecture
//
// Called when the user clicks the next button in the lecture viewer.
//
////////

function viewNextLecture(lectureId) {
    var i = lectureOrder.indexOf(lectureId);
    if (i === -1) {
        // This should never happen, as we should always know about the
        // current lecture.
        throw 'unknown lectureId \'' + lectureId + '\'';
    }
    if (i === (lectureOrder.length - 1)) {
        // At the end of lectures, so do nothing.
        return;
    } else {
        var nextLectureId = lectureOrder[i + 1];
        pushLecture(nextLectureId);
    }
}

var inLecture = false;

// Whether closing of the fancybox should push a state into the browser
// history.  This is set to false when reacting to a history state change.
// For example, if the user starts on the index/list, opens a lecture, then
// presses her browser's back button, the fancybox will be closed, but we do
// not want a state to be pushed.  Contrast this with the user actually
// pressing the close button herself, which should push a state.
var pushClose = true;

////////
//
// showLecture
//
// Shows the specified lecture in the fancybox.
//
////////

function showLecture(lectureId) {
    var anchor = lectureAnchors[lectureId];
    var href = anchor.attr('data-lecture-view-link');
    var title = $.trim(anchor.text());
    $('title').text(title);

    var fancyboxOpts = {
        href: href,
        width: 960,
        height: 605,
        type: 'iframe',
        transitionIn : 'none',
        transitionOut : 'none',
        margin: 0,
        padding: 10,
        showNavArrows: false,
        scrolling: 'no',
        autoScale: false,
        enableKeyboardNav: false,
        onStart: function() {
            inLecture = true;
            // Add close button element
            var closeButtonElem = $('<img></img>')
                .attr('src', fancyboxImageURL)
                .attr('id', 'fancybox-close-button')
                .attr('alt', 'Close Video')
                .attr('title', 'Close Video');
            $('#fancybox-close').css('overflow', 'hidden');
            $('#fancybox-close').html(closeButtonElem);
        },
        onComplete: function() {
            $('#fancybox-frame').focus();
            ModalFocus.enable('#fancybox-wrap');
        },
        onClosed: function() {
            inLecture = false;
            ModalFocus.disable();
            if (pushClose) {
                // This does not work quite right in IE9.  For some reason,
                // when fancybox manipulates the iframe when closing, IE9 hash
                // history gets reset all the way back to the initial page
                // load.  The end result is that closing the fancybox manually
                // destroys your history so that it looks like you just arrived
                // at the index/list page.
                History.pushState(null, null, 'index');
            }
        }
    }

    if (anchor.hasClass('lecture-with-slides-link')) {
        // The fancybox for lectures with slides gets different dimensions to
        // accommodate the slide bar.
        fancyboxOpts.width = 960;
        fancyboxOpts.height = 725;
    }

    $.fancybox(fancyboxOpts);
}

////////
//
// Called when browser history state changes.  For example, when a user clicks
// on a lecture, we push a state into the browser history, which triggers this
// event, which then displays the lecture.
//
////////

$(window).bind('statechange', function() {
    var state = History.getState();
    var action = getAction(state.url);
    if (!isNaN(action)) {
        // action is a lectureId.
        showLecture(action);
    } else if (action === 'index') {
        pushClose = false;
        $.fancybox.close();
        pushClose = true;
    }
});

////////
//
// makeLectureClickFunc
//
// Returns the function bound to lecture links in the lecture list.
//
////////

var makeLectureClickFunc = function() {
    return function() {
        var lectureId = $(this).attr('data-lecture-id');
        $(this).click(function(e) {
            pushLecture(lectureId);
            return false;
        });
    };
};

////////
//
// getAction
//
// Returns the action (the last element in the path) of the given URL.  For
// example:
//
// 'index' == getAction('http://spark/class/lecture/index')
// '1' == getAction('http://spark/class/lecture/1')
//
////////

var getAction = function (url) {
    var parser = document.createElement('a');
    parser.href = url;
    var slashSplit = parser.pathname.split('/');
    var action = slashSplit[slashSplit.length - 1];
    return action;
}

$(document).ready(function(){
    $('a[rel=lecture-link]').each(function() {
        var lectureId = $(this).attr('data-lecture-id');
        lectureOrder.push(lectureId);
        lectureAnchors[lectureId] = $(this);
    });

    $('.lecture-link').each(makeLectureClickFunc());

    // Tool Tips for Resources
    $("a[rel=twipsy]").twipsy({live: true, animate: false});

    // Auto Tick
    $('.lecture-link, .lecture-with-slides-link').click(function() {
        $(this).parent().removeClass('unviewed').addClass('viewed');
    });

    // Capture the listing title text so we can restore it if we return to it.
    listTitle = $('title').text();

    // See if we are to show a specific lecture.
    var action = getAction(window.location);
    if (!isNaN(action)) {
        // action is a lectureId.
        // Use setTimeout to give fancybox a chance to get set up.
        setTimeout(function() { showLecture(action); }, 0);
    }
});

// If focus is outside player and player is focused, attempt to bubble action into player
$(document).keydown(function(e){
    
    // Event propogation code stolen from mediaelement-and-player.js
    if(inLecture && typeof(QL_player) === 'object'){
        var player = QL_player.mediaelement_handle;
        var media = QL_player.mediaelement_media;
        if (player.options.enableKeyboard) {
            // find a matching key
            for (var i=0, il=player.options.keyActions.length; i<il; i++) {
                var keyAction = player.options.keyActions[i];
                
                for (var j=0, jl=keyAction.keys.length; j<jl; j++) {
                    if (e.keyCode == keyAction.keys[j]) {
                            e.preventDefault();
                            keyAction.action(player, media);
                            return false;
                    }												
                }
            }
        }
        if(typeof(QL_player.mediaelement_handle) === 'object'){
            QL_player.mediaelement_handle.showControls();
        }
    }
});
