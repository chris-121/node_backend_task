const eventServices = require("../services/eventServices");

module.exports = {
  create: async (req, res) => {
    try {
      const event = await eventServices.createEvent(req.body);
      res.send({ status: 200, msg: "event created succesfully", event });
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  get: async (req, res) => {
    try {
      const eventId = req.query.id;
      const event = await eventServices.getOneEvent(eventId);
      res.send({
        status: 200,
        msg: event ? "Event found" : "Event not found",
        event,
      });
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  getAll: async (req, res) => {
    try {
      const events = await eventServices.getAllEvents();
      res.send({ status: 200, events });
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  update: async (req, res) => {
    try {
      const eventId = req.query.id;
      const event = await eventServices.getOneEvent(eventId);
      if (event.speakers) {
        await Promise.all(
          event.speakers.map(async (obj) => {
            await eventServices.deleteSpeaker(obj._id);
          })
        );
      }
      if (event.organizedBy) {
        await Promise.all(
          event.organizedBy.map(async (obj) => {
            await eventServices.deleteOrganizer(obj._id);
          })
        );
      }
      if (event.tags) {
        await Promise.all(
          event.tags.map(async (obj) => {
            await eventServices.deleteTag(obj._id);
          })
        );
      }
      const updatedEvent = await eventServices.updateOneEvent(
        req.body,
        eventId
      );
      res.send({
        status: 200,
        msg: "event updated successfully",
        event: updatedEvent,
      });
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
  delete: async (req, res) => {
    try {
      const eventId = req.query.id;
      await eventServices.deleteEvent(eventId);
      res.send({ status: 200, msg: "event deleted successfully" });
    } catch (error) {
      res.send({ status: 500, error });
    }
  },
};
