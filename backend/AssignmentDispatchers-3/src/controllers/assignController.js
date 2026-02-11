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

  driverStatusUpdate = async (req , res , next)=>{
    try{
      const driverStatus = await this.AssignmentServices.driverStatusUpdate({
        assignmentId  : req.body.id,
        driverId : req.user.id,
        status : req.body.status
      })

      res.json({
        success : true,
        ...driverStatus
      })

    }catch(err){
      next(err)
      
    }
  }

  getDriverTrips = async(req,res,next)=>{
 try{

  const data =
   await this.AssignmentServices
    .getDriverTrips(req.user.id)

  res.json(data)

 }catch(err){
  next(err)
 }
}


}


export default AssignmentControllers