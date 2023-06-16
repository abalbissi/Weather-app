console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
var toastElement1 = document.getElementById('myToast1');
var toastElement2 = document.getElementById('myToast2');
var toast1 = new bootstrap.Toast(toastElement1);
var toast2 = new bootstrap.Toast(toastElement2);



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location =  search.value

    msg1.textContent = "Loading..."
    msg2.textContent = ""

   

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.st
            msg1.textContent = data.error
            toast1.show();
        } else {
            
            msg1.textContent = data.location
            msg2.textContent = data.forecast
            toast2.show();
        }
    })
})
})