const Event = require("../model/event");
const Organizer = require("../model/organizer");
const Speaker = require("../model/speaker");
const Tag = require("../model/tag");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  upsertEvent: async (obj, eventId) => {
    try {
      let speakerIds = [],
        organizerIds = [],
        tagIds = [];
      await Promise.all(
        obj.speakers.map(async (item) => {
          const speaker = await Speaker.create({
            name: item.name,
            about: item.about,
            fileName: item.fileName,
          });
          speakerIds.push(speaker._id);
        })
      );
      await Promise.all(
        obj.organizedBy.map(async (item) => {
          const organizer = await Organizer.create({
            name: item,
          });
          organizerIds.push(organizer._id);
        })
      );
      await Promise.all(
        obj.tags.map(async (item) => {
          const tag = await Tag.create({
            tag: item,
          });
          tagIds.push(tag._id);
        })
      );
      const event = await Event.findOneAndUpdate(
        { _id: eventId ? new ObjectId(eventId) : new ObjectId() },
        {
          title: obj.title,
          regLink: obj.regLink,
          date: obj.date,
          startTime: obj.startTime,
          endTime: obj.endTime,
          speakers: speakerIds,
          basicInfo: obj.basicInfo,
          resources: obj.resources,
          joiningInfo: obj.joiningInfo,
          organizedBy: organizerIds,
          tags: tagIds,
        },
        { upsert: true, new: true }
      );
      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllEvents: async () => {
    try {
      const events = await Event.find()
        .populate("speakers")
        .populate("organizedBy")
        .populate("tags")
        .sort({ createdAt: "desc" });
      return events;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getOneEvent: async (eventId) => {
    try {
      const event = await Event.findById(new ObjectId(eventId))
        .populate("speakers")
        .populate("organizedBy")
        .populate("tags")
        .sort({ createdAt: "desc" });
      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEvent: async (eventId) => {
    try {
      await Event.deleteOne(new ObjectId(eventId));
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteSpeaker: async (eventId) => {
    try {
      await Speaker.deleteOne(new ObjectId(eventId));
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteOrganizer: async (eventId) => {
    try {
      await Organizer.deleteOne(new ObjectId(eventId));
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteTag: async (eventId) => {
    try {
      await Tag.deleteOne(new ObjectId(eventId));
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
