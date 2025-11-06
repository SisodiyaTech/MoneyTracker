let InputAmount = document.getElementById("Amount");
let InputNotes = document.getElementById("Note");
let AddMoney = document.getElementById("btnOne");
let SpendMoney = document.getElementById("btnTwo");
let TotalAmount = document.getElementById("TotalAmount");
let TransList = document.getElementById("list");



//--------- Function for Date----------

let DateFun = () => {
    const now = new Date();
    const opts = { weekday: 'long', day: 'numeric', month: 'long' };
    const formatDate = new Intl.DateTimeFormat('en-GB', opts).format(now);
    return formatDate;
}


//  ---------------Add Eventlistner for Add Money---------------

AddMoney.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (InputAmount.value === "" || InputNotes.value === "") {
        alert("Please fill Amount and Notes");
    } else {
        
        let dateNow = DateFun();
        TotalAmount.innerText = Number(InputAmount.value) + Number(TotalAmount.innerText);

        let myAmount = TotalAmount.innerText;

        localStorage.setItem("myTotAmount", JSON.stringify(myAmount));

        let AmountVal = InputAmount.value;
        let noteVal = InputNotes.value;

        let Arrr = JSON.parse(localStorage.getItem("hisArr")) || [];

        let ArrHis = [AmountVal, noteVal, dateNow, "add"];

        Arrr.unshift(ArrHis);

        let historyArr = JSON.stringify(Arrr);

        localStorage.setItem("hisArr", historyArr);
        
        console.log((JSON.parse(localStorage.getItem("hisArr"))));
        
        let newDiv = document.createElement("div");


        
        newDiv.innerHTML = `
        <div class="Items">
                <p>${AmountVal}</p>
                <p>${noteVal}</p>
                <p>${dateNow}</p>
            </div>
    ` ;
        TransList.append(newDiv);
        InputAmount.value = "";
        InputNotes.value = "";
        location.reload();
    }

});

SpendMoney.addEventListener("click", (e) => {
    e.preventDefault();

    if (InputAmount.value === "" || InputNotes.value === "") {
        alert("Please fill Amount and Notes");
    } else {
        
        let dateNow = DateFun();

        
        if (Number(InputAmount.value) > Number(TotalAmount.innerText)) {
            alert("Not Enough Money");
        } else {
            TotalAmount.innerText = Number(TotalAmount.innerText) - Number(InputAmount.value);

            let myAmount = TotalAmount.innerText;

            localStorage.setItem("myTotAmount", JSON.stringify(myAmount));

            let AmountVal = InputAmount.value;
            let noteVal = InputNotes.value;

            let Arrr = JSON.parse(localStorage.getItem("hisArr")) || [];

            let ArrHis = [AmountVal, noteVal, dateNow, "spend"];

            Arrr.unshift(ArrHis);

            localStorage.setItem("hisArr", JSON.stringify(Arrr));

            let newDiv = document.createElement("div");
            

            
            newDiv.innerHTML = `
            <div class="RedItems">
                <p>${AmountVal}</p>
                <p>${noteVal}</p>
                <p>${dateNow}</p>
            </div>
    ` ;
            TransList.append(newDiv);
            InputAmount.value = "";
            InputNotes.value = "";
            location.reload();
        }
    }

});

window.addEventListener("DOMContentLoaded", () => {
    // show saved total
    let savedTotal = JSON.parse(localStorage.getItem("myTotAmount")) || 0;
    if (savedTotal) {
        TotalAmount.innerText = savedTotal;
    }

    // show saved history
    let getData1 = JSON.parse(localStorage.getItem("hisArr")) || [];
    getData1.forEach((item) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add(item[3] === "spend" ? "RedItems" : "Items");
        newDiv.innerHTML = `
        <p>${item[0]}</p>
            <p>${item[1]}</p>
            <p>${item[2]}</p>
        `;
        TransList.append(newDiv);
    });
});


document.getElementById("Clearlist").addEventListener("click" , () => {
    localStorage.removeItem("hisArr");
    TransList.innerHTML = "";
})


document.getElementById("Reset").addEventListener("click" , () => {
    localStorage.clear();
    TransList.innerHTML = "";
    TotalAmount.innerText = 0;

});


