// ==UserScript==
// @name        rentashop adhoc invoice
// @namespace   http://localhost
// @description proforma generation rentashop
// @include     http://w4.rentashop.fr/admin/commande.php?idcom=*
// @version     1
// @grant       none
// @require     https://github.com/devongovett/pdfkit/releases/download/v0.7.1/pdfkit.js
// @require     https://github.com/devongovett/pdfkit/releases/download/v0.7.1/pdfkit.js.map
// @require     https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js
// ==/UserScript==

// Proforma generation

function finddata() {
    // Find data to fill in the proforma
    // <h1 class="inbl left">Commande n&deg; 1617</h1>
    commande = document.querySelector("h1").innerHTML.match(/[0-9]{1,6}/)
    myintituleOptionList = document.querySelectorAll("span.intituleOption");
    for ( myintituleOption of myintituleOptionList ) {
	switch (myintituleOption.innerHTML.trim()) {
	case 'total facture ttc':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'mode de réglement':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'total avoir ttc':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'total facture tva':
	    // SPAN box
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.querySelector("span").innerHTML);
	    break;
	case 'livraison':
	    // needs trimming
	    //alert(myintituleOption.innerHTML.trim() + ' : ' + myintituleOption.nextElementSibling.innerHTML.trim());
	    break;
	case 'Frais de port':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Poids':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Articles':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Code promo':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Remise article':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Remise frais de port':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'n° suivi':
	    // DEBUG
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'IP':
	    // complex
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'provenance':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'partenaire':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Téléchargement':
	    // complex
	    downloadbox = myintituleOption
	    //myintituleOption.nextElementSibling.innerHTML = myintituleOption.nextElementSibling.innerHTML + '/ <a href="' + url + '">Pro Forma</a>';
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Nom client':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Mail client':
	    // A box
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.querySelector("a").innerHTML);
	    break;
	case 'CA cumulé':
	    // strong box
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.querySelector("strong.biggest").innerHTML);
	    break;
	case 'CA hors FP':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'avoir cumulé':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Mail commande':
	    // complex
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Adresse de facturation':
	    // complex
	    // alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    mySubintituleOptionList = myintituleOption.nextElementSibling.querySelectorAll("span");
	    for ( mySubintituleOption of mySubintituleOptionList ) {
		switch (mySubintituleOption.innerHTML.trim()) {
		case 'Société':
		    // alert(mySubintituleOption.nextElementSibling.value);
		    // alert(mySubintituleOption.nextElementSibling.outerHTML);
		    // alert(mySubintituleOption.nextElementSibling.innerHTML);
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Prénom':
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Nom':
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Adresse':
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'CP':
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Ville':
		    //alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Pays':
		    // alert(mySubintituleOption.nextElementSibling.options[mySubintituleOption.nextElementSibling.selectedIndex].text);
		    //alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value + ' - ' + mySubintituleOption.nextElementSibling.options[mySubintituleOption.nextElementSibling.selectedIndex].text);
		    break;
		case 'Téléphone':
		    //alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		default:
		    //alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    //alert(myintituleOption.innerHTML + ' : ' + 'other : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.innerHTML);
		}
	    }
	    break;
	case 'Société':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Prénom':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Nom':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Adresse':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'CP':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Ville':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Pays':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Téléphone':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Adresse de livraison':
	    // complex
	    // alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    mySubintituleOptionList = myintituleOption.nextElementSibling.querySelectorAll("span");
	    for ( mySubintituleOption of mySubintituleOptionList ) {
		switch (mySubintituleOption.innerHTML.trim()) {
		case 'Société':
		    // alert(mySubintituleOption.nextElementSibling.value);
		    // alert(mySubintituleOption.nextElementSibling.outerHTML);
		    // alert(mySubintituleOption.nextElementSibling.innerHTML);
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Prénom':
		    Prénom = mySubintituleOption.nextElementSibling.value
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Nom':
		    Nom = mySubintituleOption.nextElementSibling.value
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Adresse':
		    Adresse = mySubintituleOption.nextElementSibling.value
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'CP':
		    CP = mySubintituleOption.nextElementSibling.value
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Ville':
		    Ville = mySubintituleOption.nextElementSibling.value
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		case 'Pays':
		    Pays = mySubintituleOption.nextElementSibling.options[mySubintituleOption.nextElementSibling.selectedIndex].text
		    // alert(mySubintituleOption.nextElementSibling.options[mySubintituleOption.nextElementSibling.selectedIndex].text);
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value + ' - ' + mySubintituleOption.nextElementSibling.options[mySubintituleOption.nextElementSibling.selectedIndex].text);
		    break;
		case 'Téléphone':
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    break;
		default:
		    // alert(myintituleOption.innerHTML + ' : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.value);
		    // alert(myintituleOption.innerHTML + ' : ' + 'other : ' + mySubintituleOption.innerHTML + ' : ' + mySubintituleOption.nextElementSibling.innerHTML);
		}
	    }
	    break;
	case 'Société':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Prénom':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Nom':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Adresse':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'CP':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Ville':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Pays':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Téléphone':
	    //alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Commande':
	    // alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'Facture':
	    dateFacture = myintituleOption.nextElementSibling.innerHTML
	    // alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	case 'PayPal':
	    // alert(myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	    break;
	default:
	    // alert('other : ' + myintituleOption.innerHTML + ' : ' + myintituleOption.nextElementSibling.innerHTML);
	}
    }
}

function addproformalink() {
    // Add the ProForma download link
    downloadbox.nextElementSibling.innerHTML = downloadbox.nextElementSibling.innerHTML + '/ <a href="' + url + '">PF</a>';
}

finddata();

//function newFile(data) {
//    var json = JSON.stringify(data);
//    var blob = new Blob([json], {type: "octet/stream"});
//    var url  = window.URL.createObjectURL(blob);
//    window.location.assign(url);
//}
// PDFDocument = require 'pdfkit';

// Create a document

doc = new PDFDocument();

stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(15)
    .text('OEYE SARL capital 75000€', 100, 80)
    .text('(RCS LYON 510 179 33)', 100, 100)
    .text('320, avenue Berthelot', 100, 120)
    .text('69008 LYON – FRANCE', 100, 140)
    .text('VAT : FR64510179633', 100, 160)
    .text('Porto, le ' + dateFacture, 200, 200)
    .text('PROFORMA FA-' + commande, 100, 220)
    .text(Prénom + ' ' + Nom, 100, 240)
    .text(Adresse, 100, 260)
    .text(CP + ' ' + Ville, 100, 280)
    .text(Pays, 100, 300)

//doc.pipe(blobStream());

//blobStream = require 'blob-stream'

// Pipe it's output somewhere, like to a file or HTTP response
// See below for browser usage
//doc.pipe fs.createWriteStream('output.pdf');

// Embed a font, set the font size, and render some text
// doc.font('fonts/PalatinoBold.ttf')
//    .fontSize(25)
//    .text('Some text with an embedded font!', 100, 100)

// Add another page
// doc.addPage()
//    .fontSize(25)
//    .text('Here is some vector graphics...', 100, 100)

// Draw a triangle
//doc.save()
//    .moveTo(100, 150)
//    .lineTo(100, 250)
//    .lineTo(200, 250)
//    .fill("#FF3300")

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
//doc.scale(0.6)
//    .translate(470, -380)
//    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//    .fill('red', 'even-odd')
//    .restore()

// Add some text with annotations
//doc.addPage()
//    .fillColor("blue")
//    .text('Here is a link!', 100, 100)
//    .underline(100, 100, 160, 27, color: "#0000FF")
//    .link(100, 100, 160, 27, 'http://google.com/')

// Finalize PDF file

doc.end();

stream.on('finish', function () {
    alert('finish');
    url = stream.toBlobURL('application/pdf');
});

//blob = stream.toBlob('application/pdf');
//stream.on 'finish'
//url = stream.toBlobURL('application/pdf');
//url = doc.toBlobURL('application/pdf');

function dladhocpdf() {
    window.location.assign(url);
}

// window.location.assign(url);

//alert(stream.toBlobURL);
//alert(url);
//alert(blob);
alert('DEBUG');

addproformalink();

function scrapbook() {
    alert('DEBUG');
}

//scrapbook();

//alert('DEBUG');
exit()

function addCloneItemLink() {
    // Add a Clone Item link to the Item Display Page
    // Locate New Item Links group
    alert('Hello World!');
    //myNewItemLinkList = document.querySelectorAll("[accesskey=N]");
    //myNewItemLink = myNewItemLinkList[1].parentNode.parentNode.parentNode.parentNode.parentNode;
    // alert(myNewItemLink.outerHTML)
    // Locate toolbar Separator 
    //mySeparator = myNewItemLink.nextElementSibling.cloneNode(true);
    // Insert a toolbar Separator for prettiness
    //myNewItemLink.parentNode.insertBefore(mySeparator,myNewItemLink);
    // Clone the New Item Links group onto Clone Item Links group
    //myCloneItemLink = myNewItemLink.cloneNode(true);
    // Change URI and appearance of the Clone Item Links group
    //changeNewtoClone(myCloneItemLink);
    // Insert the Clone Item Link group before the separator
    //myNewItemLink.parentNode.insertBefore(myCloneItemLink,mySeparator);
}

//alert('Hello World!');
//myNewItemLinkList = document.querySelectorAll("[class=\"intituleOption\"]");
myintituleOptionList = document.querySelectorAll("span.intituleOption");
for ( myintituleOption of myintituleOptionList ) {
    myintituleOptionValue = myintituleOption.innerHTML
    switch (myintituleOptionValue) {
    case 'Téléchargement':
	mydocslinklist = myintituleOption.nextElementSibling.querySelectorAll('a')[0].parentNode;
	//alert(myintituleOption.nextElementSibling.innerHTML);
	//alert(mydocslinklist[0].innerHTML);
	myInvoiceLink = mydocslinklist[0]
	mySeparator = myInvoiceLink.nextElementSibling.cloneNode(true);
	alert(mySeparator.outerHTML);
	myAdhocInvoiceLink = myInvoiceLink.cloneNode(true);
	//myInvoiceLink.innerHTML = "Invoice";
	myInvoiceLink.innerHTML = "Facture Ad Hoc";
	mydocslinklist.insertBefore(myInvoiceLink,myInvoiceLink);
	alert(myAdhocInvoiceLink.outerHTML);
	// TODO add clone link as a context menu for each item
	// alert('Simpler Landing Page')
	break;
    //default:
	//alert('other');
	//break;
    }
}
alert(myDocsLinkList[0].innerHTML);
myInvoiceLink = document.querySelectorAll("a[href^='/pdf/pdf.php?F=']");
//mySeparator = myInvoiceLink.previousElementSibling.cloneNode(true);
//alert(mySeparator);
//alert(myInvoiceLink.innerHTML);
myAdhocInvoiceLink = myInvoiceLink[0].cloneNode(true);
myInvoiceLink[0].innerHTML = "Test";
alert(myAdhocInvoiceLink.innerHTML);
myInvoiceLink.insertBefore(myAdhocInvoiceLink.outerHTML,myInvoiceLink[0]);
//alert(myInvoiceLink.innerHTML);
myAdhocInvoiceLink(document.createElement("A"));

myInvoiceLink.insertBefore(document.createTextNode("Water"));
//alert(myInvoiceLink.innerHTML);

//addCloneItemLink();
//alert('Hello World!');

//alert('Hello World!');
exit();
alert('Hello World!');

erro;
alert('Hello World!');

pathArray = window.location.pathname.split('/')
myPage = pathArray[pathArray.length - 1]

switch (myPage) {
case 'AllItems.aspx':
    // TODO add clone link as a context menu for each item
    // alert('Simpler Landing Page')
    break;
case 'Personal.aspx':
    // TODO add clone link as a context menu for each item
    // plugColGroups() // Plug the addCloneItemLinks script to ExpCollGroup invocation
    // addCloneMenuItemLink() // add a Clone Item link to the Item Menu Link
    // alert('Landing Page')
    break;
case 'DispForm.aspx':
    autoCloneItem() // Automatically Clone
    addCloneItemLink() // add a Clone Item link to the Item Display Page
    //alert ('Item display page')
    //debugalert()
    break;
case 'NewForm.aspx':
    autoFillNewItem() // Automatically fill the New Item Form from get query
    break;
default:
    alert ('Page ' + myPage + ' Unkown to pro@ction Grease Monkey enhancements')
    break;
}

function autoCloneItem() {
    if (getparam('gmaction') == 'clone') {
	getCloneURI()
	window.location.replace('NewForm.aspx?' + myGetQuery);
    }
}

function autoFillNewItem() {
    if (getparam('newformautofill') != 'true') {
	return
    }
    myItemPropertiesElementsList = document.querySelectorAll("[class=ms-formbody]")
    for ( myItemPropertyElement of myItemPropertiesElementsList) {
	setPropertyFieldInternalName(myItemPropertyElement) // get Property Field Internal Name
	// For some reason the Internal name is weird, but at least it seems consistent on every page
	fillFormField(myItemPropertyElement) // fill in the form
    }
}

function fillFormField(myFormField) {
    mySelectFormsList = myFormField.getElementsByTagName('select');
    for (mySelectForm of mySelectFormsList) {
	myOptionsList = mySelectForm.getElementsByTagName('option');
	for (myOption of myOptionsList) {
	    if (myOption.innerHTML == getparam(myFormField.fieldInternalName)) {
		mySelectForm.value = myOption.value;
	    }
	}
    }
    myInputFormsList = myFormField.getElementsByTagName('input');
    for (myInputForm of myInputFormsList) {
	if (myInputForm.getAttribute('type') == 'radio') {
	    myFormLabel=myInputForm.parentNode.getElementsByTagName('label');
	    if (myFormLabel[0].innerHTML == getparam(myFormField.fieldInternalName)) {
		myInputForm.checked = "true";
	    }
	}
	if (myInputForm.getAttribute('type') == 'text') {
	    myInputForm.value = getparam(myFormField.fieldInternalName);
	}
	if (myInputForm.getAttribute('type') == 'checkbox') {
	    myInputForm.checked = getparam(myFormField.fieldInternalName);
	}
    }
}

function getparam(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function plugColGroups() {
    //alert('debug')
    myCollGroupLinkList = document.querySelectorAll("[onclick^='javascript:E']");
    //myItemMenuList = document.querySelectorAll("[class=SrvMenuUI]");
    for (myCollGroupLink of myCollGroupLinkList) {
	myAttribute = myCollGroupLink.getAttribute('onclick').replace(/return false;/ig, 'addCloneMenuItemLink(); return false;')
	myCollGroupLink.setAttribute('onclick', myAttribute)
	//alert(myAttribute)
	//replace(/[\s\S]*<!--/ig, '').replace(/-->[\s\S]*/ig, '')
	//myAttribute = myAttrreplace(//ig, '').replace(/-->[\s\S]*/ig, '')
    }
}

function addCloneMenuItemLink() {
    // Add a Clone Item link to the Item Menu Dropdown
    // Locate Item MEnu Dropdowns
    alert('test')
    myItemMenuList = document.querySelectorAll("[class=SrvMenuUI]");
    alert(myItemMenuList.length)
    for (myItemMenu of myItemMenuList) {
	alert(myItemMenu.getAttribute('onclick'))
    }
    //return()
    myNewItemLink = myNewItemLinkList[1].parentNode.parentNode.parentNode.parentNode.parentNode;
    // alert(myNewItemLink.outerHTML)
    // Locate toolbar Separator 
    mySeparator = myNewItemLink.nextElementSibling.cloneNode(true);
    // Insert a toolbar Separator for prettiness
    myNewItemLink.parentNode.insertBefore(mySeparator,myNewItemLink);
    // Clone the New Item Links group onto Clone Item Links group
    myCloneItemLink = myNewItemLink.cloneNode(true);
    // Change URI and appearance of the Clone Item Links group
    changeNewtoClone(myCloneItemLink);
    // Insert the Clone Item Link group before the separator
    myNewItemLink.parentNode.insertBefore(myCloneItemLink,mySeparator);
}

function addCloneItemLink() {
    // Add a Clone Item link to the Item Display Page
    // Locate New Item Links group
    myNewItemLinkList = document.querySelectorAll("[accesskey=N]");
    myNewItemLink = myNewItemLinkList[1].parentNode.parentNode.parentNode.parentNode.parentNode;
    // alert(myNewItemLink.outerHTML)
    // Locate toolbar Separator 
    mySeparator = myNewItemLink.nextElementSibling.cloneNode(true);
    // Insert a toolbar Separator for prettiness
    myNewItemLink.parentNode.insertBefore(mySeparator,myNewItemLink);
    // Clone the New Item Links group onto Clone Item Links group
    myCloneItemLink = myNewItemLink.cloneNode(true);
    // Change URI and appearance of the Clone Item Links group
    changeNewtoClone(myCloneItemLink);
    // Insert the Clone Item Link group before the separator
    myNewItemLink.parentNode.insertBefore(myCloneItemLink,mySeparator);
}

function changeNewtoClone(myCloneItemLink) {
    getCloneURI()
    myCloneItemLinkList = myCloneItemLink.getElementsByTagName('A');
    for (var i = 0; i < myCloneItemLinkList.length; ++i) {
	myCloneItemLinkList[i].setAttribute('href','NewForm.aspx?' + myGetQuery); // add the getquery to new formURL
	myCloneItemLinkList[i].setAttribute('title','Clone Item'); // Cahnge alt text to Clone Item
	myCloneItemLinkList[i].removeAttribute('accesskey'); // remove the shortcut key
	myCloneItemLinkImgList = myCloneItemLinkList[i].getElementsByTagName('IMG'); //Change the alt-text for the image
	//alert(myCloneItemLinkImgList.length);
	for (var j = 0; j < myCloneItemLinkImgList.length; ++j) {
	    //alert('j = ' + j);
	    myCloneItemLinkImgList[j].setAttribute('alt', 'Clone Item');
	    //alert(myCloneItemLinkImgList[j].outerHTML);
	}
	if (myCloneItemLinkList[i].innerHTML == 'New Item') {
	    myCloneItemLinkList[i].innerHTML = 'Clone Item'; // Change the Link text
	}
    }
    //alert(myCloneItemLink.outerHTML);
}

function getCloneURI() {
    // Loop trought the Item Properties
    myGetQuery = [encodeURIComponent('newformautofill') + "=" + encodeURIComponent('true')]
    //myGetQuery = []
    myItemPropertiesElementsList = document.querySelectorAll("[id^=SPField]")
    for ( myItemPropertyElement of myItemPropertiesElementsList) {
	setPropertyFieldInternalName(myItemPropertyElement) // get Property Field Internal Name
	// For some reason the Internal name is weird, but at least it seems consistent on every page
	setPropertyValue(myItemPropertyElement) // get Property Value
	// feed the FieldInternalName=FieldValue pairs to the query Array
	myGetQuery.push(encodeURIComponent(myItemPropertyElement.FieldInternalName) + "=" + encodeURIComponent(myItemPropertyElement.FieldValue));
	//alert(myItemPropertyElement.FieldInternalName)
	//alert(myItemPropertyElement.FieldValue)
	//alert(myItemPropertyElement.outerHTML)
    }
    // format the GetQuery Array onto URI
    myGetQuery = myGetQuery.join("&");
    //alert(myGetQuery)
    //alert(myItemPropertiesList.length)
    //debugalert
}

function setPropertyFieldInternalName(myItemPropertyElement) {
    // get only the comments from the element
    myComments = myItemPropertyElement.innerHTML.replace(/[\s\S]*<!--/ig, '').replace(/-->[\s\S]*/ig, '')
    // extract FieldInternalName from the comments
    myItemPropertyElement.FieldInternalName = myComments.replace(/[\s\S]*FieldInternalName="/, '').replace(/"[\s\S]*/, '')
}

function setPropertyValue(myItemPropertyElement) {
    switch (myItemPropertyElement.children.length) {
	case 0:
	// If there are no children elements, we just have to remove comments and trim blanks to get the Value
	myItemPropertyElement.FieldValue = myItemPropertyElement.innerHTML.replace(/<!--[\s\S]*-->/ig, '').replace(/^(&nbsp;|[\s])*/ig, '').replace(/(&nbsp;|[\s])*$/ig, '');
	break;
	case 1:
	// If ther is a child element, then the text of the hyperlink is the Value
	myItemPropertyElement.FieldValue = myItemPropertyElement.firstElementChild.innerHTML
	break;
    }
}

function debugalert() {
    alert ('DEBUG')
}

//debugalert()

exit()

//alert('Hello World!')
//alert(window.location.protocol)
//alert(window.location.host)
pathArray = window.location.pathname.split('/')
alert(pathArray[pathArray.length - 1])

Exit

function getBookMarkVarName(myBookMarkNode) {
  myBookMarkNode.bookMarkName = myBookMarkNode.getAttribute("name");
}

function getBookMarkVarValue(myBookMarkNode) {
  var myBookMarkVarValue = myBookMarkNode.parentNode.parentNode.nextElementSibling;
  if (myBookMarkVarValue.children.length > 0) {
    myBookMarkVarValue = myBookMarkVarValue.firstElementChild;
  }
  myBookMarkVarValue = myBookMarkVarValue.innerHTML;
  myBookMarkNode.bookMarkVarValue = myBookMarkVarValue.replace(/<!--[\s\S]*-->/ig, '').replace(/^(&nbsp;|[\s])*/ig, '').replace(/(&nbsp;|[\s])*$/ig, '');
}

var myBookMarkNodeList = document.querySelectorAll("[name^=SPBookmark_]");

var myGetQuery = []

for (var i = 0; i < myBookMarkNodeList.length; ++i) {
  getBookMarkVarName(myBookMarkNodeList[i]);
  if ( myBookMarkNodeList[i].bookMarkName != "SPBookmark_Attachments") {
    getBookMarkVarValue(myBookMarkNodeList[i]);
    myGetQuery.push(encodeURIComponent(myBookMarkNodeList[i].bookMarkName) + "=" + encodeURIComponent(myBookMarkNodeList[i].bookMarkVarValue));
  }
}
myGetQuery = myGetQuery.join("&");
//alert(myGetQuery);

var myNewItemLinkList = document.querySelectorAll("[accesskey=N]");
var myNewItemLink = myNewItemLinkList[1].parentNode.parentNode.parentNode.parentNode.parentNode;
var mySeparator = myNewItemLink.nextElementSibling.cloneNode(true);
myNewItemLink.parentNode.insertBefore(mySeparator,myNewItemLink);
var myCloneItemLink = myNewItemLink.cloneNode(true);
myCloneItemLinkList = myCloneItemLink.getElementsByTagName('A');
for (var i = 0; i < myCloneItemLinkList.length; ++i) {
  myCloneItemLinkList[i].setAttribute('href','NewForm.aspx?' + myGetQuery);
  myCloneItemLinkList[i].setAttribute('title','Clone Item');
  myCloneItemLinkList[i].removeAttribute('accesskey');
  myCloneItemLinkImgList = myCloneItemLinkList[i].getElementsByTagName('IMG');
  //alert(myCloneItemLinkImgList.length);
  for (var j = 0; j < myCloneItemLinkImgList.length; ++j) {
    //alert('j = ' + j);
    myCloneItemLinkImgList[j].setAttribute('alt', 'Clone Item');
    //alert(myCloneItemLinkImgList[j].outerHTML);
  }
  if (myCloneItemLinkList[i].innerHTML == 'New Item') {
    myCloneItemLinkList[i].innerHTML = 'Clone Item';
  }
  //alert(myCloneItemLinkList[i].outerHTML);
}

//alert(myCloneItemLinkList.length);
myNewItemLink.parentNode.insertBefore(myCloneItemLink,mySeparator);
//alert(myCloneItemLink.innerHTML);

erro;

var Category = document.querySelectorAll("[name=SPBookmark_Category]");
var Category = Category[0].parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
//var Category = Category[0].parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.outerHTML;
//alert(Category);

var WorkType = document.querySelectorAll("[name=SPBookmark_Completed]");
var WorkType = WorkType[0].parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
var WorkType = WorkType.replace(/<!--[\s\S]*-->/ig, '').replace(/-->/ig, '');
//alert(WorkType);

var Client = document.querySelectorAll("[name=SPBookmark_Client0]");
var Client = Client[0].parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
var Client = Client.replace(/<!--[\s\S]*-->/ig, '').replace(/-->/ig, '');
//alert(Client);

var ProjectTicketNumber = document.querySelectorAll("[name=SPBookmark_Title]");
var ProjectTicketNumber = ProjectTicketNumber[0].parentNode.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
var ProjectTicketNumber = ProjectTicketNumber.replace(/<!--[\s\S]*-->/ig, '').replace(/-->/ig, '');
alert(ProjectTicketNumber);

