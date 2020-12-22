import { getValue } from './helpers';
import { createElement, removeElement, createEditForm, editElement } from './elementHandler';

let currentElement;

const form = document.querySelector('#form');
const listContainer = document.querySelector('.list-container');
const editForm = document.querySelector('#editForm');

const addProduct = (e) => {
  e.preventDefault();
  const { number, name, quantity, category } = getValue('');
  if (number && name && quantity && category) createElement(number, name, quantity, category);
  else document.querySelector('#error').classList.add('--active');
};

const handleClick = (e) => {
  currentElement = e.target.parentElement.parentElement;
  if (e.target.id === 'trash') {
    removeElement(currentElement);
  }
  if (e.target.id === 'edit') {
    createEditForm(currentElement);
  }
};

const getListFromLocalStorage = () => {
  let list;
  const gettingList = true;
  if (localStorage.getItem('list') !== null) {
    list = JSON.parse(localStorage.getItem('list'));
    list.forEach((element) => {
      const { number, name, quantity, category } = element;
      createElement(number, name, quantity, category, gettingList);
    });
  }
};

editForm.addEventListener('submit', (e) => editElement(e, editForm, currentElement));
form.addEventListener('submit', addProduct);
listContainer.addEventListener('click', handleClick);
document.addEventListener('DOMContentLoaded', getListFromLocalStorage);
