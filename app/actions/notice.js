export const noticeTypes = {
  SET_NOTICE: 'SET_NOTICE',
  CLEAR_NOTICE: 'CLEAR_NOTICES'
};

export const setNotice = ({ params }) => ({
  type: noticeTypes.SET_NOTICE,
  title: params.title,
  alert: params.alert,
  kind: params.kind
});
export const clearNotice = () => ({ type: noticeTypes.CLEAR_NOTICE });
