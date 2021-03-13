const namespace = 'bizMOB';

export default {
  /**
   * Interfaces - CallbackManager...
   */

  /**
   * Interfaces - Module...
   */

  /**
   * Interfaces - Window
   */
  SHOW_MESSAGE: `${namespace}/SHOW_MESSAGE`,
  GOTO_SIGNATURE: `${namespace}/GOTO_SIGNATURE`,
  OPEN_FILE_BROWSER: `${namespace}/OPEN_FILE_BROWSER`,
  SHOW_IMAGE_VIEW: `${namespace}/SHOW_IMAGE_VIEW`,
  QR_AND_BAR_CODE: `${namespace}/QR_AND_BAR_CODE`,
  // SideView...

  /**
   * Interfaces - Properties
   */
  SET_FSTORAGE: `${namespace}/SET_FSTORAGE`,
  GET_FSTORAGE: `${namespace}/GET_FSTORAGE`,
  REMOVE_FSTORAGE: `${namespace}/REMOVE_FSTORAGE`,

  /**
   * Interfaces - System
   */
  TEL: `${namespace}/TEL`,
  SMS: `${namespace}/SMS`,
  SHOW_WEBSITE: `${namespace}/SHOW_WEBSITE`,
  GET_MEDIA_PICK: `${namespace}/GET_MEDIA_PICK`,
  SHOW_MAP: `${namespace}/SHOW_MAP`,
  GET_LOCATION: `${namespace}/GET_LOCATION`,
  CAMERA_CAPTURE: `${namespace}/CAMERA_CAPTURE`,

  /**
   * Interfaces - App
   */
  PROGRESS_CONTROLLER: `${namespace}/PROGRESS_CONTROLLER`, // show, close
  APPLICATION_EXIT: `${namespace}/APPLICATION_EXIT`,
  SET_SESSION_TIMEOUT: `${namespace}/SET_SESSION_TIMEOUT`,
  GET_REGISTERED_CALL_IDS: `${namespace}/GET_REGISTERED_CALL_IDS`,

  /**
   * Interfaces - Storage
   */
  SET_LOCALSTORAGE: `${namespace}/SET_LOCALSTORAGE`,
  GET_LOCALSTORAGE: `${namespace}/GET_LOCALSTORAGE`,
  REMOVE_LOCALSTORAGE: `${namespace}/REMOVE_LOCALSTORAGE`,

  /**
   * Interfaces - Network
   */
  RELOAD_WEB: `${namespace}/RELOAD_WEB`,
  AUTH: `${namespace}/AUTH`,

  /**
   * Interfaces - EventManager...
   */

  /**
   * Interfaces - DeviceManager... (modifing)
   */
  GET_DEVICE_INFO: `${namespace}/GET_DEVICE_INFO`,
  SET_DEVICE_INFO: `${namespace}/SET_DEVICE_INFO`,
  IS_IOS: `${namespace}/IS_IOS`,
  IS_ANDROID: `${namespace}/IS_ANDROID`,
  IS_PHONE: `${namespace}/IS_PHONE`,
  IS_TABLET: `${namespace}/IS_TABLET`,

  /**
   * Interfaces - Contacts
   */
  GET_CONTACT: `${namespace}/GET_CONTACT`,

  /**
   * Interfaces - File
   */
  OPEN_FILE: `${namespace}/OPEN_FILE`,
  ZIP_FILE: `${namespace}/ZIP_FILE`,
  UNZIP_FILE: `${namespace}/UNZIP_FILE`,
  MOVE_FILE: `${namespace}/MOVE_FILE`,
  COPY_FILE: `${namespace}/COPY_FILE`,
  REMOVE_FILES: `${namespace}/REMOVE_FILES`,
  GET_DIRECTORY_INFO: `${namespace}/GET_DIRECTORY_INFO`,
  EXISTS_FILE: `${namespace}/EXISTS_FILE`,
  FILE_UPLOAD: `${namespace}/FILE_UPLOAD`,
  DOWNLOAD: `${namespace}/DOWNLOAD`,
  GET_IMAGE_INFO: `${namespace}/GET_IMAGE_INFO`,
  RESIZE_IMAGE: `${namespace}/RESIZE_IMAGE`,
  ROTATE_IMAGE: `${namespace}/ROTATE_IMAGE`,

  /**
   * Interfaces - PushManager...
   */

  /**
   * Interfaces - Database
   */
  OPEN_DATABASE: `${namespace}/OPEN_DATABASE`,
  BEGIN_TRANSACTION: `${namespace}/BEGIN_TRANSACTION`,
  COMMIT_TRANSACTION: `${namespace}/COMMIT_TRANSACTION`,
  ROLLBACK_TRANSACTION: `${namespace}/ROLLBACK_TRANSACTION`,
  EXECUTE_SQL: `${namespace}/EXECUTE_SQL`,
  EXECUTE_SELECT: `${namespace}/EXECUTE_SELECT`,
  EXECUTE_BATCH_SQL: `${namespace}/EXECUTE_BATCH_SQL`
};
