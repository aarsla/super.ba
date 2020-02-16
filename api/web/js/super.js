$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
    
    Mustache.tags = ["[[","]]"];
    updateAudio();
    updateFilters();
    updateTechFilters();
});

function toggleMute() {
    var muted = Cookies.get('muted');

    if (typeof muted == 'undefined') {
        muted = 'true';
    }

    muted = muted == 'true';
    muted = !muted;

    Cookies.set('muted', muted);
    updateAudio();
}

function updateAudio() {
    var muted = Cookies.get('muted');

    if (typeof muted == 'undefined') {
        muted = 'true';
    }

    muted = muted == 'true';
    document.getElementById('audio').muted = muted;

    if (muted == false) {
        $('#volumeCtrl').html("<i class='fa fa-volume-up'></i>");
    } else {
        $('#volumeCtrl').html("<i class='fa fa-volume-off'></i>");
    }
}

function toggleFilter(source) {
    var filters = Cookies.getJSON('filters');

    if (typeof filters == 'undefined') {
        filters = [];
    }

    if ($.inArray(source, filters) == -1) {
        filters.push(source);
    } else {
        filters.splice(filters.indexOf(source), 1);
    }

    Cookies.set('filters', filters);

    var ws = new WebSocket(wsserver+"/ws/news");
    connect();
    updateFilters();
    updateTechFilters();
}

function updateFilters() {
    var portals = ['24sata info', '6yka magazin', 'Aljazeera Balkans', 'Avaz', 'CIN', 'Klix', 'N1 Info', 'Radio Sarajevo'];
    var filters = Cookies.getJSON('filters');

    if (typeof filters == 'undefined') {
        filters = [];
        Cookies.set('filters', filters);
    }

    var filtersHtml = '';

    portals.forEach(function(portal) {
        var btnClass = 'btn-primary';
        if ($.inArray(portal, filters) > -1) {
            btnClass = 'btn-outline-primary';
        }
        filtersHtml += '<a class="btn btn-sm '+btnClass+'" href="#" onclick="toggleFilter(\'' + portal + '\');">' + portal + '</a> ';
    });

    $('#filters').html(filtersHtml);
}

function updateTechFilters() {
    var portals = ['CNet', 'Engadget', 'Mashable', 'TechCrunch', 'TechRadar', 'The Next Web', 'The Verge', 'WIRED'];
    var filters = Cookies.getJSON('filters');

    if (typeof filters == 'undefined') {
        filters = [];
        Cookies.set('filters', filters);
    }

    var filtersHtml = '';

    portals.forEach(function(portal) {
        var btnClass = 'btn-primary';
        if ($.inArray(portal, filters) > -1) {
            btnClass = 'btn-outline-primary';
        }
        filtersHtml += '<a class="btn btn-sm '+btnClass+'" href="#" onclick="toggleFilter(\'' + portal + '\');">' + portal + '</a> ';
    });

    $('#tech-filters').html(filtersHtml);
}

function showNotification(title, source) {
    if(window.Notification) {
        Notification.requestPermission(function(status) {
            var n = new Notification(source, { body: title });
        });
    }
}

var connect = function() {
    var filters = Cookies.getJSON('filters');
    //var ws = new WebSocket(wsserver+"/ws/news");

    ws.onopen = function () {
    };

    ws.onmessage = function (evt) {

        var msg = JSON.parse(evt.data);
        msg.reverse();

        for(var i = 0; i < msg.length; i++) {
            var item = msg[i];

            if (filters.indexOf(item.source.title) > -1) {
                return;
            }

            var pubDate = moment(item.pubDate);
            item.formattedDate = pubDate.format('MMM D YYYY, h:mm');

            if (typeof item.image == "undefined") {
                item.image = item.source.logo;
            }

            var itemTemplate = $('#template').html();
            var itemHtml = Mustache.render(itemTemplate, item);
            $(itemHtml).hide().prependTo("#marker").fadeIn();

            var audio = document.getElementById('audio');
            audio.play();

            showNotification(item.title, item.source.title);
        }
    };

    ws.onerror = function () {
        setTimeout(connect, 3*1000);
    };

    ws.onclose = function () {
        setTimeout(connect, 3*1000);
    };
};

connect();

var counter = function() {

    var counter = new WebSocket(wsserver+"/ws/counter");

    counter.onopen = function () {
        //$('#counter').empty();
    };

    counter.onmessage = function (evt) {

        var msg = JSON.parse(evt.data);
        var count = msg.count;
        $('#counter').html(count);
    };

    counter.onclose = function () {
        //setTimeout(counter, 3*1000);
    };
};

counter();