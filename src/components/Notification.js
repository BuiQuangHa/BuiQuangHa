import { notification as notiAntd } from "antd";

import { keys } from "../constants/keys";

const SUCCESS_ADD_MSG = "Create successfully";
const SUCCESS_EDIT_MSG = "Update successfully";
const SUCCESS_DELETE_MSG = "Delete successfully";
const SUCCESS_DEFAULT_MSG = "Successfully";

const ERROR_ADD_MSG = "Create failed";
const ERROR_EDIT_MSG = "Update failed";
const ERROR_DELETE_MSG = "Delete failed";
const ERROR_DEFAULT_MSG = "Failed";

export const notification = {
  // default
  success: (message = SUCCESS_DEFAULT_MSG) =>
    notiAntd.success({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message }),
  error: (message = ERROR_DEFAULT_MSG) =>
    notiAntd.error({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message }),

  // add new
  success_add_new: () =>
    notiAntd.success({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: SUCCESS_ADD_MSG }),
  error_add_new: () =>
    notiAntd.error({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: ERROR_ADD_MSG }),

  // edit
  success_edit: () =>
    notiAntd.success({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: SUCCESS_EDIT_MSG }),
  error_edit: () =>
    notiAntd.error({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: ERROR_EDIT_MSG }),

  // delete
  success_delete: () =>
    notiAntd.success({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: SUCCESS_DELETE_MSG }),
  error_delete: () =>
    notiAntd.error({ placement: "bottomLeft", duration: keys.DURATION_CLOSE_NOTI, message: ERROR_DELETE_MSG }),
};
