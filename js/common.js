//templateの記述サンプル
//let headerClosure = template`<td class="${0} head">${1}</td>`
//let dataClosure = template`<td class="${0} tableCell">${1}</td>`

const template = (strings, ...keys) => {
  return (...values) => {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });

    return result.join("");
  };
};

// #region WebEelemnt
const createSpan = (className,value) => {
  let newElement = document.createElement("span");

  newElement.setAttribute("class",className);
  newElement.dataset.display= value;

  return newElement;
};

const createTd = (data, colNum, type, isResource) => {
  let td = document.createElement("td");
  td.classList.add("c" + colNum.toString().padStart(2,'0'));
  td.classList.add("tableCell");

  if (type === "numeric"){
    td.dataset.type = "numeric";
    td.dataset.value = data;
    td.classList.add("data");
    
    if(isResource){
      td.dataset.target = "resource";
    }
  }else if (type === "checkbox"){
    let checkBox = document.createElement("input");
    
    checkBox.setAttribute("type", "checkbox");
    td.classList.add("data");
    td.appendChild(checkBox);
  }else {
    td.innerText = data;
  }
  return td;
};
// #endregion


const changeUnit = (speedup,valuedown) =>{
  let dataElement = document.querySelectorAll("td.data");
  let speedupCounter = 1 + speedup / 100;
  let valuedownCounter = 1 - Math.abs(valuedown) / 100;

  for(let i=0;i < dataElement.length; i++){
    let element = dataElement[i];
    if(element.dataset.type === 'numeric' && element.classList.contains("unitChange")){
      let value = element.dataset.value.replaceAll(',','');

      if (element.dataset.target === 'resource'){
        value = Math.ceil(value * valuedownCounter);
      }

      let dataSpan = null;
      let unitSpan = null;
      if (value >= 1000000000){
        dataSpan = createSpan("data",(value/1000000000).toFixed(1));
        unitSpan = createSpan("unit","G");
      } 
      else if (value >= 1000000) {
        dataSpan = createSpan("data",(value/1000000).toFixed(1));
        unitSpan = createSpan("unit","M");
      }
      else if (value >= 1000) {
        dataSpan = createSpan("data",(value/1000).toFixed(1));
        unitSpan = createSpan("unit","K");
      }
      else {
        dataSpan = createSpan("data",value);
        unitSpan = createSpan("unit"," ");
      }

      element.appendChild(dataSpan);
      element.appendChild(unitSpan);

    }else if(element.dataset.type === 'numeric'){
      let value = element.dataset.value.replaceAll(',','');

      if (element.dataset.target === 'resources'){
        value = Math.ceil(value * valuedownCounter);
      }

      let dataSpan = createSpan("data",value);
      element.appendChild(dataSpan);
    }
  }
};

// #region WebRequest
const loadJson = async(url) => {
  const request = new Request(url);

  //まだURLに到達できない時のコードがない。
  const response = await fetch(request);
  const data = await response.json();

  return data;
};
// #endregion
