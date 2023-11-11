document.addEventListener("DOMContentLoaded", () => {
  
  // fetching values for "From" label

  document.getElementById("from").addEventListener("click", () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aP6V4hmchiK4B5gGh6FjpuFAfHq54AKe");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }
  
  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then(response => response.json())
    .then((result) => {
      // fromSymbolValue = {};
        for(i in result.symbols){
          const node = document.createElement("option");
          const node1 = document.getElementById("from").appendChild(node);
          node1.innerHTML = i;
          // fromSymbolValue[i] = result.symbols[i];
          // return fromSymbolValue;
        }
      }).catch(error => console.log('error', error));
  });
  // console.log(fromSymbolValue);
  // fetching values for "To" label

  document.getElementById("to").addEventListener("click", () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aP6V4hmchiK4B5gGh6FjpuFAfHq54AKe");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }
  
  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then(response => response.json())
    .then((result) => {
      console.log(result);
        for(i in result.symbols){
          const node2 = document.createElement("option");
          const node3 = document.getElementById("to").appendChild(node2);
          node3.innerHTML = i;
        }
    }).catch(error => console.log('error', error));
  });

  // fetching for the converted value

  document.getElementById("currency-converter").addEventListener("submit", (event) => {
    event.preventDefault();
    let { target: {From , To, Amount } } = event;
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aP6V4hmchiK4B5gGh6FjpuFAfHq54AKe");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${To.value}&from=${From.value}&amount=${Amount.value}`, requestOptions)
      .then(response => response.json())
      .then((result_object) => {
        console.log(result_object);
        if (Amount.value) {
          document.getElementById("result_output").style.display = "revert";
          document.getElementById("info").style.display = "revert";
          document.getElementById("result").style.display = "revert";
          document.getElementById("output").innerHTML = `${Amount.value} ${From.value} = <span style="color:yellow;font-weight:600;font-size:2rem">${result_object.result.toFixed(2)}</span> ${To.value}`;
        }
  }).catch(error => console.log('error', error));
  });

  // fuction for the clear button to reset the values

  document.getElementById("clear").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("amount").value = "";
    document.getElementById("result").style.display = "none";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
  })

// fuction for the info button to provide extra information

  // document.getElementById("info").addEventListener("click", () => {
    
  // })
})