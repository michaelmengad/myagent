export const TwoPartFormExtension = {
  name: 'TwoPartForm',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'two_part_form' || trace.payload.name === 'two_part_form',
  render: ({ trace, element }) => {
    console.log('Rendering TwoPartFormExtension');

    let payloadObj;
    if (typeof trace.payload === 'string') {
      payloadObj = JSON.parse(trace.payload);
    } else {
      payloadObj = trace.payload;
    }

    console.log('Payload:', payloadObj);
    
    const { orderAvailableSizes, orderProductSize } = payloadObj;
    
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
      <style>
        label {
          display: block;
          margin: 10px 0 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          margin: 5px 0 20px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .hidden {
          display: none;
        }
        .visible {
          display: block;
        }
        input[type="submit"] {
          background-color: #291F51;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        input[type="submit"]:hover {
          background-color: #3a2a73;
        }
      </style>

      <fieldset id="orderDetails">
        <legend>Order Details</legend>
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" min="1" required>
      </fieldset>

              <label for="size">Size:</label>
              <select id="size" name="size" required>
                  <option value="">Select a size</option>
                  ${orderAvailableSizes.split(',').map(size => 
                      `<option value="${size}" ${size.trim() === orderProductSize.trim() ? 'selected' : ''}>${size}</option>`).join('')}
              </select>

      <fieldset id="customerInfo" class="hidden">
        <legend>Personal Information</legend>
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>

        <label for="apartmentNumber">Apartment Number</label>
        <input type="text" id="apartmentNumber" name="apartmentNumber">

        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" name="postalCode" required>

        <label for="city">City</label>
        <input type="text" id="city" name="city" required>

        <label for="country">Country</label>
        <input type="text" id="country" name="country" required>
      </fieldset>

      <input type="submit" value="Submit">
    `;

    formContainer.addEventListener('change', function () {
      const quantity = formContainer.querySelector('#quantity').value;
      const customerInfoSection = formContainer.querySelector('#customerInfo');

      if (quantity) {
        customerInfoSection.classList.remove('hidden');
        customerInfoSection.classList.add('visible');
      } else {
        customerInfoSection.classList.add('hidden');
        customerInfoSection.classList.remove('visible');
      }
    });

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();

      const fullName = formContainer.querySelector('#fullName').value;
      const email = formContainer.querySelector('#email').value;
      const address = formContainer.querySelector('#address').value;
      const postalCode = formContainer.querySelector('#postalCode').value;
      const city = formContainer.querySelector('#city').value;
      const country = formContainer.querySelector('#country').value;
      const apartmentNumber = formContainer.querySelector('#apartmentNumber').value || null;

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          orderQuantity: formContainer.querySelector('#quantity').value,
          orderSize: formContainer.querySelector('#size').value,
          customerFullName: fullName,
          customerEmail: email,
          customerAddress: address,
          customerPostalCode: postalCode,
          customerCity: city,
          customerCountry: country,
          customerApartmentNumber: apartmentNumber
        },
      });
    });

    element.appendChild(formContainer);
  },
};

export const NoNameFormExtension = {
  name: 'NoNameForm',
  type: 'response',
  match: ({ trace }) =>
      trace.type === 'no_name_form' || trace.payload.name === 'no_name_form',
  render: ({ trace, element }) => {
      console.log('Rendering NoNameFormExtension');
      
      let payloadObj;
      if (typeof trace.payload === 'string') {
          payloadObj = JSON.parse(trace.payload);
      } else {
          payloadObj = trace.payload;
      }

      const { orderAvailableSizes, orderProductSize } = payloadObj;
      console.log('Payload:', payloadObj);

      const formContainer = document.createElement('form');
      const today = new Date().toISOString().split('T')[0];

      formContainer.innerHTML = `
          <style>
              label {
                  display: block;
                  margin: 10px 0 5px;
              }
              input, select {
                  width: 100%;
                  padding: 8px;
                  margin: 5px 0 20px 0;
                  display: inline-block;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
              }
              .hidden {
                  display: none;
              }
              .visible {
                  display: block;
              }
              input[type="submit"] {
                  background-color: rgb(150, 182, 212);
                  color: white;
                  border: none;
                  padding: 10px;
                  border-radius: 4px;
                  cursor: pointer;
              }
              input[type="submit"]:hover {
                  background-color: rgb(130, 162, 192);
              }
          </style>

          <fieldset id="orderDetails">
              <legend>Order Details:</legend>
              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" min="1" required>

              <label for="size">Size:</label>
              <select id="size" name="size" required>
                  <option value="">Select a size</option>
                  ${orderAvailableSizes.split(',').map(size => 
                      `<option value="${size}" ${size.trim() === orderProductSize.trim() ? 'selected' : ''}>${size}</option>`).join('')}
              </select>

          <input type="submit" value="Submit">
      `;

      formContainer.addEventListener('submit', function (event) {
          event.preventDefault();

          // Sending each form field as a separate key-value pair in the payload
          window.voiceflow.chat.interact({
              type: 'complete',
              payload: {
                  orderQuantity: formContainer.querySelector('#quantity').value,
                  orderSize: formContainer.querySelector('#size').value
              },
          });
      });

      element.appendChild(formContainer);
  },
};

export const PersonalInfoFormExtension = {
    name: 'PersonalInfoForm',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'personal_info_form' || trace.payload.name === 'personal_info_form',
    render: ({ trace, element }) => {
      console.log('Rendering PersonalInfoFormExtension');
  
      const formContainer = document.createElement('form');
  
      formContainer.innerHTML = `
        <style>
          label {
            display: block;
            margin: 10px 0 5px;
          }
          input {
            width: 100%;
            padding: 8px;
            margin: 5px 0 20px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
          input[type="submit"] {
            background-color: rgb(150, 182, 212);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
          }
          input[type="submit"]:hover {
            background-color: rgb(130, 162, 192);
          }
        </style>
  
        <fieldset id="personalInfo">
          <legend>Personal Information:</legend>
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" required>
  
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
  
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required>
  
          <label for="apartmentNumber">Apartment Number (Optional):</label>
          <input type="text" id="apartmentNumber" name="apartmentNumber">
  
          <label for="postalCode">Postal Code:</label>
          <input type="text" id="postalCode" name="postalCode" required>
  
          <label for="city">City:</label>
          <input type="text" id="city" name="city" required>
  
          <label for="country">Country:</label>
          <input type="text" id="country" name="country" required>
        </fieldset>
  
        <input type="submit" value="Submit">
      `;
  
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const fullName = formContainer.querySelector('#fullName').value;
        const email = formContainer.querySelector('#email').value;
        const address = formContainer.querySelector('#address').value;
        const postalCode = formContainer.querySelector('#postalCode').value;
        const city = formContainer.querySelector('#city').value;
        const country = formContainer.querySelector('#country').value;
        const apartmentNumber = formContainer.querySelector('#apartmentNumber').value || null;
  
        // Sending each form field as a separate key-value pair in the payload
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: {
            customerFullName: fullName,
            customerEmail: email,
            customerAddress: address,
            customerPostalCode: postalCode,
            customerCity: city,
            customerCountry: country,
            customerApartmentNumber: apartmentNumber
          },
        });
      });
  
      element.appendChild(formContainer);
    },
  };
