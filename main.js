document.addEventListener("DOMContentLoaded", async () => {
  
//fetching all currencies values

  async function currency_symbols() {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aP6V4hmchiK4B5gGh6FjpuFAfHq54AKe");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }
    dict = {};
  
    response=await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    result = await response.json();

    for (i in result.symbols) {
      const node = document.createElement("option");
      const node1 = document.getElementById("from").appendChild(node);
      node1.innerHTML = i;
      dict[i] = result.symbols[i];
    }
    
    for (i in result.symbols) {
    const node2 = document.createElement("option");
    const node3 = document.getElementById("to").appendChild(node2);
    node3.innerHTML = i;
    }
    
    return dict;
  }
  
  //calling the api function
  dictionary =await currency_symbols();
 

  document.getElementById("from").addEventListener("click", () => {
    
    document.getElementById("result").style.display = "none";
    document.getElementById("info_").style.display = "none";
   
  });

 
  document.getElementById("to").addEventListener("click", () => {

    document.getElementById("result").style.display = "none";
    document.getElementById("info_").style.display = "none";

  });
  

  document.getElementById("amount").addEventListener("click", () => {
    document.getElementById("result").style.display = "none";
    document.getElementById("info_").style.display = "none";
  })

  //fetching api to convert the selected currencies

  document.getElementById("currency-converter").addEventListener("submit", (event) => {
    event.preventDefault();
    let { target: {From , To, Amount } } = event;
    let myHeaders = new Headers();
    myHeaders.append("apikey", "aP6V4hmchiK4B5gGh6FjpuFAfHq54AKe");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }
    document.getElementById("info_").style.display = "none";

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${To.value}&from=${From.value}&amount=${Amount.value}`, requestOptions)
      .then(response => response.json())
        .then((result_object) => {
          if (Amount.value) {
            document.getElementById("result_output").style.display = "revert";
            document.getElementById("info").style.display = "revert";
            document.getElementById("result").style.display = "revert";
            document.getElementById("output").innerHTML = `${Amount.value} ${From.value} = <span style="color:yellow;font-weight:600;font-size:2rem">${result_object.result.toFixed(2)}</span> ${To.value}`;
        }
          document.getElementById("time_stamp").innerHTML = `timestamp : ${result_object.info["timestamp"]}`;
          document.getElementById("rate").innerHTML = `rate : ${result_object.info["rate"]}`;
      }).catch(error => console.log('error', error));
    
  });

  // fuction for the clear button to reset the values

  document.getElementById("clear").addEventListener("click", (event) => {
    
    document.getElementById("amount").value = "";
    document.getElementById("result").style.display = "none";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
  })

// fuction for the info button to provide extra information

  document.getElementById("info").addEventListener("click", () => {

    document.getElementById("info_").style.display = "revert";
    document.getElementById("info").style.display = "none";

    from_value = document.getElementById("from").value;
    from_info = dictionary[from_value];
    document.getElementById("from_info").innerHTML = `${from_value} - ${from_info} `;

    to_value = document.getElementById("to").value;
    to_info = dictionary[to_value];
    document.getElementById("to_info").innerHTML = `${to_value} - ${to_info}`;
  })

// fuction for the close button to close info
  
  document.getElementById("close").addEventListener("click", () => {

    document.getElementById("info_").style.display = "none";
    document.getElementById("info").style.display = "revert";
  })

})