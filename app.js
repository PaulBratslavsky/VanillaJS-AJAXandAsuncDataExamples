/******************************************
    EXAMPLE 1: AJAX
 *****************************************/

(() => {
    console.log('AsyncJS');

    document.getElementById('button').addEventListener('click', loadData);

    function loadData() {
        // CREATE XHR VAR
        const xhr = new XMLHttpRequest();
        console.log(xhr);

        // OPEN 
        xhr.open('GET', 'data.txt', true);

        // OPTIONAL: SHOWS LOADER
        xhr.onprogress = () => {
            console.log('LOADING...');
        };

        xhr.onload = function() {
            if (this.status === 200) {
                console.log(this.responseText)
                loadIntoDOM(this.responseText);
            }
        }

        // CHECK FOR ERRORS
        xhr.onerror = () => {
            console.log('Show some error')
        }

        // FINALIZE WITH SEND
        xhr.send();
    }

    // LOAD DATA TO DOM
    function loadIntoDOM(data) {
        // Select Element
        const output = document.querySelector('#output');
        output.innerHTML = `
            <h1>Incoming Message</h1>
            <p>${data}</p>
        `;
    } 
})();

/******************************************
    EXAMPLE 1: AJAX & JASON
 *****************************************/

( () => {
    console.log('AJAX & JASON')

    // SELECT AND ADD EVENT LISTENER
    const button1 = document.getElementById('button1');
    button1.addEventListener('click', loadCustomer);

    const button2 = document.getElementById('button2');
    button2.addEventListener('click', loadCustomers);

    // FUNCTIONS
    function loadCustomer() {
        console.log('Load Customer');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'customer.json')

        xhr.onload = function() {
            if (this.status === 200 ) {
                console.log(this.responseText);
                const customer = JSON.parse(this.responseText);
                loadCustomerToDOM(customer);
            }
        }

        xhr.send()
    }

    function loadCustomers() {
        console.log('Load Customers');

        const xhr = new  XMLHttpRequest();
        xhr.open('GET', 'customers.json');
        
        xhr.onload = function() {
            if (this.status === 200 ) {
                const customers = JSON.parse(this.responseText);
                loadCustomersToDOM(customers);
            }
        }

        xhr.send();


    }

    // LOAD DATA TO DOM
    function loadCustomerToDOM(data) {
        
        // Select Element
        const output = document.querySelector('#customer');
        
        // NEED TO PARSE JSON TO OBJECT
        const { id, name, company, phone} = data;
    
        output.innerHTML = `
            <ul>
                <li>ID: ${id} | <span>${name}</span></li>
                <li>Company: ${company}</li>
                <li>Phone: ${phone}</li>
            </li>    
        `;
    } 

    // Load Customers
    function loadCustomersToDOM(data) {        
        // Select Element
        const output = document.querySelector('#customers');

        data.forEach((customer) => {
            const { id, name, company, phone} = customer;
            const div = document.createElement('ul');
            
            const data =`
                <li>ID: ${id} | <span>${name}</span></li>
                <li>Company: ${company}</li>
                <li>Phone: ${phone}</li>
            `;

            div.innerHTML = data;

            output.appendChild(div);
        });
    } 



})();

/******************************************
    EXAMPLE 3: CHUCK NORRIS API
 *****************************************/

(() => {
    console.log('Chuck Norris API');

    // Select button add Event Listener
    const button = document.querySelector('.get-jokes');
    button.addEventListener('click', loadJokes);

    // FUNCTIONS
    function loadJokes(e) {
        e.preventDefault();

        // Get Number of Jokes
        const numberOfJokes = document.getElementById('number');

        if ( numberOfJokes.value !== '') {
            console.log('Get jokes');

            getJokes(numberOfJokes.value);

            // Get Jokes
            numberOfJokes.value = '';
        } else {
            console.log('please add a number of jokes you want.');
        }

        
    }

    // Get Jokes Function
    function getJokes(numberOfJokes) {

        clearPreviousContent();

        const xhr = new  XMLHttpRequest();
        const url = `http://api.icndb.com/jokes/random/${numberOfJokes}`;
        
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
            if (this.status === 200 ) {
                const jokes = JSON.parse(this.responseText);
                console.log(jokes);

                displayJokesToDOM(jokes);
            } else {
                console.log('Show Error');
            }
        }
         
        xhr.send();
    }

    // Display Jokes In DOM
    function displayJokesToDOM(listOfJokes) {
        // Select where to add Jokes
        const location = document.querySelector('.jokes');
        console.log(location);

        console.log(listOfJokes.value);

        listOfJokes.value.forEach( (item) => {
            console.log(item.id, item.joke, 'from loop');
            const li = document.createElement('li');
            
            const innerContent = `
                <span class="joke" id=${item.id}>
                    ${item.joke}
                </span>
            `;

            li.innerHTML = innerContent;

            location.appendChild(li);
        });
        
    }

    function clearPreviousContent() {
        const location = document.querySelector('.jokes');
        const newListArray = Array.from(location.children);
        
        newListArray.forEach((item) => {
            item.remove()
        })


    }

})()






