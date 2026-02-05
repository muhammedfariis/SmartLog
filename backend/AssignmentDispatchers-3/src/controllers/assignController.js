class AssignmentControllers {
  constructor(AssignmentServices) {
    this.AssignmentServices = AssignmentServices;
  }

  assignDriversTrip = async (req, res, next) => {
    try {
      const createAssign = await this.AssignmentServices.assignDriversTrip({
        ...req.body,
      });

      res.json({
        success: true,
        ...createAssign,
      });
    } catch (err) {
      next(err);
    }
  };

  readAssignedDetails = async (req, res, next) => {
    try {
      const readDetails = await this.AssignmentServices.readAssignedDetails();

      res.json({
        success: true,
        ...readDetails,
      });
    } catch (err) {
      next(err);
    }
  };
}
