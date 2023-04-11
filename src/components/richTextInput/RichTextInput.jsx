import React, { useEffect, useRef, useState } from "react";
// import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Card, CardContent, IconButton, Typography, keyframes } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './richTextInput.css'
import axios from "axios";
import { useSelector } from "react-redux";

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
    `;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ header: [1, 2, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
  // ["image"], // custom image button
  // ["link", "image", "video"],
];

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "script",
];

const CustomToolbar = () => (
  <div id="toolbar">
    {toolbarOptions.map((toolbarGroup, index) => (
      <span key={index}>
        {toolbarGroup.map((toolbarItem) => {
          if (typeof toolbarItem === "string") {
            return (
              <button
                className="ql-expected-name"
                key={toolbarItem}
                value={toolbarItem}
              >
                {toolbarItem}
              </button>
            );
          }
          if (typeof toolbarItem === "object") {
            const key = Object.keys(toolbarItem)[0];
            const value = toolbarItem[key];
            if (key === "image") {
              return (
                <button className="ql-image" key={key} value={value}>
                  <img src="/path/to/image.png" alt="Custom Icon" />
                </button>
              );
            }
            if (key === "video") {
              return (
                <button className="ql-video" key={key} value={value}>
                  <img src="/path/to/video.png" alt="Custom Icon" />
                </button>
              );
            }
            return null;
          }
          return null;
        })}
      </span>
    ))}
  </div>
);


function RichTextInput({ placeholder, className, content, setContent, handleChange, handleSubmit, post, setPost }) {
  const quillRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const postStatus = useSelector((state) => state.posts.status);

    const handleFocus = () => {
      setShowPreview(true);
    };

  const handleClose = () => {
    setShowPreview(false)
    quillRef.current.blur();
  }

  const ImageHandler = () => {
    const handleImageUpload = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", imageUrl, "user");
    };

    const handleImageInsert = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        handleImageUpload(file);
      };
    };

    const quillRef = useRef(null);

    useEffect(() => {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        quill.getModule("toolbar").addHandler("image", handleImageInsert);
      }
    }, [quillRef]);

    return null;
  };

  return (
    <>
      <Box className={className}>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          modules={{
            toolbar: {
              container: toolbarOptions,
              // handlers: { image: handleImageInsert },
            },
          }}
        />
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="preview-card"
              key="modal"
            >
              <Card sx={{ maxWidth: "500px", overflowWrap: "anywhere" }}>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h5" component="div">
                      Preview
                    </Typography>
                    <IconButton
                      onClick={handleClose}
                      // sx={{ position: "relative", float: "right", top: "5px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={postStatus === "loading"}
                      startIcon={
                        postStatus === "loading" && (
                          <AutorenewIcon
                            sx={{ animation: `${spin} 1s infinite ease` }}
                          />
                        )
                      }
                    >
                      {postStatus === "loading" ? "" : "Send"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
}

export default RichTextInput;
