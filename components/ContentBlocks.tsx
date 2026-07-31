import type { Block } from "@/lib/content";
import { cleanDisplayText } from "@/lib/display-text";
import { linkifyText } from "@/lib/internal-links";
import AppInfoTable from "./AppInfoTable";

export default function ContentBlocks({
  blocks,
  disableHrefs,
  linked,
}: {
  blocks: Block[];
  disableHrefs?: Set<string>;
  linked?: Set<string>;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index}>
              {linkifyText(cleanDisplayText(block.text), {
                disableHrefs,
                alreadyLinked: linked,
              })}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul className="content-list" key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {linkifyText(cleanDisplayText(item), {
                    disableHrefs,
                    alreadyLinked: linked,
                  })}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "table") {
          return <AppInfoTable key={index} rows={block.rows} />;
        }
        if (block.type === "blockquote") {
          return (
            <blockquote key={index} className="review-quote">
              {linkifyText(cleanDisplayText(block.text), {
                disableHrefs,
                alreadyLinked: linked,
              })}
            </blockquote>
          );
        }
        return null;
      })}
    </>
  );
}
