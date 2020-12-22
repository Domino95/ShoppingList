import {
  saveListLocalStorage,
  deleteFromLocalStorage,
  changeElementLocalStorage,
} from './localStorageHandler';
import counterElements from './counterElements';
import dragDropHandler from './dragHandler';
import { getValue, resetValue } from './helpers';
import trash from '../img/trash.svg';
import edit from '../img/edit.svg';

const editForm = document.querySelector('#editForm');

export const createElement = (number, name, quantity, category, gettingList) => {
  const div = document.createElement('div');
  div.classList.add('element');

  const h5 = document.createElement('h5');
  h5.innerText = `${name}`;

  const quantityContainer = document.createElement('div');
  const quantityValue = document.createElement('p');
  const quantityKind = document.createElement('p');
  quantityValue.innerText = number;
  quantityKind.innerText = quantity;
  quantityContainer.appendChild(quantityValue);
  quantityContainer.appendChild(quantityKind);
  quantityContainer.classList.add('quantity');

  const editButton = document.createElement('button');
  editButton.setAttribute('id', 'edit');
  editButton.innerHTML = `<img src=${edit} alt='edit' />`;

  const removeButton = document.createElement('button');
  removeButton.setAttribute('id', 'trash');
  removeButton.innerHTML = `<img src=${trash} alt='trash'/>`;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(removeButton);

  div.appendChild(h5);
  div.appendChild(quantityContainer);
  div.appendChild(buttonsContainer);
  div.setAttribute('draggable', true);

  const list = document.querySelector(`#${category}`);
  list.appendChild(div);
  counterElements();

  const valuesElement = {
    number,
    name,
    quantity,
    category,
  };
  // if not recreating list from LocalStorage
  if (!gettingList) {
    saveListLocalStorage(valuesElement);
  }
  // add listener for element
  dragDropHandler(div);
  document.querySelector('#error').classList.remove('--active');
  resetValue();
};

export const removeElement = (currentElement) => {
  currentElement.remove();
  deleteFromLocalStorage(currentElement);
  counterElements();
};

export const createEditForm = (currentElement) => {
  document.querySelector('body').style.overflow = 'hidden';
  document.querySelector('body').style.pointerEvents = 'none';
  // get values from edited element
  const editCategory = currentElement.parentElement.id;
  const editName = currentElement.children[0].innerText;
  const editNumber = currentElement.children[1].children[0].innerText;
  const editQuantity = currentElement.children[1].children[1].innerText;

  // put values to form
  editForm.parentElement.classList.add('--open');
  editForm.children[0].children[1].value = editCategory;
  editForm.children[1].children[1].value = editName;
  editForm.children[2].children[1].value = editNumber;
  if (editQuantity === 'kilograms') {
    editForm.children[4].children[1].checked = true;
  } else editForm.children[3].children[1].checked = true;
};

export const editElement = (e, editForm, currentElement) => {
  e.preventDefault();
  const { number, name, quantity, category } = getValue('edit');
  if (number && name && quantity && category) {
    changeElementLocalStorage(
      currentElement.children[0].innerText,
      number,
      name,
      quantity,
      category
    );
    // if category is different => delete and make new element in new category
    if (category !== currentElement.parentElement.id) {
      currentElement.remove();
      deleteFromLocalStorage(currentElement);
      createElement(number, name, quantity, category);
    } else {
      currentElement.children[0].innerText = name;
      currentElement.children[1].children[0].innerText = number;
      currentElement.children[1].children[1].innerText = quantity;
    }
    counterElements();
    editForm.parentElement.classList.remove('--open');
    document.querySelector('#editError').classList.remove('--active');
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('body').style.pointerEvents = 'all';
  } else document.querySelector('#editError').classList.add('--active');
};
