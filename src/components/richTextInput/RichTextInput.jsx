import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './richTextInput.css'

const customStyles = {
  ".ql-toolbar": {
    backgroundColor: "#333 !important",
    color: "#fff !important",
  },
  ".ql-button": {
    color: "#fff !important",
  },
  ".ql-button:hover": {
    color: "#000 !important",
  },
  ".ql-button:active": {
    color: "#ff0 !important",
  },
};

function RichTextInput({placeholder, className}) {
  const quillRef = useRef(null);
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <>
    <Box className={className}>
      
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }, { 'indent': '-1' }, { 'indent': '+1' }],
              // ["link", "image", "video"],
              ["image"],
              // ["clean"],
            ],
          }}
          styles={customStyles}
        />
    </Box>
      {/* <br />
      <button
        onClick={() => {
          const quill = quillRef.current.getEditor();
          quill.format("bold", true);
        }}
      >
        Bold
      </button>
      <button
        onClick={() => {
          const quill = quillRef.current.getEditor();
          quill.format("italic", true);
        }}
      >
        Italic
      </button>
      <button
        onClick={() => {
          const quill = quillRef.current.getEditor();
          quill.format("underline", true);
        }}
      >
        Underline
      </button> */}
    </>
  );
}

export default RichTextInput;
