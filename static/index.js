let stock;

addEventListener("DOMContentLoaded", ()=>{
    const socket = io();

    socket.on('connect', ()=>{
        console.log('connected to socket');
    
    });
    

    // setup

    let buttons = document.querySelectorAll('button')

    buttons.forEach(element => {
        let text = element.innerText;

        if(text == 'Buy' && element.dataset.stock){
            element.addEventListener('click', (event)=>{
                let stock = event.target.dataset.stock;
                
                socket.emit('price', {'stock': stock, 'method': 'buy'});
            });
        }
        
        else if(text == 'Sell' && element.dataset.stock){
            element.addEventListener('click', (event)=> {
                // emit for selling
                let stock = event.target.dataset.stock;

                socket.emit('price', {'stock':stock, 'method': 'sell'})
            });
        }
    });

    let cancel_button = document.querySelectorAll('.cancel-button');

    cancel_button.forEach(element => {
        element.addEventListener('click', (event=>{
            if(document.getElementById('buy').open){
                document.getElementById('buy').close();
            }
            else{
                document.getElementById('sell').close();
            }
        }))
    });

    let buy_button = document.querySelectorAll('.buy-button');

    buy_button.forEach(element=>{
        element.addEventListener('click', event=>{
            console.log('buy')

            // need stock and amount of money
            // get money from input and stock from ?
            
        });
    });

    let sell_button = document.querySelectorAll('.sell-button');

    sell_button.forEach(element=>{
        element.addEventListener('click', event=>{
            console.log('sell')
            
            // find a way to get data to emit
            // need stock and # of shares
            // get share # from input and stock from ?
            let amount = document.getElementById('sell-amount').value;

            socket.emit('sell', {'stock': stock, 'shares': amount})
        });
    });
    

    // socket functions

    socket.on('priceReturn', (data)=>{
        // add pop up window for dollar amount
        let value = data.value;
        let method = data.method;
        stock = data.stock;

        if(method == 'buy'){
            document.getElementById('buy-text').innerText = `Buy ${stock} for ${value} per share`
    
            document.getElementById('buy').showModal();
        }

        else{
            document.getElementById('sell-text').innerText = `Sell ${stock} for ${value} per share`
    
            document.getElementById('sell').showModal();
        }
    });

    socket.on('returnBuy', (data)=>{
        let shares = data.shares;
        let sharePrice = data.sharePrice;


    })

    socket.on('returnSell', (data)=>{
        let amount = data.amount;
        let sharePrice = data.sharePrice;

        console.log(`Amount: ${amount}`)
        console.log(`SharePrice = ${sharePrice}`)
    })
});