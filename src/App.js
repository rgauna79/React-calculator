import { useState } from 'react';
import './App.css';

function Calculator() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();
  
  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer(" ");
      setExpression("0");
    } else if (symbol === "back"){
        setExpression((prev) =>
          prev.split("")
              .slice(0, prev.length - 1)
              .join("")
        );
      
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "0") {
        if (expression.charAt(0) !== "0") {
          setExpression(expression + symbol);
        }
    } else if (symbol === "=") {
        calculate();
    } else if (symbol === ".") {
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if (!lastNumber) return;
        console.log("lastNumber :>> ", lastNumber);
        if (lastNumber?.includes(".")) return;
        setExpression(expression + symbol);
    } else {
        if (expression.charAt(0) === "0") {
          setExpression(expression.slice(1) + symbol);
      } else {
          setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
      
    if (isOperator(et.charAt(et.length - 1))) return ;
  
    const parts = et.split(" ");
    const newParts = [];
    for (let i = parts.length - 1  ; i >= 0; i--) {
        if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
          newParts.unshift(parts[i]);
          let j = 0;
          let k = i - 1;
          while (isOperator(parts[k])) {
            k--;
            j++;
          }
          i -= j;
        } else {
          newParts.unshift(parts[i]);
        }
    }
        const newExpression = newParts.join("");
        if (isOperator(newExpression.charAt(0))) {
          setAnswer(eval(answer + newExpression));
        } else {
          setAnswer(eval(newExpression));
        }
        setExpression("");
      
    };

    return (
      <div className="container">
        <h1>Calculator</h1>
        
          <div id="display" className="display"  style={{ textAlign: "right" }}>
            <div id="expression" className="expression">
            {expression}
            </div>
            <div id="answer" className="answer" >
              {answer}
            </div>
          </div>
        <div className="buttons">
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="clear"
          >
            AC
          </button>
          <button id="c" className="c" onClick={() => buttonPress("back")} >
            C
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="division"
          >
            /
          </button>
          <button id="seven" onClick={() => buttonPress("7")} className="seven">
            7
          </button>
          <button id="eight" onClick={() => buttonPress("8")} className="eight">
            8
          </button>
          <button id="nine" onClick={() => buttonPress("9")} className="nine">
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="multiply"
          >
            X
          </button>
          <button id="four" onClick={() => buttonPress("4")} className="four">
            4
          </button>
          <button id="five" onClick={() => buttonPress("5")} className="five">
            5
          </button>
          <button id="six" onClick={() => buttonPress("6")} className="six">
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="minus"
          >
            -
          </button>
          <button id="one" onClick={() => buttonPress("1")} className="one">
            1
          </button>
          <button id="two" onClick={() => buttonPress("2")} className="two">
            2
          </button>
          <button id="three" onClick={() => buttonPress("3")} className="three">
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="plus">
            +
          </button>
          <button id="zero" onClick={() => buttonPress("0")} className="zero">
            0
          </button>
          <button id="decimal" onClick={() => buttonPress(".")} className="dot">
            .
          </button>
          <button id="equals" onClick={() => buttonPress("=")} className="equal">
            =
          </button>
        </div>
        <h4><em>by Roberto Gauna</em></h4>
      </div>
    );
}

//ReactDOM.render(<Calculator />, document.getElementById('root'));

export default Calculator;
