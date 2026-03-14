"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    const similarEvents = await Event.find({
      _id: { $ne: event._id, tags: { $in: event.tags } }, //disclude the original event using id and include similar events using the tags
    });

    return similarEvents;
  } catch (e) {
    return [];
  }
};
