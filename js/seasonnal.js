const createSeasonalBuildingTable = (parentElementName,obj,type) => {
  let parentElement = document.getElementById(parentElementName);
  
  if (type === "header"){
    let baseElement = document.createElement("tr");
    let counter = 0;
    for (const rowData of obj.Header){
      let colElement = document.createElement("td");
      counter++;

      colElement.classList.add("c"+ (counter).toString().padStart(2,'0'));
      colElement.classList.add("head");
      colElement.innerText = rowData;

      baseElement.appendChild(colElement);
    }

    parentElement.appendChild(baseElement);

  }else if(type === "data"){
    let counter = 0;
    for (const rowData of obj.Data){
      let rowElement = document.createElement("tr");
      counter++;

      rowElement.setAttribute("id", "r" + (counter).toString().padStart(2,'0'));

      rowElement.appendChild(createTd(rowData.Level,1,counter));
      rowElement.appendChild(createTd(rowData.resource,2,counter,"numeric",true));
      rowElement.appendChild(createTd(rowData.power,3,counter,"numeric",false));
      rowElement.appendChild(createTd(rowData.output,4,counter,"numeric",false));
      rowElement.appendChild(createTd(rowData.no1,5,counter,"checkbox"));
      rowElement.appendChild(createTd(rowData.no2,6,counter,"checkbox"));
      rowElement.appendChild(createTd(rowData.no3,7,counter,"checkbox"));
      rowElement.appendChild(createTd(rowData.no4,8,counter,"checkbox"));
      rowElement.appendChild(createTd(rowData.week,9,counter,"checkbox"));

      parentElement.appendChild(rowElement);
    }
  }
}

const createCheckboxListener = (element) => {
  element.addEventListener('click', (click_element) => {
    console.log(click_element);
    console.log(element.checked);

    //ここにイベントの内容を記述
    let id = click_element.target.id;
    let match = id.match(/r(\d*)(c\d*)/);
    let previous = element.checked;

    if (match != null){
      let rowNum = Number(match[1]);
      let colStr = match[2];

      if (rowNum > 1){
        let checkId = "r" + (rowNum - 1).toString().padStart(2,'0') + match[2];
        let targetElement = document.getElementById(checkId);
        if (!targetElement.checked){
          event.preventDefault();
          click_element.checked = previous;
        }
      }else if (rowNum < 30){
        let checkId = "r" + (rowNum + 1).toString().padStart(2,'0') + match[2];
        let targetElement = document.getElementById(checkId);
        if (targetElement.checked){
          event.preventDefault();
          click_element.checked = previous;
        }
      }
    }

  });
}