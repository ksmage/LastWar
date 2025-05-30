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

      rowElement.appendChild(createTd(rowData.Level,1));
      rowElement.appendChild(createTd(rowData.resource,2,"numeric",true));
      rowElement.appendChild(createTd(rowData.power,3,"numeric",false));
      rowElement.appendChild(createTd(rowData.output,4,"numeric",false));
      rowElement.appendChild(createTd(rowData.no1,5,"checkbox"));
      rowElement.appendChild(createTd(rowData.no2,6,"checkbox"));
      rowElement.appendChild(createTd(rowData.no3,7,"checkbox"));
      rowElement.appendChild(createTd(rowData.no4,8,"checkbox"));
      rowElement.appendChild(createTd(rowData.week,9,"checkbox"));

      parentElement.appendChild(rowElement);
    }
  }
}