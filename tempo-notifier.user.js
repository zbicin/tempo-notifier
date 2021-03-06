// ==UserScript==
// @name          JIRA Tempo Timesheets Notifier
// @namespace     http://zbic.in
// @description   UserScript periodically displaying currently tracked issue in JIRA Tempo Timesheets using HTML5 Notification API.
// @author        Krzysztof Zbiciński (http://github.com/zbicin)
// @include       https://*.atlassian.net/*
// @downloadURL   https://raw.githubusercontent.com/zbicin/tempo-notifier/master/tempo-notifier.user.js
// @version       0.1
// @noframes
// ==/UserScript==

var injectedScript = function () {
    var intervalPeriod = 1000 * 60 * 10;
    var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RURGRkFFNDMyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RURGRkFFNDQyQ0MzMTFFNEIyOEZENUFCNUVGM0NEN0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RjdERTc1QzJDQzIxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFREZGQUU0MjJDQzMxMUU0QjI4RkQ1QUI1RUYzQ0Q3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuWzsQ8AAAr2SURBVHja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';

    function notify() {
        var issueTrackerSummaryId = document.getElementById("issue-tracker-summary-id");
        var summary = issueTrackerSummaryId ? issueTrackerSummaryId.innerText : '';
        var notification;

        if (summary) {
            notification = new Notification("You are currently tracking:", {
                body: summary,
                icon: icon
            });
        }
        else {
            notification = new Notification("You are not tracking any issue.", {
                icon: icon
            });
        }

        setTimeout(function () {
            notification.close();
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

        console.info('JIRA Tempo Timesheets Notifier loaded.');
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