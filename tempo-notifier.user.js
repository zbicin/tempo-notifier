// ==UserScript==
// @name          Tempo notifier
// @namespace     http://zbic.in
// @description   UserScript periodically displaying currently tracked issue in JIRA Tempo Timesheets using HTML5 Notification API.
// @author        Zbicin (http://github.com/zbicin)
// @include       https://*.atlassian.net/*
// @downloadURL   https://raw.githubusercontent.com/zbicin/tempo-notifier/master/tempo-notifier.user.js
// @version       0.0.1
// @noframes
// ==/UserScript==

var injectedScript = function () {
    var intervalPeriod = 1000 * 60 * 10;

    function notify() {
        var summary = document.getElementById("issue-tracker-summary-id").innerText;
        var notification;

        if (summary) {
            notification = new Notification("You are currently tracking:", {
                body: summary,
                icon: 'http://www.javaaddicts.net/image/journal/article?img_id=11738&t=1435914592549'
            });
        }
        else {
            notification = new Notification("You are not tracking any issue.", {
                icon: 'http://www.javaaddicts.net/image/journal/article?img_id=11738&t=1435914592549'
            });
        }

        setTimeout(function () {
            notification.cancel();
        }, 10000);
    }

    function init() {
        if (window.Notification && !isPermissionGranted()) {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
            });
        }
        
        if (window.Notification && isPermissionGranted()) {
            var interval = window.setInterval(notify, intervalPeriod);
        }
        else if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }

                if (status === 'granted') {
                    var interval = window.setInterval(notify, intervalPeriod);
                }
            });
        }

        notify();
    }
    
    function isPermissionGranted() {
        return Notification.permission === 'granted';
    }

    window.addEventListener('load', init);
};

// Inject script
var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = '(' + injectedScript.toString() + ')();';
document.body.appendChild(script);