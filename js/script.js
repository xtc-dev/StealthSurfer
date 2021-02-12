/*
TODO:

Make typewriter stoppable and make it cleaner using requestAnimationFrame
*/


document.addEventListener("click", function (e) {
    const el = e.path[0]
    if (el.tagName === "A") {
        const url = (new URL(el.href)).hash;
        e.preventDefault();
        history.pushState({}, undefined, url);
        webDesign.gotoPage(url);
    }
});
addEventListener('popstate', (event) => {
    const url = window.location.hash;
    webDesign.gotoPage(url);
});
(window.location.hash === "" && (window.location.hash = "index"));
const TypeWriter = function (text, element, completedText = "") {
	  if (typeof element === "string") element = document.getElementById(element);
    completedText += text[0]
    element.innerText = completedText;
    (text.length - 1 && setTimeout(() => TypeWriter(text.slice(1), element, completedText), 35));
};

const vantaload = function () {
    VANTA.GLOBE({
        el: "#vanta-canvas",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 0.00,
        scaleMobile: 1.00,
        size: 2.00,
        color: 0xbbbbbb,
        color2: 0x0,
        backgroundColor: 0x0
    });
}

const WebDesign = function () {
    localStorage.pages = localStorage.pages || "[]";
    localStorage.doCache = localStorage.doCache === undefined ? localStorage.doCache = true: localStorage.doCache;
	const pages = JSON.parse(localStorage.pages);//Example: {url: "url", page: {pageData}}
	
	this.gotoPage = function (url) {
		const pageLoad = function (data) {
            //navigation bar
            if (JSON.parse(localStorage.doCache)) {
                let navLinksLeftHtml = "";
                let navLinksRightHtml = "";
                for (let i = 0; i < data.navigationBar.leftLinks.length; i++) {
                    navLinksLeftHtml += `<a class="top-nav-links left" href="${data.navigationBar.leftLinks[i][1]}">${data.navigationBar.leftLinks[i][0]}</a>`;
                }
                for (let i = 0; i < data.navigationBar.rightLinks.length; i++) {
                    navLinksRightHtml += `<a class="top-nav-links right" href="${data.navigationBar.rightLinks[i][1]}">${data.navigationBar.rightLinks[i][0]}</a>`
                }
                document.getElementById("top-nav-links-positioner-left").innerHTML = navLinksLeftHtml;
                document.getElementById("top-nav-links-positioner-right").innerHTML = navLinksRightHtml;

                //mainpage
                document.getElementsByTagName("title")[0].innerText = data.page.title;
                document.getElementById("page-style").innerHTML = data.page.css;
                document.getElementById("main-page").innerHTML = data.page.html;
                document.getElementById("page-js").innerHTML = data.page.js
            }
            
            const script = document.createElement("script");
            script.classList.add("temp-script")
            script.innerHTML = data.page.js + "\ndocument.getElementsByClassName('temp-script')[0].remove()";
            document.body.append(script)
            
			//footer
			document.getElementById("footer").display = data.footer.display;
		}
        const pageViewed = pages.findIndex((v) => v.url === url);
		if (pageViewed !== -1) {
            pageLoad(pages[pageViewed].page);
		}
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
                const pageData = JSON.parse(xhr.responseText)
                if (pageViewed !== -1) {
                    pages[pageViewed] = {url: url, page: pageData};
                } else {
                    pages.push({url: url, page: pageData});
                    pageLoad(pageData);
                }
                localStorage.pages = JSON.stringify(pages);
			}
		};
		xhr.open("GET", "./json/" + url.slice(1) + ".json", true);
		xhr.send();
	}
};

const webDesign = new WebDesign();
const loadPage = function () {
	  webDesign.gotoPage(location.hash);
}
if (document.readyState === "complete") {
	  loadPage();
} else {
    window.addEventListener("load", function () {
        loadPage();
    })
}
/*
{
	navigationBar: {
		leftLinks: [
			["Home", "#"],
			["Games", "#"]
		],
		rightLinks: [
			["Resources", "#"],
			["Settings", "#"]
		]
	},
	page: {
		html: ``,
        css: ``,
        js: ``
	},
	footer: {
		display: "block"
	}
}
*/
