function isAuthentificated(req){
  return req.session.user_id === null;
}
