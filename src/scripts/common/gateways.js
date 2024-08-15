const baseUrl = 'https://666441d2932baf9032aa81f9.mockapi.io/api/v1/events';
const defaultError = text => new Error(`Internal Server Error. ${text}`);

export const getEventsListsFromDB = () => {
  return fetch(`${baseUrl}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw defaultError(response.text);
    })
    .then(lists => lists.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
};

export const getEventByIdFromDB = eventId => {
  return fetch(`${baseUrl}/${eventId}`).then(lists => lists.json());
};

export const createEventInDB = event => {
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

    throw defaultError(response.text);
  });
};

export const deletEventInDB = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) {
      return response;
    }

    throw defaultError(response.text);
  });
};

export const updateEventInDB = (eventId, event) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then(response => {
    if (response.ok) {
      return response;
    }

    throw defaultError(response.text);
  });
};
