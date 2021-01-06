import fs from "fs";
import grayMatter from "gray-matter";
import remark from "remark";
import remarkHTML from "remark-html";

export const getExercise = (filename: string) => {
  const fileContent = fs.readFileSync(
    `./content/olamundo-exercises/${filename}.md`
  );
  const { content, data: metadata } = grayMatter(fileContent);
  const htmlContent = remark().use(remarkHTML).processSync(content).toString();

  return {
    metadata: {
      ...metadata,
      slug: filename.replace(".md", ""),
    },
    htmlContent,
  };
};
