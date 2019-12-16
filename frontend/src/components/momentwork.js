import moment from "moment";
var currentDate = moment();

var weekStart = currentDate.clone().startOf("isoweek");

var days = [];

for (var i = 0; i <= 6; i++) {
  console.log(
    moment(weekStart)
      .add(i, "days")
      .format("MMMM Do,dddd")
  );
}
