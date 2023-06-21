// Best regards to Josh Wardle the creator of Wordle

const password = "jwardle";
const maxLength = 15;


var isEyeOpen = false;

const passwordDiv = document.getElementById("password");

passwordDiv.addEventListener("input", function() {
  
  var content = removeSpansAndGetContent(this);
  content = content.slice(0, maxLength).replace(/\n/g, "");
  var hiddenText = "";

  let button = document.getElementById("loginButton");
  
  button.disabled = !(content == password);
  
  for (var i = 0; i < content.length; i++) {

    let color = '#787c7e';

    if (i > password.length-1) {
      color = 'red';
    } else if (content[i] == password [i]) {
      color = '#6AAA64';
    } else if(password.includes(content[i]) && checkBefore(content[i], content.slice(0, i)) && checkAfter(content[i], content.slice(i+1), i+1)) {
      color = '#c9b458';
    }
    
    hiddenText += '<span class="box" style = "background-color:' + color + '">' + content[i] + '</span>'
  }

  this.innerHTML = hiddenText; 
  this.focus();
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
});

function checkBefore(char, before) {
  return charCount(char, before) < charCount(char, password);
}

function checkAfter(char, after, index) {
  return !Array.from(after).some((c, i) => {
    return (c == char && c == password[index + i]);
  })
}

function charCount(char, text) {
  return (text.split(char).length - 1);
}

function removeSpansAndGetContent(div) {
  var spanElements = div.getElementsByTagName("span");
  for (var i = spanElements.length - 1; i >= 0; i--) {
    var span = spanElements[i];
    var textContent = span.textContent || span.innerText;
    var textNode = document.createTextNode(textContent);

    if([...div.childNodes].includes(span))
    div.replaceChild(textNode, span);
  }

  var content = div.textContent || div.innerText;
  return content;
}

function eye() {
  isEyeOpen = !isEyeOpen;

  let eye = document.getElementById("eye");

  if(isEyeOpen) {
    eye.src = "icons/openEye.png";
    passwordDiv.style.webkitTextSecurity = "none";
  } else {
    eye.src = "icons/eye.png";
    passwordDiv.style.webkitTextSecurity = "disc";
  }
}