const counterElements = () => {
  // reset all counters
  const allCounters = document.querySelectorAll('#allCounters');
  allCounters[0].children[1].innerText = 0;
  const allPieces = allCounters[0].children[1];
  allCounters[0].children[3].innerText = 0;
  const allWeight = allCounters[0].children[3];

  const breadValue = document.querySelectorAll('#breadValue');
  breadValue[0].children[1].innerText = 0;
  breadValue[0].children[3].innerText = 0;

  const vegetablesValue = document.querySelectorAll('#vegetablesValue');
  vegetablesValue[0].children[1].innerText = 0;
  vegetablesValue[0].children[3].innerText = 0;

  const fruitsValue = document.querySelectorAll('#fruitsValue');
  fruitsValue[0].children[1].innerText = 0;
  fruitsValue[0].children[3].innerText = 0;

  const dairyValue = document.querySelectorAll('#dairyValue');
  dairyValue[0].children[1].innerText = 0;
  dairyValue[0].children[3].innerText = 0;

  // count all value
  const quantitys = document.querySelectorAll('.quantity');
  quantitys.forEach((item) => {
    if (item.children[1].innerText === 'kilograms') {
      const kilogramsValue = item.parentElement.parentElement.children[1].children[3];
      kilogramsValue.innerText =
        parseFloat(kilogramsValue.innerText, 10) + parseFloat(item.children[0].innerText, 10);
      allWeight.innerText =
        parseFloat(allWeight.innerText, 10) + parseFloat(item.children[0].innerText, 10);
    } else {
      const piecesValue = item.parentElement.parentElement.children[1].children[1];
      piecesValue.innerText =
        parseInt(piecesValue.innerText, 10) + parseInt(item.children[0].innerText, 10);
      allPieces.innerText =
        parseInt(allPieces.innerText, 10) + parseInt(item.children[0].innerText, 10);
    }
  });
};

export default counterElements;
