// loadShaders.js
// David Owen, Ben Underwood

let vertexShaderFile;
let fragmentShaderFile;

const readFile = function (file) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // File successfully read.
                    resolve(xhr.responseText);
                } else {
                    // File not successfully read.
                    reject(xhr.statusText);
                }
            }
        };

        xhr.onerror = function () {
            // File not successfully read.
            reject(xhr.statusText);
        };

        xhr.responseType = "text";
        xhr.open("GET", file, true);
        xhr.send();
    });
};

const vsLoaded = readFile("shader.vert");
const fsLoaded = readFile("shader.frag");

const bothLoaded = Promise.all([vsLoaded, fsLoaded]);

const main = function(responses) {
    vertexShaderFile = responses[0];
    fragmentShaderFile = responses[1];
};

bothLoaded.then(main);
