import { Model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
 export type IAcadamicSemesterMonth = 
    |"January"
    |"February" 
    |"March" 
    |"April"
    | "May" 
    |"June"
    |"July"
    |"August" 
    |"September"
    |"October"
    |"November" 
    |"December";

    export type IAcadamicSemesterTitle=
        |'Autum' 
        | 'Summer' 
        | 'Fall';
 
    
    export type IacadamicSemesterCode=
    |"01"
    |'02'
    |"03";

export type IAcadamicSemester={
    title: IAcadamicSemesterTitle;
    year:string,
    code:IacadamicSemesterCode;
    startMonth:IAcadamicSemesterMonth;
    endMonth:IAcadamicSemesterMonth
}

export type AcadamicSemesterModel=Model<IAcadamicSemester>

export type IAcadamicSemesterFiltres={
    searchTerm?:string;}
