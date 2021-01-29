(() => {
    const display = document.getElementById("display");
    const operation = document.getElementById("operation");
    var storednum = null;

    function addtonum(x) {
        return (() => {
            disp(display.innerHTML.concat(String(x)))
        })
    }

    function operatorfunction(x) {
        return (() => {
            if (display.innerHTML == "" && operation.innerHTML == "") {
                // Do nothing: Wait for them to input number to operate on
            } else if (display.innerHTML != "" && operation.innerHTML == "") {
                storednum = parseFloat(display.innerHTML)
                console.log(storednum)
                updateop(x)
                disp("")
            } else if (display.innerHTML == "" && operation.innerHTML != "") {
                oupdateop(x)
            } else if (display.innerHTML != "" && operation.innerHTML != "") {
                storednum = runoperation()
                updateop(x)
                disp("")
            }
        })
    }

    function updateop(operator) {
        operation.innerHTML = storednum + " " + operator
    }

    function disp(displaymessage) {
        display.innerHTML = displaymessage
    }
    
    function runoperation() {
        var op = operation.innerHTML.slice(-1)
        if (op == "+") {
            return storednum + parseFloat(display.innerHTML)
        } else if (op == "-") {
            return storednum - parseFloat(display.innerHTML)
        } else if (op == "x") {
            return storednum * parseFloat(display.innerHTML)
        } else if (op == "÷") {
            return storednum / parseFloat(display.innerHTML)
        }
    }

    for (i = 0; i < 10; i++) {
        const x = i;
        document.getElementById(String(i)).onclick = addtonum(x);
    }

    document.getElementById(".").onclick = addtonum(".");

    const operations = ["-", "x", "÷"];
    for (i = 0; i < operations.length; i++) {
        const x = operations[i];
        document.getElementById(x).onclick = operatorfunction(x)
    }

    document.getElementById("+=").onclick = (() => {
        if (display.innerHTML == "" || operation.innerHTML == "") {
            operatorfunction("+")()
        } else {
            disp(runoperation())
            storednum = null
            operation.innerHTML = ""
        }
    })

    document.getElementById("clear").onclick = (() => {
        storednum = null;
        operation.innerHTML = ""
        disp("")
    })
})()