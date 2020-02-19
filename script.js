const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableA = document.querySelector('.tableOfMatrixA');
const tableB = document.querySelector('.tableOfMatrixB');
const vertexValue = document.querySelector('.vertexInput');
const nameOfMatrixA = document.querySelector('.nameOfMatrixA');
const nameOfMatrixB = document.querySelector('.nameOfMatrixB');
const objValue = {};

btnCreate.addEventListener('click', getValue);
dataEntry.addEventListener('click', deleteBlock);
// test();

function getValue() {
    const valueOfInput = vertexValue.value;
    objValue.len = valueOfInput;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outMatrixA);
    btnOutMatrix.addEventListener('click', outMatrixB);
}

function deleteBlock(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
}

function outMatrixA() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];

    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }

    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i< dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < dataOfInputs.length + 1; c++) {
            if (i === 0) { // если первая строчка
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; // если первый лево боковой элемент
                }
                else {
                    th.textContent = c; // верхняя строчка заполняется 1, 2, 3, 4...
                }
                tr.appendChild(th);
            }
            else { // все остальные
                if (c == 0) { // 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    if (arr[i - 1].indexOf(c) != -1) { // беру массив данной строчки и проверяю есть ли там нужное число
                        td.textContent = 1;
                    }
                    else {
                        td.textContent = 0;
                    }
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr); // добавляем первую таблицу в фрагмент (А)
    }
    nameOfMatrixA.style.display = 'block';
    tableA.textContent = '';
    tableA.appendChild(fragment);
}

function outMatrixB() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];
    let sumOfArcs;
    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
        arr[el] = arr[el].filter(Number);
    }
    sumOfArcs = [].concat(...arr);
    sumOfArcs = sumOfArcs.filter(Number);
    let lineMas = sumOfArcs.filter(Number);
    sumOfArcs = sumOfArcs.length; // количество дуг

    let numberOfArcs = [];
    let iteration = 1;
    numberOfArcs = arr.map(el => {
        return el.map(() => {
            return iteration++;
        });
    })
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < sumOfArcs + 1; c++) {
            if (i === 0) { // если первая строчка
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; // если первый лево боковой элемент
                }
                else {
                    th.textContent = c; // верхняя строчка заполняется 1, 2, 3, 4...
                }
                tr.appendChild(th);
            }
            else { // все остальные
                if (c == 0) { // 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    td.textContent = 0;
                    if (numberOfArcs[i - 1].indexOf(c) != -1) { // беру массив данной строчки и проверяю есть ли там нужное число
                        td.textContent = 1;
                    }
                    else if (lineMas[c - 1] == i){
                        td.textContent = -1;
                    }
                    console.log(lineMas[c - 1], `${i} | ${c}`);
                    // td.textContent = `${i} | ${c}`;
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr); // добавляем первую таблицу в фрагмент (А)
    }
    nameOfMatrixB.style.display = 'block';
    tableB.textContent = '';
    tableB.appendChild(fragment);
    console.log(lineMas);
}




function test() {
    const valueOfInput = 4;
    objValue.len = valueOfInput;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outMatrixB);

    // начало другого
    let inputs = document.querySelectorAll('.inputOfNumbers')
    inputs[0].value = '2 3';
    inputs[1].value = '4';
    inputs[2].value = '2 4';
    inputs[3].value = '';

    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];
    let sumOfArcs;
    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
        arr[el] = arr[el].filter(Number);
    }
    sumOfArcs = [].concat(...arr);
    sumOfArcs = sumOfArcs.filter(Number);
    let lineMas = sumOfArcs.filter(Number);
    sumOfArcs = sumOfArcs.length; // количество дуг

    let numberOfArcs = [];
    let iteration = 1;
    numberOfArcs = arr.map(el => {
        return el.map(() => {
            return iteration++;
        });
    })
    console.table('numberOfArcs', numberOfArcs);
    console.table('arr', arr);

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < sumOfArcs + 1; c++) {
            if (i === 0) { // если первая строчка
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; // если первый лево боковой элемент
                }
                else {
                    th.textContent = c; // верхняя строчка заполняется 1, 2, 3, 4...
                }
                tr.appendChild(th);
            }
            else { // все остальные
                if (c == 0) { // 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    td.textContent = 0;
                    if (numberOfArcs[i - 1].indexOf(c) != -1) { // беру массив данной строчки и проверяю есть ли там нужное число
                        td.textContent = 1;
                    }
                    else if (lineMas[c - 1] == i){
                        td.textContent = -1;
                    }
                    console.log(lineMas[c - 1], `${i} | ${c}`);
                    // td.textContent = `${i} | ${c}`;
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr); // добавляем первую таблицу в фрагмент (А)
    }
    nameOfMatrixB.style.display = 'block';
    tableB.textContent = '';
    tableB.appendChild(fragment);
    console.log(lineMas);
}