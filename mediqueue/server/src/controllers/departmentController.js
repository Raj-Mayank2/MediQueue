import Department from "../models/Department.js";


/*
GET /api/departments
*/

export const getDepartments = async (
  req,
  res
) => {
  try {
    const departments =
      await Department.find({
        status: "active",
      }).sort({
        name: 1,
      });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });

  } catch (error) {
    console.error(
      "Get departments error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
    });
  }
};