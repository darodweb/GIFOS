export const gif = (function () {
    let myGifos;
    let favGifs;

    function _isFavorite(id) {
        favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
        return favGifs.includes(id) ? true : false;
    };

    // Function to add gif to favorite upon clicking icon
    function favorite(event, classToAdd, classToRemove) {

        favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
        const gifId = event.target.getAttribute("data-fav-id");

        if (event.target.className === classToAdd) {
            if (!favGifs.includes(gifId) && gifId !== null) favGifs.push(gifId);
            localStorage.setItem("favorites", JSON.stringify(favGifs));
            event.target.className = classToRemove;
        } else if (event.target.className === classToRemove) {
            const index = favGifs.indexOf(gifId);
            favGifs.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favGifs));
            event.target.className = classToAdd;
        }
    };

    // Function to make url downloadable
    async function _downloadBlob(url, title) {
        const a = document.createElement("a");
        const response = await fetch(url);
        const file = await response.blob();

        a.download = title;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");

        a.click();
    };

    // Adding download function to download icon
    function download(event, classToSearch) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute("data-download-url");
            const title = event.target.getAttribute("data-download-title");
            _downloadBlob(url, title);
        }
    };

    function closeModal(event, classToSearch, modal) {
        if (event.target.className === classToSearch) {
            modal.style.display = "none";
            modal.innerHTML = "";
        }
    };

    // Adding functionality to expand icon
    function expand(event, classToSearch, modal, attrUrl, attrTitle, attrUsername, attrId) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute(attrUrl);
            const title = event.target.getAttribute(attrTitle);
            const username = event.target.getAttribute(attrUsername);
            const id = event.target.getAttribute(attrId);

            let modalHtml = "";
            const isFavorite = _isFavorite(id);

            if (isFavorite) {
                modalHtml = `
                    <i class="close-modal-icon"></i>
                    <img src=${url}
                        alt=${title}
                        class="modal-img">
                    <div class="modal-footer">
                        <div class="modal-titles-container">
                            <p class="modal-username">${username}</p>
                            <p class="modal-title">${title}</p>
                        </div>
                        <div class="modal-icons-container">
                            <i class="icon-fav-true"
                                data-fav-id=${id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-download-url=${url}
                                data-download-title=${title}
                                title="Descargar"></i>
                        </div>
                    </div>`;
            } else {
                modalHtml = `
                    <i class="close-modal-icon"></i>
                    <img src=${url}
                        alt=${title}
                        class="modal-img">
                    <div class="modal-footer">
                        <div class="modal-titles-container">
                            <p class="modal-username">${username}</p>
                            <p class="modal-title">${title}</p>
                        </div>
                        <div class="modal-icons-container">
                            <i class="icon-fav-false"
                                data-fav-id=${id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-download-url=${url}
                                data-download-title=${title}
                                title="Descargar"></i>
                        </div>
                    </div>`;
            }

            modal.insertAdjacentHTML("beforeend", modalHtml);

            modal.style.display = "flex";
        }
    };

    // Adding functionality to expand icon on MyGifos
    function expandMyGifo(event, classToSearch, modal, attrUrl, attrTitle, attrUsername, attrId) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute(attrUrl);
            const title = event.target.getAttribute(attrTitle);
            const username = event.target.getAttribute(attrUsername);
            const id = event.target.getAttribute(attrId);

            let modalHtml = "";

            modalHtml = `
                <i class="close-modal-icon"></i>
                <img src=${url}
                    alt=${title}
                    class="modal-img">
                <div class="modal-footer">
                    <div class="modal-titles-container">
                        <p class="modal-username">${username}</p>
                        <p class="modal-title">${title}</p>
                    </div>
                    <div class="modal-icons-container">
                        <i class="icon-delete"
                            data-delete-id=${id}
                            title="Delete"></i>
                        <i class="icon-download"
                            data-download-url=${url}
                            data-download-title=${title}
                            title="Descargar"></i>
                    </div>
                </div>`;

            modal.insertAdjacentHTML("beforeend", modalHtml);
            modal.style.display = "flex";
        }
    };

    function deleteMyGifo(event, classToSearch) {
        if (event.target.className === classToSearch) {
            const id = event.target.getAttribute("data-delete-id");
            myGifos = localStorage.getItem("myGifos") ? JSON.parse(localStorage.getItem("myGifos")) : [];

            const index = myGifos.indexOf(id);
            myGifos.splice(index, 1);
            localStorage.setItem("myGifos", JSON.stringify(myGifos));
            location.reload();
        }
    };

    return {
        favorite,
        download,
        expand,
        closeModal,
        expandMyGifo,
        deleteMyGifo
    }
})();

