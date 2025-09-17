const outer = document.querySelector(".screen1")
const inner = document.querySelector(".screen2")
const allClear = document.querySelector("#clear")
const erase = document.querySelector("#erase")
const opBtn = document.querySelectorAll(".operation")
const nbr = document.querySelectorAll(".btns")
const equal = document.querySelector("#ans")
let current = "";
let previous = "";
let operation = null;
let firstValue = '';
let storage = JSON.parse(localStorage.getItem("record")) || [];

//Display on Screen
const clickToDisplay = (value) => {
    current  += value;
    if (operation) {
    inner.innerText = `${previous} ${operation} ${current}`;
  } else {
    inner.innerText = current;
  }
}

//Erase A Value
const remove = () => {
    current = current.slice(0,-1)
    if (operation) {
    inner.innerText = `${previous} ${operation} ${current}`;
  } else {
    inner.innerText = current;
  }
}

//Number Input 
nbr.forEach(item => {
    item.addEventListener("click", () => {
        let value = item.innerText;
        clickToDisplay(value);
    })
})
//Operator pass
opBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    if (current === "") return; // avoid operator first

    const disp = btn.innerText.trim();
    if(disp === "×")
        operation = "*";
    else if(disp === '÷')
        operation = "/"
    else if(disp === '+')
        operation = "+";
    else if(disp === '-')
        operation = "-";
    else
        operation = "%" 
    
     previous = current;
     current = "";
   
    inner.innerHTML = `${previous} ${disp}`;
  });
});
//Save Record
const save = (expression, result) => {
    const record = {
        expression : expression,
        result : result,
        time : new Date().toLocaleString()
    }

    storage.unshift(record)
    localStorage.setItem("record",JSON.stringify(storage));
}


//Calculation
const Result = () => {
    let value1 = parseFloat(current);
    let value2 = parseFloat(previous);

    let ans;
    switch(operation){
        case '+':
            ans = value1 + value2;
            break;
        case '-':
            ans = value2 - value1;
            break;
        case '*':
            ans = value1 * value2;
            break;
        case '/':
            ans = value1 !== 0 ? value2 / value1: 0;
            break;
        case '%':
            ans = value2 % value1;
            break;
        default:
            return; 
    }
    outer.innerText = `${value2} ${operation} ${value1}`
    inner.innerHTML = `<span class="equal-sign">=</span> ${ans}`;
   
    outer.style.left = "10%";
    outer.style.top = "55%";
    outer.style.color = "gray";
    outer.style.fontSize = "25px"
     //Save Data
    save(`${value2} ${operation} ${value1}`,`${ans}` )
    current = ans.toString();
    previous = "";
    operation =null;
}
//All Clear 
const clear = () => {
    current = '';
    previous = '';
    outer.innerText = "";
    inner.innerHTML= '';
    operation =null;
}

erase.addEventListener("click", remove)
equal.addEventListener("click",Result)
allClear.addEventListener("click",clear)