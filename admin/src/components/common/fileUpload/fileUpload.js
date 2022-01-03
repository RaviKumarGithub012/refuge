/**
 * This component is used for uploading the docs/images
 * It's a common compponent we use in initial uploading the docs and update the docs, etc...
 */
import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { showHideToast } from "../../../services/redux/appNotifications/action";
import { getSession } from "../../../services/utils/storages/storages";
import axios from "../../../services/interceptor/Interceptor";
import Config from "../../../services/config/config";

const FileUpload = ({
  onChange,
  accept = "image/*, .pdf, application/pdf", // We've making the accepted extensions of the required doc/image
  id,
  value = "",
  docName = "",
  isUpdate = true,
  multiple = true,
  isRequired = false,
}) => {
  const inputFile = useRef(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cameraFiles, setCameraFiles] = useState(null);
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state?.myProfile);
  /*
   * Here we're setting the user profile's uploaded doc's status
   */
  const uploadedArray = userProfile?.uploaded_documents ?? [];
  /*
   * Here we're checking the particular doc is uploaded or not from profile's data
   */
  let _isUploaded = (uploadedArray || []).findIndex((a) => a._id === id);
  const isUploaded = _isUploaded >= 0;

  /*
   * This generic method is implemented for upload the doc/image via camera or file manager from system
   */
  const handleFileChangeNew = async (e, isCamera) => {
    if (!e) return;

    const files = e?.target?.files;
    /*
     * Here we're checking the file is upload from camera or not
     * If the file is very recently created then it'll treat as a captured from camera
     * We're taking these images separately and uplaod at same time in case of multiple image uploads in particular doc
     */
    if (
      (files[0] && !isCamera && files[0].type === "image/png") ||
      files[0].type === "image/jpg" ||
      files[0].type === "image/jpeg"
    ) {
      const _lTime = new Date(files[0].lastModified).getTime();
      const _cTime = new Date().getTime();

      if (_cTime - _lTime < 5000) {
        const _temp = [...(cameraFiles || [])];
        _temp.push(files[0]);
        setCameraFiles(_temp);
        return null;
      }
    }

    let flag = false;

    /*
     * We're using the formData multipart functionality here to encrypt or encode the files to be upload
     * For more info please check here https://developer.mozilla.org/en-US/docs/Web/API/FormData
     */

    const formData = new FormData();
    const keys = Object.keys(
      !!cameraFiles && cameraFiles.length ? cameraFiles : files
    );

    if (keys.length > 3) {
      return dispatch(showHideToast(true, "maxFile"));
    }

    const fileObject = {};
    let maxSize = 0;
    keys.forEach((e, i) => {
      const file = files[e];

      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "application/pdf"
      ) {
        maxSize += file.size;
        if (!flag) {
          fileObject[`file${i + 1}`] = file;
          formData.append(`file${i + 1}`, file);
        }
      } else if (!flag) {
        flag = true;
        dispatch(showHideToast(true, "attachmentConfig"));
      }
    });

    if (maxSize > 5242880) {
      flag = true;
      dispatch(showHideToast(true, "maxFileSize"));
    }

    if (flag) return null;

    /*
     * Here we're getting the required session data from session cookies so that we can pass this data in API request
     */

    const userData = await getSession();
    const { userName, nodeId, orgId, userId, userType } = userData;
    formData.append("uid", userId);
    formData.append("pwd", "pwd");
    formData.append("tz", "20210414135658");
    formData.append("chnl", "Web");
    formData.append("orgid", orgId);
    formData.append("nodeid", nodeId);
    formData.append("uname", userName);
    formData.append("utype", userType);
    formData.append("locale", localStorage.getItem("lang") || "en");
    formData.append("app_type", "s");
    formData.append("trans_org_id", orgId);
    formData.append("trans_user_id", userId);
    formData.append("trans_type", "kyc_doc");
    formData.append("trans_value", id);

    if (formData) {
      setIsLoading(true);
      onChange(true);
      setProgress(0);
      const response = await axios
        .post(`Config.Document.uploadDocuments`, formData, {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_AUTH_TOKEN}`,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            accept: "*/*",
          },
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        })
        .then((_res) => _res.data)
        .catch((err) => err.response);
      if (response?.status === "success") {
        dispatch(showHideToast(true, response.res_msg, true));
        setFileName(fileName);
        setIsLoading(false);
        onChange(false);
        setCameraFiles(null);
      } else {
        onChange(false);
        setIsLoading(false);
        onChange(false);
        dispatch(showHideToast(true, "notUploaded"));
      }
    }
  };

  /**
   * This method is used for populating the UI of multiple camera upload pictures in a row and having additional widgets for add another and direct upload images to the server
   */

  const cameraUploadView = () => (
    <>
      <div className="ud-icon">
        {isUploaded ? (
          <span className="apIcon-tick"></span>
        ) : (
          <span className="apIcon-document"></span>
        )}
      </div>
      <div className="ud-title">
        {docName}&nbsp;
        <span className="required">{isRequired ? "*" : ""}</span>
      </div>
      <div className="ud-button">
        {/**
         * button to upload the docs
         */}
        <span
          className="button button-medium button-upload"
          onClick={() =>
            handleFileChangeNew({ target: { files: cameraFiles } }, true)
          }
        >
          {"upload"}
        </span>
      </div>
      <div className="doc-bottom">
        {cameraFiles.length < 3 && (
          <label htmlFor={id} className={isLoading ? "ud-progress" : ""}>
            <>
              <input
                className="d-none"
                type="file"
                id={id}
                accept={"image/*"}
                multiple={multiple}
                value={value}
                name="file"
                ref={inputFile}
                capture
                onChange={handleFileChangeNew}
              />
              <div className="ud-button">
                <span className="doc-edit apIcon-plus"></span>
                &nbsp;
                {"addMore"}
                {/* icon to open camera */}
              </div>
            </>
          </label>
        )}
        {/**
         * its showing the uploaded document list in case of camera clicked.
         */}
        <div className="doc-list">
          <ul>
            {cameraFiles.map((item, i) => (
              <li key={i}>
                {"document"} {i + 1}{" "}
                <span
                  className="apIcon-cross"
                  onClick={() => deleteCameraPhoto(i)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  /**
   * This component is used for to delete the local uploaded file in case of camera upload
   */

  const deleteCameraPhoto = (i) => {

    let _temp = [...(cameraFiles || [])];
    if (_temp.length) {
      _temp.splice(i, 1);
      setCameraFiles(_temp);
    }
  };

  return (
    <Fragment>
      <div className={`uploadDoc-blk ${isUploaded ? "doc-uploaded" : ""}`}>
        {cameraFiles && cameraFiles.length ? (
          cameraUploadView()
        ) : (
          <>
            <div className="ud-icon">
              {isUploaded ? (
                <span className="apIcon-tick"></span>
              ) : (
                <span className="apIcon-document"></span>
              )}
            </div>
            <div className="ud-title">
              {docName}&nbsp;
              <span className="required">{isRequired ? "*" : ""}</span>
              <input
                className="d-none"
                type="file"
                id={id}
                accept={accept}
                multiple={multiple}
                value={value}
                name="file"
                ref={inputFile}
                onChange={handleFileChangeNew}
              />
            </div>
          </>
        )}
        {isUpdate && (
          <>
            <div className="ud-button">
              <label htmlFor={id} className={isLoading ? "ud-progress" : ""}>
                {isLoading ? (
                  <>
                    {/**
                     * Progress bar for uploading the image
                     */}
                    <span className="ud-percent">{`${"loading"}: ${progress}%`}</span>
                    <div className="progress-bar">
                      <div className="progress-track">
                        <div
                          style={{ width: `${progress}%` }}
                          className={`progress-filled green`}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : cameraFiles && cameraFiles.length ? null : isUploaded ? (
                  <span className="doc-edit apIcon-edit"></span>
                ) : (
                  <span className="button button-medium button-upload">
                    {"upload"}
                  </span>
                )}
              </label>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

/**
 * Here we're defining the propTypes for this particular component
 */

FileUpload.propTypes = {
  onChange: PropTypes.func,
  base_64_file: PropTypes.func,
  multiple: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  value: PropTypes.string,
};

export default FileUpload;
