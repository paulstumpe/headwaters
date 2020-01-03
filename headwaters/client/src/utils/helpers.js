/* eslint-disable no-return-await */
import axios from 'axios';

/**
 * Axios authentication helpers
 */

export const validateEmail = async email => {
  return await axios
    .get('/api/auth', {
      params: {
        email,
      },
    })
    .then(res => res.data);
};

export const createUser = async ({ nickname, email }) => {
  return await axios.post('/api/auth', {
    nickname,
    email,
  });
};

// axios calendar helpers

export const createUserEvent = async eventObj => {
  return await axios
    .post(`/calendar/${eventObj.userId}/events`, eventObj)
    .then(res => {
      console.log(res.status);
    })
    .catch(err => {
      console.error(err);
    });
};

export const handleIncomingData = incomingEvents => {
  return incomingEvents.reduce((newEventObj, incomingEvent) => {
    const start = incomingEvent.date_time;
    start.replace(' ', 'T');

    newEventObj.push({
      user: incomingEvent.event_id_user,
      id: incomingEvent.id,
      title: incomingEvent.name,
      start,
      extendedProps: {
        practitioner: incomingEvent.practitioner,
        location: incomingEvent.location,
        notes: incomingEvent.notes,
        type: incomingEvent.type,
      },
    });

    return newEventObj;
  }, []);
};

// export const editUserEvent = async({}) => {
//  await.axios.patch(endpoint, {})
// };

export const deleteUserEvent = async (eventId, userId) => {
  return await axios
    .delete(`/calendar/${userId}/events/${eventId}`)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.error(err);
    });
};

export const patchUserEvent = async (editEventObj, userId, eventId) => {
  return await axios
    .patch(`/calendar/${userId}/events/${eventId}`, editEventObj)
    .then(response => {
      return response;
    })
    .catch(err => {
      console.error(err);
    });
};

/**
 * Axios journal helpers
 */

export const getUserEntries = async userId => {
  return await axios
    .get(`/journal/${userId}/entries`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
};

export const addJournalEntry = async newEntryObj => {
  const newEntryArr = [];
  newEntryArr.push(newEntryObj);
  return await axios
    .post(`/journal/${newEntryObj.userId}/entries`, newEntryArr)
    .then(response => response)
    .catch(err => console.error(err));
};

// axios pillbox helpers
export const getUserMedications = async userId => {
  return await axios
    .get(`/pillbox/${userId}`)
    .then(res => {
      return res.data;
      debugger;
    })
    .catch(err => console.error(err));
};

export const addUserMedication = async newMedObj => {
  const newMedArr = [];
  newMedArr.push(newMedObj);
  return await axios
    .post(`/pillbox/${newMedObj.userId}`, newMedArr)
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};
