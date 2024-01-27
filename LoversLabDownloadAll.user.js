// ==UserScript==
// @name         LoversLab Download  2024 Test
// @namespace    N/A
// @version      1.0
// @description  Adds a Download All button to LoversLab download page
// @author       TEstss3223
// @match        https://www.loverslab.com/files/file/*/do=download
// @icon         https://www.google.com/s2/favicons?sz=64&domain=loverslab.com
// @grant        none
// @license      MIT
// @downloadURL  https://github.com/Elotiroy923812/LLDALL_test_2024/blob/main/LoversLabDownloadAll.user.js
// @updateURL    https://github.com/Elotiroy923812/LLDALL_test_2024/blob/main/LoversLabDownloadAll.user.js
// ==/UserScript==

(function() {
    'use strict';

    function downloadAll() {
        var downloadLinks = document.querySelectorAll('.ipsDataItem_generic a[data-action="download"]');
        var progressBar = createProgressBar();

        var total = downloadLinks.length;
        var count = 0;

        downloadLinks.forEach(function(link, index) {
            setTimeout(function() {
                link.click();

                var checkInterval = setInterval(function() {
                    var downloadCounterContainer = link.parentElement.querySelector('[data-role="downloadCounterContainer"]');
                    if (downloadCounterContainer.textContent.trim() === '') {
                        clearInterval(checkInterval);
                        count++;

                        progressBar.style.width = (count / total * 100) + '%';

                        if (count === total) {
                            document.body.removeChild(progressBar);
                        }
                    }
                }, 1000);
            }, 3000 * index);
        });
    }

    function createProgressBar() {
        var progressBar = document.createElement('div');
        progressBar.style.width = '0';
        progressBar.style.height = '6px';
        progressBar.style.backgroundColor = '#2196F3';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.zIndex = '9999';

        document.body.appendChild(progressBar);

        return progressBar;
    }

    function addButton() {
        var downloadHeader = document.querySelector('.ipsType_pageTitle');
        var downloadAllButton = document.createElement('button');
        downloadAllButton.textContent = 'Download All';
        downloadAllButton.className = 'ipsButton ipsButton_primary ipsButton_small';
        downloadAllButton.style.marginTop = '10px';
        downloadAllButton.addEventListener('click', downloadAll);

        downloadHeader.parentElement.appendChild(downloadAllButton);
    }

    addButton();

})();
