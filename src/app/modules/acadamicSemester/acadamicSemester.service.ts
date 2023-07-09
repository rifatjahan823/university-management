import ApiError from "../../../Error/ApiError";
import { paginationOptions } from "../../../interfaces/pagination";
import { acadamicSemesterSearchFields, acadamicSemesterTitleCodeMapper } from "./acadamicSemester.constant";
import { IAcadamicSemester, IAcadamicSemesterFiltres } from "./acadamicSemester.interface";
import { AcadamicSemester } from "./acadamicSemester.model";
import status from 'http-status';
import { IGenericResponse } from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";



const createSemester = async (
  payload: IAcadamicSemester
): Promise<IAcadamicSemester> => {
  if (acadamicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcadamicSemester.create(payload);
  return result;
};

const getSingleSemester = async (
  id: string
): Promise<IAcadamicSemester | null> => {
  const result = await AcadamicSemester.findById(id);
  return result;
};

const getAllsemesters = async (
  filters:  IAcadamicSemesterFiltres,
  paginationOptions: paginationOptions
): Promise<IGenericResponse<IAcadamicSemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
  PaginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: acadamicSemesterSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcadamicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcadamicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// update-----------------------
const updateSemester = async (id: string,payload: Partial<IAcadamicSemester>): Promise<IAcadamicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    acadamicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcadamicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete--------------
const deleteSemester =async(id:string): Promise<IAcadamicSemester | null>=>{
  const result = await AcadamicSemester.findByIdAndDelete({ _id: id }, { new: true});
  return result;
}

export const AcademicSemesterService = {
  createSemester,
  getSingleSemester,
  getAllsemesters,
  updateSemester,
  deleteSemester
};