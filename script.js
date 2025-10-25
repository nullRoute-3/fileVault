// DOM refrences
const DOM = {
  fileInput: document.getElementById('fileInput'),
  button: document.getElementById('btn'),
  key: document.getElementById('key'),
  status: document.getElementById('status'),
}

//Functions and Logic
function convertToB64(file) {
  return new Promise((resolve, reject)=>{
    const reader = new FileReader()
    reader.onloadend = ()=> {
      const result = reader.result.split(',')[1]
      resolve(result)
    }
    reader.onerror = ()=> reject(reader.error)
    reader.readAsDataURL(file)
  })
}

let formData = new FormData()
async function  appendFiles(){
  formData = new FormData()
  let files = DOM.fileInput.files
  if (files.length === 0) {
    DOM.status.textContent = "No files selected"
    return false
  }
  formData.append('key',DOM.key.value)
  for (let i = 0; i < files.length; i++){
    const file = await convertToB64(files[i])
    const fileName = files[i].name
    formData.append('file',file)
    formData.append('name',fileName)
  }
  return true
}

async function fetchData(){
  DOM.status.textContent = "Fetching data..."
  DOM.button.value = "..."
  DOM.button.disabled = true
  const response = await fetch('https://script.google.com/macros/s/AKfycbw9mrYfGW1aSWVJYgLbwtsr1imf6LnKNEdag_26MwyGgtrAwJwlGZH3MW-uVkFatCiSDQ/exec', {method: "POST", body: formData})
  DOM.button.value = "Upload"
  DOM.button.disabled = false
  return await response.text()
}


DOM.button.addEventListener("click",async(event)=> {
  event.preventDefault();
  try{
    if (!await appendFiles()) return
    const fetchResult = await fetchData()
    if (fetchResult.split(" ")[0] === "Files") DOM.fileInput.value = ""
    DOM.status.textContent = fetchResult
  }catch(error){
    DOM.status.textContent = ("ClientError:" + error.message)
  }
});