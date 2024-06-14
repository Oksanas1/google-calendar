const baseUrl = 'https://666441d2932baf9032aa81f9.mockapi.io/api/v1/events';
const defaultError = new Error('Internal Server Error');

const mapList = lists => lists
  .map(({ _id, ...rest }) => ({ id: _id, ...rest }));

export const getEventsLists = () => {
  return fetch(`${baseUrl}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw defaultError;
    })
    .then(lists => mapList(lists));
};

export const getEventById = eventId => {
  return fetch(`${baseUrl}/${eventId}`)
    .then(lists => lists.json());
};

export const createEventInBase = event => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then(response => {
    if (response.ok) {
      return response;
    }

    throw defaultError;
  });
};

export const deletEventInBase = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) {
      return response;
    }

    throw defaultError;
  });
};

export const updateEventInBase = (eventId, event) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}
