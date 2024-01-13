const taregtFilePath = '/ng/_name.json';
const uploadZip = document.getElementById('upload-zip');
const resultArea = document.getElementById('result');

uploadZip.addEventListener('change', onChange);

function onChange(e) {
  const zip = e.target.files[0];
  const reader = new FileReader();
  reader.onload = onload;
  reader.readAsArrayBuffer(zip);
}

function onload(e) {
  try {
    const json = getJson(e.target.result);
    const text = getTargetText(json);
    const result = esacpe(text);
    showResult(result);
  } catch(error) {
    showResult(error);
  }
}

function getJson(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const unzip = new Zlib.Unzip(uint8Array);
  const palin = unzip.decompress(taregtFilePath);
  const jsonText = new TextDecoder().decode(palin);
  const json = JSON.parse(jsonText);
  return json;
}

function getTargetText(json) {
  return json.map(({ w }) => w).join('|');
}

function esacpe(text) {
  return text
    .replace(/\+/g, '\\+')
    .replace(/\//g, '\\/')
    .replace(/\\\\/g, '\\');
}

function showResult(text) {
  resultArea.value = text;
}

function copy() {
  resultArea.select();
  document.execCommand('copy');
}
