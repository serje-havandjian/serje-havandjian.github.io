let customExcuse = null;
let customCategory = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch(`https://excuser.herokuapp.com/v1/excuse/300`)
    .then(resp => resp.json())
    .then(excuses => {
        customExcuseArray = excuses;
        addButtonListeners(excuses);
    });
});

function addExcusesByCategory(excuses, category) {
    document.querySelector("ul").textContent = "";
    
    let filteredExcuses = excuses.filter((excuse) => {
        return excuse.category === category;
    });
   
    filteredExcuses.forEach((obj) => {
        const li = document.createElement("li");
    
        li.textContent = obj.excuse;

        document.querySelector("ul").append(li);
    });
   
    if (customCategory === category) {
        const li = document.createElement("li");

        li.textContent = customExcuse;

        document.querySelector("ul").append(li);
    };
}

function addButtonListeners(excuses) {
    const familyButton = document.getElementById("family-button");
    const officeButton = document.getElementById("office-button");
    const childrenButton = document.getElementById("children-button");
    const collegeButton = document.getElementById("college-button");
    const partyButton = document.getElementById("party-button");

    familyButton.addEventListener("click", (e) => {
        addExcusesByCategory(excuses, "family");
    });

    officeButton.addEventListener("click", (e) => {
        addExcusesByCategory(excuses, "office");
    });

    childrenButton.addEventListener("click", (e) => {
        addExcusesByCategory(excuses, "children");
    });

    collegeButton.addEventListener("click", (e) => {
        addExcusesByCategory(excuses, "college");
    });

    partyButton.addEventListener("click", (e) => {
        addExcusesByCategory(excuses, "party");
    });

    const excuseForm = document.querySelector("form");

    excuseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        customCategory = document.querySelector("#dropDown").value;
        console.log("value from dropdown");
        console.log(customCategory);
    
        customExcuse = document.getElementById("new-excuse-text").value;
        console.log(customExcuse);

        addExcusesByCategory(excuses, customCategory);
        
        e.target.reset();
    });

    document.getElementById("random-excuse").addEventListener("mouseover", (e) => {
        fetch(`https://excuser.herokuapp.com/v1/excuse/`)
        .then(resp => resp.json())
        .then(randomExcuse => {
            randomExcuse.forEach((excuse) => {
                alert(excuse.excuse);
            });
        });
    });
}


