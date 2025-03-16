let selectedServices = [];
let totalPrice = 0;


function addService(name, price) {
    console.log('Dodano usługę:', name, price); 
    selectedServices.push({ name, price });
    totalPrice += price;
    updateSummary();
    saveToLocalStorage();
}

//aktualizacjia podsumowania
function updateSummary() {
    const servicesList = document.getElementById('selectedServices');
    const totalPriceElement = document.getElementById('totalPrice');

    if (!servicesList || !totalPriceElement) {
        console.error('Nie znaleziono elementów podsumowania.');
        return;
    }

    servicesList.innerHTML = '';
    selectedServices.forEach(service => {
        const li = document.createElement('li');
        li.textContent = `${service.name} - ${service.price} zł`;
        servicesList.appendChild(li);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

//zapisywanie danych w ls
function saveToLocalStorage() {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    localStorage.setItem('totalPrice', totalPrice.toString());
}


function loadFromLocalStorage() {
    const savedServices = localStorage.getItem('selectedServices');
    const savedTotalPrice = localStorage.getItem('totalPrice');

    if (savedServices) {
        selectedServices = JSON.parse(savedServices);
    }
    if (savedTotalPrice) {
        totalPrice = parseFloat(savedTotalPrice);
    }

    updateSummary();
}


document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();

    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Formularz został wysłany');

            const carBrand = document.getElementById('carBrand').value;
            const carModel = document.getElementById('carModel').value;
            const carPlate = document.getElementById('carPlate').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if (selectedServices.length === 0) {
                alert('Proszę wybrać przynajmniej jedną usługę.');
                return;
            }

            const bookingDetails = {
                carBrand,
                carModel,
                carPlate,
                date,
                time,
                name,
                phone,
                services: selectedServices,
                totalPrice
            };

            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

            const orderConfirmation = document.getElementById('orderConfirmation');
            if (orderConfirmation) {
                orderConfirmation.style.display = 'block';
            } else {
                console.error('Element orderConfirmation nie został znaleziony.');
            }

            selectedServices = [];
            totalPrice = 0;
            updateSummary();
            localStorage.removeItem('selectedServices');
            localStorage.removeItem('totalPrice');

            bookingForm.reset();

            setTimeout(() => {
                if (orderConfirmation) {
                    orderConfirmation.style.display = 'none';
                }
            }, 5000);
        });
    }
});