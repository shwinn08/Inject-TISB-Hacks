var parametersJson = {
	"size": 250, // Size of Qr Code
	"backgroundColor": "38-38-38", // Background Color Of Qr Code (In RGB)
	"qrColor": "255-255-255", // Color of Qr Code (In RGB)
	"padding": 2, // Padding    
	"data": 'https://tisb-hacks.web.app/scan.html'
};

const printBtn = document.getElementById('print')

var parameters;

var btn = document.querySelector("button");
var img = document.querySelector("img");
var input = document.querySelector("input");

btn.addEventListener("click", function(){
	parametersJson.data = input.value ||  "https://tisb-hacks.web.app/scan.html" ;
	parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
	img.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    input.value = `${Math.floor(Math.random() * 10000)}` 

});

printBtn.onclick = (e) => {
	e.preventDefault();

	const screenshotTarget = document.getElementById('final-receipt');

	html2canvas(screenshotTarget, {allowTaint: true, useCORS: true}).then((canvas) => {
		const base64image = canvas.toDataURL("image/png");
		window.location.href = base64image;
		var splitImage = base64image.split(",")[1]
		var downloadImageRef = firebase.storage().ref('/receipt').child(`receipt${Math.floor(Math.random() * 100000)}`).putString(splitImage, 'base64', {contentType:'image/png'});
		downloadImageRef.on('state_changed', snapshot => {
			snapshot.ref.getDownloadURL().then(url => {
				console.log(url)
				window.open(url, '_blank')
			})
		})
	});
}