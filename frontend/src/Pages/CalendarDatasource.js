export class CalendarData {
  data = [
    
  ];

  //var myList = new Array();

  constructor() {}

  addElement(object) {
    var found = this.data.find(function(el) {
      return el.id == object.id;
    });
    console.log("addelement found", found);

    if (!found) {
      this.data.push(object);
    }
    console.log("addelement", this.data);
    return this.data;
  }
  removeElement(object) {
    var filtered = this.data.filter(function(el) {
      return el.title != object.title;
    });
    this.data = [];
    this.data = filtered;
    console.log("removeElement", this.data);

    return this.data;
  }
  getAll() {
    console.log("getAll", this.data);

    return this.data;
  }
}

/*
class IData{
    title: string,
    name:string;
    startDate: Date;
    endDate: Date;
    allDay:Boolean;
    id:Number;
    location:String;
    constructor(id, name,startDate,endDate,allDay,id,location){
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.allDay = allDay;
        this.location = location;
    }

}*/
