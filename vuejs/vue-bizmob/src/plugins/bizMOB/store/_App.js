import Vue from 'vue';

import IF from '../interface/index';
import { pathParser } from '../util';

const REQUEST_INTERFACE = 'REQUEST_INTERFACE';
const SAVE_CALLBACK = 'SAVE_CALLBACK';
const SET_LISTENER = 'SET_LISTENER';
const GET_LISTENER = 'GET_LISTENER';
const SET_STORAGE = 'SET_STORAGE';
const GET_STORAGE = 'GET_STORAGE';

const state = {
  // Mobile Device Informations
  deviceInfo: {},

  // Native Function call - listener
  listener: {},

  // Native Function call - storage
  storage: {}
};

const getters = {
  /**
   * Callback
   */
  [GET_LISTENER]: state => key => state.listener[key],
  [GET_STORAGE]: state => key => state.storage[key],

  /**
   * Device
   */
  [IF.GET_DEVICE_INFO]: state => key =>
    key ? state.deviceInfo[key] : state.deviceInfo,
  [IF.IS_IOS]: state =>
    state.deviceInfo.os_type.includes('iPhone') ||
    state.deviceInfo.os_type.includes('iOS'),
  [IF.IS_ANDROID]: state => state.deviceInfo.os_type.includes('Android'),
  [IF.IS_PHONE]: state => state.deviceInfo.device_type.includes('Phone'),
  [IF.IS_TABLET]: state => state.deviceInfo.device_type.includes('Tablet')
};

const mutations = {
  /**
   * Callback
   */
  [SET_LISTENER]: (state, { callbackId, callback }) =>
    Vue.set(state.listener, callbackId, callback),
  [SET_STORAGE]: (state, { callbackId, callback }) =>
    Vue.set(state.storage, callbackId, callback),

  /**
   * Device
   */
  [IF.SET_DEVICE_INFO]: (state, deviceInfo) => (state.deviceInfo = deviceInfo)
};

const actions = {
  /**
   *
   */
  [SAVE_CALLBACK]({ state, commit }, callback, type, name) {
    // TODO - undefined callback 처리 (bizMOBCore.Module.echo)

    let index = 0;
    let callbackId = '';
    switch (type) {
      case 'listener':
        index = Object.keys(state.listener).length;
        callbackId = `lsn${index}`;
        commit(SET_LISTENER, { callbackId, callback });
        break;
      case 'custom':
        index = Object.keys(state.listener).length;
        callbackId = `cst_${name}`;
        commit(SET_LISTENER, { callbackId, callback });
        break;
      default:
        index = Object.keys(state.storage).length;
        callbackId = `stg${index}`;
        commit(SET_STORAGE, { callbackId, callback });
    }
    return callbackId;
  },
  [REQUEST_INTERFACE]({ getters }, tr) {
    // FIXME - temp logging
    console.log('[REQUEST]\n', JSON.stringify(tr, null, 4));

    const message = JSON.stringify(tr);

    if (getters[IF.IS_IOS]) {
      // eslint-disable-next-line no-undef
      webkit.messageHandlers.BMCManager.postMessage(message);
    }
    if (getters[IF.IS_ANDROID]) {
      window.BMCManager.execPluginWithJSB(message);
    }
  },

  /**
   * Callback
   */
  [IF.EXECUTE_CALLBACK]({ getters }, { callback, message, serviceInfo }) {
    if (callback.includes('stg')) {
      getters[GET_STORAGE](callback)(message, serviceInfo);
    } else if (callback.includes('lsn') || callback.includes('cst')) {
      getters[GET_LISTENER](callback)(message, serviceInfo);
    }
  },

  /**
   * Window
   */
  [IF.SHOW_MESSAGE]({ dispatch }, { message, duration }) {
    const tr = {
      id: 'SHOW_MESSAGE',
      param: {
        message: message || '',
        duration: duration || 'long'
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GOTO_SIGNATURE]({ dispatch }, { targetPath, callback }) {
    const { type: target_path_type, path: target_path } = pathParser(
      targetPath
    );
    const tr = {
      id: 'GOTO_SIGNATURE',
      param: {
        target_path_type,
        target_path,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.OPEN_FILE_BROWSER]({ dispatch }, { callback }) {
    const tr = {
      id: 'OPEN_FILE_BROWSER',
      param: {
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.SHOW_IMAGE_VIEW]({ dispatch }, { imagePath, callback }) {
    const { type: source_path_type, path: source_path } = pathParser(imagePath);
    const tr = {
      id: 'SHOW_IMAGE_VIEW',
      param: {
        source_path,
        source_path_type,
        orientation: 'auto',
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.QR_AND_BAR_CODE]({ dispatch }, { callback }) {
    const tr = {
      id: 'QR_AND_BAR_CODE',
      param: {
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },

  /**
   * System
   */
  async [IF.TEL]({ dispatch }, { number, callback }) {
    const tr = {
      id: 'TEL',
      param: {
        number,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.SMS]({ dispatch }, { numbers, message, callback }) {
    const tr = {
      id: 'SMS',
      param: {
        number: numbers.join(';'),
        message,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  [IF.SHOW_WEBSITE]({ dispatch }, { url }) {
    const tr = {
      id: 'SHOW_WEBSITE',
      param: { url }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GET_MEDIA_PICK]({ dispatch }, { types: type_list, callback }) {
    const tr = {
      id: 'GET_MEDIA_PICK',
      param: {
        type_list,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  [IF.SHOW_MAP]({ dispatch }, { location }) {
    const tr = {
      id: 'SHOW_MAP',
      param: { location }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GET_LOCATION]({ dispatch }, { callback }) {
    const tr = {
      id: 'GET_LOCATION',
      param: {
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.CAMERA_CAPTURE](
    { dispatch },
    { fileName: picture_name, directory, autoRotate: rotate, callback }
  ) {
    const { type: target_directory, path: target_directory_type } = pathParser(
      directory
    );
    const tr = {
      id: 'CAMERA_CAPTURE',
      param: {
        target_directory,
        target_directory_type,
        picture_name,
        rotate,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },

  /**
   * App
   */
  async [IF.PROGRESS_CONTROLLER]({ dispatch }, { type, callback }) {
    const tr = {
      id: 'PROGRESS_CONTROLLER',
      param: {
        type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  [IF.APPLICATION_EXIT]({ dispatch }, { type: kill_type }) {
    const tr = {
      id: 'APPLICATION_EXIT',
      param: { kill_type }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.SET_SESSION_TIMEOUT](
    { dispatch },
    { seconds: session_timeout, message, callback }
  ) {
    const tr = {
      id: 'SET_SESSION_TIMEOUT',
      param: {
        session_timeout,
        message,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GET_REGISTERED_CALL_IDS]({ dispatch }, { callback }) {
    const tr = {
      id: 'GET_REGISTERED_CALL_IDS',
      param: {
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },

  /**
   * Device
   */
  [IF.SET_DEVICE_INFO]({ commit }, deviceInfo) {
    const {
      app_major_version,
      app_minor_version,
      app_build_version,
      content_major_version,
      content_minor_version
    } = deviceInfo;
    deviceInfo.app_version = `${app_major_version}.${app_minor_version}.${app_build_version}_${content_major_version}.${content_minor_version}`;
    commit(IF.SET_DEVICE_INFO, deviceInfo);
  },

  /**
   * Contacts
   */
  async [IF.GET_CONTACT](
    { dispatch },
    { searchType: search_type, searchText: search_text, callback }
  ) {
    const tr = {
      id: 'GET_CONTACT',
      param: {
        search_type,
        search_text,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },

  /**
   * File
   */
  async [IF.OPEN_FILE]({ dispatch }, { sourcePath, callback }) {
    const { type: target_path_type, path: target_path } = pathParser(
      sourcePath
    );
    const tr = {
      id: 'OPEN_FILE',
      param: {
        target_path,
        target_path_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.ZIP_FILE]({ dispatch }, { sourcePath, targetPath, callback }) {
    const { type: source_path_type, path: source_path } = pathParser(
      sourcePath
    );
    const { type: target_path_type, path: target_path } = pathParser(
      targetPath
    );
    const tr = {
      id: 'ZIP_FILE',
      param: {
        source_path,
        source_path_type,
        target_path,
        target_path_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.UNZIP_FILE]({ dispatch }, { sourcePath, directory, callback }) {
    const { type: source_path_type, path: source_path } = pathParser(
      sourcePath
    );
    const { type: target_directory_type, path: target_directory } = pathParser(
      directory
    );
    const tr = {
      id: 'UNZIP_FILE',
      param: {
        source_path,
        source_path_type,
        target_directory,
        target_directory_type,
        encode_flag: true, // 내부파일명 한글 있을 경우 true
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.MOVE_FILE]({ dispatch }, { sourcePath, targetPath, callback }) {
    const { type: source_path_type, path: source_path } = pathParser(
      sourcePath
    );
    const { type: target_path_type, path: target_path } = pathParser(
      targetPath
    );
    const tr = {
      id: 'MOVE_FILE',
      param: {
        source_path,
        source_path_type,
        target_path,
        target_path_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.COPY_FILE]({ dispatch }, { sourcePath, targetPath, callback }) {
    const { type: source_path_type, path: source_path } = pathParser(
      sourcePath
    );
    const { type: target_path_type, path: target_path } = pathParser(
      targetPath
    );
    const tr = {
      id: 'COPY_FILE',
      param: {
        source_path,
        source_path_type,
        target_path,
        target_path_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.REMOVE_FILES]({ dispatch }, { sourcePaths, callback }) {
    const list = sourcePaths.map(sourcePath => {
      const { type: source_path_type, path: source_path } = pathParser(
        sourcePath
      );
      return { source_path, source_path_type };
    });
    const tr = {
      id: 'REMOVE_FILES',
      param: {
        list,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GET_DIRECTORY_INFO]({ dispatch }, { directory, callback }) {
    const { type: source_directory_type, path: source_directory } = pathParser(
      directory
    );
    const tr = {
      id: 'GET_DIRECTORY_INFO',
      param: {
        source_directory,
        source_directory_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.EXISTS_FILE](
    { dispatch },
    { sourcePathType = '', sourcePath, callback }
  ) {
    const { type: source_path_type, path: source_path } = pathParser(
      sourcePath
    );
    const tr = {
      id: 'EXISTS_FILE',
      param: {
        source_path,
        source_path_type:
          sourcePathType.trim().length > 0 ? sourcePathType : source_path_type,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.FILE_UPLOAD]({ dispatch }, { files, callback }) {
    const list = files.map(({ sourcePath, fileName: file_name }) => {
      const { type: source_path_type, path: source_path } = pathParser(
        sourcePath
      );
      return { source_path, source_path_type, file_name };
    });
    const tr = {
      id: 'FILE_UPLOAD',
      param: {
        list,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.DOWNLOAD](
    { dispatch },
    { files, mode: method, progress, callback }
  ) {
    const uri_list = files.map((file, index) => {
      const { directory, fileName, overwrite, uri } = file;
      const { type: target_path_type, path: target_path } = directory;
      return {
        target_path: `${target_path}${fileName}`,
        target_path_type,
        overwrite,
        uri,
        file_id: index
      };
    });
    const tr = {
      id: 'DOWNLOAD',
      param: {
        method,
        uri_list,
        progress,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
