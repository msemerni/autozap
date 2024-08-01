const url = 'https://www.activityinfo.org/resources/update'; // Правильный URL
const token = '4a974f5125e355b0178c9f1c92696d4a'; // Ваш API токен
const data = {
    "changes": [
        {
            "formId": "czdok66lz9lmbsmpum",
            "recordId": "c5xpjxjlzayn6qv2",
            "parentRecordId": null,
            "deleted": false,
            "fields": {
              "donor": "c49w73klw7jb9x1189",
            }
          }
    ]
};

fetch(url, {
  method: 'POST', // Метод запроса
  headers: {
    'Content-Type': 'application/json', // Тип контента
    'Authorization': 'Basic ' + btoa('anything:' + token),
  },
  body: JSON.stringify(data) // Преобразование данных в JSON-строку
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

