import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "videoTitle",
      title: "Video Title",
      type: "string",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "url",
    }),
    defineField({
      name: "info",
      title: "Information about the clip",
      type: "string",
    }),
    defineField({
      name: "option1",
      title: "Option 1",
      type: "string",
    }),
    defineField({
      name: "option2",
      title: "Option 2",
      type: "string",
    }),
    defineField({
      name: "option3",
      title: "Option 3",
      type: "string",
    }),
    defineField({
      name: "option4",
      title: "Option 4",
      type: "string",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "string",
    }),
    defineField({
      name: "secondsUntilPause",
      title: "Seconds Until Pause",
      type: "number",
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
});
