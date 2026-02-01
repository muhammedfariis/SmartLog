class VehicleControllers {
  constructor(VehicleServices) {
    this.VehicleServices = VehicleServices;
  }

  createVehicles = async (req, res, next) => {
    try {
      const created = await this.VehicleServices.createVehicles({
        ...req.body ,
        addedBy: req.user.id
      });
      res.json({
        success : true,
        ...created ,

      });
    } catch (err) {
      next(err);
    }
  };

  updateVehicles = async (req, res, next) => {
    try {
      const updated = await this.VehicleServices.updateVehicles({
       id: req.params.id,  
      ...req.body
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  deleteVehicles = async (req, res, next) => {
    try {
      const deleted = await this.VehicleServices.deleteVehicles(req.body);
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  };

  readVehicles = async (req, res, next) => {
    try {
      const read = await this.VehicleServices.readVehicles();
      res.json(read);
    } catch (err) {
      next(err);
    }
  };
}

export default VehicleControllers;
