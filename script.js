function getData(endpoint) {
  return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://ghibli.rest/${endpoint}`, true);
      request.onload = function () {
          const data = JSON.parse(this.response);
          if (request.status >= 200 && request.status < 400) {
              resolve(data);
          } else {
              reject('Error fetching data:', request.status, request.statusText);
          }
      };
      request.onerror = function () {
          reject('Error fetching data');
      };
      request.send();
  });
}

async function fetchDataAndRender(endpoint) {
  try {
      const data = await getData(endpoint);
      const app = document.getElementById('root');
      app.innerHTML = ''; 

      const logo = document.createElement('img');
      logo.src = 'logo.png';
      const container = document.createElement('div');
      container.setAttribute('class', 'container');

      app.appendChild(logo);
      app.appendChild(container);

      data.forEach((item) => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');

          const h1 = document.createElement('h1');
          h1.textContent = item.title || item.name; 

          const p = document.createElement('p');
          let description = item.description || item.classification; 
          description = description.substring(0, 300);
          p.textContent = `${description}...`;

          container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
      });
  } catch (error) {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error: ${error}`;
      app.appendChild(errorMessage);
  }
}

function updateData() {
  const endpoint = document.getElementById('endpoint').value;
  fetchDataAndRender(endpoint);
}


fetchDataAndRender('films');
