

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Script loaded and DOM is ready.');
    // Submit event listener for the form
    const form= document.getElementById('tip-form');

    const tip_mode = document.getElementById('tip_mode');
    const pre_tax_bill_container = document.getElementById('pre-tax-bill-container');

    tip_mode.addEventListener('change', function(event) {
        const selectedValue = event.target.value;
        console.log(`Tip mode changed to: ${selectedValue}`);

        if (selectedValue === 'yes') {
            pre_tax_bill_container.style.display = 'block'; // Show pre-tax amount input
        }else if (selectedValue === 'no') {
            pre_tax_bill_container.style.display = 'none'; // Hide pre-tax amount input
        }
    });



    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const tab_Amount = parseFloat(document.getElementById('tab_Amount').value);
        const tip_Percentage = parseFloat(document.getElementById('tip_slider').value);
        const tip_mode = document.getElementById('tip_mode').value;
        const pre_tax_amount = parseFloat(document.getElementById('pre_tax_amount').value);
        console.log(`Tab Amount: ${tab_Amount}, Tip Percentage: ${tip_Percentage}, Tip Mode: ${tip_mode.value}, Pre-tax Bill: ${pre_tax_amount}`);

        let baseAmount;
        if (tip_mode === 'yes') {
            baseAmount = parseFloat(document.getElementById('pre_tax_amount').value);
        } else {
            baseAmount = parseFloat(document.getElementById('tab_Amount').value);
        }

        if (isNaN(tab_Amount) || isNaN(tip_Percentage) || isNaN(baseAmount)) {
            alert('Please enter valid numbers for tab amount and tip percentage.');
            return;
        }

        const tip = calculateTip(baseAmount, tip_Percentage);

        // alert(`Tip on $${tab_Amount} at ${tip_Percentage}% is $${tip.toFixed(2)}`); //testing alert

        document.getElementById('step1').style.display = 'none';   // Hide original card
        document.getElementById('step2').style.display = 'block';  // Show result card





        //Update the result card with the calculated tip
        document.getElementById('tip_result').innerHTML = `Tip on <strong>$${baseAmount.toFixed(2)}</strong> at <strong>${tip_Percentage}%</strong> is <strong>$${tip.toFixed(2)}</strong>`;
        // document.getElementById('tip_result').textContent = `Tip on $${tab_Amount.toFixed(2)} at ${tip_Percentage}% is $${tip.toFixed(2)}`;
        document.getElementById('total_result').innerHTML = `Total amount (including tip) is <strong>$${(tab_Amount + tip).toFixed(2)}</strong>`;






        //Binding Slider & update functionality
        const split_slider = document.getElementById('split_slider');
        const splitLabel = document.getElementById('split_label');
        const split_result = document.getElementById('split_result');

        
       
        // split_slider.addEventListener('input', splitSliderUpdate);
        

        function splitSliderUpdate() {

            const people = parseInt(split_slider.value);
            const total = tab_Amount + tip;
            const perPerson = total / people;

            splitLabel.innerHTML = `<strong>${people} ${people === 1 ? 'person' : 'people'}</strong>`;
            split_result.innerHTML = `Each person pays <strong>$${perPerson.toFixed(2)}</strong>`;

        }
        
        split_slider.addEventListener('input', splitSliderUpdate);
        splitSliderUpdate();    // Initial call to set the default value


        // Slider functionality for tip percentage
        const reset_button = document.getElementById('reset_button');
        reset_button.addEventListener('click', function() {
            //Reset form inputs 
            document.getElementById('tab_Amount').value = '';
            document.getElementById('tip_slider').value = '15'; 
            document.getElementById('slider_value').textContent = '15%'; 
            document.getElementById('tip_mode').value = 'no';

            //Reset split slider and results
            document.getElementById('split_slider').value = '0';
            document.getElementById('split_label').textContent = '1 person';
            document.getElementById('split_result').textContent = 'Each person pays $0.00';
            

            //Show original card and hide result card + hide pre-tax amount input
            pre_tax_bill_container.style.display = 'none';
            document.getElementById('step1').style.display = 'block';  
            document.getElementById('step2').style.display = 'none';   
        });


    });

});

// Tip Caluclation Function

function calculateTip(baseAmount, tip_Percentage) {
    const tip = (baseAmount * tip_Percentage) / 100;
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









