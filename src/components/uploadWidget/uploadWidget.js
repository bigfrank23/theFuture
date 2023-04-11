import cogoToast from "cogo-toast";

export const openWidget = () => {
  // Replace CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET with your cloud name and upload preset respectively
  window.cloudinary.openUploadWidget(
    {
      cloudName: "freeman20",
      uploadPreset: "posts_gen01",
      sources: ["local", "url", "camera", "facebook", "instagram"],
      cropping: true,
      // croppingAspectRatio: 1,
      multiple: false,
      maxFiles: 1,
      resourceType: "image",
      maxFileSize: 5000000,
      showAdvancedOptions: true,
      croppingShowDimensions: true,
      croppingDefaultSelectionRatio: 0.75,
      styles: {
        palette: {
          window: "#FFFFFF",
          sourceBg: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#000000",
          inactiveTabIcon: "#555a5f",
          menuIcons: "#555a5f",
          link: "#000000",
          action: "#FF620C",
          inProgress: "#0078FF",
          complete: "#20B832",
          error: "#EA2727",
          textDark: "#000000",
          textLight: "#FFFFFF",
        },
        fonts: {
          default: null,
          "'Source Sans Pro', Helvetica, sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
            active: true,
          },
        },
      },
    },
    // handleUpload
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result.info);
        // setImageUrl(result.info.secure_url);
        cogoToast.success("Successful!", {
          position: "bottom-right",
        });
      } else {
        console.error(error);
      }
    }
  );
};
