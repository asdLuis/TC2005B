document.addEventListener("DOMContentLoaded", function() {
    const priceGamer1 = 25000;
    const priceGamer2 = 35000;
    const priceGamer3 = 40000;

    const quantityInputs = document.querySelectorAll('.quantity-input');

    function updateTotalPrice() {
        let totalPrice = 0;
        
        quantityInputs.forEach(function(input) {
            const quantity = parseInt(input.value);
            let pricePerUnit = 0;

            if (input.id === 'quantity1') {
                pricePerUnit = priceGamer1;
            } else if (input.id === 'quantity2') {
                pricePerUnit = priceGamer2;
            } else if (input.id === 'quantity3') {
                pricePerUnit = priceGamer3;
            }

            const productTotal = quantity * pricePerUnit;
            totalPrice += productTotal;
        });

        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    quantityInputs.forEach(function(input) {
        input.addEventListener('input', updateTotalPrice);
    });

    updateTotalPrice();
});
