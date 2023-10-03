
var colorPicker = document.querySelector("#colorPicker");
var boldButton = document.querySelector('#bold');
var italicButton = document.querySelector('#italic');
var underlineButton = document.querySelector('#underline');
var fontButton = document.querySelector('#font');
var textField =document.querySelector('#textField');
var dropdown = document.querySelector('.btn-dropdown');
boldButton.addEventListener('click', Bold);
italicButton.addEventListener('click', MakeItalic);
underlineButton.addEventListener('click', Underline);
let isActive = false;
dropdown.addEventListener("click", function (e) {
  e.stopPropagation();
  document.querySelector('.dropdown-menu').classList.toggle("show");
});
document.addEventListener("click", function () {
  document.querySelector('.dropdown-menu').classList.remove("show");
});

colorPicker.addEventListener('input', function () {
    ChangeColor(colorPicker.value);
});


function Bold() {
    document.execCommand('bold');
    boldButton.style.background = 'grey';
}

function Underline() {
    document.execCommand('underline');
}

function MakeItalic() {
    document.execCommand('italic');
}

function ChangeColor(color) {
   
        document.execCommand('foreColor',false, color);
    
}

var newBtn= document.getElementById('new-btn');
var textDownloadBtn= document.getElementById('txt-btn');
var pdfDownloadBtn= document.getElementById('pdf-btn');


textField.addEventListener("paste", function (e) {
  e.preventDefault();

  let text = e.clipboardData.getData("text/plain");
  text = text.replaceAll("\n", "");

  document.execCommand("insertText", false, text);
});
var inputNameFile=  document.querySelector('#title-box');
function getNameFile() {
  const nameFile = inputNameFile.value;
  return nameFile;
}
inputNameFile.addEventListener("input", getNameFile);

// Tạo link download txt
function createLinkDownloadTxt() {
  const nameFile = getNameFile();
  const blob = new Blob([textField.innerText], { type: "text/plain" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `${nameFile}.txt`;
  return link;
}

// Tạo link download PDF
function createLinkDownloadPdf() {
  const nameFile = getNameFile();

  let opt = {
      filename: `${nameFile}.pdf`,
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(textField).save();
}

function createNewFile() {
 textField.innerText = "";
  document.querySelector(".words").innerText = `Số từ : 0`;
  document.querySelector(".characters").innerText =`Số ký tự: 0`;
  inputNameFile.value = "untitled";
}
newBtn.addEventListener("click", createNewFile);

textDownloadBtn.addEventListener("click", () => {
  const link = createLinkDownloadTxt();
  link.click();
});

pdfDownloadBtn.addEventListener("click", () => {
  createLinkDownloadPdf();
});


function countWords(text) {
  // Sử dụng biểu thức chính quy để tách các từ theo dấu cách
  const words = text.split(/\s+/);
  return words.length;
}

function countWordAndCharacters() {
  const text = textField.innerText;
  if (!text || text.trim() === "") {
    document.querySelector(".words").innerText = `Số từ : 0`;
    document.querySelector(".characters").innerText = `Số ký tự: 0`;
    return;
  }
  const quantityWords = countWords(text);
  const quantityCharacters = text.length;
  document.querySelector(".words").innerText = `Số từ : ${quantityWords}`;
  document.querySelector(".characters").innerText = `Số ký tự: ${quantityCharacters}`;
}

textField.addEventListener("input", countWordAndCharacters);

