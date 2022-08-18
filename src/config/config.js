export const BASE_URL = "http://95.111.202.157:4001";
export const API = {
  login: `${BASE_URL}/api/login`,
  changePassword: `${BASE_URL}/api/resetPassword`,
  createClass: `${BASE_URL}/api/createClass`,
  getClass: `${BASE_URL}/api/getClass`,
  getUser: `${BASE_URL}/api/user`,
  getAllUser: `${BASE_URL}/api/getUser`,
  updateUser: `${BASE_URL}/api/updateUser`,
  deleteUser: `${BASE_URL}/api/deleteUser`,
  counsellorSearch: `${BASE_URL}/api/searchUser/m`,

  getAllCountry: `${BASE_URL}/api/getAllCountry`,
  getStateBYCountryId: `${BASE_URL}/api/state`,

  addStudent: `${BASE_URL}/api/createStudent`,
  getStudent: `${BASE_URL}/api/student`,
  studentSearch: `${BASE_URL}/api/search`,
  studentDelete: `${BASE_URL}/api/deleteStudent`,
  studentUpdate: `${BASE_URL}/api/updateStudent`,
  studentDismiss: `${BASE_URL}/api/dismiss`,
  studentAssignClass: `${BASE_URL}/api/updateManyRecords`,
  bulkUpload: `${BASE_URL}/api/uploadcsv`,

  saveAttendance: `${BASE_URL}/api/saveAttaindence`,
  updateAttendace: `${BASE_URL}/api/updateAttaindence`,
  attendanceReport: `${BASE_URL}/api/getStudentRecords`,
  getCounsellorNameByClassId: `${BASE_URL}/api/getCouncellorbyClass`,
  getCounsellorStudent: `${BASE_URL}/api/getStu`,
};
