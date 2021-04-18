export const recordRTC = (function () {
    let _mirror = true;
    let _stream = null;
    let _canvasStream = null;
    let _recorder = null;
    const _constraints = {
        audio: false,
        video: {
            height: { max: 320 },
            facingMode: { exact: "user" }
        }
    }
    const _config = {
        type: "gif",
        recorderType: GifRecorder,
        frameRate: { ideal: 30, max: 60 },
        videoBitsPerSecond: 128000,
        quality: 60,
        width: 400,
        height: 320
    }
    let _time = 0;
    let _interval;
    let _form = new FormData();
    let _blob;
    let _myGifos;

    // check if the gif is in myGifos
    function _isInMyGifos(id) {
        _myGifos = localStorage.getItem("myGifos") ? JSON.parse(localStorage.getItem("myGifos")) : [];

        return _myGifos.includes(id) ? true : false;
    }

    function _toHHMMSS(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;

        hours = `${hours}`.padStart(2, '0');
        minutes = `${minutes}`.padStart(2, '0');
        seconds = `${seconds}`.padStart(2, '0');

        return hours + ':' + minutes + ':' + seconds;
    }

    function _showTime(timerContainer) {
        _time += 1;
        timerContainer.innerHTML = _toHHMMSS(_time);
    }

    function _addToMyGifos(id) {
        if (_isInMyGifos(id)) return;

        _myGifos.push(id);

        localStorage.setItem("myGifos", JSON.stringify(_myGifos));
    };

    // ask for permissions
    async function start(event, createGifTitle, createGifMessage, startButton, recordButton, video, canvas, step1, step2) {
        event.preventDefault();

        createGifTitle.innerHTML = "¿Nos das acceso <br> a tu cámara?";
        createGifMessage.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
        step1.classList.toggle("active");

        const ctx = canvas.getContext('2d');

        try {
            _stream = await navigator.mediaDevices.getUserMedia(_constraints);

            createGifTitle.style.display = "none";
            createGifMessage.style.display = "none";
            canvas.style.display = "block";
            startButton.style.display = "none";
            recordButton.style.display = "block";
            step1.classList.toggle("active");
            step2.classList.toggle("active");

            video.srcObject = _stream;
            video.play();

            let i;
            video.addEventListener('play', () => {
                i = window.setInterval(() => {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                }, 10);
            }, false);

            // logic to mirror the camera
            if (_mirror === true) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            } else {
                _mirror = true;
            }
            _mirror = false;

            _canvasStream = canvas.captureStream(120);

            _recorder = RecordRTC(_canvasStream, _config);

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    // start recording
    function record(recordButton, stopButton, timerContainer) {
        recordButton.style.display = "none";
        stopButton.style.display = "block";
        timerContainer.style.display = "block";

        _recorder.startRecording();

        _interval = setInterval(() => {
            _showTime(timerContainer)
        }, 1000);
    };

    // stop recording
    async function stop(canvas, recordingVideoContainer, stopButton, uploadButton, timerContainer, repeatCaption) {
        try {
            await _recorder.stopRecording();
            _blob = await _recorder.getBlob();

            let img = document.createElement("img");
            img.src = URL.createObjectURL(_blob);
            img.alt = "Recorded gif";
            img.id = "recorded-gif";

            canvas.style.display = "none";

            recordingVideoContainer.appendChild(img);

            _form.append("file", _blob, "myGif.gif");
            console.log(_form.get("file"));

            stopButton.style.display = "none";
            uploadButton.style.display = "block";
            timerContainer.style.display = "none";
            repeatCaption.style.display = "block";

            clearInterval(_interval);
            timerContainer.innerHTML = "00:00:00";

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    // upload gif
    async function upload(uploadOverlay, uploadLoader, uploadOk, uploadMessage, step2, step3, uploadButton, resetButton, repeatCaption, url, recordingVideoContainer) {
        try {
            const endpoint = url;

            uploadOverlay.style.display = "block";
            uploadOverlay.style.opacity = "0.6";
            uploadLoader.style.display = "block";
            uploadMessage.style.display = "block";
            step2.classList.toggle("active");
            step3.classList.toggle("active");
            uploadButton.style.display = "none";
            repeatCaption.style.display = "none";

            const response = await fetch(endpoint, {
                method: "POST",
                body: _form
            });

            if (response.ok) {
                const jsonResponse = await response.json();

                uploadLoader.style.display = "none";
                uploadOk.style.display = "block";
                uploadMessage.innerHTML = "GIFO subido con éxito";
                resetButton.style.display = "block";

                _addToMyGifos(jsonResponse.data.id);

                const buttons = `
                    <div class="icon-container">
                        <i class="icon-download"
                            data-download-id=${jsonResponse.data.id}></i>
                        <i class="icon-link"
                            data-link-id=${jsonResponse.data.id}></i>
                    </div>`;

                recordingVideoContainer.insertAdjacentHTML("beforeend", buttons);

                return;
            }

            throw new Error("No se pudo subir tu gif");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    function repeatCaption(canvas, repeatCaption, uploadButton, recordButton, timerContainer) {
        _recorder.reset();

        document.getElementById("recorded-gif").remove();

        canvas.style.display = "block";
        repeatCaption.style.display = "none";
        uploadButton.style.display = "none";
        recordButton.style.display = "block";

        clearInterval(_interval);
        _time = 0;
        timerContainer.innerHTML = "00:00:00";
    };

    function reset() {
        location.reload();
    };

    // transform the url into blob so it can be downloaded
    async function _downloadBlob(url) {
        const a = document.createElement("a");
        const response = await fetch(url); // HTTP response by the browser
        const file = await response.blob();

        // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
        a.download = "my-gif";
        a.href = window.URL.createObjectURL(file);

        // store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
        a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");

        a.click(); // autoclick on element to start download
    };

    // Event capturing for the download icon with the functionality
    async function download(event, classToSearch, url, paramApiKey, apiKey) {
        if (event.target.className === classToSearch) {
            try {
                const id = event.target.getAttribute("data-download-id"); // get custom attribute
                const endpoint = url + id + "?" + paramApiKey + apiKey;
                const response = await fetch(endpoint);

                if (response.ok) {
                    const jsonResponse = await response.json();

                    const urlToDownload = jsonResponse.data.images.fixed_height.url;

                    _downloadBlob(urlToDownload);

                    return;
                }

                throw new Error("Request failed");
            } catch (error) {
                console.log(error.message);
                alert(error.message);
            }
        }
    };

    function _copyToClipboard(text) {
        const aux = document.createElement("textarea");
        document.body.appendChild(aux);
        aux.value = text;
        aux.select();
        aux.setSelectionRange(0, 99999); // for mobile devices
        document.execCommand("copy");
        document.body.removeChild(aux);
        alert("Link copiado!");
    }

    // Event capturing for the copy link icon with the functionality
    async function copyLink(event, classToSearch, url, paramApiKey, apiKey) {
        if (event.target.className === classToSearch) {
            try {
                const id = event.target.getAttribute("data-link-id"); // get custom attribute
                const endpoint = url + id + "?" + paramApiKey + apiKey;
                const response = await fetch(endpoint);

                if (response.ok) {
                    const jsonResponse = await response.json();

                    const urlToCopy = jsonResponse.data.url;

                    _copyToClipboard(urlToCopy);

                    return;
                }

                throw new Error("Request failed");
            } catch (error) {
                console.log(error.message);
                alert(error.message);
            }
        }
    };

    return {
        start,
        record,
        stop,
        upload,
        repeatCaption,
        reset,
        download,
        copyLink
    }
})();

