import { IAcadamicSemesterMonth, IAcadamicSemesterTitle, IacadamicSemesterCode } from "./acadamicSemester.interface";

export const acadamicSemesterMonth:IAcadamicSemesterMonth[]=[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  export const acadamicSemesterTitle: IAcadamicSemesterTitle[]=["Autum","Summer","Fall"]

  export const acadamicSemesterCode:IacadamicSemesterCode[]=["01","02","03"]

  export const acadamicSemesterTitleCodeMapper:{
    [key:string]:string
  } = {
    Autum:"01",
    Summer:"02",
    Fall:"03"
  }

  export const acadamicSemesterSearchFields=['title','code','year']

  export const acadamicSemesterFilterableFields=['searchTerm','title','code','year']