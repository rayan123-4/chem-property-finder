const chemInput = document.getElementById("chemicalInput");
const searchBtn = document.getElementById("searchButton");
const formulaResult = document.getElementById("formula");
const weightResult = document.getElementById("weight");

const apiUrl = "https://nih.gov";

async function checkChemical(chemical) {
    if (!chemical.trim()) {
        alert("Please type a Chemical name");
        return;
    }

    formulaResult.textContent = "Loading formula...";
    weightResult.textContent = "Loading weight...";

    try {

        const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(chemical)}/property/MolecularFormula,MolecularWeight/JSON`);

        if (!response.ok) {
            throw new Error("Chemical request failed.");
        }

        const data = await response.json();
        const chemData = data.PropertyTable.Properties[0];

        formulaResult.textContent = "Formula: " + chemData.MolecularFormula;
        weightResult.textContent = "Weight: " + chemData.MolecularWeight + " g/mol";

    } catch (error) {
            alert(error.message);
            formulaResult.textContent = "Could not find formula";
            weightResult.textContent = "Could not find weight";

        }

    }

    searchBtn.addEventListener("click", () => {
        checkChemical(chemInput.value)
    });

    searchBtn.addEventListener("click", () => {
        if (event.key === "Enter") {
            checkChemical(chemInput.value);
        }

});
