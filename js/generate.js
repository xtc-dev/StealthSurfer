window.obj = {
	navigationBar: {
		leftLinks: [
			
		],
		rightLinks: [
			
		]
	},
	page: {
        title: document.getElementsByTagName("title")[0].innerHTML,
		html: document.getElementById("main-page").innerHTML,
		css: document.getElementById("page-style").innerText,
        js: document.getElementById("page-script").innerText
	},
	footer: {
		display: document.getElementById("footer").display
	}
};
[...document.getElementsByClassName("top-nav-links")].forEach((v) => {
    if (v.classList[1] === "left") {
        window.obj.navigationBar.leftLinks.push([v.innerText, v.href])
    } else {
        window.obj.navigationBar.rightLinks.push([v.innerText, v.href])
    }
})
console.log(JSON.stringify(window.obj))