function isHorizontalBottom() {
    return (scrollableContainer.scrollLeft + scrollableContainer.clientWidth) >= content.scrollWidth;
  }
  function isVerticalBottom() {
    return (scrollableContainer.scrollTop + scrollableContainer.clientHeight) >= content.scrollHeight;
}

  
  function loadMoreColumn() {
    const newColumn = document.createElement('span');
    newColumn.className = "column";
    content.appendChild(newColumn);
  }
  
  function loadMoreRow(isNewColumn) {
    let columns = document.querySelectorAll(".column");
    let max = columns[0].childElementCount;
  
    columns.forEach(column => {
        if (isNewColumn) {
            if (column.childElementCount < max) {
                let difRow = max - column.childElementCount;
                for (let i = 0; i < difRow; i++) {
                    console.log(column.childElementCount,max);
                    let newRows = document.createElement('span');
                    newRows.className = "square";
                    column.appendChild(newRows);
                }
            }
        }else{
            let newRow = document.createElement('span');
            newRow.className = "square";
            column.appendChild(newRow);
      }
    });
  }
  
  const scrollableContainer = document.getElementById('container');
  const content = document.getElementById('content');
  
  scrollableContainer.addEventListener('scroll', function () {
    if (isHorizontalBottom()) {
      loadMoreColumn();
      loadMoreRow(true);
    }
    if(isVerticalBottom()){
        loadMoreRow();
    }
  });
  
  for (let i = 0; i < 100; i++) {
    loadMoreColumn();
  }
  for (let i = 0; i < 100; i++) {
    loadMoreRow();
  }
  
