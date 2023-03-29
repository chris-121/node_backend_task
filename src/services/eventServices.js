const eventDao = require("../Dao/eventDao");

module.exports = {
  createEvent: async (obj) => {
    try {
      const event = await eventDao.upsertEvent(obj);
      return event;
    } catch (error) {
      throw error;
    }
  },
  getAllEvents: async () => {
    try {
      const events = eventDao.getAllEvents();
      return events;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOneEvent: async (eventId) => {
    try {
      const event = eventDao.getOneEvent(eventId);
      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateOneEvent: async (obj, eventId) => {
    try {
      const event = await eventDao.upsertEvent(obj, eventId);
      return event;
    } catch (error) {
      throw error;
    }
  },
  deleteEvent: async (eventId) => {
    try {
      await eventDao.deleteEvent(eventId);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteSpeaker: async (eventId) => {
    try {
      await eventDao.deleteSpeaker(eventId);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteOrganizer: async (eventId) => {
    try {
      await eventDao.deleteOrganizer(eventId);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteTag: async (eventId) => {
    try {
      await eventDao.deleteTag(eventId);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
