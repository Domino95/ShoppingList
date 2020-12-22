export const saveListLocalStorage = (element) => {
  let list;
  if (localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'));
  }
  list.push(element);
  localStorage.setItem('list', JSON.stringify(list));
};

export const deleteFromLocalStorage = (element) => {
  const elementValue = element.children[0].innerText;
  let removeIndex;
  if (localStorage.getItem('list') !== null) {
    const list = JSON.parse(localStorage.getItem('list'));
    list.forEach((element, index) => {
      if (element.name === elementValue) removeIndex = index;
    });
    list.splice(removeIndex, 1);
    localStorage.setItem('list', JSON.stringify(list));
  }
};

export const changeElementInLocalWhileDragging = (e) => {
  if (localStorage.getItem('list') !== null) {
    const name = e.target.children[0].innerText;
    const category = e.path[1].id;
    const list = JSON.parse(localStorage.getItem('list'));
    const modifiedList = list.map((element) => {
      if (element.name === name) {
        return { ...element, category };
      }
      return element;
    });
    localStorage.setItem('list', JSON.stringify(modifiedList));
  }
};

export const changeElementLocalStorage = (editName, number, name, quantity, category) => {
  if (localStorage.getItem('list') !== null) {
    const list = JSON.parse(localStorage.getItem('list'));
    const modifiedList = list.map((element) => {
      if (element.name === editName) {
        return { ...element, category, number, name, quantity };
      }
      return element;
    });
    localStorage.setItem('list', JSON.stringify(modifiedList));
  }
};
