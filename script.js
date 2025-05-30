

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Script loaded and DOM is ready.');
    // Submit event listener for the form
    const form= document.getElementById('tip-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const tab_Amount = parseFloat(document.getElementById('tab_Amount').value);
        const tip_Percentage = parseFloat(document.getElementById('tip_slider').value);

        if (isNaN(tab_Amount) || isNaN(tip_Percentage)) {
            alert('Please enter valid numbers for tab amount and tip percentage.');
            return;
        }

        const tip = calculateTip(tab_Amount, tip_Percentage);
        // alert(`Tip on $${tab_Amount} at ${tip_Percentage}% is $${tip.toFixed(2)}`); //testing alert

        document.getElementById('step1').style.display = 'none';   // Hide original card
        document.getElementById('step2').style.display = 'block';  // Show result card

        
        document.getElementById('result').textContent = `Tip on $${tab_Amount.toFixed(2)} at ${tip_Percentage}% is $${tip.toFixed(2)}`;
      

        const split_Amount = parseFloat(document.getElementById('split_bill').value);
        const split_Slider = document.getElementById('split_bill');
        split_Slider.addEventListener('input', splitSlider);
        splitSlider(1); 


        




    });

});

// Tip Caluclation Function

function calculateTip(tab_Amount, tip_Percentage) {
    const tip = (tab_Amount * tip_Percentage) / 100;
    return tip;
}


//Slider Functionality
function tipSlider() {
    const slider = document.getElementById('tip_slider');
    const output = document.getElementById('slider_value');
    const val = parseFloat(slider.value);

    // Optional snapping logic for cleaner UX
    const snapPoints = [10, 15, 20, 30, 50];
    const snapTolerance = 2; // within 2% of snap point

    const snapped = snapPoints.find(p => Math.abs(p - val) <= snapTolerance);
    slider.value = snapped !== undefined ? snapped : val;

    output.textContent = `${slider.value}%`;
}

function splitSlider() {
    const slider = document.getElementById('split_bill');
    const output = document.getElementById('slider_split_value');
    const val = parseInt(slider.value);


    output.textContent = `${val}`;
    console.log("Slider moved:", val);

}







