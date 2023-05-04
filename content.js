chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'scrapeOrder') {
      const orderData = {
        name: '',
        address: '',
        email: '',
        phone: '',
        products: []
      };
  
      // Scrape the order data from the Shopify page
      orderData.name = document.querySelector('.order-details__info:first-of-type > div:nth-of-type(2)').innerText;
      orderData.address = document.querySelector('.order-details__info:first-of-type > div:nth-of-type(4)').innerText;
      orderData.email = document.querySelector('.order-details__info:nth-of-type(2) > div:nth-of-type(1)').innerText;
      orderData.phone = document.querySelector('.order-details__info:nth-of-type(2) > div:nth-of-type(2)').innerText;
      const productRows = document.querySelectorAll('.order-details__items > tbody > tr');
      productRows.forEach(row => {
        const product = {
          image: row.querySelector('.order-details__item-image img').src,
          name: row.querySelector('.order-details__item-title').innerText,
          size: row.querySelector('.order-details__item-options').innerText.split(':')[1].trim(),
          price: row.querySelector('.order-details__item-price').innerText
        };
        orderData.products.push(product);
      });
  
      // Format the order data in the desired template
      const formattedData = `Full Name: ${orderData.name}
  Address: ${orderData.address}
  Status: 
  city :
  ZIP CODE:
  E-mail: ${orderData.email}
  PHONE NUMBER: ${orderData.phone}
  Model/color/size: ${orderData.products.map(p => `${p.name}/${p.size}`).join(', ')}
  size: ${orderData.products.map(p => p.size).join(', ')}
  Price: ${orderData.products.map(p => p.price).join(', ')}
  Product Name: ${orderData.products.map(p => p.name).join(', ')}
  Image Of product: ${orderData.products.map(p => p.image).join(', ')}
  Cash payment on delivery.`;
  
      // Send the formatted data back to the background script
      sendResponse(formattedData);
    }
  });
  