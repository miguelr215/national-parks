// NATIONAL PARKS

const apiKey = 'WTSk82lF3JbXaHeGjqpeG2ENm2MIT2RbSpaq1nWx';

// function to display results
function displayResults(responseJson, userMax){
    // clear resultBox
    $('.resultsList').empty();
    // pull data from response and create lis
    for(let i = 0; i < userMax && i < responseJson.data.length; i++){
        
        $('.resultsList').append(
            `<li class="parkLi">
            <ion-icon name="leaf-outline"></ion-icon><h3>${responseJson.data[i].fullName}</h3>
            <p><a href="${responseJson.data[i].url}">Park Website</a></p>
            <p><u>Description:</u> ${responseJson.data[i].description}</p>
        </li>`
        );
    };
    // <p><u>Address:</u> ${responseJson.data[i].addresses[i].line1} ${responseJson.data[i].addresses[i].line2} ${responseJson.data[i].addresses[i].line3}, ${responseJson.data[i].addresses[i].city}, ${responseJson.data[i].addresses[i].stateCode} ${responseJson.data[i].addresses[i].postalCode} </p>
            
    // unhide resultsBox
    $('.resultsBox').removeClass('hidden');
};


// function to getParks
function getParks(userStates, userMax){
    let fullStateString = userStates.toString();
    // call fetch
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' + fullStateString + '&api_key=' + apiKey)
        .then(response => response.json())
        // .then(response => {
        //     if(response.ok){
        //         response.json();
        //     }
        //     throw new Error(response.statusText)
        // })
        .then(responseJson => displayResults(responseJson, userMax));
        // .catch(error => $('.js-errorMsg').text(`Houston we have a problem: ${error.message}`));

};

// listens for submit button
function watchForm(){
    $('form').on('click', '.submitBtn', function(event){
        event.preventDefault();
        // set variable for user inputs for states
        let userStates = [];
        let numStates = $('.js-state:checked').length;
        if(numStates == 0){
            alert('Please select at least 1 state');
        } else {
            $('.js-state:checked').each(function(){
               userStates.push($(this).val()); 
            })
            
        };

        // set variable for user input max results
        let userMax = 10;
        if($('#maxResults').val() == '' || $('#maxResults').val() == null){
            userMax = 10;
        } else {
            userMax = $('#maxResults').val();            
        };

        getParks(userStates, userMax);

    });
    
};


$(watchForm());