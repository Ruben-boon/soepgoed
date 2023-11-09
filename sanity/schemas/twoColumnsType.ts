// ./schemas/heroType.ts

import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { buttonType } from "./buttonType";


export const twoColumnsType = defineType({
  name: "twoColumns",
  type: "object",
  title: "Two Columns",
  options: { columns: 2},
  fields: [
    {
      name: "column1Content",
      title: "Column 1",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "column2Content",
      title: "Column 2",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  icon: TextIcon,
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled",
        subtitle: "Text",
        media: TextIcon,
      };
    },
  },
});
