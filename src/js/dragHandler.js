import { changeElementInLocalWhileDragging } from './localStorageHandler';
import counterElements from './counterElements';

const dragDropHandler = (element) => {
  element.addEventListener('dragstart', () => {
    element.classList.add('dragging');
  });

  element.addEventListener('dragend', (e) => {
    element.classList.remove('dragging');
    changeElementInLocalWhileDragging(e);
    counterElements();
  });

  const containers = document.querySelectorAll('.elements-container');
  containers.forEach((item) => {
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = DragAfterElement(item, e.clientY);
      const currentElement = document.querySelector('.dragging');
      if (afterElement === null) {
        item.appendChild(currentElement);
      } else {
        item.insertBefore(currentElement, afterElement);
      }
    });
  });
};

const DragAfterElement = (container, y) => {
  const elements = [...container.querySelectorAll('.element:not(.dragging)')];
  return elements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export default dragDropHandler;
