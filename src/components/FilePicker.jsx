import React from 'react'
import { PickerOverlay } from "filestack-react";

const FilePicker = ({setShowPicker}) => {
  return (
    <div>
      <PickerOverlay
        apikey={"A96iBLzhpSFuPtMW61TGlz"}
        // onSuccess={(res) => {console.log(res); localStorage.setItem('testImg')}}
        onSuccess={(res) => {console.log(res.filesUploaded.url);}}
        onUploadDone={(res) => setShowPicker(false)}
        onError={(error) => {
          console.error("Filestack error:", error);
        }}
      />
    </div>
  );
}

export default FilePicker