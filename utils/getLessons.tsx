import fs from "fs";
import grayMatter from "gray-matter";
import remark from "remark";
import remarkHTML from "remark-html";

export const getLesson = (filename: string) => {
  let fileContent: Buffer = Buffer.from("");
  try {
    fileContent = fs.readFileSync(`./content/olamundo-lessons/${filename}.md`);
  } catch {
    fs.writeFileSync(`./content/olamundo-lessons/${filename}.md`, fileContent);
  }

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
