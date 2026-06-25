import type React from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { introText } from "../utils/helper";

export default function MarkDownOutput({ unFormattedText }: 
    {
        unFormattedText: string
    }
) {

    return (
        <>
            {
                <div style={container}>
                    <div className="markdown-container custom-scroll-container" style={markdownContainer}>
                        <ReactMarkDown remarkPlugins={[remarkGfm]}>
                            { unFormattedText || introText }
                        </ReactMarkDown>
                    </div>   
                </div>
            }
        </>
    )

}

const container: React.CSSProperties = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    textAlign: "justify"
};

const markdownContainer: React.CSSProperties = {
    width: "90vw",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "auto",
    padding: "1rem 3rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "1rem"
};
