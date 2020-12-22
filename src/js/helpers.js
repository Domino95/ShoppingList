// kind = edit or ''
export const getValue = (kind) => {
  const category = document.querySelector(`#${kind}Category`).value;
  const number = document.querySelector(`#${kind}Number`).value;
  const name = document.querySelector(`#${kind}Name`).value;
  const quantity = document.querySelector(`input[name="${kind}Radio"]:checked`).value;
  return { number, name, quantity, category };
};

export const resetValue = () => {
  const category = document.querySelector('#Category');
  category.value = '';
  const number = document.querySelector('#Number');
  number.value = '';
  const name = document.querySelector('#Name');
  name.value = '';
};
